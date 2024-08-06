import axios from 'axios'
import swal from 'sweetalert';

export const getAllPizzas = () => async (dispatch) =>{
    try {
        dispatch({type:"GET_PIZZAS_REQUEST"})
        const res = await axios.get('/api/pizzas/getAllPizzas')
        console.log(res)
        dispatch({type:"GET_PIZZAS_SUCCESS", payload:res.data})
    } catch (error) {
        console.log(error )
        dispatch({type:"GET_PIZZAS_FAIL", payload:error})
    }
}


export const addPizzas = (pizza) => async (dispatch) =>{
    try {
        dispatch({type:"ADD_PIZZAS_REQUEST"})
        const res = await axios.post('/api/pizzas/addpizza', {pizza} )
        console.log(res)
        dispatch({type:"ADD_PIZZAS_SUCCESS"})
    } catch (error) {
        console.log(error )
        dispatch({type:"ADD_PIZZAS_FAIL", payload:error})
    }
}



export const getPizzaById = (pizzaId) => async (dispatch) =>{
    try {
        dispatch({type:"GET_PIZZABYID_REQUEST"})
        const res = await axios.post('/api/pizzas/getpizzabyid', {pizzaId} )
        console.log(res)
        dispatch({type:"GET_PIZZABYID_SUCCESS", payload:res.data})
    } catch (error) {
        console.log(error )
        dispatch({type:"GET_PIZZABYID_FAIL", payload:error})
    }
}


export const updatePizza = (updatedPizza) => async (dispatch) =>{
    try {
        dispatch({type:"UPDATE_PIZZABYID_REQUEST"})
        const res = await axios.post('/api/pizzas/updatepizza', {updatedPizza} )
        console.log(res)
        dispatch({type:"UPDATE_PIZZABYID_SUCCESS", payload:res.data})
        window.location.href = "/admin/pizzalist"
    } catch (error) {
        console.log(error )
        dispatch({type:"UPDATE_PIZZABYID_FAIL", payload:error})
    }
}


export const deletePizza = (pizzaId) => async (dispatch) =>{
    try {
        const res = await axios.post('/api/pizzas/deletepizza', {pizzaId} )
        swal("Pizza Deleted Success!", "success");
        console.log(res)
        window.location.href = "/admin/pizzalist"
    } catch (error) {
        console.log(error )
        swal("Error While Deletring Pizza!", "error");
    }
}
