from chalice import Chalice
import boto3
from boto3.dynamodb.conditions import Key
import requests
import time
from decimal import Decimal

app = Chalice(app_name='api')

dynamodb = boto3.resource('dynamodb')
preseason_table = dynamodb.Table('Team-Preseason-Stats')
regularSeason_table = dynamodb.Table('Team-RegularSeason-Stats')
preseasonGames_table = dynamodb.Table('Game-Preseason-Info')
regularSeasonGames_table = dynamodb.Table('Game-RegularSeason-Info')

@app.route('/')
def index():
    return {'hello': 'world'}

def convert_decimal_to_int(item):
    for key, value in item.items():
        if isinstance(value, Decimal):
            item[key] = int(value)
        elif isinstance(value, dict):
            convert_decimal_to_int(value)
        elif isinstance(value, list):
            for i in value:
                convert_decimal_to_int(i)
    return item

@app.route('/pre-team-stats', cors=True, methods=['GET'])
def get_pre_team_stats(): 
   try:
       response = preseason_table.scan()
       items = response.get('Items', [])
       return {"team_stats" : items}
   except client.exceptions.AccessDeniedException as e:
       print(e.response)

@app.route('/reg-team-stats', cors=True, methods=['GET'])
def get_reg_team_stats(): 
   try:
       response = regularSeason_table.scan()
       items = response.get('Items', [])
       return {"team_stats" : items}
   except client.exceptions.AccessDeniedException as e:
       print(e.response)

@app.route('/pre-schedule', cors=True, methods=['GET'])
def get_pre_schedule():
    try:
        response = preseasonGames_table.scan()
        items = response.get('Items', [])

        items = [convert_decimal_to_int(item) for item in items]

        # Sort the games by scheduled date
        sorted_items = sorted(items, key=lambda x: x['scheduled'])

        transformed_data = {"weeks": {}}
        for item in sorted_items:
            week_number = item.get('week', 0)
            if week_number not in transformed_data["weeks"]:
                transformed_data["weeks"][week_number] = {"games": []}
            
            game_data = {
                "gameId": item['gameId'],
                "scheduled": item['scheduled'],
                "venue": item['venue'],
                "homeTeam": item['homeTeam'],
                "awayTeam": item['awayTeam'],
                "homePoints": item['homePoints'],
                "awayPoints": item['awayPoints'],
                "network": item.get('network', "NFL+")
            }
            transformed_data["weeks"][week_number]["games"].append(game_data)
        
        return transformed_data
    except client.exceptions.AccessDeniedException as e:
       print(e.response)

@app.route('/reg-schedule', cors=True, methods=['GET'])
def reg_schedule():
    try:
        response = regularSeasonGames_table.scan()
        items = response.get('Items', [])

        items = [convert_decimal_to_int(item) for item in items]

        # Sort the games by scheduled date
        sorted_items = sorted(items, key=lambda x: x['scheduled'])

        transformed_data = {"weeks": {}}
        for item in sorted_items:
            week_number = item.get('week', 0)
            if week_number not in transformed_data["weeks"]:
                transformed_data["weeks"][week_number] = {"games": []}
            
            game_data = {
                "gameId": item['gameId'],
                "scheduled": item['scheduled'],
                "venue": item['venue'],
                "homeTeam": item['homeTeam'],
                "awayTeam": item['awayTeam'],
                "homePoints": item['homePoints'],
                "awayPoints": item['awayPoints'],
                "network": item.get('network', "NFL+")
            }
            transformed_data["weeks"][week_number]["games"].append(game_data)
        
        return transformed_data
    except client.exceptions.AccessDeniedException as e:
       print(e.response)

