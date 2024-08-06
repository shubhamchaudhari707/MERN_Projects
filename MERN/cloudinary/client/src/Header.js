import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>

            <Navbar expand="lg" bg='dark' variant='dark' style={{ height: "60px" }}>
                <Container>
                    <NavLink className="text-decoration-none text-light" to="/">Home</NavLink>
                </Container>
            </Navbar>

        </>
    )
}

export default Header