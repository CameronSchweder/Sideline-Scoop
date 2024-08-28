from chalice import Chalice
import boto3
import requests
import time
from decimal import Decimal

app = Chalice(app_name='api')

dynamodb = boto3.resource('dynamodb')
preseason_table = dynamodb.Table('Team-Preseason-Stats')
regularSeason_table = dynamodb.Table('Team-RegularSeason-Stats')

@app.route('/')
def index():
    return {'hello': 'world'}

@app.route('/team-ids', cors=True, methods=['GET'])
def get_team_ids(): 
   try:
       response = preseason_table.scan()
       items = response.get('Items', [])
       return {"external_api_response" : items}
   except client.exceptions.AccessDeniedException as e:
       print(e.response)

@app.route('/pre-schedule', cors=True, methods=['GET'])
def pre_schedule():
    url = "https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/PRE/schedule.json?api_key=KzddFJFitEnAu5HcWwIE422vAD8UpC29UDP2OoBe"
    response = requests.get(url)

    return {'external_api_response': response.json()}

@app.route('/reg-schedule', cors=True, methods=['GET'])
def reg_schedule():
    url = "https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/REG/schedule.json?api_key=KzddFJFitEnAu5HcWwIE422vAD8UpC29UDP2OoBe"
    response = requests.get(url)
    return {'external_api_response': response.json()}

@app.route('/update-pre-stats', cors=True, methods=['GET'])
def update_pre_stats():
    url = 'https://api.sportradar.com/nfl/official/trial/v7/en/seasons/2024/PRE/standings/season.json?api_key=KzddFJFitEnAu5HcWwIE422vAD8UpC29UDP2OoBe'

    data = requests.get(url).json()

    for conference in data['conferences']:
        for division in conference['divisions']:
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
                            conf = :conference_record,
                            div = :division_record,
                            home = :home_record,
                            road = :road_record,
                            streak = :streak
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
                        ':road_record': f"{road_record.get('wins', 0)}-{road_record.get('losses', 0)}-{road_record.get('ties', 0)}"
                    }
                )
    return {'status': 'success'}

@app.route('/update-reg-stats', cors=True, methods=['GET'])
def update_reg_stats():
    url = 'https://api.sportradar.com/nfl/official/trial/v7/en/seasons/2024/REG/standings/season.json?api_key=KzddFJFitEnAu5HcWwIE422vAD8UpC29UDP2OoBe'

    data = requests.get(url).json()

    for conference in data['conferences']:
        for division in conference['divisions']:
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
                            conf = :conference_record,
                            div = :division_record,
                            home = :home_record,
                            road = :road_record,
                            streak = :streak
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
                        ':road_record': road_record
                    }
                )
    return {'status': 'success'}

#@app.schedule('rate(3 hours)')
#def every_three_hours(event):
#    update_pre_stats()
#    update_reg_stats()