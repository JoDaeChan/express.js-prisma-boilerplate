import logger from "../config/logger.js";
function errorMiddleware(error, req, res, next) {
    /** @description 사용 설명
     * 간혹 상태코드가 없는 에러가 에러미들웨어로 오게 되면
     * RangeError: Invalid status code: undefined 발생함
     * 그럴 때 아래 코드를 주석처리하고, res.json(error.message)를 사용 후 다시 원상복귀*/
    res.status(error.status).send(error.message);
    // res.json(error.message);

    const stackLines = error.stack.split("\n");
    const truncatedStack = stackLines.slice(0, 5).join("\n");
    const reqBodyString = JSON.stringify(req.body);
    logger.error(
        `[${req.method}] ${req.path} | ${error.status} | [REQUEST] ${reqBodyString} | ${truncatedStack}`,
    );
}
module.exports = errorMiddleware;
