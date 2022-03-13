import os

from flask import Flask, request, jsonify
from bbrefscrapertools import get_team_roster, get_player_picture
from datetime import date
import json

import lyricsgenius
genius = lyricsgenius.Genius()

app = Flask(__name__)

# Basketball Reference API


@app.route('/getEasternTeams')
def get_eastern_teams():
    # Opening JSON file
    jsdata = open('static/eastern_teams.json',)

    # returns JSON object as dict
    data = json.load(jsdata)
    return jsonify(data)

@app.route('/getWesternTeams')
def get_western_teams():
    # Opening JSON file
    jsdata = open('static/western_teams.json',)

    # returns JSON object as dict
    data = json.load(jsdata)
    return jsonify(data)

@app.route('/getRoster')
def get_roster():

    current_date = date.today()

    # ?team=...
    team = request.args.get('team')
    # print("team: " + team)
    data = get_team_roster(team, current_date.year)

    data_dict = data.to_dict()

    players = data_dict["PLAYER"]

    # print(players)
    return players


@app.route('/getHeadshot')
def get_headshot_url():

    # ?player=...
    player = request.args.get('player')
    # print("team: " + team)
    data = get_player_picture(player)

    if data:
        return data

    return ""


# Genius API


@app.route('/getSong')
def get_song():

    # ?player=...
    player = request.args.get('player')
    # print("player: " + player)

    songs = genius.search_lyrics(player)

    sections = songs["sections"]
    main_sect = sections[0]
    hits = main_sect["hits"]

    hits_dict = dict(enumerate(hits))

    # print(hits_dict)
    return hits_dict


# Misc


@app.route('/players/<player>', methods=['GET', 'POST'])
def get_player_cache(player):

    json_url = os.path.join("data", "players.json")
    data_json = json.load(open(json_url))

    if request.method == 'GET':
        if player in data_json:
            return data_json[player]

        return "none"

    elif request.method == 'POST':
        event_data = request.json
        data_json[player] = event_data

    return player
