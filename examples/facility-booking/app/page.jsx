"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ROOMS, SLOTS, todayISO } from "../lib/rooms";

export default function Home() {
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const [date, setDate] = useState(todayISO());
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const [message, setMessage] = useState(null);

  const loadBookings = useCallback(async () => {
    const res = await fetch(
      `/api/bookings?room=${encodeURIComponent(roomId)}&date=${date}`
    );
    const data = await res.json();
    setBookings(data.bookings || []);
  }, [roomId, date]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const room = ROOMS.find((r) => r.id === roomId);
  const slotStatus = (slot) =>
    bookings.find((b) => b.slot === slot && b.status !== "rejected");

  async function book(slot) {
    setMessage(null);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room: roomId, date, slot, ...form }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage({ ok: false, text: data.error });
    } else {
      setMessage({
        ok: true,
        text: `Request submitted for ${room.name}, ${date}, ${slot}. The office will confirm shortly.`,
      });
      setForm({ name: "", email: "", notes: "" });
      loadBookings();
    }
  }

  return (
    <main className="container">
      <header className="app-header">
        <h1>Facility Booking</h1>
        <p className="subtitle">
          Request a room. The church office reviews every request.
        </p>
      </header>

      <section className="panel">
        <div className="controls">
          <label>
            Room
            <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              {ROOMS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (up to {r.capacity} pax)
                </option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
        <p className="room-desc">{room.description}</p>
      </section>

      <section className="panel">
        <h2>Slots</h2>
        <ul className="slot-list">
          {SLOTS.map((slot) => {
            const taken = slotStatus(slot);
            const statusLabel =
              taken?.status === "approved" ? "Booked" : taken ? "Pending request" : "";
            return (
              <li key={slot} className={`slot ${taken ? "taken" : "free"}`}>
                <span className="slot-time">{slot}</span>
                {taken ? (
                  <span className="slot-status">{statusLabel}</span>
                ) : (
                  <button className="book-button" onClick={() => book(slot)}>
                    Request
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="panel">
        <h2>Your details</h2>
        <div className="form-grid">
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Purpose (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        {message && (
          <p className={message.ok ? "msg-ok" : "msg-err"}>{message.text}</p>
        )}
        <p className="hint">
          Fill in your details above, then press &ldquo;Request&rdquo; on a free slot.
        </p>
      </section>

      <Link href="/admin" className="admin-link">
        Office login (approve bookings)
      </Link>
    </main>
  );
}
