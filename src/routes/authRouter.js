import { Router } from "express";
// import AuthController from "../controllers/authController";
import authValidate from "../config/joiSchema/authValidate";
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.post("auth/join", authValidate.join, authController.join);
//todo 토큰 발급할 때 페이로드 뭐할지 잘 생각
authRouter.post("auth/login", /*조이랑 패스포트 넣어라*/ authController.login);
authRouter.post("auth/refresh", /*조이 넣어라*/ authController.refresh);
authRouter.post("auth/logout", /*조이 넣어라*/ authController.logout);

module.exports = authRouter;
