const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsycError = require("../middileware/catchAsycError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")



//Register a user
exports.registerUser = catchAsycError(async (req, res, next) => {
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "this is a sample id",
        url: "this is a sample url",
      },
    });
    console.log(user)
    sendToken(user, 201, res);
  });


//login 
exports.loginController = catchAsycError(async (req, res, next) => {

    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);

})


//logout 
exports.logout = catchAsycError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
})


//forgott password
exports.forgotPassword = catchAsycError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404))
    }

    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // const resetPasswordurl =  `http://localhost:5000/api/v1/password/reset/${resetToken}`
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;
    console.log(resetPasswordUrl)
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it. temp`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})


// Reset Password
exports.resetPassword = catchAsycError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }, });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not matched", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})


//Get USer Deatils (who is login only for get to access)
exports.getUserDetails = catchAsycError(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).send({
        success: true,
        user
    })
})


//update user password
exports.updateUserPassword = catchAsycError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

})


//update user profile 
exports.updateUserProfile = catchAsycError(async (req, res, next)=>{
    const newUserdata = {
        name:req.body.name,
        email:req.body.email,
    }

    const user  = await User.findByIdAndUpdate(req.user.id, newUserdata, {new:true})
    console.log("user", user)

    res.status(200).send({
        success:true
    })

})


//Get all users -- Admin
exports.getAllUsers = catchAsycError(async (req, res, next)=>{
    const users = await User.find()

    res.status(200).send({
        success:true,
        users
    })
})


//Get single user -- Admin
exports.getSingleUser = catchAsycError(async (req, res, next)=>{
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler("user does not exist with id", req.params.id))
    }

    res.status(200).send({
        success:true,
        user
    })
})


// update User Role -- Admin
exports.updateUserRole = catchAsycError(async (req, res, next) => {

    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {new: true});
  
    res.status(200).json({
      success: true,
    });
  });
  


// delete user -- Admin
exports.deleteUser = catchAsycError(async (req, res, next)=>{

    const user  = await User.findByIdAndDelete(req.params.id)
    console.log(user)

    if (!user) {
        return next(new ErrorHandler("user does not exist with id", req.params.id))
    }

    res.status(200).send({
        success:true,
        message:"deleted user sucessfully"
    })

})


