import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import loggerMiddleware from "./middleware/loggerMiddleware";
import authRouter from "./routes/authRouter";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(loggerMiddleware);

// 라우터 핸들러 작성하는곳
app.use(authRouter);

app.use(errorMiddleware);

module.exports = app;
