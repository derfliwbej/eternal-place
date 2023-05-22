import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { data: transactions, error } = await supabase.rpc('get_transactions');

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json(transactions);
}

export async function PUT(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { status } = await request.json();

    const { error } = await supabase
        .from('transaction')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Successfully updated", { status: 200 });
}