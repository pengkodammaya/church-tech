import { NextResponse } from "next/server";
import { getSupabase, checkAdmin } from "../../../../lib/supabase";

export async function PATCH(request, { params }) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Wrong passcode" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { id } = await params;

    if (!["approved", "rejected"].includes(body.status)) {
      return NextResponse.json(
        { error: "status must be approved or rejected" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .update({ status: body.status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ booking: data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
