const KakaoStrategy = require("passport-kakao").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const kakaoOptions = {
	clientID: process.env.KAKAO_ID,
	callbackURL: "/auth/kakao/callback",
};

const kakao = new KakaoStrategy(
	kakaoOptions,
	async (accessToken, refreshToken, profile, done) => {
		try {
			const exUser = await prisma.user.findUnique({
				where: {
					snsId: profile.id,
				},
			});
			if (exUser) {
				done(null, exUser);
			} else {
				const newUser = await prisma.user.create({
					data: {
						nickname: profile.displayName,
						snsId: profile.id,
						snsProvider: "kakao",
					},
				});
				done(null, newUser);
			}
		} catch (error) {
			console.error(error);
			done(error);
		}
	},
);

module.exports = kakao;
