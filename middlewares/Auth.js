import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header('Auth');
    if(!token) return res.json({message: "Access Denied: login  first"});
    const verified = jwt.verify(token, process.env.JWT);
    const id = verified.userId;
    let user = await User.findById(id);
    if(!user) return res.json({message: "User not found"});
    req.user = user;
    next();
  } catch (error) {
    res.json({message: error.message});
  }
}