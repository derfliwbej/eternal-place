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
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
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

export async function DELETE(request) {
    const supabaseServer = createClient();
    const supabaseAdmin = createAdminClient();

    const { data: { session }, } = await supabaseServer.auth.getSession();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Successfully deleted user", { status: 200 });
}

export async function PUT(request) {
    const supabaseServer = createClient();
    const supabaseAdmin = createAdminClient();
    
    const { data: { session }, } = await supabaseServer.auth.getSession();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const {
        first_name,
        middle_name,
        last_name,
        address,
        contact_num,
        admin_role
    } = await request.json();

    const { data, error } = await supabaseServer.from('users').update(
        { first_name, middle_name, last_name, address, contact_num, admin_role }
    ).match({ id });

    if (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Successfully updated user", { status: 200 });
}