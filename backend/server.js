import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'

const app  = express();
dotenv.config();

app.use(express.json()) // allows us to accept json data in req.body

app.use('/api/products',productRoutes)

app.listen(5000, ()=>{
    connectDB();
    console.log('server started listening @ http://localhost:5000');
})