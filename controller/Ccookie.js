const { cookieConfig } = require("../middleware/cookie");

// 쿠키 설정
exports.setCookie = (req, res) => {
    const result = req.query.isAdult;
    console.log(result);
    if (result === 'yes') {                     
        res.cookie('age', true, cookieConfig); // localhost:---/?result=yes -> true
    } else {
        res.cookie('age', false, cookieConfig);
    }
    // res.send('Set Cookie!');
};
