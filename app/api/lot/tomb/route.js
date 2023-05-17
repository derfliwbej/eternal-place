import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { lotID } = await request.json();

    const { data: tomb, error } = await supabase
        .from('tombs')
        .insert({ lot_id: lotID })
        .select()
        .single();
    
    console.log(tomb);

    if (error) return new Response("Internal Server Error", { status: 500 });

    return NextResponse.json({ ...tomb, deceased_list: [] });
}