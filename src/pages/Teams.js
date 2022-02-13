import '../Teams.css';
import TeamSelector from "../components/teamselector";
import {Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

      console.log("the current state is:");
      console.log(this.state.easternTeams);

      // No state data has been loaded yet, can't render properly
      if (!this.state.easternTeams) {
            return <div />
      }

    return (
        <div className="centered">
          <Container className="justify-content-center" fluid="md">

              <Row>
                  <h1>Teams</h1>
              </Row>

               <Row className="d-grid gap-2 d-md-flex justify-content-center mb-lg-3" id="easternRows" xs={2} md={4}>
                   {/*<div className="d-grid gap-2 d-md-flex justify-content-center mb-lg-3" id="easternRows">*/}
                   {this.state.easternTeams.map(teamObj => <Col className="grow" xs={1} md={1}><TeamSelector className="centered" key={teamObj.teamName} team={teamObj}/></Col>)}
                   {/*</div>*/}
               </Row>

          </Container>
        </div>
    );
  }

}

export default Teams;
