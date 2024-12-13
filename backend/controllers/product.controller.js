import mongoose from 'mongoose';
import Product from '../models/product.model.js'

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log("can't able to get products");
        res.status(500).json({success:false,message:" server error"})
    }
};

export const createProduct = async (req,res)=>{
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
};

export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"invalid user"});
    }

    try {
        const updatedProduct =  await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedProduct});
    } catch (error) {
        res.status(404).json({success:false,message:"server error"});
    }
};

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"invalid user"});
    }

    try {
        await Product.findByIdAndDelete(id); 
        res.status(200).json({success:true,message:"product deleted successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:"server error"});
    }
};