import { createClient } from "@/utils/supabase-server";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userID = session.user.id;

    const { searchParams } = new URL(request.url);
    const lotID = parseInt(searchParams.get('id'));

    const { data: lots, error } = await supabase.rpc('get_available_lots', { uid: userID });

    const lotForPayment = lots.find(lot => lot.id === lotID);

    if(!lotForPayment) {
        return new Response("Lot not found. Either you already have an ongoing transaction for this lot, you do not own this lot, the lot already has a light, or you do own the lot but there are no tombs available for lighting.", {
            status: 500
        });
    }

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json(lotForPayment);
}

export async function POST(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userID = session.user.id;

    const { searchParams } = new URL(request.url);
    const lotID = parseInt(searchParams.get('id'));

    const { data: lots, error1 } = await supabase.rpc('get_available_lots', { uid: userID });

    const lotForPayment = lots.find(lot => lot.id === lotID);

    if(!lotForPayment) {
        return new Response("Lot not found. Either you already have an ongoing transaction for this lot, you do not own this lot, the lot already has a light, or you do own the lot but there are no tombs available for lighting.", {
            status: 500
        });
    }

    if (error1) {
        console.log(error1);
        return new Response("Internal Server Error", { status: 500 });
    }

    const { data: transaction, error2 } = await supabase
        .from('transaction')
        .insert({
            user_id: userID,
            lot_id: lotForPayment.id,
            date_created: dayjs(Date()).format('YYYY-MM-DD'),
            amount: lotForPayment.tomb_count * 500,
            status: 'Paid',
            reference_num: Math.random().toString().substring(2, 13)
        })
        .select()
        .single();
    
    if (error2) {
        console.log(error2);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json(transaction);
}