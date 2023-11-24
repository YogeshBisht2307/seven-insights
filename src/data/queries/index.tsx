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
        },
        where: { deleted: false }
    });
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
    });
}

export const getCategories = async () => {
    return await prisma.t_Category.findMany({
        select: {
            id: true,
            name: true,
            slug: true
        }
    });
}

export const softDeletePostById = async (id: string) => {
    return await prisma.t_Post.update({
        where: { id: id },
        data: { deleted: true }
    });
}

export const hardDeletePostById = async (id: string) => {
    return await prisma.t_Post.delete({
        where: { id: id }
    });
}
