import React,{useState, useEffect} from "react";
import Layout from "../comonents/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getProductsByCat = async ()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(params?.slug) getProductsByCat()
    },[params?.slug])
  return (
    <Layout>
      <div className="container">
        <h4 className="text-center"> Category - {category?.name}</h4>
        <h6 className="text-center"> {products?.length} result found </h6>

        <div className="row">
        <div className="d-flex flex-wrap">
              {products.map((p) => {
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
                      <button class="btn btn-primary ms-1" onClick={()=>{
                        navigate(`/product/${p.slug}`)
                      }}>More Details</button>
                      <button class="btn btn-secondary ms-1">
                        Add To CART
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>

      </div>
    </Layout>
  );
};

export default CategoryProduct;
