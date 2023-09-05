const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
import fs from "fs";

const isEmailTaken = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return !!user;
};

const isNicknameTaken = async (nickname) => {
    const user = await prisma.user.findUnique({
        where: {
            nickname,
        },
    });
    return !!user;
};

const createUser = async (userData) => {
    return prisma.user.create({
        data: userData,
    });
};

const uploadProfileImage = async (userId, imageUrl) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("유저를 찾을 수 없습니다.");
        }
        if (user.profileImage) {
            const absoluteImagePath = path.join(
                __dirname,
                "../..",
                "public",
                user.profileImage,
            );
            fs.unlinkSync(absoluteImagePath);
        }
        await prisma.user.update({
            where: { id: userId },
            data: { profileImage: imageUrl },
        });
        return imageUrl;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    isEmailTaken,
    isNicknameTaken,
    createUser,
    uploadProfileImage,
};
