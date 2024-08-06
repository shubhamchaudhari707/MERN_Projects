const express = require("express")
const connectDB = require("./db/conn")
const userRoutes = require("./routes/userRoutes")

const app = express()

connectDB
const port = 5000

app.use(express.json())
app.use("/api/v1", userRoutes)

app.get("/", (req, res)=>{
    res.send("shubham")
})


app.listen(port, ()=>{
    console.log("server is running on localhost 5000")
})



