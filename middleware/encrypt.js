const bcrypt = require('bcrypt')

const saltRounds = 10

exports.hashPw = (user_pw) => {
    return bcrypt.hashSync(user_pw, saltRounds)
}

exports.comparePw = (inputPw, originalPw) => {
    return bcrypt.compareSync(inputPw, originalPw) 
}