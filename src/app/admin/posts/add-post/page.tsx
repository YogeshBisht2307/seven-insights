
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddPostForm from "./add-post-form";
import { getCategories } from "@/data/queries";


export const dynamic = "force-dynamic"


export default async function AddPost() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    const categorEntities = await getCategories();
    return (
        <div>
            <div>
                <h1 className="text-2xl font-semibold pb-4">Add Post</h1>
                <ul className=" list-inside text-muted-foreground text-sm">
                    <li className="flex items-center py-1">
                        <svg className="w-3.5 h-3.5 mr-2 text-primary flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        Use a clear and engaging writing style. Write in a way that is easy to understand.
                    </li>
                    <li className="flex items-center py-1">
                        <svg className="w-3.5 h-3.5 mr-2 text-primary flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        Use short paragraphs and subheadings to break up the text and make it easy to read.
                    </li>
                    <li className="flex items-center py-1">
                        <svg className="w-3.5 h-3.5 mr-2 text-primary flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        Write a strong headline that accurately reflects the content of the article and grabs the reader&apos;s attention.
                    </li>
                </ul>
            </div>
            <div className="mt-8">
                <AddPostForm categories={categorEntities} />
            </div>
        </div>
    )
}