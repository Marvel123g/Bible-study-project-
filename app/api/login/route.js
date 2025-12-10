import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import React from "react";

export async function POST(req) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const cookiesStore = await cookies();
    cookiesStore.set("admin_session", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
}
