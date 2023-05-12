import { createClient } from "@/utils/supabase-server";
import { createAdminClient } from "@/utils/supabase-server-admin";
import { NextResponse } from "next/server";

export async function POST(request) {
    const supabaseServer = createClient();
    const supabaseAdmin = createAdminClient();

    const { data: { session }, } = await supabaseServer.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true,
        user_metadata: {
            first_name: body.first_name,
            middle_name: body.middle_name,
            last_name: body.last_name,
            address: body.address,
            contact_num: body.contact_num,
            admin_role: body.admin_role
        }
    });

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return NextResponse.json({
        id: data.user.id,
        email: data.user.email,
        first_name: data.user.user_metadata.first_name,
        middle_name: data.user.user_metadata.middle_name,
        last_name: data.user.user_metadata.last_name,
        address: data.user.user_metadata.address,
        contact_num: data.user.user_metadata.contact_num,
        admin_role: data.user.user_metadata.admin_role
    });
}