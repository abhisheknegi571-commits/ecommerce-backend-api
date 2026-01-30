import { User } from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//user register
export const register = async (req, res)=> {
  const {name, email, password} = req.body;
  let user = await User.findOne({email});
  if(user) return res.json({message: "Email already used", success: false});
  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashPassword
  });
  res.json({message: "User register successfully", user, success: true});
}

//user login
export const login = async (req, res)=> {
  const {email, password} = req.body;
  let user = await User.findOne({email});
  if(!user) return res.json({message: "User does not exist", success: false});
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid) return res.json({message: "Invalid password", success: false});
  const token = jwt.sign({userId: user._id}, process.env.JWT, {expiresIn: '1d'}); 
  res.json({message: "Login successful", user, token, success: true});
}