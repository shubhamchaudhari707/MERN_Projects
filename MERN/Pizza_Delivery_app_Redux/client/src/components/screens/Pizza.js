import React, { useState } from "react";
import {Card, Button, Row , Col, Modal} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartAction";


const Pizza = ({ pizza }) => {

    const [varient, setVarient] = useState('small')
    const [quanity, setQuantity] = useState(1)
    const [show, setShow] = useState(false);

    //add to cart
    const dispatch = useDispatch()
    
    const addToCartHandler = () =>{
      dispatch(addToCart(pizza, quanity, varient))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "18rem", marginTop:"30px" }}>
        <Card.Img variant="top" style={{height:"200px", cursor:'pointer'}} src={pizza.image} onClick={handleShow}/>
        <Card.Body>
          <Card.Title style={{color:"orangered"}}>{pizza.name}</Card.Title>
          <hr />
          <Card.Text>
            <Row>
                <Col md={6}>
                    <h6>Varients</h6>
                    <select value={varient} onChange={(e)=>setVarient(e.target.value)}>
                        {pizza.varients.map((varient)=>{
                            return (
                                <option>
                                    {varient}
                                </option>
                            )
                        })}
                    </select>
                </Col>
                <Col md={6}>
                    <h6>Quantity</h6>
                    <select value={quanity} onChange={(e)=>setQuantity(e.target.value)}>
                        {[...Array(10).keys()].map((v, i)=>{
                            return (
                                <option value={ i + 1 } >{ i + 1 }</option>
                            )
                        })}
                    </select>
                </Col>
            </Row>
          </Card.Text>
            
            <Row>
                <Col md={6}>
                    Price : ₹ {pizza.prices[0][varient] * quanity }
                </Col>
                <Col md={6}>
                    <Button className="bg-warning text-white button-sm" onClick={addToCartHandler}>Add To Cart</Button>
                </Col>
            </Row>

          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

        {/* modal  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"orangered"}}>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
              <Card.Img variant="top" style={{height:"200px"}} src={pizza.image}/>
            </div>
            <br />
            <div>
              <h5>Description</h5> <hr />
              <h6>{pizza.description}</h6>
            </div>

        </Modal.Body>
        
      </Modal>

    </>

  );
};

export default Pizza;
