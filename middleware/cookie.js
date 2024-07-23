const twoWeeks = 14 * 24 * 60 * 60 * 1000; // 2주

exports.cookieConfig = {
    httpOnly: false,
    maxAge: twoWeeks,
    signed: false,
};



