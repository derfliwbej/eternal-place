import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { first_name, middle_name, last_name, born_date, death_date } = await request.json();

    const { data: deceased, error } = await supabase
        .from('deceased')
        .insert({ tomb_id: id, first_name, middle_name, last_name, born_date, death_date })
        .select()
        .single();

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json(deceased);
}

export async function DELETE(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { error } = await supabase
        .from('deceased')
        .delete()
        .eq('id', id);

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Successfully deleted", { status: 200 });
}

export async function PUT(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { first_name, middle_name, last_name, born_date, death_date } = await request.json();

    const { error } = await supabase
        .from('deceased')
        .update({ first_name, middle_name, last_name, born_date, death_date })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Successfully updated", { status: 200 });
}