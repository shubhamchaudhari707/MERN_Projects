import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { getPizzaById, updatePizza } from '../../actions/pizzaAction'
import { useParams } from 'react-router-dom';
import Loader from './../Loader';
import Error from './../Error';


const EditPizza = () => {
    const dispatch = useDispatch()
    
    const { pizzaId } = useParams();
    
    console.log( "Pizza Name",pizzaId)

    const [name, setName] = useState("");
    const [smallPrice, setSmallPrice] = useState("");
    const [mediumPrice, setMediumPrice] = useState("");
    const [largePrice, setLargePrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const getPizzaByState = useSelector((state)=> state.getPizzaByIdReducer)
    const {loading, pizza, error} = getPizzaByState;

    const updatePizzaState = useSelector((state)=>state.updatePizzaByIdReducer)
    const {updateloading, updateerror, updatesuccess} = updatePizzaState; 
 
    useEffect(()=>{
        if (pizza) {
          if (pizza._id === pizzaId) {
            setName(pizza.name)
            setSmallPrice(pizza.prices[0]['small'])
            setMediumPrice(pizza.prices[0]['medium'])
            setLargePrice(pizza.prices[0]['large'])
            setImage(pizza.image)
            setCategory(pizza.category)
            setDescription(pizza.description)
          }
          else{
            dispatch(getPizzaById(pizzaId))
          }
        }
        else{
          dispatch(getPizzaById(pizzaId))
        }

    }, [pizza, dispatch])


    const submitForm = (e) => {
      e.preventDefault();
  
      const updatedpizza = {_id:pizzaId, name, image, description, category, prices:{small:smallPrice, mediumPrice:mediumPrice, large:largePrice}}
      console.log(pizza)
      dispatch(updatePizza(updatedpizza))
  
      setName("")
      setSmallPrice("")
      setMediumPrice("")
      setLargePrice("")
      setImage("")
      setCategory("")
      setDescription("")
  
    };

  return (
    <>
      {updateloading && <Loader />}
      {updateerror && <Error error="update new pizza error" />}
      {/* {success && <Success success="Pizza Added Successfully" />} */}

      <Form onSubmit={submitForm} className="bg-light ">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Small Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter small price"
              value={smallPrice}
              onChange={(e) => setSmallPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Medium Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter medium price"
              value={mediumPrice}
              onChange={(e) => setMediumPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Large Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter large price"
              value={largePrice}
              onChange={(e) => setLargePrice(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Image</Form.Label>
          <Form.Control
            placeholder="Add Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Description</Form.Label>
          <Form.Control placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Category</Form.Label>
          <Form.Control placeholder="Enter Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
        </Form.Group>

       

        <Button variant="primary"  type="submit" >
          Update Pizza
        </Button>
      </Form>
    </>
  )
}

export default EditPizza