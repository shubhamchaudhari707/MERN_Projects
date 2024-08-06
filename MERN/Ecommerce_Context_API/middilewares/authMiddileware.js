import jwt from "jsonwebtoken";
import UserModel from "../models/userModels.js";

export const requireSignin = async (req, res, next) => {
  try {
    const decode = await jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
    // console.log("req.user ", req.user);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    console.log(user);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
    
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Admin middileware",
      error,
    });
  }
};
