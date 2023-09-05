import bcrypt from "bcrypt";
import authService from "../services/authServices.js";
import path from "path";

const createUser = async (req, res, next) => {
    try {
        const { email, name, nickname, password } = req.body;
        const emailDuplicateCheck = await authService.isEmailTaken(email);
        const nicknameDuplicateCheck = await authService.isNicknameTaken(
            nickname,
        );
        if (emailDuplicateCheck)
            return res
                .status(400)
                .json({ message: "이미 존재하는 이메일입니다." });
        if (nicknameDuplicateCheck)
            return res
                .status(400)
                .json({ message: "이미 존재하는 닉네임입니다." });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await authService.createUser({
            email,
            name,
            nickname,
            password: hashedPassword,
        });
        return res.status(201).json({ message: "회원가입 성공", newUser });
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const loginUser = {
            token: req.token,
            name: req.user.name,
            nickname: req.user.nickname,
        };
        res.status(200).json({ message: "로그인 성공", loginUser });
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

const uploadProfileImage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const imageUrl = path.join("images", req.file.filename);
        const uploadImageUrl = await authService.uploadProfileImage(
            userId,
            imageUrl,
        );
        res.status(201).json(uploadImageUrl);
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

module.exports = { createUser, login, uploadProfileImage };
