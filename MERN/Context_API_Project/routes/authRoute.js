import express from "express";
const router = express.Router();
import {registerController,loginController,testController} from "../controller/authController.js";
import { isAdmin, requireSignin } from "../middilewares/authMiddileware.js";

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test", requireSignin, isAdmin, testController);

export default router;
