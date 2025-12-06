"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom } from "@livekit/components-react";
import { toast } from "sonner";
import { RoomControlUI } from "./RoomControl";
import { TranscriptPanel } from "./TranscriptionPanel";

type Transcript = {
  name: string;
  text: string;
  timestamp: string;
};

export default function Consult({
  roomId,
  participant,
}: {
  roomId: string;
  participant: { name?: string };
}) {
  const [token, setToken] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("/api/livekit-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomId, name: participant.name }),
        });
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong");
      }
    })();
  }, [roomId, participant.name]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        Getting token...
      </div>
    );
  }

  const onLeave = () => {
    setIsEnded(true);
  };

  function captureTranscript(transcript: Transcript) {
    setTranscripts((prev) => [...prev, transcript]);
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: "100vh" }}
      onDisconnected={onLeave}
      className="bg-gray-950"
    >
      <>
        <div className="flex flex-col h-full w-full">
          {/* Top Bar */}
          <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Room:</span>
              <span className="text-indigo-400 font-mono">{roomId}</span>
            </div>
            <button
              onClick={() => {
                onLeave();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Leave
            </button>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <RoomControlUI />
            <TranscriptPanel
              roomId={roomId}
              transcripts={transcripts}
              setTranscripts={captureTranscript}
            />
          </div>
        </div>
      </>
    </LiveKitRoom>
  );
}
