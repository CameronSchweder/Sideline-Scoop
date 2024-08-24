from chalice import Chalice
import requests

app = Chalice(app_name='api')

@app.route('/')
def index():
    return {'hello': 'world'}

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

@app.route('/team-stats/{team_id}', cors=True, methods=['GET'])
def team_stats(team_id):
    url = f"https://api.sportradar.com/nfl/official/trial/v7/en/seasons/2024/PRE/teams/{team_id}/statistics.json?api_key=KzddFJFitEnAu5HcWwIE422vAD8UpC29UDP2OoBe"
    response = requests.get(url)
    return {'external_api_response': response.json()}
    