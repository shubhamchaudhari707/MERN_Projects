const express = require("express")
const router = express.Router()

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview,getProductReviews, deleteReview, getAdminProducts } = require("../controller/productController")
const { isAuthenticatedUser, isAdmin } = require("../middileware/auth")

//create product -- Admin
router.post("/admin/product/new", isAuthenticatedUser, isAdmin, createProduct)

//get all product
router.get("/products", getAllProducts)

//get all product -- Admin
router.get("/admin/products", getAdminProducts)

//get single products
router.get("/product/:id", getProductDetails)

//update product -- Admin
router.put("/admin/product/:id", isAuthenticatedUser, isAdmin, updateProduct)

//delete product -- Admin
router.delete("/admin/product/:id", isAuthenticatedUser, isAdmin,  deleteProduct)

//create product reviews
router.put("/review", isAuthenticatedUser, createProductReview)

//get all product reviews
router.get("/reviews", getProductReviews)

//delete review
router.delete("/reviews",isAuthenticatedUser, deleteReview)


module.exports = router






