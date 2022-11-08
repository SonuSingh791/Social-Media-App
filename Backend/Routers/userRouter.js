// index.js -----------------------> Routes ------------------------------------> Controller
// (starting point of app)         (authRouter, userRouter, postRouter)         (authController, userController, postController)

import express from 'express';
import { deleteUser, followUser, getAllUsers, getUser, unFollowUser, updateUser } from '../Controller/userController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';
const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, unFollowUser);
export default router;