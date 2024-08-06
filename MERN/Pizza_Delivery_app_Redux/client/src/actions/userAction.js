import axios from "axios";
import swal  from 'sweetalert';

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    const res = await axios.post(`/api/user/register`, user);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "USER_REGISTER_FAIL", payload: error });
  }
};



export const loginUser = (user) => async (dispatch) => {
  try {

    dispatch({ type: "USER_LOGIN_REQUEST" });

    const res = await axios.post("/api/user/login", user);
    console.log(res)

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });

    localStorage.setItem("currentUser", JSON.stringify(res.data));

    window.location.href = "/";
  } catch (error) {
    console.log(error);
    dispatch({ type: "USER_LOGIN_FAIL", payload: error });
  }
};


export const logoutUser = () => (dispatch) =>{
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
}



export const getAllUsers = () => async (dispatch) =>{
  try {
      dispatch({type:"GET_USERS_REQUEST"})
      const res = await axios.get('/api/user/getallusers')
      console.log(res)
      dispatch({type:"GET_USERS_SUCCESS", payload:res.data})
  } catch (error) {
      console.log(error )
      dispatch({type:"GET_USERS_FAIL", payload:error})
  }
}



export const deleteUser = (userid) => async (dispatch) =>{
  try {
      const res = await axios.post('/api/user/deleteuser', {userid})
      swal("Pizza Deleted Success!", "success");
      console.log(res)
      window.location.reload();
  } catch (error) {
      console.log(error )
      swal("Error While Deletring user!", "error");
  }
}

