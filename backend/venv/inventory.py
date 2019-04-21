import mysql.connector
import random
import decimal
import math

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
    cursor.execute("""SELECT * FROM inventory WHERE (name LIKE %s)
                              AND (category LIKE %s) AND (price = %s)""", (name, category, price))
    if not cursor.fetchall():
        cursor.execute("""INSERT INTO inventory (name, price, weight, description, category, stock, warehouse_id)
                      VALUES (%s,%s,%s,%s,%s,%s, 1)""", (name, price, weight, description, category, stock))
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

def get_item_by_id(inv_id):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT inventory_id, name, price, weight, description, stock FROM inventory WHERE inventory_id=%s""", (inv_id,))

    item = cursor.fetchall()
    if item:
        it = {"id": item[0][0], "name": item[0][1], "price": item[0][2], "weight": item[0][3], "description": item[0][4], "stock": item[0][5]}
    else:
        return None
    cursor.close()
    cnx.close()
    return it

def get_items_by_category(category, page):
    cursor, cnx = cursor_connect()
    # cursor.execute("""SELECT name, price, weight, description, stock, category, inventory_id FROM inventory WHERE category LIKE %s""", (category,))
    # '''if not cursor.fetchall():
    #     return None
    # else:'''
    insert_stmt = (
        "SELECT name, price, weight, description, stock, category, inventory_id FROM inventory WHERE category LIKE %s LIMIT 20 OFFSET %s"

    )
    if page:
        numPage = int(page)
    else:
        numPage = 1


    if(numPage == 1):
        offset = 0
    if(numPage > 1 ):
        offset = (numPage-1)*20+1

    data = (category, offset)
    cursor.execute(insert_stmt, data)
    items = cursor.fetchall()
    json_items = []
    for item in items:
        it = {"name": item[0], "price": item[1], "weight": item[2], "description": item[3], "stock": item[4], "category":item[5], "inventory_id":item[6]}
        json_items.append(it)

    cursor.close()
    cnx.close()
    return json_items

def get_total_pages(category):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT name, price, weight, description, stock, category, inventory_id FROM inventory WHERE category LIKE %s""", (category,))
    '''if not cursor.fetchall():
        return None
    else:'''
    items = cursor.fetchall()

    cursor.close()
    cnx.close()
    totalPages = math.ceil(len(items)/20);
    return totalPages

def populateInventory():
    categories =["paper", "scissors", "staplers", "binders", "pens", "organizers", "furniture"]
    for i in range(100):
        price = round(random.uniform(0,999), 2)
        add_item("item " + str(i), categories[i%6], "description " + str(i), price, 10, random.randint(1,500))







# tests
# cursor_connect()
# populateInventory()
# print(add_item(cur, "gel pens", "pens", "uses gel ink", 3, 50))
# print(delete_item(cur, "gel pens"))
