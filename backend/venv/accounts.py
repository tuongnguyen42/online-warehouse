import mysql.connector

# module for accounts #
# replace with current user's information
def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='password',
    host='localhost',
    database='onlinewarehouse'
    #port='3000'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx


def add_account(name, email, password):
    cursor, cnx  = cursor_connect()

    cursor.execute("""SELECT email FROM accounts WHERE email LIKE %s""", (email,))

    # if email not found in database
    if not cursor.fetchall():
        cursor.execute("""INSERT INTO accounts (name, email, accounts.password, type) VALUES (%s,%s,%s,%s);""",
                       (name, email, password, "user"))
        cnx.commit()
        # print("executed")
        return True
    else:
        # email account already exists in database
        # print("account with that email already exists")
        return False
    cursor.close()
    cnx.close()


def authenticate_user(email, password):
    cursor, cnx  = cursor_connect()
    cursor.execute("SELECT * FROM accounts WHERE email LIKE %s AND password LIKE %s", (email, password))

    if not cursor.fetchall():
        return False
    else:
        return True

def forgot_password(email):
    cursor, cnx  = cursor_connect()
    cursor.execute("""SELECT password FROM accounts WHERE email like %s""", (email,))
    pword = cursor.fetchone()
    if not pword:
        print("no password returned, account does not exist\n")
    else:
        return str(pword[0])
    cursor.close()
    cnx.close()


# tests
# print(add_account(cur, 'foo11@gmail.com', "pword"))
# print(forgot_password(cur, "foo11@gmail.com"))
#
# print("done")
