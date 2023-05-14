import { createClient } from "@/utils/supabase-server";

export async function PUT(request) {
    const supabase = createClient();
    
    const { data: { session }, } = await supabase.auth.getSession();

    if(!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { password } = await request.json();

    const { user, error } = await supabase.auth.updateUser({ password });

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return new Response("Successfully updated password", { status: 200 });
}