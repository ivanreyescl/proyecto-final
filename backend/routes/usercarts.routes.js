
import { Router } from 'express';
import { getUserCart, updateCartItem, addCartItem, removeCartItem } from '../src/controllers/usercartController.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';

const router = Router();

router.get('/user/:user_id/cart', getUserCart);
router.patch('/cart-items/:cart_item_id', updateCartItem);
router.post('/user/:user_id/cart-items', addCartItem);
router.delete('/cart-items/:cart_item_id', removeCartItem);

export default router;