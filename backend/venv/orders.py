import mysql.connector

# module for accounts #
# replace with current user's information
def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='Chungu1234',
    host='localhost',
    database='onlinewarehouse',
    port='3000'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx

# validate if order number exists
def existing_order(order_number):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT * FROM orders WHERE id = %s""", (order_number))
    if cursor.fetchall():
        return True
    else:
        return False

### order history
def new_order(o_id, a_id, items, quantity, tot_price, tot_weight):
    cursor, cnx = cursor_connect()
    try:
        cursor.execute("""INSERT INTO orders (order_id, account_id, items, purchase_time, total_price, total_weight) VALUES (%s,%s,%s,%s,%s,%s)""", 
        (o_id, a_id, items, quantity, tot_price, tot_weight))
        cnx.commit()
        print("new order added")

    except Exception as e:
        print("order unable to be added:")
        print(e.message)
        return False

    return True