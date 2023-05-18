import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { data: lots, error } = await supabase.rpc('get_lots_table');

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json(lots);
}