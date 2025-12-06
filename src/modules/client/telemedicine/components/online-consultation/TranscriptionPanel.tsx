"use client";

import { useEffect, useRef, useState } from "react";

type Transcript = {
  name: string;
  text: string;
  timestamp: string;
};

interface Props {
  roomId: string;
  transcripts: Transcript[];
  setTranscripts: (transcript: {
    name: string;
    text: string;
    timestamp: string;
  }) => void;
}

export function TranscriptPanel({
  transcripts,
  setTranscripts,
  roomId,
}: Props) {
  const [error, setError] = useState<string | null>();

  const bottomRef = useRef<HTMLDivElement>(null);

  // Start Transcriber
  useEffect(() => {
    fetch("/api/livekit-start-transcriber", {
      method: "POST",
      body: JSON.stringify({ roomId }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => console.log(res.json()))
      .catch((e) => setError("Failed to get transcripts"));
  }, [roomId]);

  // SSE Subscription
  useEffect(() => {
    setError(null);
    const pyUrl = process.env.NEXT_PUBLIC_PY_AGENT_URL;

    if (!pyUrl) {
      setError("Failed to get transcripts");
    }

    const eventSource = new EventSource(
      `${pyUrl}/transcript-stream?roomId=${roomId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.text) {
          // Format timestamp HH:MM from ISO or raw
          let timeStr = "";
          try {
            const date = new Date(data.timestamp);
            timeStr = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          } catch {
            timeStr = "";
          }

          if (error) setError(null);
          setTranscripts({
            timestamp: timeStr,
            name: data.participantName,
            text: data.text,
          });
        }
      } catch (e) {
        console.log(e);
        setError("Failed to get transcripts");
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE Error", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [roomId]);

  // Auto-scroll
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts]);

  return (
    <div className="w-80 md:w-96 bg-gray-900 border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 font-semibold text-gray-200">
        Live Transcript
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && <p>{error}</p>}
        {!error && transcripts.length === 0 && (
          <div className="text-gray-500 text-sm text-center italic mt-10">
            Waiting for speech...
          </div>
        )}
        {!error &&
          transcripts.map((t, i) => (
            <div key={i} className="flex flex-col start">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-500 font-mono">
                  [{t.timestamp}]
                </span>
                <span className="text-sm font-bold text-indigo-300">
                  {t.name}
                </span>
              </div>
              <p className="text-gray-300 text-sm pl-1">{t.text}</p>
            </div>
          ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
