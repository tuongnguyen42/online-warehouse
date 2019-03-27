import mysql.connector

## module for inventory ##
# replace with current user's information

def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='Wowerin97!',
    host='localhost',
    database='cs160_project'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx


# adds an item, details include name, description, price, and items in stock
def add_item(name, category, description, price, stock):
    cursor, cnx  = cursor_connect()
    cursor.execute("SELECT count(*) FROM inventory")
    inventory_size = cursor.fetchone()

    cursor.execute("""SELECT * FROM inventory WHERE (item_name LIKE %s) 
                              AND (category LIKE %s) AND (price = %s)""", (name, category, price))
    if not cursor.fetchall():
        cursor.execute("""INSERT INTO inventory (inventory_id, item_name, category, description, price, stock) 
                      VALUES (%s,%s,%s,%s,%s,%s)""", (str(inventory_size[0]), name, category, description, price, stock))
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
    cursor.execute("""SELECT * FROM inventory WHERE category LIKE %s""", (category,))
    items = cursor.fetchall()
    cursor.close()
    cnx.close()
    return items

# tests
print(add_item(cur, "gel pens", "pens", "uses gel ink", 3, 50))

# print(delete_item(cur, "gel pens"))
