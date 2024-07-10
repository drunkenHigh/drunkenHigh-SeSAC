/*
추가: model 불러오기
*/
const { users } = require('../models/Muser')

<<<<<<< HEAD
const USERMODEL = require('../models/Muser');


exports.main = (req, res) => {
    console.log("GET / MAIN")
    res.render('index');
}
=======
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74


        exports.getUsers = (req, res) => {
            console.log("GET / MAIN")
            res.render('users');
        }

    exports.postUsers = async (req, res) => {
    try {
        console.log(req.body)
        const {user_id, user_name, user_pw,birth_day,profile_img} = req.body;
        const newUser = await users.create({
            user_id, user_name, user_pw,birth_day,profile_img
        });

        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    }