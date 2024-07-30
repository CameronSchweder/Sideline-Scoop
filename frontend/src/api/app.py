from chalice import Chalice

app = Chalice(app_name='api')


@app.route('/')
def index():
    return {'hello': 'world'}

@app.route('/watchlist')
def watchlist():
    stream = {
        "TWTR": [
            "Twitter tweet 1", "Twitter tweet 2"
        ],
        "SQ": [
            "Square Tweet 1", "Square Tweet 2"
        ]
    }
    return {
        'stream': stream
    }
