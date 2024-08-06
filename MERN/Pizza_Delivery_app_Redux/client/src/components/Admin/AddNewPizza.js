import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { addPizzas } from "../../actions/pizzaAction";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../Loader';
import Success from './../Success';
import Error from './../Error';

const AddNewPizza = () => {
  const dispatch = useDispatch()
  
  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const addPizzaState = useSelector((state)=>state.addPizzaReducer);
  const {success, loading, error} = addPizzaState;

  const submitForm = (e) => {
    e.preventDefault();

    const pizza = {name, image, description, category, prices:{small:smallPrice, mediumPrice:mediumPrice, large:largePrice}}
    console.log(pizza)
    dispatch(addPizzas(pizza))

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
      {loading && <Loader />}
      {error && <Error error="add new pizza error" />}
      {success && <Success success="Pizza Added Successfully" />}

      <Form onSubmit={submitForm} className="bg-light ">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
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
          Add New
        </Button>
      </Form>
    </>
  );
};

export default AddNewPizza;
