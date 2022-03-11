import React, {Component, useState} from "react";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import album_img from "../static/images/sample_album_img.jpg";

const PageButtons = (props) => {

    const [currentPage, setPage] = useState(0);

    const pages = Object.keys(props.songs).length;

    let buttons = [];
      for(let i = 0; i < pages; i++){
          buttons.push(<Button type="button" onClick={() => setPage(i)} className="button btn btn-outline-light btn-sm btn-circle rounded-circle"/>);
      }

      let allSongDisplays = [];
      for(let i = 0; i < pages; i++){

          let firstSong = props.songs[i];
          let songLyrics = firstSong["highlights"][0]["value"];
          let songArt = firstSong["result"]["song_art_image_url"];
          let songArtists = firstSong["result"]["artist_names"];
          let songTitle = firstSong["result"]["title"];

          allSongDisplays.push(
              <React.Fragment>
              {/* Album Image */}
            <Row className="m-2 h-25">
              <div>
                <img className="d-block  mx-lg-auto align-items-start img-fluid imgDropShadow" src={songArt}
                     alt="Album Image" width="300"/>
              </div>
            </Row>

          {/* Lyrics */}
            <Row className="m-4 align-items-center h-25">
              <div className="recognize-breaks">
               <p className="lyrics">{songLyrics}</p>
              </div>
            </Row>

          {/* Song Information */}
            <Row className="m-2 align-items-end">
              <div>
               <p>{songArtists}</p>
                  <p><b>{songTitle}</b></p>
              </div>
            </Row>
              </React.Fragment>
          );
      }

      // if (currentPage >= pages-1) {
      //     setPage(0)
      // }

  return (

      <div>
            <div className="align-items-center">
            {allSongDisplays[currentPage]}
                </div>

          {/* Pagination Buttons */}
          <Row className="m-2 align-items-end">
              <div>
                  <Button type="button" onClick={() => setPage((currentPage <= 0) ? pages-1 : currentPage-1)} className="button btn bg-transparent btn-sm btn-circle rounded-circle">❮</Button>
          {buttons}
                  <Button type="button" onClick={() => setPage((currentPage+1)%(pages))} className="button btn bg-transparent btn-sm btn-circle rounded-circle">❯</Button>
                  </div>
            </Row>

          <Row>
              <p>{currentPage+1}</p>
          </Row>


      </div>
    );
};

export default PageButtons;