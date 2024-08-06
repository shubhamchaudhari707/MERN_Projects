import React, { useEffect } from "react";
import AllPizzas from "../../pizza-data";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Pizza from "./Pizza";
import { getAllPizzas } from "../../actions/pizzaAction";
import Loader from "../Loader";
import Error from "../Error";

const HomeScreen = () => {
  const dispatch = useDispatch();
  
  const pizzastate = useSelector((state) => state.getAllPizzaReducer);
  const { loading, pizzas, error } = pizzastate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <>
      <Container>
        {loading ? (
          <Loader/>
        ) : error ? (
          <Error error={"error while fetching home"}>
          <h1>Error While Fetching pizzas {error} </h1>
          </Error>
        ) : (
          <Row>
            {pizzas.map((pizza) => {
              return (
                <Col md={4}>
                  <Pizza pizza={pizza} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
