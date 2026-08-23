import { NextResponse } from "next/server";
import { runReminders } from "../../../lib/reminders";

export async function POST() {
  const outcome = await runReminders();
  return NextResponse.json({ triggeredBy: "manual", ...outcome });
}
