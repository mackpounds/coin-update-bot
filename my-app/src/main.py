from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   #Allow requests from React frontend

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    print("Received data:", data)
    return jsonify({"message": "Data received successfully!"})

@app.route("/coins", methods=['GET'])
def get_coins():
    url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
    headers = {
        'X-CMC_PRO_API_KEY': 'd5c2ded4-4495-4e8b-ba83-aadb0fb03d44',
    }
    try:
        response = requests.get(url, headers=headers)
        data = response.json()
        coins = [coin['name'] for coin in data['data']]
        return jsonify({'coins': coins})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)