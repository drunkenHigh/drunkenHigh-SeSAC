const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const twoWeeks = 14 * 24 * 60 * 60 * 1000; // 2주

// cookie-parser 미들웨어
app.use(cookieParser());
exports.cookieConfig = {
    httpOnly: false,
    maxAge: twoWeeks,
    signed: false,
}





