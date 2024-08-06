import React, {useState, useEffect} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from "../../actions/userAction";
import Loader from "../Loader";
import Success from "../Success";
import Error from "../Error";

const Register = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');

    const registerState = useSelector((state)=>state.registerUserReducer)
    const {loading, success, error} = registerState
 
    const registerHandler = (e) =>{
        e.preventDefault();
        if (password !== conformPassword) {
            alert("Paasword does not match ")
        }else{
          
            const user = {name, email, password, conformPassword}
            dispatch(registerUser(user))

            setName("")
            setEmail("")
            setPassword("")
            setConformPassword("")
        }
    }

  return (
    <>
      <Container>
        {loading && <Loader/>}
        {success && <Success success={'User Register Sucessfully'} />  }
        {error && <Error error="error while fetching in register form" /> }

        <Form>
          <h1>Registraction</h1>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={conformPassword} onChange={(e)=>setConformPassword(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={registerHandler}>
            Register
          </Button>
          
        </Form>
      </Container>
    </>
  );
};

export default Register;
