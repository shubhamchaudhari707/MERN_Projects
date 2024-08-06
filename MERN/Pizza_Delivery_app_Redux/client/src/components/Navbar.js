import React from "react";
import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";

const NavBar = () => {
  const dispatch = useDispatch();

  const cartstate = useSelector((state) => state.cartReducer);
  
  const userState = useSelector((state) => state.loginReducer);
  const { currentUser } = userState;
  console.log(currentUser);

  return (
    <>
      <Navbar expand="lg" className="light" variant="light">
        <Container>
          <Navbar.Brand>
            {" "}
            <Image
              src="images/logo.png"
              style={{ height: "50px" }}
              alt="logo"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {currentUser ? (
                <>
                  <LinkContainer to="/">
                    {/* <Nav.Link>{currentUser.name}</Nav.Link> */}

                    <NavDropdown
                      title={currentUser.name}
                      id="basic-nav-dropdown"
                    >
                      <LinkContainer to="/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>

                      {currentUser.isAdmin === true ? (
                        <>
                          <LinkContainer to="/admin/pizzalist">
                            <NavDropdown.Item>Admin Panel</NavDropdown.Item>
                          </LinkContainer>
                        </>
                      ) : null}

                      <NavDropdown.Item
                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}

              <LinkContainer to="/cart">
                <Nav.Link>Cart {cartstate.cartItems.length} </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
