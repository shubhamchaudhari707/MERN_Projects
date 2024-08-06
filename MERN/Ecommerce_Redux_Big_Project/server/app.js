const express = require("express")
const app = express()
const errorMiddileware = require("./middileware/Error")
const coockieParser = require("cookie-parser")
const dotenv = require("dotenv")

//config
dotenv.config()

//routes
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoute")
const paymentRoute = require("./routes/paymentRoute")

app.use(express.json());
app.use(coockieParser());

app.use("/api/v1", productRoutes)
app.use("/api/v1", userRoutes)
app.use("/api/v1", orderRoutes)
app.use("/api/v1", paymentRoute)


app.use(errorMiddileware)

module.exports = app

