import express from "express";
const router = express.Router();
import { isAdmin, requireSignin } from "./../middilewares/authMiddileware.js";
import {
  createProductController,
  getProductController,
  getSingleProductContoller,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController
} from "../controller/productController.js";
import formidable from "express-formidable";

//routes
// create product
router.post("/create-product",requireSignin,isAdmin,formidable(),createProductController);

//get Products
router.get("/get-product", getProductController);

//get Single Proucts
router.get("/get-product/:slug", getSingleProductContoller);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:id", deleteProductController);

//update product
router.put("/update-product/:id",requireSignin,isAdmin,formidable(),updateProductController);

// filter product
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product 
router.get("/search/:keyword", searchProductController);

//similar Product
router.get('/related-product/:pid/:cid', relatedProductController)

//category wise Product
router.get('/product-category/:slug', productCategoryController)

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignin, brainTreePaymentController);

export default router;
