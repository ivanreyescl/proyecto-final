import { Router } from 'express';
import { 
  getUserFavorite, 
  updateFavoriteItem, 
  addFavoriteItem, 
  removeFavoriteItem 
} from '../src/controllers/userfavoriteController.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';

const router = Router();

router.get('/user/:user_id/favorite', verifyToken, getUserFavorite);
router.patch('/favorite-items/:favorite_item_id', verifyToken, updateFavoriteItem);
router.post('/user/:user_id/favorite-items', verifyToken, addFavoriteItem);
router.delete('/favorite-items/:favorite_item_id', verifyToken, removeFavoriteItem);

export default router;