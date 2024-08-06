const app = require("./app")
const dotenv = require("dotenv")
const connectDB = require("./db/conn")


//config
dotenv.config()
const port = process.env.PORT || 5000;

// connection db 
connectDB;


app.listen(port, ()=>{
    console.log("server is working on localhost 5000")
})







