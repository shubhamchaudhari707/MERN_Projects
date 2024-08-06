const express = require("express");
const router = express.Router();
const {processPayment,sendStripeApiKey} = require("../controller/paymentController.js");
const { isAuthenticatedUser } = require("../middileware/auth");

router.post("/payment/process", isAuthenticatedUser, processPayment);

router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

module.exports = router;