import mysql.connector
import random
from random_word import RandomWords

## module for inventory ##
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


# adds an item, details include name, description, price, and items in stock
def add_item(name, category, description, price, stock, weight):
    cursor, cnx  = cursor_connect()
    cursor.execute("SELECT count(*) FROM inventory")
    inventory_size = cursor.fetchone()

    cursor.execute("""SELECT * FROM inventory WHERE (item_name LIKE %s)
                              AND (category LIKE %s) AND (price = %s)""", (name, category, price))
    if not cursor.fetchall():
        cursor.execute("""INSERT INTO inventory (name, price, weight, description, category, stock, warehouse_id)
                      VALUES (%s,%s,%s,%s,%s,%s, 1)""", (str(inventory_size[0]), name, category, description, price, stock))
        cnx.commit()
        print("item added\n")
        return True

    else:
        print("item already exists in inventory\n")
        return False
    cursor.close()
    cnx.close()


def delete_item(name):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT inventory_id FROM inventory WHERE item_name LIKE %s""", (name,))
    item_id = cursor.fetchone()[0]

    if item_id:
        cursor.execute("""DELETE FROM inventory WHERE inventory_id = %s""", (item_id,))
        cnx.commit()
        return True
    else:
        print("failed to remove")
        return False
    cur.close()
    cnx.close()


def get_items_by_category(category):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT name, price, weight, description FROM inventory WHERE category LIKE %s""", (category,))
    if not cursor.fetchall():
        return None
    else:
        items = cursor.fetchall()
        json_items = []
        for item in items:
            it = {"name": item[0], "price": item[1], "weight": item[2], "description": item[3]}
            json_items.append(it)
    cursor.close()
    cnx.close()
    return json_items

# def populateInventory():
#     categories =["Paper","Scissors","Staplers", "binders", "Pens", "Furniture"]
#     for i = 1 to 100:
#         r = RandomWords()
#         add_item(r.get_random_word(), categories[i], r.get_random_word(), random.randint(1,500), 10)







# tests
# print(add_item(cur, "gel pens", "pens", "uses gel ink", 3, 50))
# print(delete_item(cur, "gel pens"))
