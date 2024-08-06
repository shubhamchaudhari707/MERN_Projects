import UserModel from "../models/userModels.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      return res.send({ message: "Name is Required " });
    } else if (!email) {
      return res.send({ message: "Email is Required " });
    } else if (!password) {
      return res.send({ message: "Password is Required " });
    } else if (!phone) {
      return res.send({ message: "Phone is Required " });
    } else if (!address) {
      return res.send({ message: "Address is Required " });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new UserModel({name,email,phone,address,password: hashedPassword,}).save();
    console.log(user);

    res.status(201).send({
      success: true,
      message: "User Register Scucessfully ...",
      user,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registraction",
    });
  }
};

// user login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).send({
            success: false,
            message:"Email is not registered"
        })
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    console.log('isPasswordCorrect',isPasswordCorrect)

    if (!isPasswordCorrect) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: "7d"});
    console.log('token - ',token)
    res.status(200).send({
      success: true,
      message: "login sucessfully ",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


export const testController =(req, res)=>{
    try {
        res.send("Protected routes")
    } catch (error) {
        console.log(error)
    }
}