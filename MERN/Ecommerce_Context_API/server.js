import express from 'express';
import connectDB from './db/conn.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import dotenv from 'dotenv';
import cors from 'cors';

//configure env
dotenv.config();

//rest object
const app = express();
const port = process.env.port || 5000;

//database confog
connectDB

//middilewares
app.use(cors())
app.use(express.json())

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


app.listen(port, ()=>{
    console.log('server is running on localhost 5000')
})




