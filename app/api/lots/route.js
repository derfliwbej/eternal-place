import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { data: lots, error } = await supabase.rpc('get_lots_map');

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return NextResponse.json(lots);
}

export async function PUT(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { errorReset } = await supabase.rpc('reset_lot_lightings');

    if (errorReset) {
        console.log(errorReset);
        return new Response("Internal Server Error", { status: 500 });
    }

    const { data: lots, errorLots } = await supabase.rpc('get_lots_map');

    if (errorLots) {
        console.log(errorLots);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json(lots);
}