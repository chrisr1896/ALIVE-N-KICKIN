import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar{
        background-color: #a04020;
    }
    .navbar-brand, /navbar-nav .nav-link {

        &.hover {
            color: white;
        }

    }
`;

export const NavBar = () => {
    return (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">Alive-n-Kickin!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link href="/home">Home</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/signup">Signup</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>

    )
};