@app.route('/update-pre-stats', cors=True, methods=['GET'])
def update_pre_stats():
    teamStatsUrl = 'https://api.sportradar.com/nfl/official/trial/v7/en/seasons/2024/PRE/standings/season.json?api_key=MXJWTM2ffAdb6bUWBYzk84HuL2I9Qrm5ygJemom9'
    preseasonGamesUrl = "https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/PRE/schedule.json?api_key=MXJWTM2ffAdb6bUWBYzk84HuL2I9Qrm5ygJemom9"

    preseasonGamesData = requests.get(preseasonGamesUrl).json() 

    for week in preseasonGamesData['weeks']:
        week_number = week['sequence']
        for game in week['games']:
            game_id = game['id']
            scheduled = game['scheduled']
            venue = game['venue']['name']
            home_team = game['home']['alias']
            away_team = game['away']['alias']
            home_points = game['scoring']['home_points']
            away_points = game['scoring']['away_points']
            network = "NFL+"
            if 'broadcast' in game:
                network = game['broadcast']['network']

            preseasonGames_table.update_item(
                    Key={'gameId': game_id},
                    UpdateExpression="""
                        SET scheduled = :scheduled,
                            venue = :venue,
                            homeTeam = :home_team,
                            awayTeam = :away_team,
                            network = :network,
                            homePoints = :home_points,
                            awayPoints = :away_points,
                            week = :week_number
                    """,
                    ExpressionAttributeValues={
                        ':scheduled': scheduled,
                        ':venue': venue,
                        ':home_team': home_team,
                        ':away_team': away_team,
                        ':network': network,
                        ':home_points': home_points,
                        ':away_points': away_points,
                        ':week_number': week_number
                    }
                )

    teamStatsData = requests.get(teamStatsUrl).json()

    for conference in teamStatsData['conferences']:
        conf = conference['name']
        for division in conference['divisions']:
            div = division['name']
            for team in division['teams']:
                team_id = team['id']
                wins = team['wins']
                losses = team['losses']
                ties = team['ties']
                pct = Decimal(str(team['win_pct']))
                points_for = team['points_for']
                points_against = team['points_against']
                diff = points_for - points_against

                conference_record = next((record for record in team['records'] if record['category'] == 'conference'), {})
                division_record = next((record for record in team['records'] if record['category'] == 'division'), {})
                home_record = next((record for record in team['records'] if record['category'] == 'home'), {})
                road_record = next((record for record in team['records'] if record['category'] == 'road'), {})

                streak_description = team['streak']['desc']
                streak = f"{streak_description.split()[0][0].upper()}{streak_description.split()[1]}"

                confRank = team['rank']['conference']
                divRank = team['rank']['division']

                preseason_table.update_item(
                    Key={'teamId': team_id},
                    UpdateExpression="""
                        SET wins = :wins,
                            losses = :losses,
                            ties = :ties,
                            PCT = :pct,
                            PF = :points_for,
                            PA = :points_against,
                            diff = :diff,
                            confRecord = :conference_record,
                            divRecord = :division_record,
                            home = :home_record,
                            road = :road_record,
                            streak = :streak,
                            conf = :conf,
                            div = :div,
                            confRank = :confRank,
                            divRank = :divRank
                    """,
                    ExpressionAttributeValues={
                        ':wins': wins,
                        ':losses': losses,
                        ':ties': ties,
                        ':pct': pct,
                        ':points_for': points_for,
                        ':points_against': points_against,
                        ':diff': diff,
                        ':streak': streak,
                        ':conference_record': f"{conference_record.get('wins', 0)}-{conference_record.get('losses', 0)}-{conference_record.get('ties', 0)}",
                        ':division_record': f"{division_record.get('wins', 0)}-{division_record.get('losses', 0)}-{division_record.get('ties', 0)}",
                        ':home_record': f"{home_record.get('wins', 0)}-{home_record.get('losses', 0)}-{home_record.get('ties', 0)}",
                        ':road_record': f"{road_record.get('wins', 0)}-{road_record.get('losses', 0)}-{road_record.get('ties', 0)}",
                        ':conf': conf,
                        ':div': div,
                        ':confRank': confRank,
                        ':divRank': divRank
                    }
                )
    return {'status': 'success'}

