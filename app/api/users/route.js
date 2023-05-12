import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { data: users, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return NextResponse.json(users);
}