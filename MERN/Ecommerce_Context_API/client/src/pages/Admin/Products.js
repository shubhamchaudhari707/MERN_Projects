import React, { useState, useEffect } from "react";
import AdminMenu from "../../comonents/Layout/AdminMenu";
import Layout from "../../comonents/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      console.log({ data });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap mt-4">
          {products.map((p) => {
            return (
              <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className="product-link ">
                <div className="card m-2" style={{ width: "18rem" }} >
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name} </h5>
                    <p className="card-text">{p.description}</p>
                    
                  </div>
                </div>
              </Link>
            );
          })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
