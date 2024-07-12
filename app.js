const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const router = require("./routes/Rindex");
const { sequelize } = require("./models/Mindex");
const PORT = 8000;
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/static"));
app.use(cookieParser());
app.use("/", router);
const path = require("path");
const dotenv = require("dotenv");
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
        app.listen(PORT, () => {
            console.log('Database connected!');
            console.log(`Server running in PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err)
    });