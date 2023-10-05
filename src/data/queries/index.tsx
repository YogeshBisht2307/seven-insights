import prisma from "@/data/client"
import { UpdatePostStatusType } from "@/types/props"


export const getPosts = async () => {
    return await prisma.t_Post.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            published: true
        }
    })
}

export const updatePostStatus = async (
    id: string,
    data: UpdatePostStatusType
) => {
    return await prisma.t_Post.update({
        where: {
          id: id,
        },
        data: data,
    })
}