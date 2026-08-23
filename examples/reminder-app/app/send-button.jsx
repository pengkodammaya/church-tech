"use client";

import { useState } from "react";

export default function SendButton() {
  const [state, setState] = useState({ status: "idle", detail: null });

  async function send() {
    setState({ status: "sending", detail: null });
    try {
      const res = await fetch("/api/send", { method: "POST" });
      const data = await res.json();
      setState({
        status: data.count > 0 ? "done" : "empty",
        detail: data,
      });
    } catch (err) {
      setState({ status: "error", detail: err.message });
    }
  }

  const labels = {
    idle: "Send tomorrow's reminders now",
    sending: "Sending...",
    done: "Sent! Send again",
    empty: "Nothing to send tomorrow",
    error: "Error - try again",
  };

  return (
    <div className="send-area">
      <button
        onClick={send}
        disabled={state.status === "sending"}
        className="send-button"
      >
        {labels[state.status]}
      </button>
      {state.detail && state.status === "done" && (
        <pre className="result">{JSON.stringify(state.detail, null, 2)}</pre>
      )}
    </div>
  );
}
