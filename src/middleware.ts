import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isBibliotecaRoute = request.nextUrl.pathname.startsWith('/biblioteca');
  const isLoginRoute = request.nextUrl.pathname === '/biblioteca/login';

  if (isBibliotecaRoute && !isLoginRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/biblioteca/login';
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/biblioteca';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/biblioteca/:path*'],
};
