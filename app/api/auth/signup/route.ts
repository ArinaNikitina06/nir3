import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; name?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    const name = (body.name ?? "").trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: { email, name: name || null },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Signup failed (db not configured?)" },
      { status: 500 }
    );
  }
}

