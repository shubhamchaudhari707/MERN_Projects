const express = require('express')
const connectDB = require('./db/conn')
const dotenv = require("dotenv")
const pizzaRouter  = require('./routes/pizzaRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');

//configure env
dotenv.config();

//reset object
const app  = express();
const port =  5000;


//database
connectDB


//middilewares
app.use(express.json())

//routes
app.use('/api/pizzas', pizzaRouter)
app.use('/api/user', userRouter)
app.use('/api/orders', orderRouter)


// app.get('/', (req, res)=>{
//     res.send("ahdjhg")
// })

app.listen(port, ()=>{
    console.log(`server is running on localhost`)
})


