import { prisma } from "./db";

export interface RecommendationScore {
  courseId: string;
  score: number;
  reasons: string[];
}

/**
 * Алгоритм персонализированных рекомендаций на основе:
 * 1. Предпочтений пользователя (категории, уровень)
 * 2. Истории взаимодействий (просмотры, лайки, закладки)
 * 3. Прогресса обучения
 * 4. Популярности курса
 * 5. Схожести с уже пройденными курсами
 */
export async function getPersonalizedRecommendations(
  userId: string,
  limit: number = 10
): Promise<RecommendationScore[]> {
  // Получаем предпочтения пользователя
  const preferences = await prisma.userPreference.findUnique({
    where: { userId },
  });

  // Получаем историю взаимодействий
  const interactions = await prisma.userInteraction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Получаем курсы, на которые пользователь уже записан
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    select: { courseId: true },
  });
  const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));

  // Получаем просмотренные курсы для анализа схожести
  const viewedCourseIds = interactions
    .filter((i) => i.type === "view")
    .map((i) => i.courseId);
  const viewedCourses =
    viewedCourseIds.length > 0
      ? await prisma.course.findMany({
          where: { id: { in: viewedCourseIds } },
          select: { category: true, tags: true },
        })
      : [];

  // Получаем все курсы, исключая уже записанные
  const allCourses = await prisma.course.findMany({
    where: {
      id: {
        notIn: Array.from(enrolledCourseIds),
      },
    },
    include: {
      interactions: {
        where: { userId },
      },
      _count: {
        select: {
          enrollments: true,
          interactions: true,
        },
      },
    },
  });

  // Вычисляем скоры для каждого курса
  const recommendations: RecommendationScore[] = allCourses.map((course) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Соответствие предпочтениям по категории (вес: 30)
    if (preferences?.category && course.category === preferences.category) {
      score += 30;
      reasons.push("Соответствует вашим предпочтениям по категории");
    }

    // 2. Соответствие уровню (вес: 25)
    if (preferences?.level && course.level === preferences.level) {
      score += 25;
      reasons.push(`Подходит вашему уровню: ${course.level}`);
    }

    // 3. История взаимодействий (вес: 20)
    const userInteractions = course.interactions.filter(
      (i) => i.userId === userId
    );
    if (userInteractions.length > 0) {
      const interactionScore = userInteractions.reduce((sum, interaction) => {
        switch (interaction.type) {
          case "view":
            return sum + 2;
          case "like":
            return sum + 5;
          case "bookmark":
            return sum + 8;
          default:
            return sum;
        }
      }, 0);
      score += Math.min(interactionScore, 20);
      if (interactionScore > 0) {
        reasons.push("Вы уже интересовались этим курсом");
      }
    }

    // 4. Популярность курса (вес: 15)
    const popularityScore =
      (course.studentsCount * 0.1 + course.rating * 2) / 10;
    score += Math.min(popularityScore, 15);
    if (course.rating >= 4.5 && course.studentsCount > 100) {
      reasons.push("Популярный и высоко оцененный курс");
    }

    // 5. Соответствие интересам (вес: 10)
    if (preferences?.interests) {
      const matchingTags = course.tags.filter((tag) =>
        preferences.interests?.some((interest) =>
          interest.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (matchingTags.length > 0) {
        score += 10;
        reasons.push(
          `Соответствует вашим интересам: ${matchingTags.join(", ")}`
        );
      }
    }

    // 6. Схожесть с просмотренными курсами (вес: 10)
    if (viewedCourses.length > 0) {
      const categoryMatch = viewedCourses.some(
        (c) => c.category === course.category
      );
      const tagMatch = viewedCourses.some((c) =>
        c.tags.some((tag) => course.tags.includes(tag))
      );

      if (categoryMatch || tagMatch) {
        score += 10;
        reasons.push("Похож на курсы, которые вы просматривали");
      }
    }

    return {
      courseId: course.id,
      score,
      reasons,
    };
  });

  // Сортируем по скору и возвращаем топ рекомендации
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((r) => r.score > 0);
}

/**
 * Получает курсы с рекомендациями для пользователя
 */
export async function getRecommendedCourses(userId: string) {
  const recommendations = await getPersonalizedRecommendations(userId, 12);

  const courseIds = recommendations.map((r) => r.courseId);
  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds } },
    include: {
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });

  // Создаем мапу для быстрого доступа к рекомендациям
  const recommendationMap = new Map(
    recommendations.map((r) => [r.courseId, r])
  );

  return courses.map((course) => ({
    ...course,
    recommendation: recommendationMap.get(course.id),
  }));
}
