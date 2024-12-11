import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

const app  = express();
dotenv.config();

app.use(express.json()) // allows us to accept json data in req.body

app.post('/api/products', async (req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        res.status(400).json({success:false,message:"all fields need to be filled"})
    }

    const newProduct = Product(product);

    try {
        await newProduct.save();
        res.status(200).json({success:true,data:newProduct});
    } catch (error) {
        console.log("error in creating newproduct:", error.message);
        res.status(500).json({success:false,message:"server-error"})
    }
})

app.listen(5000, ()=>{
    connectDB();
    console.log('server started listening @ http://localhost:5000');
})