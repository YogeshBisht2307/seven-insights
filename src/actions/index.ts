"use server"

import { updatePostStatus, softDeletePostById } from "@/data/queries"


export const updatePostStatusAction = async (id: string, published: boolean) => {
    try {
        await updatePostStatus(id, { published: published });
        return 200;
    } catch {
        return 500;
    }
}

export const deletePostByIdAction = async (id: string) => {
    try {
        await softDeletePostById(id);
        return 200;
    } catch {
        return 500;
    }
}
