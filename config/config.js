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
    username: process.env.DATABASE_USER || 'sesac',
    password: process.env.DATABASE_PW || '1234',
    database: process.env.DATABASE_NAME || 'sesac_project1',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: process.env.DIALECT || 'mysql',
};

module.exports = config;
