// import { NextRequest, NextResponse } from "next/server";
// import {default} from "next-auth/middleware";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//     const token = await getToken({
//         req: request
//     });
//     const url = request.nextUrl;
//     if(token &&(url.pathname === "/sign-in" || url.pathname === "/sign-up")|| (url.pathname === "/verify")){
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//     if(!token && (url.pathname === "/dashboard" || url.pathname === "/dashboard/:path*")){
//         return NextResponse.redirect(new URL("/sign-in", request.url));
//     }
//     if(!token && (url.pathname === "/atm" || url.pathname === "/atm/:path*")){
//         return NextResponse.redirect(new URL("/sign-in", request.url));
//     }

// }
// export const config = {
//   matcher: [
//     "/sign-in",
//     "/sign-up",
//     "/dashboard",
//     "/dashboard/:path*",
//     "/atm/:path*",
//     "/atm",
//   ],
// };
