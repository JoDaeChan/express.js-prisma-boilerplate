import passport from "passport";
import generateJwt from "../utils/generateJwt";

/** @description local 전략을 사용해 사용자를 인증하고 JWT 토큰 발급 */
const passportLocal = (req, res, next) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
        if (error) {
            console.error(error);
            return next(error);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        const tokenExpires = process.env.JWT_TOKEN_EXPIRES;
        const token = generateJwt(
            {
                id: user.id,
                name: user.name,
                nickname: user.nickname,
                email: user.email,
            },
            secretKey,
            tokenExpires,
        );

        req.user = user;
        req.token = token;
        next();
    })(req, res, next);
};

module.exports = passportLocal;
