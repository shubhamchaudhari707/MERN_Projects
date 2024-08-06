import slugify from "slugify";
import ProductModel from "../models/productModel.js";
import fs from "fs";
import CategoryModel from './../models/categoryModel.js';
import braintree from "braintree";
import OrderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();


export const createProductController =async(req, res)=>{
    try {
        const {name,slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        
        switch (true) {
            case !name:
                return res.status.send({error:"Name is required"})
            case !description:
                return res.status.send({error:"description is required"})
            case !price:
                return res.status.send({error:"price is required"})
            case !category:
                return res.status.send({error:"category is required"})
            case !quantity:
                return res.status.send({error:"quantity is required"})
            case !photo  :
                return res.status.send({error:"Photo is required and should be less than 1mb"})
                
            default:
                break;
        }

        const products = await ProductModel({...req.fields, slug:slugify(name)});
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save()
        res.status(201).send({
            success:true,
            message:"Product Created Sucessfully",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in creating product",
            error
        })
    }
}


export const getProductController = async (req, res)=>{
    try {
        const products = await ProductModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt : -1});
        res.status(200).send({
            success:true,
            message:"AllProducts",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting products",
            error:error.message
        })
    }
}

// single Product fetch
export const getSingleProductContoller = async(req, res)=>{
    try {
        const {slug} = req.params;
        const product  = await ProductModel.findOne({slug}).select('-photo').populate('category')
        res.status(200).send({
            success:true,
            message:"single Product fetched",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting single product",
            error
        })
    }
}

//get Product Photo 
export const productPhotoController =async (req, res)=>{
    try {
        const {pid} = req.params;
        const product = await ProductModel.findById(pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting photo",
            error
        })
    }
}


//delete Product
export const deleteProductController = async(req, res)=>{
    try {
        const {id} = req.params
        const product = await ProductModel.findByIdAndDelete(id).select('-photo');
        res.status(200).send({
            success:true,
            message:"Product deleted sucessfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while deleting product",
            error
        })
    }
}

//update product
export const updateProductController =async (req, res)=>{
    try {
        const {name,slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        
        switch (true) {
            case !name:
                return res.status.send({error:"Name is required"})
            case !description:
                return res.status.send({error:"description is required"})
            case !price:
                return res.status.send({error:"price is required"})
            case !category:
                return res.status.send({error:"category is required"})
            case !quantity:
                return res.status.send({error:"quantity is required"})
            case photo && photo.size > 1000000:
                return res.status(500).send({error:"Photo is required and should be less than 1mb"})
                
            default:
                break;
        }

        const products = await ProductModel.findByIdAndUpdate(req.params.id, {...req.fields, slug:slugify(name)}, {new:true})
        console.log(products)
        // if (photo) {
        //     products.photo.data = fs.readFileSync(photo.path);
        //     products.photo.contentType = photo.type;
        // }

        // await products.save()
        res.status(201).send({
            success:true,
            message:"Product updated Sucessfully",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in updating product",
            error
        })
    }
}


//filters
export const productFilterController =async(req, res)=>{
    try {
        const {checked, radio } = req.body
        let args = {} 
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await ProductModel.find(args);
        console.log(args)
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while filtering products",
            error
        })
    }
}


//product count
export const productCountController = async (req, res) => {
    try {
      const total = await ProductModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };


// product list base on per page
export const productListController =async (req, res)=>{
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;
        const products = await ProductModel.find({}).select('-photo').skip((page-1) * perPage).limit(perPage).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in per page",
            error
        })
    }
}

//search product
export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await ProductModel.find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };


//similar products
export const relatedProductController =async(req, res)=>{
    try {
        const {pid, cid} = req.params
        const products = await ProductModel.find({category:cid, _id:{$ne:pid}}).select('-photo').limit(3).populate('category')

        res.status(200).send({
            success:true,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting realred prodcuts",
            error
        })
    }
}


//category wise Product
export const productCategoryController = async (req, res)=>{
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug });
        const products = await ProductModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting  prodcuts",
            error
        })
    }
}


//Payment Gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//payment getWay API 
//TOKEN
export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

//Payment
export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new OrderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  











