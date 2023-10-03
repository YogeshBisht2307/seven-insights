import prisma from "@/data/client"

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

