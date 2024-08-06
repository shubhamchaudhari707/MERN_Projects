import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
  productReducer,
  productDetailsReducer,
  newProductReducer,
  productReducerupdel,
  newReviewReducer,
  deleteReviewReducer,
  productReviewsReducer
} from "./reducers/productReducers";

import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducerdelup,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  productReducer,
  productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  productupdel: productReducerupdel,
  allOrders: allOrdersReducer,
  orderdelup: orderReducerdelup,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  newReview:newReviewReducer,
  productReviews: productReviewsReducer,
  delreview: deleteReviewReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middileware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middileware))
);

export default store;
