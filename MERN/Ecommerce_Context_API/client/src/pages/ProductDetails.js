import React, { useEffect, useState } from "react";
import Layout from "../comonents/Layout/Layout";
import axios from "axios";
import { json, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //get Similar products
  const getSimilarProduct = async (pid, cid)=>{
    try {
        const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
        setRelatedProducts(data?.products)
    } catch (error) {
        console.log(error)
    }
  }


  //get Product
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      console.log(data);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <h1>Product Details</h1>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt="photo"
            height='300'
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
            <h1 className="text-center">Product Details</h1>
            <h4>Name : {product.name} </h4>
            <h4>Description : {product.description} </h4>
            <h4>price : {product.price} </h4>
            <h4>Quantity : {product.quantity} </h4>
            {/* <h4>Category : {product.category.name} </h4> */}

            <button class="btn btn-secondary ms-1">Add To CART</button>

        </div>
      </div>

    <hr />

      <div className="row container">
        <h6>Similar Products </h6>
        {relatedProducts.length <1 && <p className="text-center">No Similar Products found</p> }

      <div className="d-flex flex-wrap">
              {relatedProducts.map((p) => {
                return (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name} </h5>
                      <p className="card-text">{p.description.substring(0,30)}</p>
                      <p className="card-text"> ₹{p.price}</p>
                      <button class="btn btn-secondary ms-1">
                        Add To CART
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

      </div>
    </Layout>
  );
};

export default ProductDetails;
