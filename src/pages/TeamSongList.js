import logo from '../logo.svg';
import '../TeamSongList.css';
import TeamSelector from "../components/teamselector";
import {Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Outlet, Link } from "react-router-dom";

import loading_img from '../static/images/loading_basketball.svg';
import PageButtons from "../components/PageButton";

class TeamSongList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //     this.getRoster();
  // }

  render() {

    return (
        <div className="App centered img-filter">
          <div className=""/>
          <Container className="justify-content-center">



              <PageButtons className="centered" key="idk" pages={5}/>

          </Container>

        </div>
    );
  }

}

export default TeamSongList;
