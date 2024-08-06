import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';

const Login = () => {
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit =async(e)=>{
      e.preventDefault()
      try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password})

          // const res = await axios.post(`/api/v1/auth/register`, {name, email, password, phone, address})

          if (res.data.success) {
              toast.success(res.data.message);
              navigate('/')
          }
          else{
              toast.error(res.data.message)
          }
      } catch (error) {
          toast.error("something went wrong")
      }
  }

  return (
    <>
        <Layout title={"Login - Ecommerce App"}>

          <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h4 className="title">LOGIN FORM</h4>

                <div className="mb-3">
                    <input type="email" className="form-control" placeholder='Enter Your Email' value={email} onChange={((e)=>setEmail(e.target.value))}/>
                </div>
                
                <div className="mb-3">
                    <input type="password" className="form-control"  placeholder='Enter Your Password' value={password} onChange={((e)=>setPassword(e.target.value))}/>
                </div>

                <button type="submit" className="btn btn-primary">LOGIN</button>
            </form>
          </div>

        </Layout>
    </>
  )
}

export default Login