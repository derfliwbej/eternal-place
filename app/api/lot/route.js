import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const lotID = searchParams.get('id');

    const { data: lot, errorLot } = await supabase
        .from('lots')
        .select('*')
        .eq('id', lotID)
        .single();

    if (errorLot) {
        console.log(errorLot);
        return new Response("Internal Server Error", { status: 500 });
    }

    const { data: owners, errorOwners } = await supabase.rpc('get_lot_owners', { lotid: lotID });

    if (errorOwners) {
        console.log(errorOwners);
        return new Response("Internal Server Error", { status: 500 });
    }

    const { data: tombs, errorTombs } = await supabase.rpc('get_lot_tomb_deceased', { lotid: lotID });

    if (errorTombs) {
        console.log(errorTombs);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json({ lot, owners, tombs });
}

export async function PUT(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { image_path } = await request.json();

    const { data: { image_path: previous_path }, errorPrevious } = await supabase
        .from('lots')
        .select('image_path')
        .eq('id', id)
        .single();

    if (errorPrevious) {
        console.log(errorPrevious);
        return new Response("Internal Server Error", { status: 500 });
    }

    const { data: lot, errorNew } = await supabase
        .from('lots')
        .update({ image_path })
        .eq('id', id)
        .select()
        .single();

    if (errorNew) {
        console.log(errorNew);
        return new Response("Internal Server Error", { status: 500 });
    }

    if (previous_path) {
        const { _, errorRemove } = await supabase
            .storage
            .from('lot_images')
            .remove([previous_path]);

        if (errorRemove) {
            console.log(errorRemove);
            return new Response("Internal Server Error", { status: 500 });
        }
    }

    return NextResponse.json(lot);
}