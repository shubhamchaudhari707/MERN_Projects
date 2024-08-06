import React, { useState, useEffect } from "react";
import AdminMenu from "../../comonents/Layout/AdminMenu";
import Layout from "../../comonents/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../comonents/Form/CategoryForm";
import { Modal } from "antd"

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpadtedName] = useState("");

  //create Category
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name})
      if (res?.data.success) {
        toast.success(res.data.message);
        setName("")
        getAllCategory()
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('somthing went wront in input form')
    }
    
  }

  //update category
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name:updatedName})
      if(res.data.success){
        toast.success(res.data.message)
        setSelected(null);
        setUpadtedName("");
        setVisible(false);
        getAllCategory()
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  }

  //Delete category
  const handleDelete =async(id)=>{
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
      if(res.data.success){
        toast.success(res.data.message)
        getAllCategory()
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  }

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
      toast.error("something wentwrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <Layout title={"Dashboard - Create Category"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
          
            <div className="col-md-3">
              <AdminMenu />
            </div>

            <div className="col-md-9">
              <h1>Manage Category</h1>
              <div className="p-3 w-50">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
              </div>
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                      {categories?.map((c) => {
                        
                        return (
                          <>
                            <tr>
                              <td key={c._id}>{c.name} </td>
                              <td>
                                <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true) ; setUpadtedName(c.name) ; setSelected(c)}}>Edit</button>
                                <button className="btn btn-danger ms-2" onClick={()=>handleDelete(c._id)} >Delete</button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
               
                  </tbody>
                </table>
              </div>
              <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                      <CategoryForm value={updatedName} setValue={setUpadtedName} handleSubmit={handleUpdate}/>
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
