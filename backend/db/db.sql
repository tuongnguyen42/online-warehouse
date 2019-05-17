DROP DATABASE IF EXISTS onlinewarehouse;
CREATE DATABASE onlinewarehouse;

USE onlinewarehouse;

DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts(
  account_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(64),
  email VARCHAR(45),
  password VARCHAR(32),
  type VARCHAR(5),
  PRIMARY KEY (account_id, email)
);

DROP TABLE IF EXISTS warehouses;
CREATE TABLE warehouses(
  warehouse_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(40),
  latitude FLOAT(10, 7),
  longitude FLOAT(10, 7),
  PRIMARY KEY (warehouse_id)
);

DROP TABLE IF EXISTS inventory;
CREATE TABLE inventory(
  inventory_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(64),
  price FLOAT(6, 2),
  weight INT UNSIGNED NOT NULL,
  description VARCHAR(200),
  category VARCHAR(64),
  stock INT UNSIGNED NOT NULL,
  warehouse_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (inventory_id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses (warehouse_id)
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders(
  order_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  account_id INT UNSIGNED,
  purchase_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  items TEXT,
  total_price FLOAT(10, 2),
  total_weight INT UNSIGNED NOT NULL,
  lat DECIMAL(10,8) NOT NULL,
  lng DECIMAL(11,8) NOT NULL,
  delivery_status VARCHAR(10),
  delivery_method VARCHAR(10),
  PRIMARY KEY (order_id, account_id),
  FOREIGN KEY (account_id) REFERENCES accounts (account_id) ON DELETE CASCADE
);

INSERT INTO accounts (name, email, password, type)
VALUES ("admin", "admin@gmail.com", "pass", "admin");
