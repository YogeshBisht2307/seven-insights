import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"


export default async function Categories() {
    const supabase = createServerComponentClient({cookies});
    const { data: { session } } = await supabase.auth.getSession();

    if(!session){
        redirect("/login");
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold pb-4">Categories</h1>
        </div>
    )
}