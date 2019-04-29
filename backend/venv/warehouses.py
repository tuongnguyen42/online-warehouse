import mysql.connector
import random
import decimal
import math

## module for warehouse table ##
# replace with current user's information

def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='#R1k3rdf4t',
    host='localhost',
    database='onlinewarehouse'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx


# adds a warehouse, details include name, description, price, items in stock, and warehouse located
def add_warehouse(name, latitude, longitude):
    cursor, cnx  = cursor_connect()
    cursor.execute("""SELECT * FROM warehouses WHERE (name LIKE %s)
                              AND (latitude LIKE %s) AND (longitude = %s)""", (name, latitude, longitude))
    if not cursor.fetchall():
        cursor.execute("""INSERT INTO warehouses (name, latitude, longitude)
                      VALUES (%s,%s,%s)""", (name, latitude, longitude))
        cnx.commit()
        print("warehouse added\n")
        cursor.close()
        cnx.close()
        return True

    else:
        print("warehouse already exists in warehouses\n")
        cursor.close()
        cnx.close()
        return False


def populateWarehouses():
        add_warehouse("warehouse1",
              37.3047208,
              -121.862952
         )
        add_warehouse("warehouse2",
              37.3346377,
              -121.9819636
        )


populateWarehouses()