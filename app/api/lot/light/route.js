import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { has_light } = await request.json();

    const { error } = await supabase
        .from('lots')
        .update({ has_light })
        .eq('id', id);

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Successfully updated", { status: 200 });
}