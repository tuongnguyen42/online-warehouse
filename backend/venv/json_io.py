import os
import jwt
import datetime
import json
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS, cross_origin
from accounts import add_account, authenticate_user
from inventory import get_items_by_category, get_item_by_id
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'tempsecretkey'

@app.route('/receiver', methods = ['POST'])
@cross_origin()
def worker():
	# read json + reply
	data = request.get_json()
#	print(data)

	'''if add_account(data.name, data.email, data.password):
		responseObject = {
			"success": True,
			"msg": "registered"
		}'''
	if add_account(data.get('name'), data.get('email'), data.get('password')):
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
	email = data.get('email')
	password = data.get('password')

	if authenticate_user(email, password):
		token = jwt.encode({'user': email, 'pass': password, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours = 24)}, \
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


@app.route('/search', methods = ['POST'])
@cross_origin()
def search():
	data = request.get_json()
	keyword = data.get('keyword')
	items = get_items_by_category(keyword)
	if not items:
		responseObject = {
			"success": False,
			"msg": "no items in that category"
		}
	else:
		responseObject = {
			"success": True,
			"inventory": items
		}
	return make_response(jsonify(responseObject))




@app.route('/search/id', methods = ['POST'])
@cross_origin()
def searchId():
    data = request.get_json()
    pid = data.get('productId')
    item = get_item_by_id(pid)
    print(data)
    print(item)
    if not item:
        responseObject = {
            "success": False,
            "msg": "no item found for that id"
        }
    else:
        responseObject = {
            "success": True,
            "item": item
        }
    return make_response(jsonify(responseObject))


if __name__ == '__main__':
    app.run()
    # To view scripts on a different computer on the same network
    # app.run("0.0.0.0", "5010")
