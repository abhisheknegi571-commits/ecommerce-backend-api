import {Cart} from '../models/Cart.js';


//add to cart
export const addToCart = async (req, res) => {
  const {productId, title, quantity, price} = req.body;
  const userId = req.user._id;
  let cart = await Cart.findOne({userId});
  if(!cart){
    cart = new Cart({userId, items: []});
  }
  const itemIndex = cart.items.findIndex((item) => item.productId.toString() == productId);
  if(itemIndex > -1){
    cart.items[itemIndex].quantity += quantity;
    cart.items[itemIndex].price += (quantity * price);
  }else {
    cart.items.push({productId, title, quantity, price});
  }
  await cart.save();
  res.json({message: "Item added to cart", cart, success: true});
}

//get user cart
export const getUserCart = async (req, res) => {
  const userId = req.user._id;
  let cart = await Cart.findOne({userId});
  if(!cart){
    return res.json({message: "cart is empty"});
  }
  res.json({message: "User cart fetched successfully", cart, success: true});
}

//remove product from the cart
export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id;
  let cart = await Cart.findOne({userId});
  if(!cart) {
    res.json({message: "Cart not found"});
  }
  cart.items = cart.items.filter((item)=> item.productId.toString() !== productId);
  await cart.save();
  res.json({message: "Product have been successfully remove from the cart", success: true});
}

//clear cart
export const clearCart = async (req, res) => {
  const userId = req.user._id;
  let cart = await Cart.findOne({userId});
  if(!cart){
    cart = new Cart({userId, items: []});
  }
  cart.items = [];
  await cart.save();
  res.json({message: "Cart cleared successfully", cart, success: true});
}