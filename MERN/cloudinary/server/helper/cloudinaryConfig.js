const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: "devdzxxnt",
    api_key: "529657898878272",
    api_secret: "cHl9KPn6hYeBtAQ791PVp1ustWw"
});

module.exports = cloudinary