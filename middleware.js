import { NextResponse } from "next/server";
import { getIsLogin, getRole } from "./lib/getProfile";

export function middleware(req) {
    const isLogin = getIsLogin();
    const role = getRole();
    if (req.nextUrl.pathname.startsWith("/dashboard") && (!isLogin || role == "User")) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if(req.nextUrl.pathname.startsWith("/appointment") && !isLogin){
        return NextResponse.redirect(new URL('/login', req.url))
    }
}