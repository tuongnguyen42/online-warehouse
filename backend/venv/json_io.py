import os
import jwt
import datetime
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS, cross_origin
from accounts import add_account, authenticate_user
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'tempsecretkey'

@app.route('/receiver', methods = ['POST'])
@cross_origin()
def worker():
	# read json + reply
	data = request.get_json()

	if add_account(data.name, data.email, data.password):
		responseObject = {
			"success": True,
			"msg": "registered"
		}
	else:
		responseObject = {
		"success": False,
		"msg": "account with that email exists"
		}
	return make_response(jsonify(responseObject))

@app.route('/authenticate', methods = ['POST'])
@cross_origin()
def login():
	data = request.get_json()

	if authenticate_user(data.email, data.password):
		token = jwt.encode({'user': data.email, 'pass': data.password, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours = 24)}, \
			app.config['SECRET_KEY'])

		responseObject = {
			"success": True,
			"token": token.decode('UTF-8')
		}
		return make_response(jsonify(responseObject))
	else:
		responseObject = {
			"success": False,
			"msg": "login failed"
		}
		return make_response(jsonify(responseObject))

if __name__ == '__main__':
    app.run()
    # To view scripts on a different computer on the same network
    # app.run("0.0.0.0", "5010")
