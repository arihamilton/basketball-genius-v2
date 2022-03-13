import logo from '../logo.svg';
import '../Home.css';
import TeamSelector from "../components/teamselector";
import {Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Outlet, Link } from "react-router-dom";

import siteLogo from '../static/images/final_logo.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }



  render() {

    const bgImages = ["bg-kd", "bg-lebron", "bg-luka", "bg-mj", "bg-russ"]
    const imgIndex = Math.floor(Math.random() * 5);

    return (
        <div className={"App centered bg-image " + bgImages[imgIndex] + " img-filter"}>
          <div className=""/>
          <Container className="justify-content-center">

            <Row>
              <div className="my-3">
                <img className="d-block mx-lg-auto img-fluid imgDropShadow" src={siteLogo}
                     alt="BasketballGenius Logo" width="720"/>
              </div>
            </Row>

            <Row>
              <div className="d-grid gap-2 d-md-flex justify-content-center mb-4 mb-lg-3">
                <Link to="/teams">
                  <Button type="button" className="button btn btn-primary btn-lg rounded-pill">Search for a Team</Button>
                </Link>
                <a href="/login">
                  <Button type="button" className="btn btn-primary btn-lg ml-2 rounded-pill">Search for a Player</Button>
                </a>
              </div>
            </Row>

          </Container>

        </div>
    );
  }

}

export default Home;
