import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { data: user, errorUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', body.email)
        .single();

    if (errorUser) {
        console.log(errorUser);
        return new Response("Internal Server Error", { status: 500 });
    }
    if(!user) return new Response("User not found", { status: 404 });

    const { data: owner, errorOwner } = await supabase
        .from('lot_owners')
        .select('*')
        .match({ user_id: user.id, lot_id: body.lot_id })
        .single();

    if(errorOwner) {
        console.log(errorOwner);
        return new Response("Internal Server Error", { status: 500 });
    }

    if(owner) return new Response("User already owns the lot", { status: 400 });

    const { errorLotOwner } = await supabase
        .from('lot_owners')
        .insert({ lot_id: body.lot_id, user_id: user.id });

    if (errorLotOwner) {
        console.log(errorLotOwner);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json(user);
}

export async function DELETE(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userID = searchParams.get('userID');
    const lotID = searchParams.get('lotID');

    const { error } = await supabase
        .from('lot_owners')
        .delete()
        .match({ user_id: userID, lot_id: lotID });

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Successfully deleted", { status: 200 });
}