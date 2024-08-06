import express from 'express';
import connectDB from './db/conn.js';
import dotenv from 'dotenv';
import router from './routes/authRoute.js';
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.port || 5000;

connectDB;

app.use(express.json())
app.use('/api/v1/auth', router)
app.use(cors())

app.get((req, res)=>{
    res.send({
        message:"Welcome to Ecommerce app"
    })
})



app.listen(port, (req, res)=>{
    console.log('server is running on localhost 5000')
})