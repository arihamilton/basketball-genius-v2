import logo from '../logo.svg';
import '../TeamSongList.css';
import TeamSelector from "../components/teamselector";
import React, {Component} from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Outlet, Link, useLocation} from "react-router-dom";

import loading_img from '../static/images/loading_basketball.svg';
import PageButtons from "../components/PageButton";
import Col from "react-bootstrap/Col";
import headshot_img from "../static/images/sample_headshot.jpg";
import Image from "react-bootstrap/Image";



class TeamSongList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.playerButtons = [];
      for(let i = 0; i < 5; i++){
          this.playerButtons.push(<Col>
              <Button type="button" className="button btn btn-circle rounded-circle grow">
              <Image src={headshot_img} className="playerButton" id="a player" rounded fluid width="30" height="30"/>
          </Button>
          </Col>);
      }

  }

  // componentDidMount() {
  //     this.getRoster();
  // }


  render() {

   const { state } = useLocation();
  console.log(state);

    return (
        <div className="App centered img-filter">
          <div className=""/>
          <Container className="justify-content-center">

              <Row>
                  {this.playerButtons}
              </Row>

              <Row>
              {/* Player Information */}
            <Col className="m-0 col-2">
              <div>
                <img className="d-block mx-lg-auto img-fluid imgDropShadow" src={headshot_img}
                     alt="Player Portait" width="200"/>
                  <p>Giannis Antetokounmpo</p>
              </div>
            </Col>

              <Col className="m-0 col-10">
              <PageButtons className="centered" key="idk" pages={5}/>
            </Col>
            </Row>
          </Container>

        </div>
    );
  }

}

export default TeamSongList;
