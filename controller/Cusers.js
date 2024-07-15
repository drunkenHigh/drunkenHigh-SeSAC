const { DataTypes } = require('sequelize');
const { sequelize } = require('../models/Mindex');
const UsersModel = require('../models/Muser');
const Users = UsersModel(sequelize, DataTypes);
const RecipesModel = require('../models/Mrecipe');
const Recipes = RecipesModel(sequelize, DataTypes);
const RecipesImageModel = require('../models/Mrecipe_img');
const RecipesImg = RecipesImageModel(sequelize, DataTypes);
const {Op} = require('sequelize');
    //로그인
     exports.getLogin = async (req, res) => {
       res.render('user')
    }
    exports.postLogin = async (req, res) => {
       try {
        const {user_id, user_pw} = req.body;
        const user = await Users.findOne({
            where:{
                user_id,
                user_pw
            },
            attributes:['user_id','user_pw','user_name']
        })
        console.log('user ->', user);
         if(!user){
            return res.status(404).json({ message: '등록되지 않은 사용자입니다.' });
         }
        //  req.session.user = {
        //     user_id: user.user_id,
        //     user_name: user.user_name
        //  }
        //  console.log('1111>>>',req.session.user);
        //      res.json(user)
       } catch (error) {
        console.error(error);
         res.status(500).send('Internal Server Error');
       }
    }
    //로그아웃
    exports.postLogout =async (req,res) =>{
        console.log("logout>>>",req.session);
        req.session.destroy();
        res.redirect('/')
    }
    //회원가입(GET)
    exports.getUsers = async (req, res) => {
        res.render('register')
    };
    //회원가입(POST)
    exports.postUsers = async (req, res) => {
        try {
            console.log(req.body)
            const {user_id, user_name, user_pw,birth_day,profile_img} = req.body;
           // 중복된 사용자 아이디 확인
            const existUser = await users.findOne({
                where: {
                    user_id: user_id
                }
            });
            if (existUser) {
                return res.status(400).json('중복된 아이디 입니다.' );
            }
            if (!isValidPassword(user_pw)) {
            return res.status(400).json('비밀번호는 대소문자, 특수문자, 숫자 포함하여 최소 8자 이상이어야 합니다.');
            }
            if (!isValidBirthday(birth_day)) {
            return res.status(400).json('올바른 생일 형식이 아닙니다. (예: YYYY-MM-DD)');
             }
            //회원 생성
            const newUser = await users.create({
                user_id, user_name, profile_img, user_pw, birth_day
            });
            res.json(newUser);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
    }
    // ==================================================
    // 마이페이지 백엔드 부분
    // myprofile controller 추가
    exports.getMyprofile = async (req, res) => {
        //if(req.session.loggedin) {
            // // session 으로 user 정보 받아오기
            // const user_id = req.session.user_id;
            const user_id = "user1";
            // user_name, profile_img 찾기
            const userInfo = await Users.findOne({
                where: {
                    user_id
                }
            })
            const user_num = userInfo.user_num;
            const user_name = userInfo.user_name;
            const profile_img = userInfo.profile_img;
            // array type으로 특정 user의 레시피 목록 불러오기
            const recipeList = await Recipes.findAll({
                where: {
                    user_num
                }
            })
            let recipe_list = [];
            let recipeNumList = [];
            recipeList.forEach((recipe) => {
                let recipeInfo = new Object();
                recipeInfo.recipe_num = recipe.recipe_num;
                recipeNumList.push(recipe.recipe_num);
                recipeInfo.recipe_title = recipe.title;
                recipeInfo.main_ing = recipe.main_ingredient;
                recipeInfo.likes_count = recipe.likes_count;
                recipe_list.push(recipeInfo);
                //console.log(recipe.recipe_num);
            })
            const recipeImg = await RecipesImg.findAll({
                where: {
                    recipe_num: {
                        [Op.in]: recipeNumList
                    }
                }
            })
            // recipe_list 에 각 레시피의 메인 이미지 경로 추가하기
            recipeImg.forEach((imgPath) => {
                recipe_list.forEach((recipeObj) => {
                    recipeObj.main_img = imgPath.image_url;
                })
            })
            // -- test --
            console.log(recipe_list);
            // ---------
            res.render('myProfile', {
                user_id,
                user_name,
                profile_img,
                recipe_list: [
                    {
                        main_img: "main_img_smaple_path",
                        recipe_title: "sample_title",
                        //main_ing,
                        write_data: "2024-00-00"
                    },
                    {
                        main_img: "main_img_smaple_path2",
                        recipe_title: "sample_title2",
                        //main_ing,
                        write_data: "2024-00-002"
                    },
                ]
            });
        // } else {
        //     // 로그인 페이지
        //     res.render('');
        // }
    }