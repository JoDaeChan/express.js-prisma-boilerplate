import Router from "express";
import passportJwt from "../middlewares/passportJwt";
import postController from "../controllers/postController";

const postRouter = Router();

/** @description 게시글 작성 */
postRouter.post("/post", passportJwt, postController.createPost);

/** @description 게시글 조회 */
postRouter.get("/post", postController.getPosts);

/** @description 게시글 수정 */
postRouter.put("/post/:postId", passportJwt, postController.updatePost);

/** @description 게시글 삭제 */
postRouter.delete("/post/:postId", passportJwt, postController.deletePost);

module.exports = postRouter;
