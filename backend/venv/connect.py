import mysql.connector

def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='#R1k3rdf4t',
    host='localhost',
    database='onlinewarehouse'
    #port='3000'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx