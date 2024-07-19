const express = require('express');
const session = require('express-session');
const app = express();
const router = require("./routes/Rindex");
const router_rcp = require("./routes/Rrecipe");
const router_users = require('./routes/Rusers');
const { sequelize } = require("./models/Mindex");
const path = require("path");
const dotenv = require("dotenv");


const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload_rcp = multer({ dest: 'uploads/recipe' }); // 파일을 저장할 경로 설정
const upload_user = multer({ dest: 'uploads/profile' }); 
app.set("view engine", "ejs");
app.set("views", "./views");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cookieParser());
app.use("/public", express.static(__dirname + "/static"));
app.use('/uploads', express.static(__dirname + '/uploads'));

const today = new Date()
const expireDate = new Date()
expireDate.setDate(today.getDate() + 1)

app.use(session({
  secret :process.env.COOKIE_SECRET, 
  resave : false, 
  saveUninitialized : false, 
  cookie : {
    httpOnly :true,
    secure : false,
    expires : expireDate
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


// 라우터 등록
app.use("/", router);
app.use('/recipe', router_rcp);
app.use('/users', router_users);
// 404 처리
app.get('*', (req, res) => {
  res.render('404')
})


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