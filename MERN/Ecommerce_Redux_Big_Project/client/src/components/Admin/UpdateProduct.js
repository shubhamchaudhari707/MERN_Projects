import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, getproductDetails } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();
    const productId = id;

    const { error, product } = useSelector(
        (state) => state.productDetailsReducer
    );

    const {loading, error: updateError, isUpdated} = useSelector((state) => state.productupdel);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];


    

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getproductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);

            if (error) {
                alert.error(error);
            }

            if (updateError) {
                alert.error(updateError);
            }

            if (isUpdated) {
                alert.success("Product Updated Successfully");
                navigate("/admin/products");
                dispatch({ type: UPDATE_PRODUCT_RESET });
            }
        }
    }, [dispatch,product, alert, error, updateError, isUpdated, navigate, productId]);


    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        dispatch(updateProduct(productId, myForm));
    };


    return (<>

        <MetaData title="Create Product" />
        <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
                <form className="createProductForm" encType="multipart/form-data" onSubmit={updateProductSubmitHandler}>
                    <h1>Update Product</h1>

                    <div>
                        <SpellcheckIcon />
                        <input
                            type="text"
                            placeholder="Product Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <AttachMoneyIcon />
                        <input
                            type="number"
                            placeholder="Price"
                            required
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>

                    <div>
                        <DescriptionIcon />

                        <textarea
                            placeholder="Product Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            cols="30"
                            rows="1"
                        ></textarea>
                    </div>

                    <div>
                        <AccountTreeIcon />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Choose Category</option>
                            {categories.map((cate) => (
                                <option key={cate} value={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <StorageIcon />
                        <input
                            type="number"
                            placeholder="Stock"
                            required
                            onChange={(e) => setStock(e.target.value)}
                            value={Stock}
                        />
                    </div>

                    <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                        />
                    </div>

                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={loading ? true : false}
                    >
                        Update
                    </Button>
                </form>
            </div>
        </div>
    </>)
};

export default UpdateProduct;
