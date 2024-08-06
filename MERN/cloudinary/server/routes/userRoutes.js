const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloud = require("../helper/cloudinaryConfig");
const moment = require("moment");
const Users = require("../models/userSchema");

// img storage path
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        callback(null, `image-${file.originalname}`)
    }
});

// img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("only images is allow"))
    }
}

const upload = multer({
    storage: imgconfig,
    // fileFilter: isImage
})


// user register
router.post("/register", upload.single("photo"), async (req, res) => {
    try {
        const upload = await cloud.uploader.upload(req.file.path);

        const { name } = req.body;

        const date = moment(new Date()).format("YYYY-MM-DD");

        const userdata = new Users({
            name: name,
            imgpath: upload.secure_url,
            date: date
        });
        console.log(userdata)

        await userdata.save();
        res.status(200).json(userdata);
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }


});


// user data get
router.get("/getdata", async (req, res) => {
    try {
        const getUser = await Users.find();
        res.status(200).json(getUser);

    } catch (error) {
        res.status(400).json(error)

    }
})


module.exports = router;