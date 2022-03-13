import '../Teams.css';
import TeamSelector from "../components/teamselector";
import React, {Component, useEffect, useMemo, useState} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";

import siteLogo from '../static/images/basketballgenius_logo.png';
import NavigationBar from "../components/navigationbar";
import refresh_img from "../static/images/refresh_button.png";
import loading_img from "../static/images/loading_basketball.svg";


function Teams(props) {

  const [easternTeams, updateEasternTeams] = useState(null);
  const [westernTeams, updateWesternTeams] = useState(null);
  const [teamName, updateTeamName] = useState("");
  const [teamPage, updateTeamPage] = useState(0);

  const bgImages = ["bg-kd", "bg-lebron", "bg-luka", "bg-mj", "bg-russ"]

    // useMemo to set only once
  const imgIndex = useMemo(() => {
    return Math.floor(Math.random() * 5);
}, [])

  const getEasternTeams = () => {
      fetch("/getEasternTeams")
          .then(res => res.json())
          .then(res => updateEasternTeams(res));
  };

  const getWesternTeams = () => {
      fetch("/getWesternTeams")
          .then(res => res.json())
          .then(res => updateWesternTeams(res));
  };

  useEffect(() => {
        getEasternTeams();
        getWesternTeams();
    }, []);


      // No state data has been loaded yet, can't render properly
      if (!easternTeams) {
            return <div />
      }

      // No state data has been loaded yet, can't render properly
      if (!westernTeams) {
            return <div />
      }

      let eastButtons = easternTeams.map(teamObj => <Col className="grow" xs={1} md={1}><Link  to={"/loading?team=" + teamObj.teamAbbrev} onMouseOver={() => updateTeamName(teamObj.teamName)}><TeamSelector className="centered" key={teamObj.teamName} team={teamObj}/></Link></Col>);
      let westButtons = westernTeams.map(teamObj => <Col className="grow" xs={1} md={1}><Link  to={"/loading?team=" + teamObj.teamAbbrev} onMouseOver={() => updateTeamName(teamObj.teamName)}><TeamSelector className="centered" key={teamObj.teamName} team={teamObj}/></Link></Col>)

    let teamButtons;
    if (teamPage === 0) {
          teamButtons = eastButtons;
      } else {
          teamButtons = westButtons;
      }

    return (
        <div>
        <NavigationBar />
        <div className={"my-5 " + bgImages[imgIndex] + " img-filter bg-image-dark"}>

          <Container className="justify-content-center" fluid="md">

              <Row className="my-3">
                  <h1 className="centered-text">Teams</h1>
              </Row>

              <Row>

              {/*Pagination Left*/}
                  <Col className="col-1 align-centered">
                    <Button type="button" onClick={() => updateTeamPage(0)} className="transparent-button bg-transparent btn-sm">❮</Button>
                  </Col>

              <Col className="col-10">
               <Row className="d-grid gap-2 d-md-flex justify-content-center" id="teamRows">

                   {teamButtons}

               </Row>

                  <Row className="my-3">
                  <p className="centered-text first-letter">{teamName}</p>
              </Row>

                  </Col>

              {/*Pagination Right*/}
                   <Col className="col-1 align-centered">
                    <Button type="button" onClick={() => updateTeamPage(1)} className="transparent-button bg-transparent btn-sm">❯</Button>
                    </Col>

            </Row>

          </Container>
        </div>
            </div>
    );
  }

export default Teams;
