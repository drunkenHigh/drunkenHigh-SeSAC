const bcrypt = require('bcrypt')
const salt = 10;

const hashPw =(user_pw) =>{
    return bcrypt.hashSync(password, salt);
};

const comparePw = (user_pw, db_Pw)=>{
    return bcrypt.compareSync(user_pw, db_Pw);
};
