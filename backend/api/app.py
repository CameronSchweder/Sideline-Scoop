from chalice import Chalice
import requests

app = Chalice(app_name='api')


@app.route('/')
def index():
    return {'hello': 'world'}

@app.route('/schedule', cors=True)
def schedule():
    url = "https://api.sportradar.com/nfl/official/trial/v7/en/games/2024/PRE/schedule.json?api_key=hzXZzzsyrYabtZEC7br1V6zcLZlhJ6VHacTwMWqY"
    response = requests.get(url)
    return {'external_api_response': response.json()}



