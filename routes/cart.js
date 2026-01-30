import express from 'express';
import { addToCart, clearCart, getUserCart, removeProductFromCart } from '../controllers/cart.js';
import { isAuthenticated } from '../middlewares/Auth.js';

const router = express.Router();

//add to cart
//@api: /api/cart/add
router.post('/add',isAuthenticated, addToCart);

//get user cart
//@api: /api/cart/userCart
router.get('/userCart', isAuthenticated, getUserCart);

//remove from the cart
//@api: /api/cart/remove
router.delete('/remove/:productId', isAuthenticated, removeProductFromCart);

//clear the cart
//@api: /api/cart/clear
router.delete('/clear', isAuthenticated, clearCart);

export default router;