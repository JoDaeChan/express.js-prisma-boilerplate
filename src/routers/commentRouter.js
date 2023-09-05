import Router from "express";
import passportJwt from "../middlewares/passportJwt";
import commentController from "../controllers/commentController";

const commentRouter = Router();

/** @description 댓글 작성 */
commentRouter.post("/comment", passportJwt, commentController.createComment);

/** @description 댓글 수정 */
commentRouter.put(
    "/comment/:commentId",
    passportJwt,
    commentController.updateComment,
);

/** @description 댓글 삭제 */
commentRouter.delete(
    "/comment/:commentId",
    passportJwt,
    commentController.deleteComment,
);

module.exports = commentRouter;
