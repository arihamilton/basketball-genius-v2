import '../Teams.css';
import TeamSelector from "../components/teamselector";
import {Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";

import siteLogo from '../static/images/basketballgenius_logo.png';


class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = { easternTeams: null };
  }

  getEasternTeams() {
      fetch("/getEasternTeams")
          .then(res => res.json())
          .then(res => this.setState({ easternTeams: res }));
  }

  componentDidMount() {
      this.getEasternTeams();
  }

  // render() {
  //   return (
  //       <div className="App">
  //         <header className="App-header">
  //           <img src={logo} className="App-logo" alt="logo"/>
  //           <p>
  //             Edit <code>src/OldApp.js</code> and save to reload.
  //             Also, {this.state.apiResponse}.
  //           </p>
  //           <TeamSelector/>
  //           <a
  //               className="App-link"
  //               href="https://reactjs.org"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //           >
  //             Learn React
  //           </a>
  //         </header>
  //       </div>
  //   );
  // }



  render() {

      // No state data has been loaded yet, can't render properly
      if (!this.state.easternTeams) {
            return <div />
      }

      const bgImages = ["bg-kd", "bg-lebron", "bg-luka", "bg-mj", "bg-russ"]
    const imgIndex = Math.floor(Math.random() * 5);

    return (
        <div className={"centered " + bgImages[imgIndex] + " img-filter bg-image-dark"}>
          <Container className="justify-content-center" fluid="md">

              <Row>
                  <h1>Teams</h1>
              </Row>

               <Row className="d-grid gap-2 d-md-flex justify-content-center mb-lg-3" id="easternRows" xs={2} md={4}>
                   {/*<div className="d-grid gap-2 d-md-flex justify-content-center mb-lg-3" id="easternRows">*/}
                   {this.state.easternTeams.map(teamObj => <Col className="grow" xs={1} md={1}><Link to={"/loading?team=" + teamObj.teamAbbrev}><TeamSelector className="centered" key={teamObj.teamName} team={teamObj}/></Link></Col>)}
                   {/*</div>*/}
               </Row>

          </Container>
        </div>
    );
  }

}

export default Teams;
