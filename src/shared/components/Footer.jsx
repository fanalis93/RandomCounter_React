import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  import {Navbar, Container, Nav} from "react-bootstrap"

  export default function Header() {
    return (
        <div className="fixed-bottom bg-light">
            <p>This is Footer</p>
        </div>
    )}