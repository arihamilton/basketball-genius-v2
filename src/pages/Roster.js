import '../Teams.css';
import TeamSelector from "../components/teamselector";
import {Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = { roster: null };
  }



  getRoster() {

      // get team name from url
      const authResult = new URLSearchParams(window.location.search);
      const team = authResult.get('team')

      // get individual players
      fetch("/getRoster?team=" + team)
          .then(res => res.json())
          .then(res => Object.values(res))
          .then(res => this.setState({ roster: res }));
  }

  componentDidMount() {
      this.getRoster();
  }

  render() {

      console.log("the current state is:");
      console.log(this.state.roster);

      // No state data has been loaded yet, can't render properly
      if (!this.state.roster) {
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
                   {this.state.roster.map(player => <h1>{player}</h1>)}
                   {/*{Object.entries(this.state.roster["PLAYER"]).map(([key, value]) => <h1>{value}</h1>)}*/}
                   {/*</div>*/}
               </Row>

          </Container>
        </div>
    );
  }

}

export default Roster;
