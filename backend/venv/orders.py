import mysql.connector

# module for orders #
# replace with database connection info current user's information
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
        cursor.close()
        cnx.close()
        return True
    else:
        cursor.close()
        cnx.close()
        return False

### order history
def new_order(a_id, items, quantity, tot_price, tot_weight):
    cursor, cnx = cursor_connect()
    try:
        cursor.execute("""INSERT INTO orders (account_id, items, total_price, total_weight) VALUES (%s,%s,%s,%s)""", 
        (a_id, items, tot_price, tot_weight))
        cnx.commit()
        print("new order added")

    except Exception as e:
        print("order unable to be added:")
        cursor.close()
        cnx.close()
        return False

    cursor.close()
    cnx.close()
    return True

