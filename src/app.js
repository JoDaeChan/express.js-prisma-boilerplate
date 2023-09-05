import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import passport from "passport";
import { local, jwt, kakao } from "./passport";
import swaggerFile from "./config/swagger-output.json";
import swaggerUi from "swagger-ui-express";
import path from "path";

import authRouter from "./routers/authRouter";
import postRouter from "./routers/postRouter";
import commentRouter from "./routers/commentRouter";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerFile, { explorer: true }),
);
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(passport.initialize());
passport.use("local", local);
passport.use("jwt", jwt);
passport.use("kakao", kakao);

/** @description 라우터핸들러 위치  */
app.use(authRouter);
app.use(postRouter);
app.use(commentRouter);

app.use(errorMiddleware);

module.exports = app;
