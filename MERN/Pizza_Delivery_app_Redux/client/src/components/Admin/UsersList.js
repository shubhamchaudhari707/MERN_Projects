import React, { useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "../../actions/userAction";
import Loader from './../Loader';
import Error from './../Error';
import { AiFillDelete } from "react-icons/ai";

const UsersList = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state=>state.getAllUsersReducer)
  const {users, loading, error} = userState;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>

      <h1>User List</h1>
      {loading && <Loader/>}
      {error && <Error error="Error while fetaching user "/>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

        {
          users && users.map((user)=>{
            return (
              <>
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <AiFillDelete style={{ cursor: "pointer", color:"red"}}
                      onClick={()=>dispatch(deleteUser(user._id))}
                    />
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

export default UsersList;
