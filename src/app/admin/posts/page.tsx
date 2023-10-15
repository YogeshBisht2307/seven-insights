
import { getPosts } from "@/data/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PostTable } from "./post-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const dynamic = "force-dynamic"


export default async function Posts() {
    const supabase = createServerComponentClient({cookies});
    const { data: { session } } = await supabase.auth.getSession();

    if(!session){
        redirect("/login");
    }

    const allPosts = await getPosts();

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold pb-4">Posts</h1>
                <Button><Link href={"/admin/posts/add-post"}>Add Post</Link></Button>
            </div>

            <PostTable posts={allPosts}/>
        </div>
    )
}