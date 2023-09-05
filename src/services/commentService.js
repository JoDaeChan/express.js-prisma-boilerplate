const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createComment = async (userId, postId, parentId, content) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { nickname: true },
        });
        if (!user) throw new Error("유저가 없습니다.");

        const comment = await prisma.comment.create({
            data: {
                content,
                authorId: userId,
                postId: parseInt(postId),
                parentId: parentId,
            },
        });
        return { ...comment, nickname: user.nickname };
    } catch (error) {
        console.error(error);
        throw error(error);
    }
};

const getCommentById = async (commentId) => {
    try {
        return prisma.comment.findUnique({ where: { id: commentId } });
    } catch (error) {
        console.error(error);
        throw error(error);
    }
};

const updateComment = async (commentId, content) => {
    try {
        return prisma.comment.update({
            where: { id: commentId },
            data: { content },
        });
    } catch (error) {
        console.error(error);
        throw error(error);
    }
};

const getCommentAndChildById = async (commentId) => {
    try {
        return prisma.comment.findUnique({
            where: { id: commentId },
        });
    } catch (error) {
        console.error(error);
        throw error(error);
    }
};

const deleteCommentAndChild = async (commentId) => {
    try {
        const childComments = await prisma.comment.findMany({
            where: { parentId: commentId },
        });
        for (const childComment of childComments) {
            await deleteCommentAndChild(childComment.id);
        }
        await prisma.comment.delete({
            where: { id: commentId },
        });
    } catch (error) {
        console.error(error);
        throw error(error);
    }
};

module.exports = {
    createComment,
    getCommentById,
    updateComment,
    getCommentAndChildById,
    deleteCommentAndChild,
};
