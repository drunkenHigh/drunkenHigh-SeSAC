const express = require("express");
const app = express();
const session = require('express-session')
const router = require("./routes/Rindex");
const router_rcp = require("./routes/Rrecipe");
const router_users = require('./routes/Rusers');
const { sequelize } = require("./models/Mindex");
const path = require("path");
const dotenv = require("dotenv");

const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload_rcp = multer({ dest: 'uploads/recipe' }); // 파일을 저장할 경로 설정

app.set("view engine", "ejs");
app.set("views", "./views");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use('/recipe', router_rcp);
app.use('/users', router_users);

app.use(cookieParser());
app.use("/public", express.static(__dirname + "/static"));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(session({
  secret : process.env.COOKIE_SECRET, // 필수 옵션, 세션 암호화하는데 사용하는 키
  resave : false, // 세션이 변경되지 않더라도 매번 덮어쓰기로 저장을 할건지 여부 설정 옵션
  saveUninitialized : false, // 세션을 초기값이 지정되지 않은 상태에서도 처음부터 세션을 생성할 건지 여부 설정 옵션
  // 세션 쿠키 설정(세션관리할 때 클라이언트로 보내는 쿠키)
  cookie : {
      httpOnly : true, // 클라이언트에서 쿠키 확인 X
      secure : false, // http에서 사용가능하도록 true면 https에서만 가능
      maxAge : 60 * 1000 // 단위(ms), expires : 만료기간 설정
  }
}))


dotenv.config({
  path: path.resolve(__dirname, ".env"),
}); // default .env file

dotenv.config({
  // NODE_ENV 따라서 적절한 .env 파일을 로드
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
  override: true,
}); // load env file depending on NODE_ENV

const port = process.env.PORT;
const dbName = process.env.DATABASE_NAME;
const dbPw = process.env.DATABASE_PW;

// app.listen(port, () => {
//   console.log(`Server running...PORT: ${port}`);
//   console.log(`Database name: ${dbName}, Database Password: ${dbPw}`);
// });

// --- sequelize 사용시
// force: true = 서버 실행때마다 테이블을 재생성
// force: false = 서버 실행때마다 테이블이 없으면 생성
sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(port, () => {
            console.log('Database connected!');
            console.log(`Server running in PORT: ${port}`);
        });
    })
    .catch((err) => {
        console.error(err)
    });