@app.route('/update-reg-stats', cors=True, methods=['GET'])
def update_reg_stats():
    teamStatsUrl = 'https://api.sportradar.com/nfl/official/trial/v7/en/seasons/2024/REG/standings/season.json?api_key=MXJWTM2ffAdb6bUWBYzk84HuL2I9Qrm5ygJemom9'
    regularSeasonGamesUrl = 'https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/REG/schedule.json?api_key=MXJWTM2ffAdb6bUWBYzk84HuL2I9Qrm5ygJemom9'

    regularSeasonGamesData = requests.get(regularSeasonGamesUrl).json() 

    for week in regularSeasonGamesData['weeks']:
        week_number = week['sequence']
        for game in week['games']:
            game_id = game['id']
            scheduled = game['scheduled']
            venue = game['venue']['name']
            home_team = game['home']['alias']
            away_team = game['away']['alias']
            
            home_points = away_points = ""
            if 'scoring' in game:
                home_points = game['scoring']['home_points']
                away_points = game['scoring']['away_points']

            network = "TBD"
            if 'broadcast' in game:
                network = game['broadcast']['network']

            regularSeasonGames_table.update_item(
                    Key={'gameId': game_id},
                    UpdateExpression="""
                        SET scheduled = :scheduled,
                            venue = :venue,
                            homeTeam = :home_team,
                            awayTeam = :away_team,
                            network = :network,
                            homePoints = :home_points,
                            awayPoints = :away_points,
                            week = :week_number
                    """,
                    ExpressionAttributeValues={
                        ':scheduled': scheduled,
                        ':venue': venue,
                        ':home_team': home_team,
                        ':away_team': away_team,
                        ':network': network,
                        ':home_points': home_points,
                        ':away_points': away_points,
                        ':week_number': week_number
                    }
                )

    teamStatsData = requests.get(teamStatsUrl).json()

    for conference in teamStatsData['conferences']:
        conf = conference['name']
        for division in conference['divisions']:
            div = division['name']
            for team in division['teams']:
                team_id = team['id']
                wins = team['wins']
                losses = team['losses']
                ties = team['ties']
                pct = Decimal(str(team['win_pct']))
                points_for = team.get('points_for', 0)
                points_against = team.get('points_against', 0)
                diff = points_for - points_against

                # Set records to 0-0-0 if no records are present (No game has been played yet)
                conference_record = "0-0-0"
                division_record = "0-0-0"
                home_record = "0-0-0"
                road_record = "0-0-0"

                if 'records' in team:
                    conference_record = next((f"{record['wins']}-{record['losses']}-{record['ties']}" for record in team['records'] if record['category'] == 'conference'), "0-0-0")

                    division_record = next((f"{record['wins']}-{record['losses']}-{record['ties']}" for record in team['records'] if record['category'] == 'division'), "0-0-0")

                    home_record = next((f"{record['wins']}-{record['losses']}-{record['ties']}" for record in team['records'] if record['category'] == 'home'), "0-0-0")

                    road_record = next((f"{record['wins']}-{record['losses']}-{record['ties']}" for record in team['records'] if record['category'] == 'road'), "0-0-0")

                # Set streak to - if streak is not present (No game has been played yet)
                streak = "-"

                if 'streak' in team:
                    streak_description = team['streak']['desc']
                    streak = f"{streak_description.split()[0][0].upper()}{streak_description.split()[1]}"

                # Set conference and division rank to 1 if not present (No game has been played yet)
                confRank = divRank = "1"

                if 'rank' in team:
                    confRank = team['rank']['conference']
                    divRank = team['rank']['division']

                regularSeason_table.update_item(
                    Key={'teamId': team_id},
                    UpdateExpression="""
                        SET wins = :wins,
                            losses = :losses,
                            ties = :ties,
                            PCT = :pct,
                            PF = :points_for,
                            PA = :points_against,
                            diff = :diff,
                            confRecord = :conference_record,
                            divRecord = :division_record,
                            home = :home_record,
                            road = :road_record,
                            streak = :streak,
                            conf = :conf,
                            div = :div,
                            confRank = :confRank,
                            divRank = :divRank
                    """,
                    ExpressionAttributeValues={
                        ':wins': wins,
                        ':losses': losses,
                        ':ties': ties,
                        ':pct': pct,
                        ':points_for': points_for,
                        ':points_against': points_against,
                        ':diff': diff,
                        ':streak': streak,
                        ':conference_record': conference_record,
                        ':division_record': division_record,
                        ':home_record': home_record,
                        ':road_record': road_record,
                        ':conf': conf,
                        ':div': div,
                        ':confRank': confRank,
                        ':divRank': divRank
                    }
                )
    return {'status': 'success'}

#@app.schedule('rate(3 hours)')
#def every_three_hours(event):
#    update_pre_stats()
#    update_reg_stats()