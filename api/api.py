from flask import Flask, render_template, url_for, flash, redirect, request, jsonify
# from bbrefscrapertools import get_team_roster, get_player_picture
import json

app = Flask(__name__)


@app.route('/getEasternTeams')
def get_eastern_teams():
    # Opening JSON file
    jsdata = open('static/eastern_teams.json',)

    # returns JSON object as dict
    data = json.load(jsdata)
    return jsonify(data)

