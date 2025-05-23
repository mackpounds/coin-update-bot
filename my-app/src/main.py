from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   #Allow requests from React frontend

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    print("Received data:", data)
    return jsonify({"message": "Data received successfully!"})


if __name__ == "__main__":
    app.run(port=5000)