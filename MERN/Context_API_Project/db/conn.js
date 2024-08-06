import mongoose from "mongoose";

const baseurl = "mongodb+srv://shubham:shubham@cluster0.68eabju.mongodb.net/?retryWrites=true&w=majority";
// const baseurl = process.env.url;

const connectDB = mongoose.connect(baseurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection sucessful");
  })
  .catch((error) => {
    console.log("no connection");
    console.log(error);
  });

export default connectDB;
