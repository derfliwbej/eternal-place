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