const mongoose = require("mongoose");

const baseurl = "mongodb+srv://shubham:shubham@cluster0.ibh72ep.mongodb.net/?retryWrites=true&w=majority"

const connectDB =  mongoose.connect(baseurl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connection sucessful *** ")
}).catch((error)=>{
    console.log(error)
})


module.exports = connectDB;






