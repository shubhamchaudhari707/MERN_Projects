import React from "react";
import TopBar from "./components/TopBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Policy from "./components/Policy";
import NavBar from "./components/Navbar";
import HomeScreen from "./components/screens/HomeScreen";
import CartScreens from "./components/screens/CartScreens";
import Register from "./components/screens/Register";
import Login from "./components/screens/Login";
import OrderScreens from "./components/screens/OrderScreens";
import AdminScreen from "./components/screens/AdminScreen";
import UsersList from "./components/Admin/UsersList";
import PizzasList from "./components/Admin/PizzasList";
import AddNewPizza from "./components/Admin/AddNewPizza";
import OrderList from "./components/Admin/OrderList";
import EditPizza from "./components/Admin/EditPizza";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <NavBar />
        <Routes>

          {/* <Route path="/admin" element={<AdminScreen/>}/> */}
          
          <Route path="/admin" element={<AdminScreen/>}>
            <Route path="userlist" element={<UsersList/>}/>
            <Route path="pizzalist" element={<PizzasList/>}/>
            <Route path="addnewpizza" element={<AddNewPizza/>}/>
            <Route path="editpizza/:pizzaId" element={<EditPizza/>}/>
            <Route path="orderlist" element={<OrderList/>}/>
          </Route>

          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/cart" element={<CartScreens/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route path="/orders" element={<OrderScreens/>} />

          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/policy" element={<Policy/>}/>
        </Routes>

      </BrowserRouter>
    </>
  );
};

export default App;
