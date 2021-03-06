import logo from './logo.svg';
import './Home.css';
import TeamSelector from "./components/teamselector";
import {Component} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import siteLogo from './static/images/basketballgenius_logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  }

  // render() {
  //   return (
  //       <div className="App">
  //         <header className="App-header">
  //           <img src={logo} className="App-logo" alt="logo"/>
  //           <p>
  //             Edit <code>src/App.js</code> and save to reload.
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
    return (
        <div className="App centered bg-image img-filter">
          <div className=""/>
          <Container className="justify-content-center">

            <Row>
              <div>
                <img className="d-block mx-lg-auto img-fluid imgDropShadow" src={siteLogo}
                     alt="BasketballGenius Logo" width="720"/>
              </div>
            </Row>

            <Row>
              <div className="d-grid gap-2 d-md-flex justify-content-center mb-4 mb-lg-3">
                <a href="/roster?team=76ers">
                  <Button type="button" className="btn btn-primary btn-lg rounded-pill">Search for a Team</Button>
                </a>
                <a href="/login">
                  <Button type="button" className="btn btn-primary btn-lg ml-2 rounded-pill">Search for a Player</Button>
                </a>
              </div>
            </Row>

          </Container>

        </div>
    );
  }

}

export default App;
