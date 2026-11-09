
import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const currentPath = request.nextUrl.pathname;
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", currentPath);

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/dashboard/user/:path*",
    "/dashboard/donor/:path*",
    "/dashboard/admin/:path*",
    "/donate",
    "/help-request"
  ],
};
