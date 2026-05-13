import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function resolveUserId(req: Request): Promise<string | null> {
  const url = new URL(req.url);
  const qp = url.searchParams.get("userId");
  if (qp && qp.trim()) return qp.trim();

  try {
    const session = await getServerSession(authOptions);
    return session?.user?.id ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const userId = await resolveUserId(req);
  if (!userId) {
    return NextResponse.json(
      { error: "userId is required (or configure NextAuth session)" },
      { status: 400 }
    );
  }

  try {
    const pref = await prisma.userPreference.findUnique({ where: { userId } });
    return NextResponse.json(
      pref ?? { userId, category: null, level: null, interests: [] }
    );
  } catch {
    return NextResponse.json(
      { error: "Preferences unavailable (db not configured?)" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const userId = await resolveUserId(req);
  if (!userId) {
    return NextResponse.json(
      { error: "userId is required (or configure NextAuth session)" },
      { status: 400 }
    );
  }

  try {
    const body = (await req.json()) as {
      category?: string | null;
      level?: string | null;
      interests?: string[] | null;
    };

    const pref = await prisma.userPreference.upsert({
      where: { userId },
      update: {
        category: body.category ?? null,
        level: body.level ?? null,
        interests: Array.isArray(body.interests) ? body.interests : [],
      },
      create: {
        userId,
        category: body.category ?? null,
        level: body.level ?? null,
        interests: Array.isArray(body.interests) ? body.interests : [],
      },
    });

    return NextResponse.json(pref);
  } catch {
    return NextResponse.json(
      { error: "Preferences update failed (db not configured?)" },
      { status: 500 }
    );
  }
}

