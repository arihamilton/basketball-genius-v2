import React, { Component } from "react";
import Image from 'react-bootstrap/Image';

//'<a className="" href=#>' +
//                     '<img src="/static/images/team_logos/' + data.teamName + '.png"' +
//                     ' class = teamButton ' +
//                     'id="' + data.teamAbbrev + '"></a> '


//
// class TeamSelector extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       teamName: "Team",
//       teamAbbrev: "tm",
//       teamLogo: "/static/images/team_logos/76ers.png",
//       test: "hello"
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }
//   handleClick() {
//     // Change code below this line
//     this.setState({
//       name: 'React Rocks!'
//     });
//     // Change code above this line
//   }
//   render() {
//     return (
//       <div>
//         <button onClick={this.handleClick}>Click Me</button>
//         <a className="">
//           <img src={this.state.teamLogo} className="teamButton" id={this.state.teamAbbrev}/>
//         </a>
//         <h1>{this.state.teamName}</h1>
//       </div>
//     );
//   }
// };

const TeamSelector = (props) => {
  const logo = require(`../static/images/team_logos/${props.team["teamName"]}.png`);
  return (
      <div>

          <Image src={logo} className="teamButton" id={props.team["teamAbbrev"]} rounded fluid />

      </div>
    );
};

export default TeamSelector;