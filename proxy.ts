import { NextResponse, type NextRequest } from "next/server";
import { getEnv } from "@/lib/env";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
    },
  });
}

function isProtectedPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/");
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isProtectedPath(pathname)) return NextResponse.next();

  const env = getEnv();
  const user = env.ADMIN_BASIC_AUTH_USER;
  const pass = env.ADMIN_BASIC_AUTH_PASS;

  if (!user || !pass) {
    // Fail closed: admin should never be exposed without creds.
    return new NextResponse("Admin auth is not configured", { status: 500 });
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  const b64 = auth.slice("Basic ".length);
  let decoded = "";
  try {
    decoded = atob(b64);
  } catch {
    return unauthorized();
  }

  const idx = decoded.indexOf(":");
  if (idx < 0) return unauthorized();

  const gotUser = decoded.slice(0, idx);
  const gotPass = decoded.slice(idx + 1);

  if (gotUser !== user || gotPass !== pass) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
