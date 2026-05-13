import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getRecommendedCourses } from "@/lib/recommendations";

function getUserIdFromRequest(req: Request): string | null {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  return userId && userId.trim() ? userId.trim() : null;
}

export async function GET(req: Request) {
  // 1) userId from querystring (prototype-friendly)
  let userId = getUserIdFromRequest(req);

  // 2) userId from NextAuth session (when configured)
  if (!userId) {
    try {
      const session = await getServerSession(authOptions);
      userId = session?.user?.id ?? null;
    } catch {
      // ignore
    }
  }

  // 3) fallback: first user in DB (demo mode)
  if (!userId) {
    try {
      const first = await prisma.user.findFirst({ select: { id: true } });
      userId = first?.id ?? null;
    } catch {
      // ignore
    }
  }

  // If DB/auth not configured — return deterministic mock (keeps UI working)
  if (!userId) {
    return NextResponse.json([
      {
        id: "demo-course-1",
        title: "Основы UI дизайна",
        description: "Освойте принципы дизайна пользовательских интерфейсов, теорию цвета и типографику.",
        imageUrl: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1200&q=60",
        category: "Дизайн",
        level: "Beginner",
        durationMinutes: 260,
        priceRub: 0,
        rating: 4.7,
        tags: ["Дизайн", "Начальный"],
        recommendation: {
          courseId: "demo-course-1",
          score: 0.75,
          reasons: ["Демо-режим: нет подключенной БД/сессии"],
        },
      },
      {
        id: "demo-course-2",
        title: "Fullstack Next.js 14",
        description: "Создавайте масштабируемые приложения с современным React и Next.js.",
        imageUrl: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=60",
        category: "Разработка",
        level: "Intermediate",
        durationMinutes: 480,
        priceRub: 1990,
        rating: 4.6,
        tags: ["Разработка", "Продвинутый"],
        recommendation: {
          courseId: "demo-course-2",
          score: 0.62,
          reasons: ["Демо-режим: нет подключенной БД/сессии"],
        },
      },
    ]);
  }

  try {
    const courses = await getRecommendedCourses(userId);
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json(
      [
        {
          id: "demo-course-1",
          title: "Основы UI дизайна",
          description: "Освойте принципы дизайна пользовательских интерфейсов, теорию цвета и типографику.",
          imageUrl: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1200&q=60",
          category: "Дизайн",
          level: "Beginner",
          durationMinutes: 260,
          priceRub: 0,
          rating: 4.7,
          tags: ["Дизайн", "Начальный"],
          recommendation: {
            courseId: "demo-course-1",
            score: 0.75,
            reasons: ["Демо-режим: ошибка доступа к БД"],
          },
        },
      ],
      { status: 200 }
    );
  }
}

