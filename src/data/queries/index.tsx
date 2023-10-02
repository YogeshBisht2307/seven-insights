import prisma from "@/data/client"

export const getPosts = async () => {
    return await prisma.t_Post.findMany()
}

