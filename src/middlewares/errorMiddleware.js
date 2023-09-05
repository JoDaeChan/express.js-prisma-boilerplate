import logger from "../config/logger.js";
function errorMiddleware(error, req, res, next) {
	if (error.status) res.status(error.status).send(error.message);
	else res.status(500).send("서버 에러");

	const stackLines = error.stack.split("\n");
	const truncatedStack = stackLines.slice(0, 5).join("\n");
	const reqBodyString = JSON.stringify(req.body);
	logger.error(
		`[${req.method}] ${req.path} | ${error.status} | [REQUEST] ${reqBodyString} | ${truncatedStack}`,
	);
}
module.exports = errorMiddleware;
