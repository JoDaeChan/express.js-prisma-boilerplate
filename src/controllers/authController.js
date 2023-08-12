import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
const dbConfig = require("../config/db.config");
const {
	secret,
	expiresIn,
	refreshSecret,
	refreshExpiresIn,
} = require("../config/jwt.config");

exports.join = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const connection = await mysql.createConnection(dbConfig);
		const hashedPassword = await bcrypt.hash(password, 10);

		await connection.execute(
			"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			[name, email, hashedPassword],
		);
		await connection.end();
		res.status(201).json({ message: "회원가입 성공" });
	} catch (err) {
		next(err.status(500).json({ message: "회원가입 실패" }));
	}
};
exports.login = async (req, res, next) => {
	//todo 로그인 로직 인증 구현하거라

	const accessToken = jwt.sign({ userid: user.id }, secret, { expiresIn });
	const refreshToken = jwt.sign({ userid: user.id }, refreshSecret, {
		expiresIn: refreshExpiresIn,
	});
	res.json({ accessToken, refreshToken });
};
exports.refresh = async (req, res, next) => {
	//todo 리프레시 토큰 갱신 로직 구현해라
};
exports.logout = async (req, res, next) => {
	res.json({ message: "통신성공" });
};
