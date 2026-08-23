import Link from "next/link";
import SendButton from "./send-button";
import {
  loadRoster,
  getToday,
  getTomorrow,
  formatEntryDate,
  entriesForDate,
} from "../lib/schedule";

export const dynamic = "force-dynamic";

export default async function Home() {
  const roster = await loadRoster();
  const today = getToday(roster.timezone);
  const tomorrow = getTomorrow(roster.timezone);
  const upcoming = [...roster.entries]
    .filter((e) => e.date >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  return (
    <main className="container">
      <header className="app-header">
        <h1>Serving Schedule</h1>
        <p className="subtitle">
          Automated reminders for our serving teams. Today is {formatEntryDate(today)}.
        </p>
      </header>

      <section className="panel highlight">
        <h2>
          Tomorrow <span className="badge">{formatEntryDate(tomorrow)}</span>
        </h2>
        {entriesForDate(roster, tomorrow).length === 0 ? (
          <p>No one is scheduled tomorrow.</p>
        ) : (
          <ul className="entry-list">
            {entriesForDate(roster, tomorrow).map((e) => (
              <li key={e.email + e.role}>
                <strong>{e.name}</strong> — {e.role} · {e.service}, {e.time}
              </li>
            ))}
          </ul>
        )}
        <SendButton />
      </section>

      <section className="panel">
        <h2>Upcoming schedule</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Gathering</th>
              <th>Role</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((e) => (
              <tr key={e.email + e.role + e.date}>
                <td>{formatEntryDate(e.date)}</td>
                <td>{e.time}</td>
                <td>{e.service}</td>
                <td>{e.role}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="hint">
          Edit <code>data/roster.json</code> to change the schedule. Reminders go out
          automatically once per day (see <code>vercel.json</code>) or on demand with the
          button above.
        </p>
      </section>
    </main>
  );
}
