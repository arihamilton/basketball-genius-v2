import logo from '../logo.svg';
import '../Home.css';
import TeamSelector from "../components/teamselector";
import {Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Outlet, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import loading_img from '../static/images/loading_basketball.svg';
import refresh_img from '../static/images/refresh_button.png';

class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingState: "Getting Players...",
                    roster: null,
                    redirect: null
                };
    // get team name from url
    this.authResult = new URLSearchParams(window.location.search);
    this.team = this.authResult.get('team');
    this.completeList = null;
  }


  getRoster() {
      // get individual players
      fetch("/getRoster?team=" + this.team)
          .then(res => res.json())
          .then(res => Object.values(res))
          .then(res => this.setState({ roster: res }))
          .then(res => this.setState({ loadingState: "Getting Songs..." }))
          .then(res => this.getPlayerSongs(res))
          .catch(err => this.setState({ loadingState: "API is down. Please try again :(" }));

  }

  async getPlayerSongs(res) {

      // for all players, get songs

      const songsList = {};

      // If player songs are already stored in cache, remove them from the roster list.
      this.state.roster.forEach(function (player) {
          const playerCache = fetch('/players/' + player, {method: 'GET'}).then(res => res.text()).then(function (value) {
                if (value !== "none") {
                  songsList[player] = playerCache;
              }
            });
              // if (playerCache !== "none") {
              //     songsList[player] = playerCache;
              // }
      });

      // Parallel API calls for each player
      const playerSongs = this.state.roster.map(player => fetch("/getSong?player=" + player));
      const allSongs = await Promise.all(playerSongs).then(res => Promise.all(res.map(res => res.json())))
          .then(res => Object.values(res));

      // Store all player songs into songsList and also put them into cache
      this.state.roster.forEach(function (player, i) {
          songsList[player] = allSongs[i];
          fetch('/players/' + player, {method: 'POST', body: JSON.stringify(allSongs[i])});
      });
      console.log(songsList);
      this.completeList = songsList;

      this.setState({ redirect: "/songList" });
  }

  componentDidMount() {
      this.getRoster();
  }

  render() {

      console.log("the current state is:");
      console.log(this.state.roster);

      if (this.state.redirect) {
    return <Navigate to='/songList' replace={false} state={this.completeList} />
        }

      let loadingButton;
      if (this.state.loadingState === "API is down. Please try again :(") {
          loadingButton = <Link to={"/"}>
              <img className="d-block mx-lg-auto img-fluid imgDropShadow" src={refresh_img}
                     alt="Refresh Image" width="720"/>
          </Link>;
      } else {
          loadingButton = <img className="d-block mx-lg-auto img-fluid imgDropShadow loading-image" src={loading_img}
                     alt="Loading Image" width="720"/>;
      }

    return (
        <div className="App centered bg-image bg-dance img-filter">
          <div className=""/>
          <Container className="justify-content-center">

            {/*Loading Image*/}
            <Row className="mb-5">
              <div>
                  {loadingButton}
              </div>
            </Row>

            {/*Loading Status*/}
            <Row>
              <div className="d-grid gap-2 d-md-flex justify-content-center mb-4 mb-lg-3">
                <h1>{this.state.loadingState}</h1>
              </div>
            </Row>

          </Container>

        </div>
    );
  }

}

export default LoadingPage;
