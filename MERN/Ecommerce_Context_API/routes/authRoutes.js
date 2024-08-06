import express from "express";
const router = express.Router();

import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from "../controller/authController.js";
import { isAdmin, requireSignin } from "../middilewares/authMiddileware.js";

//Register || Method POST
router.post("/register", registerController);

//Login || Method POST
router.post("/login", loginController);

// forgot password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignin, isAdmin, testController);

//Protected route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Admin Route
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//updated Profile
router.put("/profile", requireSignin, updateProfileController);

// orders
router.get('/orders', requireSignin, getOrdersController);

//All orders
router.get('/all-orders', requireSignin, isAdmin, getAllOrdersController);

//order status update
router.put('/order-status/:orderId', requireSignin, isAdmin, orderStatusController)

export default router;














