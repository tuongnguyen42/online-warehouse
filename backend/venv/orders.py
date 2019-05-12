from connect import cursor_connect
import json
import googlemaps


def get_orders_by_user(id):
    cursor, cnx = cursor_connect()
    cursor.execute("SELECT order_id, account_id, purchase_time, items, total_price, total_weight FROM orders WHERE account_id=%s",
                   (id,))

    orders = cursor.fetchall()
    json_orders = []
    for order in orders:
        dict = {"order_id": order[0],
              "account_id": order[1],
              "purchase_time": order[2],
              "items": json.loads(order[3]),
              "total_price": order[4],
              "total_weight": order[5]
              }
        json_orders.append(dict)

    cursor.close()
    cnx.close()
    return json_orders

def get_tracking_by_order(id):
    cursor, cnx = cursor_connect()
    cursor.execute(
        """SELECT lat, lng, delivery_method, delivery_status, purchase_time FROM orders WHERE order_id=%s""",
        (id,))
    tracking = cursor.fetchall()
    print(tracking[0])
    if tracking:
        info = {
              "lat":str(tracking[0][0]),
              "lng":str(tracking[0][1]),
              "delivery_status": tracking[0][2],
              "delivery_method": tracking[0][3],
              "purchase_time": tracking[0][4]

              }


    cursor.close()
    cnx.close()
    return info


# get_orders_by_user(1)
# get_tracking_by_order(1234567890)
# validate if order number exists
def existing_order(order_number):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT * FROM orders WHERE id = %s""", (order_number))
    if cursor.fetchall():
        cursor.close()
        cnx.close()
        return True
    else:
        cursor.close()
        cnx.close()
        return False

### order history
def new_order(a_id, items, tot_price, tot_weight, address, delivery_method, delivery_status):
    cursor, cnx = cursor_connect()
    gmaps_key = googlemaps.Client(key = "AIzaSyALPpI2grWR5poDZf4JMpHDLMcAHAwZ6R0")
    geocode = gmaps_key.geocode(address)

    try:
        lng = geocode[0]["geometry"]["location"]["lng"]
        lat = geocode[0]["geometry"]["location"]["lat"]
        cursor.execute("""INSERT INTO orders (account_id, items, total_price, total_weight, lat, lng, delivery_method,  delivery_status) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)""",
        (a_id, items, tot_price, tot_weight, lat, lng, delivery_method, delivery_status))

        cnx.commit()
        # print("new order added")

    except Exception as e:
        print("order unable to be added:")
        print(e)
        cursor.close()
        cnx.close()
        return False

    cursor.close()
    cnx.close()
    return True




# def get_order_by_account(a_id):
#     cursor, cnx = cursor_connect()
#     cursor.execute("""SELECT order_id, purchase_time, items, total_price, total_weight FROM orders WHERE account_id = %s ORDER BY purchase_time DESC""", (a_id,))
#
#     orders = cursor.fetchall()
#     json_orders = []
#
#     for order in orders:
#         o = {"order_id" : order[0],
#              "purchase_time" : order[1],
#              "items": order[2],
#              "total_price": order[3],
#              "total_weight": order[4]
#         }
#         json_orders.append(o)
#
#     cursor.close()
#     cnx.close()
#     return json_orders
