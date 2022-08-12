CREATE DATABASE phones_database;

CREATE TABLE phones(
    pid SERIAL PRIMARY KEY,
    phone_number NUMERIC,
    code INT
);