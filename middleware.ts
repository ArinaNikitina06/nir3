import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import withAuth from "next-auth/middleware";

const authMiddleware = withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

/**
 * Сбои внутри next-auth middleware (конфиг URL/секрета, JWT и т.д.) без try/catch
 * приводят к ответу 500 на /profile — перехватываем и отправляем на страницу входа.
 */
export async function middleware(req: NextRequest, event: NextFetchEvent) {
  try {
    return await authMiddleware(req as Parameters<typeof authMiddleware>[0], event);
  } catch (error) {
    console.error("[middleware:next-auth]", error);
    const signIn = req.nextUrl.clone();
    signIn.pathname = "/auth/signin";
    signIn.search = "";
    signIn.searchParams.set("callbackUrl", `${req.nextUrl.pathname}${req.nextUrl.search}`);
    return NextResponse.redirect(signIn);
  }
}

export const config = {
  matcher: ["/profile/:path*"],
};
