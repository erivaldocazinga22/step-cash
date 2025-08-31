import {
	type MiddlewareConfig,
	type NextRequest,
	NextResponse,
} from "next/server";

const publicRoutes = [
	{ path: "/sign-in", whenAuthenticated: "redirect" },
	{ path: "/register", whenAuthenticated: "redirect" },
	{ path: "/policies", whenAuthenticated: "next" },
	{ path: "/", whenAuthenticated: "next" },
	{ path: "/images", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-url", request.url);

	// Ignorar arquivos estáticos
	if (
		request.nextUrl.pathname.startsWith("/images") ||
		request.nextUrl.pathname.startsWith("/_next/static") ||
		request.nextUrl.pathname.startsWith("/_next/image")
	) {
		return NextResponse.next({ request: { headers: requestHeaders } });
	}

	const path = request.nextUrl.pathname;
	const publicRoute = publicRoutes.find((route) => route.path === path);
	const authToken = request.cookies.get("better-auth.session_token");

	// 1. Se não autenticado
	if (!authToken) {
		if (publicRoute) {
			return NextResponse.next({ request: { headers: requestHeaders } });
		}

		// Qualquer dashboard ou rota privada → redireciona
		if (path.startsWith("/dashboard")) {
			const redirectUrl = request.nextUrl.clone();
			redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
			return NextResponse.redirect(redirectUrl);
		}
	}

	// 2. Se autenticado e rota pública que pede redirect
	if (
		authToken &&
		publicRoute &&
		publicRoute.whenAuthenticated === "redirect"
	) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = "/dashboard";
		return NextResponse.redirect(redirectUrl);
	}

	// 3. Caso normal
	return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config: MiddlewareConfig = {
	matcher: [
		/*
		 * Faz match com todas as rotas, exceto:
		 * - api (API routes)
		 * - _next/static (arquivos estáticos)
		 * - _next/image (imagem otimizada)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
