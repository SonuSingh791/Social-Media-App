import express from 'express';
import { commentPost, createPost, deletePost, getPost, getTimeLinePosts, likePost, updatePost } from '../Controller/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.put('/:id/comment', commentPost);
router.get('/:id/timeline', getTimeLinePosts);

export default router;