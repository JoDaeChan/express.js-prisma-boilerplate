import morgan from "morgan";
import logger from "../config/logger.js";

const morganMiddleware = morgan((tokens, req, res) => {
    const logMessage = `[${tokens.method(req, res)}] ${tokens.url(
        req,
        res,
    )} | ${tokens.status(req, res)} | ${tokens.res(
        req,
        res,
        "content-length",
    )} - ${tokens["response-time"](req, res)} ms | [Response] ${JSON.stringify(
        req.body,
    )}`;

    if (res.statusCode < 400) {
        logger.info(logMessage);
    }
    return null;
});

module.exports = morganMiddleware;
