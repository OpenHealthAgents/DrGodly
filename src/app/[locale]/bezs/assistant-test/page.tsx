"use client";

import React, { useState, useRef } from "react";

const wsUrl = "ws://localhost:8000/chat";

export default function MedicalVoiceAssistant() {
  const [messages, setMessages] = useState<{ text: string; role?: string }[]>(
    []
  );
  const [recording, setRecording] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const chunkBufferRef = useRef<number[]>([]);
  const chunkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);

  const CHUNK_INTERVAL = 200; // 200ms
  const MIN_CHUNK_SAMPLES = 800;

  // ------------------------
  // Append message
  const appendMessage = (text: string, role?: string) => {
    setMessages((prev) => [...prev, { text, role }]);
  };

  // ------------------------
  // Float32 → PCM16
  const floatTo16BitPCM = (float32Array: Float32Array | number[]) => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
  };

  // ------------------------
  // Play PCM16 audio smoothly
  const playPCM16 = async (arrayBuffer: ArrayBuffer) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)({ sampleRate: 16000 });
      await audioContextRef.current.resume();
    }
    if (audioContextRef.current.state === "suspended")
      await audioContextRef.current.resume();

    const int16Array = new Int16Array(arrayBuffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++)
      float32Array[i] = (int16Array[i] / 32768) * 0.8;

    audioQueueRef.current.push(float32Array);
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    while (audioQueueRef.current.length > 0) {
      const data = audioQueueRef.current.shift()!;
      const buffer = audioContextRef.current.createBuffer(
        1,
        data.length,
        audioContextRef.current.sampleRate
      );
      buffer.copyToChannel(data, 0);
      const src = audioContextRef.current.createBufferSource();
      src.buffer = buffer;
      src.connect(audioContextRef.current.destination);
      await new Promise<void>((resolve) => {
        src.onended = () => resolve();
        src.start();
      });
    }
    isPlayingRef.current = false;
  };

  // ------------------------
  // Initialize WebSocket
  const initWebSocket = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(wsUrl);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => appendMessage("✅ Connected to assistant.", "system");
    ws.onclose = () => {
      appendMessage("❌ Disconnected from server.", "system");
      stopRecording();
    };
    ws.onerror = () => appendMessage("⚠ Connection error.", "system");

    ws.onmessage = async (event) => {
      if (typeof event.data === "string") {
        appendMessage(event.data, "agent");
      } else {
        const buffer =
          event.data instanceof Blob
            ? await event.data.arrayBuffer()
            : event.data;
        playPCM16(buffer);
      }
    };
  };

  // ------------------------
  // Start recording
  const startRecording = async () => {
    try {
      if (!audioContextRef.current)
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)({ sampleRate: 16000 });
      await audioContextRef.current.resume();

      initWebSocket();

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaStreamRef.current = mediaStream;

      const source =
        audioContextRef.current.createMediaStreamSource(mediaStream);
      sourceRef.current = source;

      const processor = audioContextRef.current.createScriptProcessor(
        4096,
        1,
        1
      );
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioContextRef.current.destination);

      processor.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        const rms = Math.sqrt(
          input.reduce((sum, val) => sum + val * val, 0) / input.length
        );
        if (rms > 0.01) chunkBufferRef.current.push(...input);
      };

      chunkIntervalRef.current = setInterval(() => {
        if (
          chunkBufferRef.current.length >= MIN_CHUNK_SAMPLES &&
          wsRef.current?.readyState === WebSocket.OPEN
        ) {
          wsRef.current.send(floatTo16BitPCM(chunkBufferRef.current));
          chunkBufferRef.current = [];
        }
      }, CHUNK_INTERVAL);

      setRecording(true);
      appendMessage("🎤 Recording started...", "system");
    } catch (err) {
      console.error(err);
      appendMessage("❌ Cannot access microphone.", "system");
    }
  };

  // ------------------------
  // Stop recording
  const stopRecording = () => {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();

    if (chunkIntervalRef.current) clearInterval(chunkIntervalRef.current);

    chunkBufferRef.current = [];
    setRecording(false);
    appendMessage("⏹ Recording stopped.", "system");
  };

  // ------------------------
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-3">🎙 Medical Voice Assistant</h1>
      <div className="flex gap-2 mb-3">
        <button
          onClick={startRecording}
          disabled={recording}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          🎤 Start Talking
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          ⏹ Stop
        </button>
      </div>
      <div className="w-full max-w-xl h-96 overflow-y-auto border p-3 rounded-md bg-white">
        {messages.map((m, i) => (
          <p key={i} className={m.role ? m.role : ""}>
            {m.text}
          </p>
        ))}
      </div>
    </div>
  );
}
