import passport from "passport";
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { secretKey } = require("./jwt.config");

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secretKey,
};

passport.use(
	new JwtStrategy(opts, (jwtPayload, done) => {
		return done(null, jwtPayload); //todo 페이로드값으로 사용자 조회 로직 구현
	}),
);
