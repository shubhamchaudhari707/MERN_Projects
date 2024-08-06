import React, { useState } from "react";
import Layout from "../../comonents/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{ email, password });

      // proxy method through
      // const res = await axios.post("/api/v1/auth/register", {name, email, password, phone, address})

      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/") ;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout title={"Login - Ecommerce App"}>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">LOGIN FORM</h4>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary" onClick={()=>navigate("/forgot-password")}>
                Forgot Password
              </button>
            </div>
            
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
           

          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
