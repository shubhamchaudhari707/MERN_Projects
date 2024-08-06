import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import UserModel from "../models/userModels.js"
import jwt from "jsonwebtoken"
import OrderModel from './../models/orderModel.js';


export const registerController = async (req, res)=>{
    try {
        const {name, email, phone, password, address, answer} = req.body;

        if(!name){
            return res.status(400).send({message:"Name is Required "})
        }
        else if (!email) {
            return res.status(400).send({message:"Email is Required"})
        }
        else if (!password) {
            return res.status(400).send({message:"Password is Required"})
        }
        else if (!phone) {
            return res.status(400).send({message:"Phone is Required"})
        }
        else if (!address) {
            return res.status(400).send({message:"Address is Required"})
        }
        else if (!answer) {
            return res.status(400).send({message:"answer is Required"})
        }

        const existingUser  =  await UserModel.findOne({email})

        if (existingUser) {
            return res.status(200).send({
                success:false,
                message:"Already Register please login"
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await UserModel({name, email, phone, address, answer, password:hashedPassword}).save()
        console.log(user)

        res.status(201).send({
            success:true,
            message:"User Register Sucessfully ...",
            user
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registraction"
        })
    }
}


export const loginController = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }

        const user = await UserModel.findOne({email})
        
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(500).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = await jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"})
        console.log("token", token)

        res.status(200).send({
            success:true,
            message:"login sucessfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}


export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Email is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await UserModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await UserModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };


export const testController = async(req, res)=>{
    try {
        res.send("Protected Routes")
    } catch (error) {
        console.log(error)
    }
}

//update profile
export const updateProfileController = async(req, res)=>{
    try {
        const { name, email, password, address, phone } = req.body;

        const user = await UserModel.findById(req.user._id);

        //password
        if (password && password.length < 6) {
          return res.json({ error: "Passsword is required and 6 character long" });
        }
        
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await UserModel.findByIdAndUpdate(req.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        console.log(updatedUser)
        res.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating profile",
            error,
        });
        }
}


//orders 
export const getOrdersController = async (req, res) => {
    try {
      const orders = await OrderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
};

// All orders 
export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await OrderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({createdAt: "-1"})
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await OrderModel.findByIdAndUpdate(orderId,{ status },{ new: true });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };












