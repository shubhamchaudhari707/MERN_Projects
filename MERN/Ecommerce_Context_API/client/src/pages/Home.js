import React, { useState, useEffect } from "react";
import Layout from "./../comonents/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../comonents/Prices";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //get total count
  const getTotal =async ()=>{
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  
  //loadmore 
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  

  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      console.log(res);
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal()
  }, []);

  //get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      // console.log({data})
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //Filter by Category
  const handleFilter = async(value, id)=>{
    try {
      let all = [...checked]
      if (value) {
        all.push(id)
      }
      else{
        all = all.filter(c=>c!==id)
      }
      setChecked(all)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {checked,radio,});
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Layout title="All Products - Best offers">
        <div className="row mt-3">
          <div className="col-md-2">
            <h4 className="text-center mt-4">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => {
                return (
                  <div>
                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                      {c.name}
                    </Checkbox>
                  </div>
                );
              })}
            </div>
              {/* price filter */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                {Prices?.map((p)=>{
                  console.log(p)
                  return (
                    <div key={p._id}>
                      <Radio value={p.array}> {p.name} </Radio>
                    </div>
                  )
                })}
              </Radio.Group>
            </div>

            <div className="d-flex flex-column">
            <button className="btn btn-danger mt-3" onClick={() => window.location.reload()}>
              RESET FILTERS
            </button>
          </div>

          </div>
          <div className="col-md-9">
              {/* {JSON.stringify(radio,null,4)} */}
            <h1 className="text-center">All Products</h1>
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

                      <button class="btn btn-secondary ms-1" onClick={()=>
                      {setCart([...cart, p]) 
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success("Item added to cart")
                      }}>
                        Add To CART
                      </button>
                      
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
