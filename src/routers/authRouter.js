// import passport from "passport";
import Router from "express";
import multer from "multer";
import authController from "../controllers/authController";
import passportLocal from "../middlewares/passportLocal";
import passportJwt from "../middlewares/passportJwt";
import storage from "../utils/storage";
const upload = multer({ storage });
const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
authRouter.post("/auth/signup", authController.createUser);

authRouter.post("/auth/login", passportLocal, authController.login);

authRouter.post(
	"/auth/profile-image",
	passportJwt,
	upload.single("profileImage"),
	authController.uploadProfileImage,
);

// authRouter.get("/kakao", passport.authenticate("kakao"));
// authRouter.get("/callback", authController.kakaoCallback);

module.exports = authRouter;
