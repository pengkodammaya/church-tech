import { NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";

export async function GET(request) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const room = searchParams.get("room");
    const date = searchParams.get("date");

    let query = supabase
      .from("bookings")
      .select("*")
      .neq("status", "rejected")
      .order("booking_date", { ascending: true });

    if (room) query = query.eq("room", room);
    if (date) query = query.eq("booking_date", date);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ bookings: data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    const required = ["room", "date", "slot", "name", "email"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const { data: existing, error: conflictError } = await supabase
      .from("bookings")
      .select("id")
      .eq("room", body.room)
      .eq("booking_date", body.date)
      .eq("slot", body.slot)
      .neq("status", "rejected");

    if (conflictError) throw conflictError;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "That slot has already been requested or booked." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        room: body.room,
        booking_date: body.date,
        slot: body.slot,
        name: body.name,
        email: body.email,
        notes: body.notes || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
