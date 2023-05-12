import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

const adminPages = /^((\/edit\/lot\/[0-9]+)||(\/dashboard\/admin)||(\/manage\/users)||(\/manage\/transactions)||(\/search)||(\/edit\/lot\/[0-9]+))$/;
const userPages = /^((\/dashboard\/user)||(\/transaction\/create)||(\/transaction\/history)||(\/view\/lot\/[0-9]+))$/;

export async function middleware(req) {
    const res = NextResponse.next();
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        /\.(.*)$/.test(pathname)) {
            return res;
    }

    const supabase = createMiddlewareSupabaseClient({ req, res });

    const { data: { session }, } = await supabase.auth.getSession();

    if (!session && pathname !== '/' && pathname !== '/login') {
        const url = new URL(req.url);
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (session) {
        const { data: { admin_role } } = await supabase.from('users').select('admin_role').eq('id', session?.user?.id).single();

        if (pathname === '/') {
            const url = new URL(req.url);
            
            if(admin_role) url.pathname = '/dashboard/admin';
            else url.pathname = '/dashboard/user';

            return NextResponse.redirect(url);
        }
        // If user tries to access admin pages manually or vice versa
        else if (pathname !== '/profile') {
            if((admin_role && userPages.test(pathname)) || (!admin_role && adminPages.test(pathname))) {
                // Redirect to /unknown
                const url = new URL(req.url);
                url.pathname = '/unknown';
                return NextResponse.redirect(url);
            }
        }
    }

    return res;
}