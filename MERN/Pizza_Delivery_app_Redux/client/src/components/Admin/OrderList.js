import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../actions/orderAction";
import Loader from "./../Loader";
import Error from "./../Error";
import {Table, Button} from "react-bootstrap";
import { deliverOrder } from "../../actions/orderAction";

const OrderList = () => {
  const dispatch = useDispatch();

  const allOrderState = useSelector((state) => state.allUserOrderReducer);
  const { loading, success, orders, error } = allOrderState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      {error && <Error error="Admin order fail" />}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders && orders.map((order)=>{
              return (
                <>
                  <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.transectionId}</td>
                  <td>RS. {order.orderAmount} /-</td>
                  <td> {order.createdAt.substring(0, 10)} </td>
                  <td>
                  {" "}
                  {order.isDeliverd ? (
                    <h6 className="text-success">Deliverd</h6>
                  ) : (
                    <>
                      <Button
                        className="btn-danger"
                        onClick={() => {
                          dispatch(deliverOrder(order._id));
                        }}
                      >
                        Deliver
                      </Button>
                    </>
                  )}{" "}
                </td>
                  </tr>
                </>
              )
            })
          }
        </tbody>
      </Table>
    </>
  );
};

export default OrderList;
