const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    imgpath: {
        type: String,

    },
    date: {
        type: Date
    }
});

// create model
const Users = new mongoose.model("users", userSchema);
module.exports = Users;