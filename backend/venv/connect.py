import mysql.connector

def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='password',
    host='localhost',
    database='onlinewarehouse'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx
