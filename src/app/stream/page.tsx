"use client";

// app/stream/page.tsx
import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface Stream {
  stream_key: string;
  playback_ids: { id: string }[];
}

const StreamPage = () => {
  const [stream, setStream] = useState<Stream | null>(null);

  const createStream = async () => {
    const res = await fetch("/api/live-stream", { method: "POST" });
    const data: Stream = await res.json();
    setStream(data);
  };

  return (
    <div>
      <h1>Live Stream</h1>
      {stream ? (
        <div>
          <h2>Stream Key: {stream.stream_key}</h2>
          <h2>RTMP URL: rtmp://live.mux.com/app</h2>
          <MuxPlayer
            streamType="live"
            playbackId={stream.playback_ids[0].id}
            metadata={{
              video_id: stream.playback_ids[0].id,
              video_title: "Live Stream",
            }}
            autoPlay
          />
        </div>
      ) : (
        <button onClick={createStream}>Create Live Stream</button>
      )}
    </div>
  );
};

export default StreamPage;
