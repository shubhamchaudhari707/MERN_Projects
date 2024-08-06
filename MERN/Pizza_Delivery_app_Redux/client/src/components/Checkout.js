import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import Loader from './Loader';
import Error from './Error';
import Success from './Success';


const Checkout = ({ subTotal }) => {
  const dispatch = useDispatch();

  const orderState = useSelector((state)=>state.placeOrderReducer)
  const {loading, error, success} = orderState;

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
    console.log(token);
  };

  return (
    <>

      {loading && <Loader/>}
      {error && <Error error="something went wrong"/>}
      {success && <Success success="order place sucessfully" />}

      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51HT3awLRpPHpN9zVZksDRZ16m6HANATIi914WwDG7xbmNKQGsMyXEBTuUxlNZlkZ3EYFsfu5t0NQDeNQYbukyICZ000lVzvD9Y"
        currency="INR"
      >
        <Button>Pay Now</Button>
      </StripeCheckout>
    </>
  );
};

export default Checkout;
