import axios from "axios";

export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  const currentUser = getState().loginReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;
  try {
    const res = await axios.post("/api/orders/placeorder", {token,subTotal,currentUser,cartItems,});
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    console.log(res);
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAIL" });
    console.log(error);
  }
};


export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginReducer.currentUser;
  try {
    dispatch({type: "USER_ORDER_REQUEST"});
    const response = await axios.post("/api/orders/getuserorder", {userid: currentUser._id,});
    console.log(response);
    dispatch({ type: "USER_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_ORDER_FAIL", payload: error });
  }
};


export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({type: "ALL_ORDER_REQUEST"});
    const response = await axios.get("/api/orders/alluserorder");
    console.log(response);
    dispatch({ type: "ALL_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ALL_ORDER_FAIL", payload: error });
  }
};



export const deliverOrder = (orderid) => async (dispatch, getState) => {
  try {

    dispatch({ type: "GET_ALL_ORDER_REQUEST"});
    await axios.post("/api/orders/deliverorder", { orderid });
    alert("Deliverd Success");
    // dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: orders.data });

    window.location.href = "/admin/orderlist";
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDER_FAIL", payload: error });
  }
};


