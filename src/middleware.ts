import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const valid = await verifySession(request.cookies.get("taller_session")?.value);
  if (!valid) return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/clientes/:path*", "/vehiculos/:path*", "/taller/:path*", "/turnos/:path*", "/ordenes/:path*", "/inventario/:path*", "/caja/:path*", "/configuracion/:path*"]
};
