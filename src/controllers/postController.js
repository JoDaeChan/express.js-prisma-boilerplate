import postService from "../services/postService";

const createPost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { title, content } = req.body;
        const post = await postService.createPost(userId, title, content);
        return res.status(201).json(post);
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

const getPosts = async (req, res, next) => {
    try {
        const postId = Number(req.query.postId);
        const userId = Number(req.query.userId);
        const page = Number(req.query.page) || null;
        const limit = Number(req.query.limit) || null;
        if (postId) {
            const post = await postService.getPostByPostId(postId);
            if (!post)
                return res
                    .status(404)
                    .json({ message: "존재하지 않는 게시글입니다." });
            return res.status(200).json(post);
        } else if (userId) {
            const posts = await postService.getPostsByUserId(
                userId,
                page,
                limit,
            );
            return res.status(200).json(posts);
        } else {
            const posts = await postService.getAllPosts(page, limit);
            return res.status(200).json(posts);
        }
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const postId = Number(req.params.postId);
        const { title, content } = req.body;
        const post = await postService.getPostByPostId(postId);
        if (!post)
            return res
                .status(404)
                .json({ message: "존재하지 않는 게시글입니다." });
        if (post.authorId !== req.user.id)
            return res
                .status(403)
                .json({ message: "게시글 작성자만 수정할 수 있습니다." });
        const updatedPost = await postService.updatePost(
            postId,
            title,
            content,
        );
        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = Number(req.params.postId);

        const post = await postService.getPostByPostId(postId);
        if (!post)
            return res
                .status(404)
                .json({ message: "존재하지 않는 게시글입니다." });
        if (!(post.authorId === userId || req.user.manager === true))
            return res.status(403).json({ message: "권한이 없습니다." });
        await postService.deletePostAndComments(postId);
        res.status(204).json();
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
