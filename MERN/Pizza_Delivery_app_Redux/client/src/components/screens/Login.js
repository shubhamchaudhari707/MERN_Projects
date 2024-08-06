import React, {useState, useEffect} from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import {loginUser} from "../../actions/userAction"

const Login = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () =>{
    const user = {email, password}
    dispatch(loginUser(user))
  }

  useEffect(()=>{
    if (localStorage.getItem('currentUser')) {
      window.location.href("/")
    }
  }, [])

  return (
    <>
      <Container>
        <Form>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group>

          <Button onClick={loginHandler}>Login</Button>
          
        </Form>
      </Container>
    </>
  );
};

export default Login;
