import os
import jwt
import datetime
import json
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS, cross_origin
from accounts import add_account, authenticate_user, get_id_by_email
from inventory import get_items_by_category, get_item_by_id, get_total_pages, update_qty
from orders import new_order
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'tempsecretkey'

@app.route('/receiver', methods = ['POST'])
@cross_origin()
def worker():
	# read json + reply
	data = request.get_json()

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
		id = get_id_by_email(email)
		token = jwt.encode({'user': email, 'pass': password, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours = 24)}, \
			app.config['SECRET_KEY'])
		responseObject = {
			"success": True,
			"token": token.decode('UTF-8'),
			"user_id":id
			}
		return make_response(jsonify(responseObject))
	else:
		responseObject = {
			"success": False,
			"msg": "Incorrect password!"
		}
		return make_response(jsonify(responseObject))


@app.route('/search', methods = ['POST'])
@cross_origin()
def search():
	data = request.get_json()
	keyword = data.get('keyword')
	page = data.get('page')
	items = get_items_by_category(keyword, page)
	totalPages = get_total_pages(keyword)
	if not items:
		responseObject = {
			"success": False,
			"msg": "no items in that category"
		}
	else:
		responseObject = {
			"success": True,
			"inventory": items,
			"pages":totalPages
		}
	return make_response(jsonify(responseObject))

@app.route('/payment', methods = ['POST'])
@cross_origin()
def processOrder():
	data = request.get_json()
	#cart contains qty and item_id
	cart = data.get('cart')
	# print(cart)
	#user_id used for adding to order history
	user_id = data.get('user_id')
	total = data.get('total')
	weight = data.get('weight')
	if update_qty(json.loads(cart)) and new_order(user_id, cart, total, weight):
		responseObject = {
		"success":True,
		"msg": "Order placed"
		}
	else:
		responseObject = {
		"success": False,
		"msg": "Failed to place order"
		}

	return make_response(jsonify(responseObject))


@app.route('/search/id', methods = ['POST'])
@cross_origin()
def searchId():
    data = request.get_json()
    pid = data.get('productId')
    item = get_item_by_id(pid)
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
