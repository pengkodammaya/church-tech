"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ROOMS } from "../../lib/rooms";

export default function Admin() {
  const [passcode, setPasscode] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/bookings", {
      headers: { "x-admin-passcode": passcode },
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Could not load bookings");
      return;
    }
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoaded(true);
  }, [passcode]);

  useEffect(() => {
    if (passcode) load();
  }, []);

  async function decide(id, status) {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-passcode": passcode,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) load();
  }

  const roomName = (id) => ROOMS.find((r) => r.id === id)?.name || id;
  const pending = bookings.filter((b) => b.status === "pending");
  const decided = bookings.filter((b) => b.status !== "pending");

  return (
    <main className="container">
      <header className="app-header">
        <h1>Office — Review Bookings</h1>
        <Link href="/" className="admin-link">
          Back to booking page
        </Link>
      </header>

      <section className="panel">
        <label className="controls">
          Passcode
          <input
            type="password"
            value={passcode}
            placeholder="ADMIN_PASSCODE"
            onChange={(e) => setPasscode(e.target.value)}
            onBlur={load}
          />
          <button className="send-button" onClick={load}>
            Load
          </button>
        </label>
        {error && <p className="msg-err">{error}</p>}
      </section>

      {loaded && (
        <>
          <section className="panel">
            <h2>Pending requests ({pending.length})</h2>
            {pending.length === 0 && <p>No pending requests.</p>}
            <ul className="admin-list">
              {pending.map((b) => (
                <li key={b.id} className="admin-item">
                  <div>
                    <strong>{roomName(b.room)}</strong> · {b.booking_date} ·{" "}
                    {b.slot}
                    <br />
                    <small>
                      {b.name} ({b.email}) — {b.notes || "no notes"}
                    </small>
                  </div>
                  <div className="admin-actions">
                    <button className="btn-ok" onClick={() => decide(b.id, "approved")}>
                      Approve
                    </button>
                    <button className="btn-no" onClick={() => decide(b.id, "rejected")}>
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <h2>History</h2>
            <ul className="admin-list">
              {decided.map((b) => (
                <li key={b.id} className="admin-item">
                  <span>
                    {roomName(b.room)} · {b.booking_date} · {b.slot} · {b.name} —{" "}
                    <strong
                      className={b.status === "approved" ? "msg-ok" : "msg-err"}
                    >
                      {b.status}
                    </strong>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
