"use client";

import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { useSupabase } from "./supabase-provider";

const Context = createContext({
    user: null,
    error: null,
    isLoading: true,
    mutate: null,
    signOut: async () => {},
    signInWithEmail: async (email, password) => null
});

export default function SupabaseAuthProvider({ serverSession, children }) {
    const { supabase } = useSupabase();
    const pathname = usePathname();
    const router = useRouter();

    const getUser = async () => {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", serverSession?.user?.id)
            .single();

        if (error) {
            console.log(error);
            return null;
        } else {
            return user;
        }
    };

    const { data: user, error, isLoading, mutate, } = useSWR(serverSession ? "profile-context" : null, getUser);

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const signInWithEmail = async(email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return error.message;
        }

        return null;
    };

    useEffect(() => {
        const { data: { subscription }, } = supabase.auth.onAuthStateChange( (event, session) => {
            if(session?.access_token !== serverSession?.access_token) {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [router, supabase, serverSession?.access_token]);

    const exposed = {
        user,
        error,
        isLoading,
        mutate,
        signOut,
        signInWithEmail
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
    let context = useContext(Context);
    if (context === undefined) {
        throw new Error("useAuth must be used inside SupabaseAuthProvider");
    } else {
        return context;
    }
}