import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supabase = createClient();

    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userID = session.user.id;

    const { searchParams } = new URL(request.url);
    const lotID = searchParams.get('id');

    const { data: user, error1 } = await supabase.rpc('check_user_owns_lot', { uid: userID, lotid: lotID });

    if (user.length === 0) return new Response("You are forbidden from accessing this resource", { status: 403 });

    if (error1) {
        console.log(error1);
        return new Response("Internal Server Error", { status: 500 });
    }

    const { data: lot, error2 } = await supabase
        .from('lots')
        .select('*')
        .eq('id', lotID)
        .single();

    if (error2) {
        console.log(error2);
        return new Response("Internal Server Error", { status: 500 });
    }

    const { data: deceased, error3 } = await supabase.rpc('user_get_lot_deceased', { lotid: lotID });

    if (error3) {
        console.log(error3);
        return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json({ ...lot, deceased_list: deceased });
}