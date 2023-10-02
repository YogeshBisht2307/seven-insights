import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    /*

        This route is use for user signup process,
        which is not need for now in this application.

    */

    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code){
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(requestUrl.origin)
}