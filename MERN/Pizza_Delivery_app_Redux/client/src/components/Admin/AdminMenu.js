import React from 'react'
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
        <div className="text-center">
            <div className="list-group">
                <NavLink to="/admin/userlist" className="list-group-item list-group-item-action">All Users</NavLink>
                <NavLink to="/admin/pizzalist" className="list-group-item list-group-item-action">All Pizzas</NavLink>
                <NavLink to="/admin/addnewpizza" className="list-group-item list-group-item-action">Add New Pizza</NavLink>
                {/* <NavLink to="/admin/editpizza" className="list-group-item list-group-item-action">Edit Pizza</NavLink> */}
                <NavLink to="/admin/orderlist" className="list-group-item list-group-item-action">All orders</NavLink>
            </div>
        </div>

        
    </>
  )
}

export default AdminMenu