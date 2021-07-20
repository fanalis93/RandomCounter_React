import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  import {Navbar, Container, Nav, Modal, Button} from "react-bootstrap"
import { useState } from "react";
import {deepClone} from "../../shared/helper"
  export default function Header() {

    

    return (
       <>
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand as={Link} to="/">CounterApp</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link></Nav.Link>
            </Nav>
            </Container>
        </Navbar> 
       </>
    )}