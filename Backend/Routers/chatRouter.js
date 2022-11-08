import express from 'express'
import { createChat, userChats, findChat } from '../Controller/chatController.js';
const router = express.Router()

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

export default router