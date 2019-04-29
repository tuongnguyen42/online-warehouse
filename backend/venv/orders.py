import mysql.connector

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
    cursor.execute("SELECT order_id, account_id, purchase_time, items, total_price, total_weight FROM orders WHERE account_id = %s",
                   (id,))

    orders = cursor.fetchall()
    json_orders = []
    for order in orders:
        it = {"order_id": order[0],
              "account_id": order[1],
              "purchase_time": order[2],
              "items": order[3],
              "total_price": order[4],
              "total_weight": order[5]
              }
        json_orders.append(it)

    cursor.close()
    cnx.close()
    return json_orders

# get_orders_by_user(1)