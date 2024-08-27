from chalice import Chalice
import boto3
import requests
import time

app = Chalice(app_name='api')

TEAM_IDS = [
    "f0e724b0-4cbf-495a-be47-013907608da9", #49ers
    "7b112545-38e6-483c-a55c-96cf6ee49cb8", #Bears
    "ad4ae08f-d808-42d5-a1e6-e9bc4e34d123",
    "768c92aa-75ff-4a43-bcc0-f2798c2e1724",
    "ce92bd47-93d5-4fe9-ada4-0fc681e6caa0",
    "d5a2eb42-8065-4174-ab79-0a6fa820e35e",
    "4254d319-1bc7-4f81-b4ab-b5e6f3402b69",
    "de760528-1dc0-416a-a978-b510d20692ff",
    "1f6dcffb-9823-43cd-9ff4-e7a8466749b5",
]

@app.route('/')
def index():
    return {'hello': 'world'}

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Team-Preseason-Stats')

@app.route('/team-ids', cors=True, methods=['GET'])
def get_team_ids(): 
   try:
       response = table.scan()
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

#@app.route('/pre-team-stats', cors=True, methods=['GET'])
#def team_stats():
#    aggregated_stats = []
#
#    for team_id in TEAM_IDS:
#        url = f"https://api.sportradar.com/nfl/official/trial/v7/en/seasons/2024/PRE/teams/{team_id}/statistics.json?api_key=KzddFJFitEnAu5HcWwIE422vAD8UpC29UDP2OoBe"
#        time.sleep(1.1);
#        response = requests.get(url)
#        if response.status_code == 200:
#            team_stats = response.json()
#            aggregated_stats.append(team_stats)
#        else:
#            return {'error': f"Failed to fetch data for team ID {team_id}"}
        

#    return {'external_api_response': aggregated_stats}

#@app.schedule('rate(1 hour)')
#def every_hour(event):
#    print(event.to_dict())