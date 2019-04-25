import mysql.connector
import random
import decimal
import math

## module for inventory ##
# replace with current user's information

def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='password',
    host='localhost',
    database='onlinewarehouse',
    #port='3000'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx


# adds an item, details include name, description, price, items in stock, and warehouse located
def add_item(name, category, description, price, stock, weight, warehouse_id):
    cursor, cnx  = cursor_connect()
    cursor.execute("""SELECT * FROM inventory WHERE (name LIKE %s)
                              AND (category LIKE %s) AND (price = %s)""", (name, category, price))
    if not cursor.fetchall():
        cursor.execute("""INSERT INTO inventory (name, price, weight, description, category, stock, warehouse_id)
                      VALUES (%s,%s,%s,%s,%s,%s,%s)""", (name, price, weight, description, category, stock, warehouse_id))
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


def update_qty(cart):
    cursor, cnx = cursor_connect()
    for i in cart:
        item_id = i['id']
        item_qty = i['qty']
        item = get_item_by_id(item_id)
        current_stock = item['stock']
        updated_stock = int(current_stock) - int(item_qty)

        insert_stmt = (
        "UPDATE inventory SET stock = %s WHERE inventory_id = %s"
        )
        data = (updated_stock, item_id)
        try:
            cursor.execute(insert_stmt, data)
            cnx.commit()
        except mysql.connector.DataError as err:
            return False




    cursor.close()
    cnx.close()
    return True



def get_items_by_category(category, page):
    cursor, cnx = cursor_connect()
    insert_stmt = (
        "SELECT inventory_id, name, price, weight, description, stock, category FROM inventory WHERE category LIKE %s LIMIT 20 OFFSET %s"
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
        it = {"inventory_id":item[0],
              "name": item[1],
              "price": item[2],
              "weight": item[3],
              "description": item[4],
              "stock": item[5],
              "category":item[6],
              }
        json_items.append(it)

    cursor.close()
    cnx.close()
    return json_items


def get_total_pages(category):
    cursor, cnx = cursor_connect()
    cursor.execute("""SELECT COUNT(*) FROM inventory WHERE category LIKE %s GROUP BY category""", (category,))

    count = cursor.fetchall()[0][0]

    cursor.close()
    cnx.close()
    totalPages = math.ceil(count/20);
    return totalPages


def populateInventory():
    categories =["paper", "scissors", "staplers", "binders", "pens", "organizers", "furniture"]
    for i in range(100):
        price = round(random.uniform(0,999), 2)
        add_item("item " + str(i),
                 categories[i%6],
                 "description " + str(i),
                 price,
                 10,
                 random.randint(1,500),
                 random.randint(1,2)
         )


# tests
# cursor_connect()
# populateInventory()
# print(add_item(cur, "gel pens", "pens", "uses gel ink", 3, 50, 2))
# print(delete_item(cur, "gel pens"))
