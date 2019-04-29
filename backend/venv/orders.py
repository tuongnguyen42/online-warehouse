import mysql.connector

# module for orders #
# replace with database connection info current user's information
def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='Chungu1234',
    host='localhost',
    database='onlinewarehouse',
    # port='3000'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx


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
              "items": order[3],
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
        """SELECT tracking_id, order_id, origin, stopover, address, city, state, zip, delivery_method, delivery_status FROM tracking WHERE order_id=%s""",
        (id,))
    tracking = cursor.fetchall()
    json_tracking = []
    for value in tracking:
        dict = {"tracking_id": value[0],
              "order_id": value[1],
              "origin": value[2],
              "stopover": value[3],
              "address": value[4],
              "city": value[5],
              "state": value[6],
              "zip": value[7],
              "delivery_method": value[8],
              "delivery_status": value[9]
              }
        json_tracking.append(dict)

    cursor.close()
    cnx.close()
    return json_tracking


# get_orders_by_user(1)
# get_tracking_by_order(1234567890)
# validate if order number exists
def existing_order(order_number):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT * FROM orders WHERE id = %s""", (order_number))
    if cursor.fetchall():
        return True
    else:
        return False

### order history
def new_order(a_id, items, tot_price, tot_weight):
    cursor, cnx = cursor_connect()
    try:
        cursor.execute("""INSERT INTO orders (account_id, items, total_price, total_weight) VALUES (%s,%s,%s,%s)""", 
        (a_id, items, tot_price, tot_weight))
        cnx.commit()
        # print("new order added")

    except Exception as e:
        print("order unable to be added:")
        # print(e.message)
        cursor.close()
        cnx.close()
        return False

    cursor.close()
    cnx.close()
    return True

def get_order_by_account(a_id):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT order_id, purchase_time, items, total_price, total_weight FROM orders WHERE account_id = %s ORDER BY purchase_time DESC""", (a_id,))
    
    orders = cursor.fetchall()
    json_orders = []
    
    for order in orders:
        o = {"order_id" : order[0],
             "purchase_time" : order[1],
             "items": order[2],
             "total_price": order[3],
             "total_weight": order[4]
        }
        json_orders.append(o)
    
    cursor.close()
    cnx.close()
    return json_orders

