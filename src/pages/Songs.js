import '../Teams.css';
import TeamSelector from "../components/teamselector";
import {Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = { songs: null };
  }



  getRoster() {

      // get team name from url
      const authResult = new URLSearchParams(window.location.search);
      const player = authResult.get('player')

      // get individual players
      fetch("/getSong?player=" + player)
          .then(res => res.json())
          .then(res => Object.values(res))
          .then(res => this.setState({ songs: res }));
  }

  componentDidMount() {
      this.getRoster();
  }

  render() {

      console.log("the current song state is:");
      console.log(this.state.songs);

      // No state data has been loaded yet, can't render properly
      if (!this.state.songs) {
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
                   {this.state.songs.map(song => <h1>{song["highlights"][0]["value"]}</h1>)}
                   {/*{Object.entries(this.state.roster["PLAYER"]).map(([key, value]) => <h1>{value}</h1>)}*/}
                   {/*</div>*/}
               </Row>

          </Container>
        </div>
    );
  }

}

export default Songs;
