import express from 'express';
import { create, getAll, remove } from '../controllers/bookmark.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/create',protectRoute,create)
router.get('/all', protectRoute, getAll);
router.delete('/:id', protectRoute, remove);

export default router;