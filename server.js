import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';



const app = express();

app.use(bodyParser.json());

//.env setup
config({path: '.env'});

//user router
app.use('/api/user', userRouter);

//Product router
app.use('/api/product', productRouter)

//Cart routes
app.use('/api/cart',cartRouter);

//home Routes
app.get('/', (req, res)=> {
  res.json({Message: "Welcome too the Homepage"});
});



mongoose.connect(process.env.MONGO_URL, {
  dbName: "E_Commerce_API",
}).then(()=> console.log("MongoDb connnected successfully")).catch((error)=> console.log(error.message));

const port = process.env.PORT;
app.listen(port, ()=> console.log(`Server is running on localhost:${port}`));