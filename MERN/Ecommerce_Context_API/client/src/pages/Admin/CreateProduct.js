import React, { useState, useEffect } from "react";
import Layout from "../../comonents/Layout/Layout";
import AdminMenu from "../../comonents/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const navigate = useNavigate();

  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      console.log(res);
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something wentwrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //crate product function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productData);

      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Product</h1>
              <form>
                <div className="m-1 w-75">
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {categories.map((c) => {
                      return (
                        <Option key={c._id} value={c._id} >
                          {c.name}
                        </Option>
                      );
                    })}
                  </Select>

                  {/* photo */}
                  <div className="mb-3">
                    <label className="btn btn-outline-secondary col-md-12">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>

                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product-photo"
                          height={"200px"}
                          className="img img-responsive"
                         
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      placeholder="write a name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={description}
                      placeholder="write a description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="write a price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="write a quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="Select Shipping"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => setShipping(value)}
                    >
                      <Option value="0">NO</Option>
                      <Option value="1">YES</Option>
                    </Select>
                  </div>

                  <div className="mb-3">
                    <button onClick={handleSubmit} className="btn btn-primary">
                      CREATE PRODUCT
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
