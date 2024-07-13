const { cookieConfig } = require('../middleware/cookie');

// 쿠키 설정
exports.setCookie = (req, res) => {
    const result = req.query.isAdult;
    console.log('User selection:', result);

    if (result === 'yes') {
        res.cookie('age', true, cookieConfig);
    } else {
        res.cookie('age', false, cookieConfig);
    }

    res.redirect('/');  // 쿠키 설정 후 메인 페이지로 리디렉션
};
