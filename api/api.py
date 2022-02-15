from flask import Flask, request, jsonify
from bbrefscrapertools import get_team_roster
from datetime import date
import json

import lyricsgenius
genius = lyricsgenius.Genius()

app = Flask(__name__)


@app.route('/getEasternTeams')
def get_eastern_teams():
    # Opening JSON file
    jsdata = open('static/eastern_teams.json',)

    # returns JSON object as dict
    data = json.load(jsdata)
    return jsonify(data)


# Basketball Reference API

@app.route('/getRoster')
def get_roster():

    current_date = date.today()

    print("hello")

    # ?team=...
    team = request.args.get('team')
    print("team: " + team)
    data = get_team_roster(team, current_date.year)

    data_dict = data.to_dict()

    players = data_dict["PLAYER"]

    print(players)
    return players


# Genius API


@app.route('/getSong')
def get_song():

    # ?player=...
    player = request.args.get('player')
    print("player: " + player)

    songs = genius.search_lyrics(player)

    sections = songs["sections"]
    main_sect = sections[0]
    hits = main_sect["hits"]

    hits_dict = dict(enumerate(hits))

    print(hits_dict)
    return hits_dict

