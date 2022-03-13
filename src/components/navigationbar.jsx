import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import {Navbar} from "react-bootstrap";
import logo_icon from "../static/images/final_logo.png";

const NavigationBar = (props) => {

    return (
        <div>

            <Navbar bg="light" expand="lg">
              <Container className="justify-content-center">
                  <Navbar.Brand href="/"  ><img width="120px" height="auto" className="img-responsive" src={logo_icon} /></Navbar.Brand>
              </Container>
            </Navbar>

        </div>
    );
  };

export default NavigationBar;