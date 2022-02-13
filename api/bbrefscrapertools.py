from basketball_reference_scraper.teams import get_roster, get_team_misc
from basketball_reference_scraper.players import get_stats, get_player_headshot


def get_team_roster(team, season):
    return get_roster(team, season)


def get_player_picture(player_name):
    return get_player_headshot(player_name)
