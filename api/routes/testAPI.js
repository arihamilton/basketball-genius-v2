var express = require('express');
var router = express.Router();

var easternTeams = require('../public/eastern_teams.json');


router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get('/getEasternTeams', function (req, res) {
    //console.log(easternTeams);
    res.send(easternTeams);
})

router.get("/roster", function(req, res,next) {
  const teamName = req.query.team;
  res.json({teamName: `${teamName}`});
  console.log("hello");
  next();
});

module.exports = router;