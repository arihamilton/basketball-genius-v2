import '../Teams.css';
import TeamSelector from "../components/teamselector";
import {Component, useEffect, useMemo, useState} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";

import siteLogo from '../static/images/basketballgenius_logo.png';
import NavigationBar from "../components/navigationbar";


function Teams(props) {

  const [easternTeams, updateEasternTeams] = useState(null);
  const [teamName, updateTeamName] = useState("");

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

  useEffect(() => {
        getEasternTeams();
    }, []);


      // No state data has been loaded yet, can't render properly
      if (!easternTeams) {
            return <div />
      }


    console.log(teamName);
    return (
        <div>
        <NavigationBar />
        <div className={"my-5 " + bgImages[imgIndex] + " img-filter bg-image-dark"}>

          <Container className="justify-content-center" fluid="md">

              <Row className="my-3">
                  <h1 className="centered-text">Teams</h1>
              </Row>

               <Row className="d-grid gap-2 d-md-flex justify-content-center mb-lg-3" id="easternRows" xs={2} md={4}>
                   {/*<div className="d-grid gap-2 d-md-flex justify-content-center mb-lg-3" id="easternRows">*/}
                   {easternTeams.map(teamObj => <Col className="grow" xs={1} md={1}><Link  to={"/loading?team=" + teamObj.teamAbbrev} onMouseOver={() => updateTeamName(teamObj.teamName)}><TeamSelector className="centered" key={teamObj.teamName} team={teamObj}/></Link></Col>)}
                   {/*</div>*/}
               </Row>

              <Row className="my-3">
                  <p className="centered-text first-letter">{teamName}</p>
              </Row>

          </Container>
        </div>
            </div>
    );
  }

export default Teams;
