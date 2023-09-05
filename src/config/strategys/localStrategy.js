import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const LocalStrategy = require("passport-local").Strategy;
const prisma = new PrismaClient();

/** @description local 전략*/
const local = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return done(null, false, {
                    message: "이메일 또는 비밀번호가 일치하지 않습니다.",
                });
            }
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                return done(null, false, {
                    message: "이메일 또는 비밀번호가 일치하지 않습니다.",
                });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    },
);
module.exports = local;
