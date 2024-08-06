import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

//Reducer
import { getAllPizzaReducer } from "./reducers/pizzaReducer";
import { cartReducer } from "./reducers/cartReducer";
import { registerUserReducer } from "./reducers/userReducer";
import { loginReducer } from "./reducers/userReducer";
import { placeOrderReducer } from "./reducers/orderReducer";
import { getUserOrdersReducer } from "./reducers/orderReducer";
import { addPizzaReducer } from "./reducers/pizzaReducer";
import { getPizzaByIdReducer } from "./reducers/pizzaReducer";
import { updatePizzaByIdReducer } from "./reducers/pizzaReducer";
import { allUserOrderReducer } from "./reducers/orderReducer";
import { getAllUsersReducer } from "./reducers/userReducer";


const rootReducer = combineReducers({getAllPizzaReducer, cartReducer, registerUserReducer, loginReducer, placeOrderReducer, getUserOrdersReducer, addPizzaReducer, getPizzaByIdReducer, updatePizzaByIdReducer, allUserOrderReducer, getAllUsersReducer});

const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;


const initialState = {
    cartReducer: {
        cartItems: cartItems,
    },
    loginReducer:{
        currentUser:currentUser
    }
};



const middileware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middileware))) 

export default store;



