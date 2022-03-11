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
import Image from "react-bootstrap/Image";



function TeamSongList(props) {

    const [headshots, updateHeadshots] = useState([]);

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
                await fetch("/getHeadshot?player=" + playerEntries[i][0]).then(res => res.text()).then(res => (res.length <= 100) ? updateHeadshots(oldArray => [...oldArray, res]) : updateHeadshots(oldArray => [...oldArray, "none"])).catch(() => updateHeadshots(oldArray => [...oldArray, "none"]));
            }
        }
    };

    useEffect(() => {
        getData();
    }, []);


  //console.log(Object.entries(state)[0]);

    // Create navigation buttons for each player
    let playerButtons = [];
      for(let i = 0; i < playerEntries.length; i++){
          playerButtons.push(<Col>
              <Button type="button" className="button btn btn-circle rounded-circle grow">
              <Image src={headshots[i]} className="playerButton" id={playerEntries[i][0]} rounded fluid width="30" height="30"/>
          </Button>
          </Col>);
      }

  let firstPlayer = playerEntries[0];

  let firstPlayerName = firstPlayer[0];
  let firstPlayerSongs = firstPlayer[1];

  let firstSong = firstPlayerSongs[0];



    console.log(headshots)
    return (
        <div className="App centered img-filter">
          <div className=""/>
          <Container className="justify-content-center">

              {/* Player Headshots */}
              <Row>
                  {playerButtons}
              </Row>

              <Row>
              {/* Player Information */}
            <Col className="m-0 col-2">
              <div>
                  <img className="d-block mx-lg-auto img-fluid imgDropShadow" src={headshots[0]}
                     alt="Player Portait" width="200"/>
                  <p>{firstPlayerName}</p>
              </div>
            </Col>

                  {/* All Player Songs */}
              <Col className="m-0 col-10">
              <PageButtons className="centered" key="idk" songs={firstPlayerSongs} pages={5}/>
            </Col>

            </Row>
          </Container>

        </div>
    );
  };


export default TeamSongList;
