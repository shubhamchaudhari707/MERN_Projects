const ErrorHandler = require("../utils/errorhandler");
const catchAsycError = require("./catchAsycError")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isAuthenticatedUser = catchAsycError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token)

    if (!token) {
        return next(new ErrorHandler("please login to access this resources", 401))
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodeData.id)
    // req.user = decodeData

    next()
})


exports.isAdmin = catchAsycError(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    console.log(user);

    if (user.role === "admin") {
        next()
    } else {
        return res.status(401).send({
            success: false,
            message: "UnAuthorized Access",
        });
    }

})








