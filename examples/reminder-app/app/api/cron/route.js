import { NextResponse } from "next/server";
import { runReminders } from "../../../lib/reminders";

export async function GET(request) {
  const secret = process.env.CRON_SECRET;

  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const outcome = await runReminders();
  return NextResponse.json({ triggeredBy: "cron", ...outcome });
}
