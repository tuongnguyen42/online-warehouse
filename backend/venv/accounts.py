from connect import cursor_connect

def add_account(name, email, password):
    cursor, cnx  = cursor_connect()

    cursor.execute("""SELECT email FROM accounts WHERE email LIKE %s""", (email,))

    # if email not found in database
    if not cursor.fetchall():
        cursor.execute("""INSERT INTO accounts (name, email, accounts.password, type) VALUES (%s,%s,%s,%s);""",
                       (name, email, password, "user"))
        cnx.commit()
        # print("executed")
        cursor.close()
        cnx.close()
        return True
    else:
        # email account already exists in database
        # print("account with that email already exists")
        cursor.close()
        cnx.close()
        return False
    


def authenticate_user(email, password):
    cursor, cnx  = cursor_connect()
    cursor.execute("SELECT * FROM accounts WHERE email LIKE %s AND password LIKE %s", (email, password))

    if not cursor.fetchall():
        cursor.close()
        cnx.close()
        return False
    else:
        cursor.close()
        cnx.close()
        return True

def get_id_by_email(email):
    cursor, cnx  = cursor_connect()
    cursor.execute("SELECT account_id FROM accounts WHERE email=%s", (email,))
    id = cursor.fetchone()

    if not id:
        cursor.close()
        cnx.close()
        return False
    else:
        cursor.close()
        cnx.close()
        return id[0]

def forgot_password(email):
    cursor, cnx  = cursor_connect()
    cursor.execute("""SELECT password FROM accounts WHERE email like %s""", (email,))
    pword = cursor.fetchone()
    if not pword:
        cursor.close()
        cnx.close()
        print("no password returned, account does not exist\n")
    else:
        cursor.close()
        cnx.close()
        return str(pword[0])


# tests
# print(add_account(cur, 'foo11@gmail.com', "pword"))
# print(forgot_password(cur, "foo11@gmail.com"))
#
# print("done")
