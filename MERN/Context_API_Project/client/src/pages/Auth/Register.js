import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';

const Register = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name, email, password, phone, address})
            console.log(res)

            // proxy method through
            // const res = await axios.post(`/api/v1/auth/register`, {name, email, password, phone, address})

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    console.log("server js shubham",process.env.REACT_APP_API)

  return (
    <>
       <Layout title={"Register - Ecommerce App"}>
       <div className='form-container' >

            <form onSubmit={handleSubmit}>
                <h4 className="title">REGISTER FORM</h4>
                <div className="mb-3">
                    <input type="text" className="form-control"  placeholder='Enter Your Name' value={name} onChange={((e)=>setName(e.target.value))}/>
                </div>

                <div className="mb-3">
                    <input type="email" className="form-control" placeholder='Enter Your Email' value={email} onChange={((e)=>setEmail(e.target.value))}/>
                </div>
                
                <div className="mb-3">
                    <input type="password" className="form-control"  placeholder='Enter Your Password' value={password} onChange={((e)=>setPassword(e.target.value))}/>
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Enter Your Phone' value={phone} 
                        onChange={((e)=>setPhone(e.target.value))}/>
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Enter Your Address' value={address} onChange={((e)=>setAddress(e.target.value))}/>
                </div>

                <button type="submit" className="btn btn-primary">REGISTER</button>
            </form>


       </div>

       </Layout>

    </>
  )
}

export default Register