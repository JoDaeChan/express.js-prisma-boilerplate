import commentService from "../services/commentService";

const createComment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = Number(req.query.postId);
        const parentId = Number(req.query.parentId) || null;
        const content = req.body.content;

        const newComment = await commentService.createComment(
            userId,
            postId,
            parentId !== undefined ? parentId : null,
            content,
        );
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const commentId = Number(req.params.commentId);
        const { content } = req.body;
        console.log(content);
        const comment = await commentService.getCommentById(commentId);
        if (!comment) return res.status(404).json({ message: "댓글 없음" });
        if (comment.authorId !== userId)
            return res.status(403).json({ message: "권한 없음" });

        const updatedComment = await commentService.updateComment(
            commentId,
            content,
        );
        res.status(201).json(updatedComment);
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const commentId = Number(req.params.commentId);
        const comment = await commentService.getCommentAndChildById(commentId);
        if (!comment)
            return res
                .status(404)
                .json({ message: "댓글을 찾을 수 없습니다." });
        if (!(comment.authorId === userId || req.user.manager === true))
            return res.status(403).json({ message: "권한이 없습니다." });

        await commentService.deleteCommentAndChild(commentId);
        return res.status(204).json();
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

module.exports = { createComment, updateComment, deleteComment };
