import { Router } from "express";
import { createPost, deletePost, getAllPosts, updatePost } from "../controllers/post.controller.js";
import { createLike, deleteLike } from "../controllers/like.controller.js";

const postRoute = Router()

postRoute.get('/', getAllPosts)
postRoute.post('/:id/like', createLike)
postRoute.delete('/:id/like', deleteLike)
postRoute.post('/', createPost)
postRoute.delete('/:id', deletePost)
postRoute.put('/:id', updatePost)

export default postRoute