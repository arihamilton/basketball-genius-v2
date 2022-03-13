import React, {Component} from "react";
import PageButtons from "./PageButton";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AllPlayerSongs = (props) => {

    const playerEntry = props.player
    const playerName = playerEntry[0];
    const playerSongs = playerEntry[1];

    return (
        <div>


            <Row>
            {/* Player Information */}
            <Col className="m-0 col-2">
              <div>
                  <img className="d-block mx-lg-auto img-fluid imgDropShadow" src={props.portrait}
                     alt="Player Portait" width="200"/>
                  <p>{playerName}</p>
              </div>
            </Col>

            {/* All Player Songs */}
            <Col className="m-0 col-10 container">
              <PageButtons className="centered" key="idk" songs={playerSongs}/>
            </Col>
            </Row>

        </div>
    );
  };

export default AllPlayerSongs;