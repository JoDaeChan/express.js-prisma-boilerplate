import Router from "express";
import multer from "multer";
import authController from "../controllers/authController";
import passportLocal from "../middlewares/passportLocal";
import passportJwt from "../middlewares/passportJwt";
import storage from "../utils/storage";
const upload = multer({ storage });

const authRouter = Router();

/** @description 회원가입 */
authRouter.post("/auth/signup", authController.createUser);

/** @description 로그인 */
authRouter.post("/auth/login", passportLocal, authController.login);

/** @description 프로필 이미지 업로드 */
authRouter.post(
    "/auth/profile-image",
    passportJwt,
    upload.single("profileImage"),
    authController.uploadProfileImage,
);

module.exports = authRouter;
