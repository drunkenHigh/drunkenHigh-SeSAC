const express = require('express');
const app = express();
const router = require('./routes/Rusers');
const { sequelize } = require('./models/Mindex');
const PORT = 8000;

// view engine 설정
app.set('view engine', 'ejs');
app.set('views', './views');

// Body parser 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 정적 파일 서빙 설정
app.use('/public', express.static(__dirname + '/static'));

// 라우터 설정
app.use('/', router);

// 환경 변수 설정
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '.env')
});  // 기본 .env 파일 로드

dotenv.config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
    override: true,
});  // NODE_ENV에 따라 환경 변수 덮어씌우기

// Sequelize로 데이터베이스 연결
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Database connected!');
            console.log(`Server running in PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
