const mongoose = require("mongoose");

const baseurl = `mongodb+srv://shubham:shubham@cluster0.x1ulj3c.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = mongoose
  .connect(baseurl, {
    
  }).then(() => {
    console.log("connection sucessful *** ");
  }).catch((error) => {
    console.log(error);
  });

module.exports = connectDB;
