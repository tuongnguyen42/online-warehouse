import mysql.connector

# module for accounts #
# replace with current user's information
def cursor_connect():
    cnx = mysql.connector.connect(
    user='root',
    password='Chungu1234',
    host='localhost',
    database='onlinewarehouse'
    )
    cur = cnx.cursor(buffered=True)
    return cur, cnx


def add_account(email, password):
    cursor, cnx  = cursor_connect()
    cursor.execute("SELECT count(*) FROM accounts")
    accounts_size = cursor.fetchone()

    cursor.execute("""SELECT email FROM accounts WHERE email LIKE %s""", (email,))
    print("first query successful\n")
    if not cursor.fetchall():
        print("adding account...")
        cursor.execute("""INSERT INTO accounts (account_id, email, accounts.password) VALUES (%s,%s,%s);""",
                       (str(accounts_size[0]), email, password))
        cnx.commit()
        print("executed")
        return True
    else:
        # email account already exists in database
        print("account already exists")
        return False
    cursor.close()
    cnx.close()


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
