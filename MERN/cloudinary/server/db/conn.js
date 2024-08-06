const mongoose = require("mongoose");

const DB = "mongodb+srv://shubham:shubham@cluster0.qaphhhr.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB, {

}).then(() => console.log("database connected")).catch((error) => console.log("error", error))