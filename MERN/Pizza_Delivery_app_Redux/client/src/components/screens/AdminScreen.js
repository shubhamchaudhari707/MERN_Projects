import React, { useEffect } from "react";
import {Container,Row,Col} from "react-bootstrap";
import AdminMenu from "../Admin/AdminMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const AdminScreen = () => {

    const userState = useSelector((state)=>state.loginReducer)
    const {currentUser} = userState;

    useEffect(()=>{
        if (localStorage.getItem('currentUser') === null || !currentUser.isAdmin ){
            window.location.href = "/"
        }
    }, [currentUser])


  return (
    <>
        <Container>
            <h1 className="text-center p-1 bg-warning text-dark">Admin Panel</h1>

            <Row>
                <Col md={3}>
                    <AdminMenu/>
                </Col>
                <Col md={9}>
                    <Outlet/>
                </Col>
            </Row>
        </Container>


        
    </>
  );
};

export default AdminScreen;
