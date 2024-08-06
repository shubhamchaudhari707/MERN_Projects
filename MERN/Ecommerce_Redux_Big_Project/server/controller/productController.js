const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsycError = require("../middileware/catchAsycError");
const ApiFeatures = require("../utils/apiFeatures");

//create product -- Admin
exports.createProduct = catchAsycError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  console.log(product)
  res.status(201).send({
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = catchAsycError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find({}), req.query).search().filter().pagination(resultPerPage);

  const products = await apiFeatures.query;

  res.status(200).send({
    success: true,
    products,
    productsCount,
    resultPerPage
  });
});

// get all product (Admin)
exports.getAdminProducts = catchAsycError(async (req, res, next) => {

  const products = await Product.find({})

  res.status(200).send({
    success: true,
    products
  });
});

//get single product
exports.getProductDetails = catchAsycError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).send({
    success: true,
    product,
  });
});

//update product -- Admin
exports.updateProduct = catchAsycError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send({
    success: true,
    product,
  });
});

//delete product -- Admin
exports.deleteProduct = catchAsycError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).send({
    success: true,
    product,
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsycError(async (req, res, next) => {
  console.log("req.name", req.user.name);
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  //edit reviw and add review
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsycError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsycError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {reviews,ratings,numOfReviews},{  new: true,});

  res.status(200).json({
    success: true,
  });
});
