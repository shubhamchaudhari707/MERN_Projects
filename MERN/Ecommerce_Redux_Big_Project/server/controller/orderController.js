const Order = require("../models/orderModels")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsycError = require("../middileware/catchAsycError");
const ApiFeatures = require("../utils/apiFeatures");


//create new Order
exports.newOrder = catchAsycError(async (req, res, next) => {

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    const order = await Order.create({ shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, user: req.user.id })
    console.log(order)
    res.status(201).json({
        success: true,
        order
    })
})


//get single order -- Admin
exports.getSingleOrder = catchAsycError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandler("oder not found with this id", 404))
    }

    res.status(200).json({
        success: true,
        order
    })

})


//get loggin in user order
exports.myOrders = catchAsycError(async (req, res, next) => {
    console.log(req.user.id)
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})


//get all orders -- Admin
exports.getAllOrders = catchAsycError(async (req, res, next) => {
    const orders = await Order.find({})

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})


// update Order Status -- Admin
exports.updateOrder = catchAsycError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}


//delete order -- Admin
exports.deleteOrder = catchAsycError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        message: "deleted Order sucessfully"
    })
})