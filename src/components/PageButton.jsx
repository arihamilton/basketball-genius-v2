import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import album_img from "../static/images/sample_album_img.jpg";

const PageButtons = (props) => {

    let buttons = [];
      for(let i = 0; i < props.pages; i++){
          buttons.push(<Button type="button" className="button btn btn-outline-light btn-sm btn-circle rounded-circle"/>);
      }

  return (
      <div>

            {/* Album Image */}
            <Row className="m-2">
              <div>
                <img className="d-block mx-lg-auto img-fluid imgDropShadow" src={album_img}
                     alt="Album Image" width="720"/>
              </div>
            </Row>

          {/* Lyrics */}
            <Row className="m-4">
              <div className="recognize-breaks">
               <pre>Now can we fall in love <br />While Southernplayalistic banging through the night?<br />(Fall in love, through the night)</pre>
              </div>
            </Row>

          {/* Song Information */}
            <Row className="m-2">
              <div>
               <p>Isaiah Rashad</p>
                  <p>West Savannah</p>
              </div>
            </Row>

          {/* Pagination Buttons */}
          <Row className="m-2">
              <div>
                  <Button type="button" className="button btn bg-transparent btn-sm btn-circle rounded-circle">❮</Button>
          {buttons}
                  <Button type="button" className="button btn bg-transparent btn-sm btn-circle rounded-circle">❯</Button>
                  </div>
            </Row>



      </div>
    );
};

export default PageButtons;