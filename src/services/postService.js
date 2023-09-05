const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPost = async (userId, title, content) => {
    try {
        const postData = {
            author: { connect: { id: userId } },
            title,
            content,
        };
        return await prisma.post.create({
            data: postData,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getPostByPostId = async (postId) => {
    try {
        return await prisma.post.findUnique({
            where: { id: postId },
            include: {
                comment: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getPostsByUserId = async (userId, page, limit) => {
    try {
        const totalPostsCount = await prisma.post.count({
            where: { authorId: userId },
        });
        const totalPages = Math.ceil(totalPostsCount / limit);
        const offset =
            page !== null && limit !== null
                ? { skip: (page - 1) * limit, take: limit }
                : {};

        const posts = await prisma.post.findMany({
            where: { authorId: userId },
            include: {
                comment: true,
            },
            ...offset,
        });
        return { posts, currentPage: page, totalPages: totalPages };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllPosts = async (page, limit) => {
    try {
        const totalPostsCount = await prisma.post.count();
        const totalPages = Math.ceil(totalPostsCount / limit);
        const offset =
            page !== null && limit !== null
                ? { skip: (page - 1) * limit, take: limit }
                : {};
        const posts = await prisma.post.findMany({
            include: {
                comment: true,
            },
            ...offset,
        });

        return { posts, currentPage: page, totalPages: totalPages };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updatePost = async (postId, title, content) => {
    try {
        return await prisma.post.update({
            where: { id: postId },
            data: { title, content },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deletePostAndComments = async (postId) => {
    await prisma.comment.deleteMany({
        where: { postId: postId },
    });
    await prisma.post.delete({
        where: { id: postId },
    });
};

module.exports = {
    createPost,
    getPostByPostId,
    getPostsByUserId,
    getAllPosts,
    updatePost,
    deletePostAndComments,
};
