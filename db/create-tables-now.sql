CREATE TYPE "order_status" AS ENUM (
  'find_driver',
  'driver_accept',
  'wait_cooking',
  'in_place',
  'success'
);

CREATE TYPE "payment_option" AS ENUM (
  'cash',
  'banking'
);

CREATE TYPE "type_admin" AS ENUM {
  'root',
  'normal'
}

CREATE TABLE "User" (
  "id_user" varchar PRIMARY KEY,
  "user_name" varchar,
  "password" varchar,
  "address" varchar,
  "phone" varchar,
  "email" varchar,
  "full_name" varchar,
  "avatar_user" varchar,
  "facebook_id" varchar
);

CREATE TABLE "Admin" (
  "id_admin" varchar PRIMARY KEY,
  "user_name" varchar,
  "password" varchar,
  "phone" varchar,
  "address" varchar,
  "avatar_admin" varchar,
  "type_admin" type_admin
);

CREATE TABLE "Order" (
  "id_order" varchar PRIMARY KEY,
  "id_user" varchar,
  "id_driver" varchar,
  "id_store" varchar,
  "status_order" order_status,
  "datetime" date,
  "address" varchar,
  "coupon" varchar,
  "rating" int,
  "payment_option" payment_option
);

CREATE TABLE "Driver" (
  "id_driver" varchar PRIMARY KEY,
  "name_driver" varchar,
  "email" varchar,
  "password" varchar,
  "phone" varchar,
  "address" varchar,
  "bike_number" varchar,
  "avatar_driver" varchar,
  "status" boolean
);

CREATE TABLE "Store" (
  "id_store" varchar PRIMARY KEY,
  "name_store" varchar,
  "address" varchar,
  "avatar_store" varchar,
  "status" boolean,
  "email" varchar,
  "password" varchar
);

CREATE TABLE "Food" (
  "id_food" varchar PRIMARY KEY,
  "name_food" varchar,
  "price_food" varchar,
  "status" boolean,
  "id_store" varchar
);

CREATE TABLE "Detail_Order" (
  "id_food" varchar,
  "name_food" varchar,
  "qty" int,
  "price" int,
  "id_order" varchar
);

CREATE TABLE "History_Order" (
  "id_history" varchar,
  "id_order" varchar,
  "id_driver" varchar,
  "id_user" varchar,
  "datetime" date
);

ALTER TABLE "Food" ADD FOREIGN KEY ("id_store") REFERENCES "Store" ("id_store");

ALTER TABLE "Order" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id_user");

ALTER TABLE "Order" ADD FOREIGN KEY ("id_store") REFERENCES "Store" ("id_store");

ALTER TABLE "Order" ADD FOREIGN KEY ("id_driver") REFERENCES "Driver" ("id_driver");

ALTER TABLE "Detail_Order" ADD FOREIGN KEY ("id_order") REFERENCES "Order" ("id_order");

ALTER TABLE "History_Order" ADD FOREIGN KEY ("id_order") REFERENCES "Order" ("id_order");

ALTER TABLE "History_Order" ADD FOREIGN KEY ("id_driver") REFERENCES "Driver" ("id_driver");

ALTER TABLE "History_Order" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id_user");

ALTER TABLE "Detail_Order" ADD FOREIGN KEY ("id_food") REFERENCES "Food" ("id_food");
