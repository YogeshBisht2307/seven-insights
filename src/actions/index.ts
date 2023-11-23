"use server"

import { updatePostStatus } from "@/data/queries"


export const updatePostStatusAction = async (id: string, published: boolean) => {
    try {
        await updatePostStatus(id, { published: published})
        return 200
    } catch {
        return 500
    }
}