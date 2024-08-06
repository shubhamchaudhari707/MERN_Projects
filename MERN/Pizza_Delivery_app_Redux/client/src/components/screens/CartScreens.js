import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaMinusCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { addToCart, deleteFromCart } from "../../actions/cartAction";
import Checkout from "../Checkout";

const CartScreens = () => {
    
    const cartState = useSelector((state) => state.cartReducer);
    const cartItems = cartState.cartItems;

    const dispatch = useDispatch();

    const subTotal = cartItems.reduce((x, item) => x + item.price, 0);

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <h1>My Cart </h1> <hr />
            <Row>
              {cartItems.map((item) => {
                return (
                  <>
                    <Col md={7}>
                    <h5>
                      {item.name} [{item.varient}]
                    </h5>
                    <h6>
                      {" "}
                      Price : {item.quantity} X {item.prices[0][item.varient]} ={" "}
                      {item.price}
                    </h6>

                      <h6>
                        Quantity : &nbsp;{" "}
                        <FaMinusCircle
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity - 1, item.varient)
                          );
                        }}
                        />{" "}

                        &nbsp; {item.quantity} &nbsp;{" "}

                        <FaPlusCircle
                          className="text-success"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity + 1, item.varient)
                          );
                        }}
                        />{" "}

                      </h6>
                    </Col>
                    <Col md={5}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "80px", height: "80px" }}
                      />
                        <FaTrash style={{ cursor: "pointer", color:"red", marginLeft:"20px", fontSize:"20px" }} onClick={() => {
                          dispatch(
                            deleteFromCart(item)
                          );
                        }} />
                    </Col>

                    <hr />
                  </>
                );
              })}
            </Row>
          </Col>
          <Col md={6}>
            <h1>Payment Info</h1>
            <h4>Sub Total</h4>
            <h4>RS : {subTotal} /- </h4>
            <Checkout subTotal={subTotal} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreens;
