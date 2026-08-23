import { Resend } from "resend";

function buildHtml(entries) {
  const rows = entries
    .map(
      (e) =>
        `<tr>
           <td style="padding:8px 12px;border-bottom:1px solid #eee;">${e.role}</td>
           <td style="padding:8px 12px;border-bottom:1px solid #eee;"><strong>${e.name}</strong></td>
           <td style="padding:8px 12px;border-bottom:1px solid #eee;">${e.service}, ${e.time}</td>
         </tr>`
    )
    .join("");
  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:auto;">
      <h2 style="color:#1d4ed8;">Serving reminder for tomorrow</h2>
      <p>Hi! Here is the serving schedule for tomorrow. Please reply to this
         email or message your coordinator if you are unable to serve.</p>
      <table style="border-collapse:collapse;width:100%;margin:16px 0;">
        ${rows}
      </table>
      <p style="color:#888;font-size:13px;">
        Thank you for serving! This is an automated reminder — please do not
        treat this as a replacement for confirming with your coordinator.
      </p>
    </div>`;
}

export async function sendReminderEmails(entries) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REMINDER_FROM_EMAIL || "onboarding@resend.dev";

  const byEmail = new Map();
  for (const entry of entries) {
    if (!byEmail.has(entry.email)) byEmail.set(entry.email, []);
    byEmail.get(entry.email).push(entry);
  }

  const results = [];

  if (!apiKey) {
    return {
      mode: "demo",
      results: [...byEmail.keys()].map((email) => ({
        to: email,
        status: "demo (no RESEND_API_KEY set)",
      })),
    };
  }

  const resend = new Resend(apiKey);

  for (const [email, personEntries] of byEmail) {
    try {
      await resend.emails.send({
        from,
        to: email,
        subject: `Serving reminder: ${personEntries[0].service} on ${personEntries[0].date}`,
        html: buildHtml(personEntries),
      });
      results.push({ to: email, status: "sent" });
    } catch (err) {
      results.push({ to: email, status: `failed: ${err.message}` });
    }
  }

  return { mode: "live", results };
}
