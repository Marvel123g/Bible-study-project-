import { NextResponse } from "next/server";

export async function GET(req) {
  const session = req.cookies.get("admin_session");

  if (session && session.value === "true") {
    return NextResponse.json({ valid: true }, { status: 200 });
  }

  return NextResponse.json({ valid: false }, { status: 401 });
}
