from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app = Flask(__name__)

# URI format for mysql: 'mysql://username:password@server/db'
# edit URI w/ your local credentials
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:Wowerin97!@localhost/cs160-project'

db = SQLAlchemy(app)

@app.route('/')
def testdb():
  try:
    f = Account.query.all()
    print(f)
    print("query success")
  except Exception as e:
    print(e)


if __name__ == '__main__':
  app.run(debug=True)


class Account(db.Model):
  __tablename__ = 'accounts'
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  name = db.Column(db.String(64))
  email = db.Column(db.String(45), unique=True)
  password = db.Column(db.String(32), nullable=False)
  acc_type = db.Column(db.String(5))

  def __repr__(self):
    return f"Account('{self.name}', '{self.email}')"


class Warehouse(db.Model):
  __tablename__ = 'warehouses'
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  name = db.Column(db.String(45), nullable=False)
  location = db.Column(db.String(200))

  def __repr__(self):
    return f"Warehouse('{self.name}', '{self.location}')"


class Inventory(db.Model):
  __tablename__ = 'inventory'
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  name = db.Column(db.String(200), nullable=False)
  price = db.Column(db.Float, nullable=False)
  weight = db.Column(db.Integer, nullable=False)
  description = db.Column(db.String(200))
  category = db.Column(db.String(50))
  stock = db.Column(db.Integer)
  warehouse_id = db.Column(db.Integer, db.ForeignKey('warehouses.id'), nullable = False)

  def __repr__(self):
      return f"Inventory('{self.name}', '{self.category}', '{self.weight}')"


class Order(db.Model):
  __tablename__ = 'orders'
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  account_id = db.Column(db.Integer, db.ForeignKey('accounts.id', ondelete='CASCADE'), primary_key=True, nullable=False)
  purchase_time = db.Column(db.DateTime, nullable=False)

  def __repr__(self):
    return f"Order('{self.id}', '{self.purchase_time}')"


class Tracking(db.Model):
  __tablename__ = 'tracking'
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  order_id = db.Column(db.Integer, db.ForeignKey('orders.id', ondelete ='Cascade'), nullable = False)
  origin = db.Column(db.String(200), nullable=False)
  destination = db.Column(db.String(200), nullable=False)
  method = db.Column(db.String(45), nullable=False)
  status = db.Column(db.String(45), nullable=False)

  def __repr__(self):
    return f"Tracking('{self.id}', '{self.order_id}', '{self.destination}', '{self.method}', '{self.status}')"


db.drop_all()
db.create_all()
# tests db connection
testdb()
