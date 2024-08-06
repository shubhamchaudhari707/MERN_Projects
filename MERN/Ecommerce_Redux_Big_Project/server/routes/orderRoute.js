const express = require("express")
const router = express.Router()
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController")
const { isAuthenticatedUser, isAdmin } = require("../middileware/auth")


// add new order
router.post("/order/new", isAuthenticatedUser, newOrder)

// get single order -- Admin
router.get("/order/:id", isAuthenticatedUser, getSingleOrder)

// my orders -- Users
router.get("/orders/me", isAuthenticatedUser, myOrders)

//get all orders -- Admin
router.get("/admin/orders", isAuthenticatedUser, isAdmin, getAllOrders)

// update order status -- Admin
router.put("/admin/order/:id", isAuthenticatedUser, isAdmin, updateOrder)

//delete order -- Admin
router.delete("/admin/order/:id", isAuthenticatedUser, isAdmin, deleteOrder)

module.exports = router

