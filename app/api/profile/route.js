import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { id } = session.user;

    const { data: { first_name, middle_name, last_name, contact_num, address }, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return NextResponse.json({ first_name, middle_name, last_name, contact_num, address });
}


export async function PUT(request) {
    const supabase = createClient();
    
    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { id } = session.user;

    const {
        first_name,
        middle_name,
        last_name,
        address,
        contact_num
    } = await request.json();

    const { data, error } = await supabase.from('users').update(
        { first_name, middle_name, last_name, address, contact_num }
    ).eq('id', id);

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return new Response("Successfully updated user", { status: 200 });
}