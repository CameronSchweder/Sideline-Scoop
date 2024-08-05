from chalice import Chalice
import requests

app = Chalice(app_name='api')


@app.route('/')
def index():
    return {'hello': 'world'}

@app.route('/pre-schedule', cors=True)
def pre_schedule():
    url = "https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/PRE/schedule.json?api_key=hzXZzzsyrYabtZEC7br1V6zcLZlhJ6VHacTwMWqY"
    response = requests.get(url)
    return {'external_api_response': response.json()}

@app.route('/reg-schedule', cors=True)
def reg_schedule():
    url = "https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/REG/schedule.json?api_key=hzXZzzsyrYabtZEC7br1V6zcLZlhJ6VHacTwMWqY"
    response = requests.get(url)
    return {'external_api_response': response.json()}



