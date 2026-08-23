import {
  loadRoster,
  getTomorrow,
  entriesForDate,
} from "./schedule";
import { sendReminderEmails } from "./email";

export async function runReminders() {
  const roster = await loadRoster();
  const tomorrow = getTomorrow(roster.timezone);
  const entries = entriesForDate(roster, tomorrow);

  if (entries.length === 0) {
    return { date: tomorrow, count: 0, message: "No one is scheduled to serve tomorrow." };
  }

  const emailOutcome = await sendReminderEmails(entries);
  return {
    date: tomorrow,
    count: entries.length,
    emails: emailOutcome.results,
    mode: emailOutcome.mode,
  };
}
