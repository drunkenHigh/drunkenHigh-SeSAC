const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
})

dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
    override: true,
})

const config = {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PW,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "dialect": process.env.DIALECT
}

module.exports = config;    