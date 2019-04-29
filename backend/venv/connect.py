import mysql.connector

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
