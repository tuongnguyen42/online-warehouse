import os
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS, cross_origin
import accounts
app = Flask(__name__)
CORS(app)


@app.route('/receiver', methods = ['POST'])
@cross_origin()
def worker():
	# read json + reply
	data = request.get_json()

	# TODO: complete conditional logic for response returned
	responseObject = {
		"success": True,
		"msg": "registered"
	}

	print(data)
	return make_response(jsonify(responseObject))


if __name__ == '__main__':
    app.run()
    # To view scripts on a different computer on the same network
    # app.run("0.0.0.0", "5010")
