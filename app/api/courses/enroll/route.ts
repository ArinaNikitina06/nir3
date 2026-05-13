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

export async function POST(req: Request) {
  const userId = await resolveUserId(req);
  if (!userId) {
    return NextResponse.json(
      { error: "userId is required (or configure NextAuth session)" },
      { status: 400 }
    );
  }

  try {
    const body = (await req.json()) as { courseId?: string };
    const courseId = (body.courseId ?? "").trim();
    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { status: "ENROLLED" },
      create: { userId, courseId, status: "ENROLLED" },
    });

    return NextResponse.json(enrollment);
  } catch {
    return NextResponse.json(
      { error: "Enroll failed (db not configured?)" },
      { status: 500 }
    );
  }
}

