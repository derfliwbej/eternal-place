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

    if (error) return new Response("Internal Server Error", { status: 500 });

    return NextResponse.json({ ...tomb, deceased_list: [] });
}

export async function DELETE(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { data: tomb, error1 } = await supabase
        .from('tombs')
        .select('*')
        .eq('id', id)
        .select()
        .single();

    const lotID = tomb.lot_id;

    if (error1) return new Response("Internal Server Error", { status: 500 });

    const { error2 } = await supabase
        .from('tombs')
        .delete()
        .eq('id', id);

    if (error2) return new Response("Internal Server Error", { status: 500 });

    const { data: tombs, error3 } = await supabase
        .from('tombs')
        .select('lot_id')
        .eq('lot_id', lotID);

    if (error3) return new Response("Internal Server Error", { status: 500 });

    if(tombs.length === 0) {
        const { error4 } = await supabase
            .from('lots')
            .update({ has_light: false })
            .eq('id', lotID);

        if (error4) return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Successfully deleted", { status: 200 });
}