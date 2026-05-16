"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setReply(data.reply);
    setLoading(false);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>AIチャット</h1>

      <input
        style={{ width: "100%", padding: 10 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        送信
      </button>

      {loading && <p>考え中...</p>}

      <p style={{ marginTop: 20 }}>{reply}</p>
    </main>
  );
}
