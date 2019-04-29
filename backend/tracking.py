import mysql.connector

# module for tracking #
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

# know which warehouse the item comes from
# @param id_item: the item_id of the item used to find the origin warehouse
# @return the warehouse_id from the row of id_item
def check_item_origin(id_item):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT warehouse_id FROM inventory WHERE (inventory_id == %s)""", 
    (id_item,))

    origin = cursor.fetchall()
    cursor.close()
    cnx.close()
    return origin


# fetch address the user put at checkout, and store in tracking table
# @param addy: the address the user put in at checkout
# @param user_id: used to find
# @return 
# tracking_id, order_id, origin, destination, delivery_method, delivery_status
# def fetch_address(addy):
#     cursor, cnx = cursor_connect()



#     cursor.close()
#     cnx.close()


