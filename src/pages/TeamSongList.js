import logo from '../logo.svg';
import '../TeamSongList.css';
import TeamSelector from "../components/teamselector";
import React, {Component, useEffect} from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Outlet, Link, useLocation} from "react-router-dom";

import loading_img from '../static/images/loading_basketball.svg';
import PageButtons from "../components/PageButton";
import Col from "react-bootstrap/Col";
import headshot_img from "../static/images/sample_headshot.jpg";
import logo_icon from "../static/images/final_logo.png"
import Image from "react-bootstrap/Image";
import AllPlayerSongs from "../components/AllPlayerSongs";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";



function TeamSongList(props) {

    const [headshots, updateHeadshots] = useState([]);
    const [currentPlayerPage, setPlayerPage] = useState(0);

    const { state } = useLocation();

    const playerEntries = Object.entries(state);


    // Get and store player headshots
    const getData = async () => {

        // Sanitize player names
        for (let i = 0; i < playerEntries.length; i++) {
            playerEntries[i][0] = playerEntries[i][0].replace(' (TW)', '');
        }
        // Fetch all player headshots
        if (headshots.length < playerEntries.length) {
            for (let i = 0; i < playerEntries.length; i++) {
                await fetch("/getHeadshot?player=" + playerEntries[i][0]).then(res => res.text())
                    .then(res => (res.length <= 100) ? updateHeadshots(oldArray => [...oldArray, res]) : updateHeadshots(oldArray => [...oldArray, "none"]))
                    .catch(() => updateHeadshots(oldArray => [...oldArray, "none"]))
                    .then(() => songLists.push(<AllPlayerSongs key="idk" player={playerEntries[i]} portrait={headshots[i]}/>));
            }
        }
        // Fetch all player headshots

    };

    useEffect(() => {
        getData();
    }, []);

    // Create navigation buttons for each player
    let playerButtons = [];
      for(let i = 0; i < playerEntries.length; i++){

          // Only create if player has 1 or more songs
          let playerSongs = playerEntries[i][1];
          if (Object.values(playerSongs).length > 0) {

              playerButtons.push(<Col>
                  <Button type="button" onClick={() => setPlayerPage(i)}
                          className="button btn btn-circle rounded-circle grow">
                      <Image src={headshots[i]} className="playerButton" id={playerEntries[i][0]} rounded fluid
                             width="30" height="30"/>
                  </Button>
              </Col>);

          }
      }

      // Create song lists for each player
    let songLists = [];
        if (songLists.length < playerEntries.length) {
            for (let i = 0; i < playerEntries.length; i++) {
                songLists[i] = (<AllPlayerSongs key="idk" player={playerEntries[i]} portrait={headshots[i]}/>);
            }
        }

    return (
        <div>
        <Navbar bg="light" expand="lg">
  <Container className="justify-content-center">
      <Navbar.Brand href="/"  ><img width="120px" height="auto" className="img-responsive" src={logo_icon} /></Navbar.Brand>
  </Container>
</Navbar>

        <div className="App img-filter">
          <div className=""/>
          <Container className="justify-content-center container-fluid">



              <Row className="my-5 container-fluid">

              {/* Player Songs */}
                  {songLists[currentPlayerPage]}
                  {/*<AllPlayerSongs key="idk" player={playerEntries[0]} portrait={headshots[0]}/>*/}
            </Row>

              {/* Player Headshots */}
              <Row className="my-5 nonstrict-center">
                  {playerButtons}
              </Row>

          </Container>

        </div>

            </div>
    );
  };


export default TeamSongList;
