const { DataTypes, where } = require('sequelize');
const { sequelize } = require('../models/Mindex');
const UsersModel = require('../models/Muser');
const Users = UsersModel(sequelize, DataTypes);
const { hashPw, comparePw } = require('../middleware/encrypt')
const RecipesModel = require('../models/Mrecipe');
const Recipes = RecipesModel(sequelize, DataTypes);
const RecipesImageModel = require('../models/Mrecipe_img');
const RecipesImg = RecipesImageModel(sequelize, DataTypes);
const {Op} = require('sequelize');
const validator = require('validator');
exports.getLogin = async (req, res) => {
    res.send('login')
}
exports.postLogin = async (req, res) => {
    try {
        const {user_id, user_pw} = req.body;
        const user = await Users.findOne({
            where:{
                user_id
            },
            attributes:['user_id','user_name','user_pw']
        });
        if (!user) {
            return res.status(401).json({ success: false, message: '등록되지 않은 사용자입니다.' });
        }
        // 비밀번호 비교
        const isPasswordValid = await comparePw(user_pw, user.user_pw);
        if (!isPasswordValid) {
            // 비밀번호가 일치하지 않으면 401 에러 응답
            return res.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }else {
            req.session.user = {
                user_id: user.user_id,
                user_name: user.user_name
            };
            req.session.loggedin = true;
            res.json({ success: true });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
//로그아웃
exports.getLogout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error('세션 삭제 오류:', err);
                return res.status(500).json({ message: '세션 삭제 실패' });
            }
            res.clearCookie('connect.sid'); // 세션 쿠키 삭제
            res.redirect('/'); // 로그아웃 후 리다이렉트할 페이지 설정
        });
    } catch (error) {
        console.error('로그아웃 오류:', error);
        res.status(500).json({ message: '로그아웃 실패' });
    }
};
//회원가입(GET)
exports.getUsers = async (req, res) => {

    const isLogin = req.session.loggedin;
   
    if (isLogin) {
        res.redirect('/');  
    } else {
        res.render('register', { isLogin: false });
    }

}
//회원가입(POST)
exports.postUsers = async (req, res) => {
    try {
        const {user_id, user_name, user_pw, birthday} = req.body;
        // 프로필 이미지 초기화
        let profile_img = ''
        // 파일이 업로드 된 경우에만 경로 설정
        if(req.file){
            profile_img = req.file.path
        }
        // 생년월일 형식 변환
        const year = birthday.substring(0, 4); // 연도 추출
        const month = birthday.substring(4, 6); // 월 추출
        const day = birthday.substring(6, 8); // 일 추출
        const formatBirth = `${year}-${month}-${day}`;
        // 중복된 사용자 아이디 확인
        const userInfo = await Users.findOne({
            where: {
                user_id
        }});
        if (userInfo) {
            return res.status(400).json({ success: false, message: '중복된 아이디 입니다.' });
        }
            // 유효성 검사
        if (!validator.isLength(user_id, { min: 6, max: 20 }) || !/^[a-z][a-z0-9]*$/g.test(user_id)) {
            return res.status(400).json({ success: false, message: '아이디는 영문 소문자와 숫자로 이루어진 6~20자리여야 합니다.' });
        }
        if (!validator.isLength(user_pw, { min: 8, max: 16 }) || !/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=])/.test(user_pw)) {
            return res.status(400).json({ success: false, message: '비밀번호는 8~16자의 영문자, 숫자, 특수문자를 포함해야 합니다.' });
        }
        // 회원 생성
        const hashedPw = await hashPw(user_pw); // 비밀번호 암호화
        const newUser = await Users.create({
            user_id, user_name, profile_img, user_pw: hashedPw, birth_day: formatBirth
        });
        res.json({ success: true, newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
// 아이디 중복검사
exports.postChkId = async (req, res) => {
    const { user_id } = req.body
    const chkId = await Users.findOne({
        where : {user_id}
    })
    if(chkId){
        res.status(401).json({success : false})
    } else {
        res.json({success : true})
    }
}
// 닉네임 중복검사
exports.postChkName = async (req, res) => {
    const { user_name } = req.body
    const chkName = await Users.findOne({
        where : {user_name}
    })
    if(chkName){
        res.status(401).json({success : false})
    } else {
        res.json({success : true})
    }
}
// 마이페이지 ---- 태완
// myprofile controller 추가
exports.getMyprofile = async (req, res) => {

    const isLogin = true; //req.session.loggedin;
    if(isLogin) {
        // // session 으로 user 정보 받아오기
        // const user_id = req.session.user_id;
        const user_id = "user2";

    
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
            recipeInfo.write_date = recipe.createdAt;
            recipe_list.push(recipeInfo);
            // console.log("ㅆㄸㄴㅆ >>>>>>>> ", recipe.created_at);
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
                if(imgPath.main_img === 1) {
                    recipeObj.main_img = imgPath.image_url;
                }
            })
        })
        // // -- test --
        // console.log(recipe_list);
        // // ---------
        res.render('myProfile', {
            user_id,
            user_name,
            profile_img,
            recipe_list,
            isLogin
        });
    } else {
        // 로그인 페이지

        res.redirect('/');
    }
   }

   exports.deleteMyprofile = async (req, res) => {
    try {
        const { user_id } = req.body;
        console.log(req.query);
        const isDeleted = await Users.destroy({
            where: { user_id },
        });
        console.log(isDeleted); 

        if (isDeleted) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
   }

    exports.patchMyprofile = async (req, res) => {
        try {

            const { user_id,
                old_pw,
                new_pw,
                user_name } = req.body;
            
            const user = await Users.findOne({
                where:{
                    user_id
                },
                attributes:['user_pw']
            });

            // 비밀번호 비교
            const isPasswordValid = await comparePw(user_pw, user.user_pw);
            if (isPasswordValid) {
                const isUpdated = await Users.update(
                    {
                        user_name,
                        user_pw: hashPw(new_pw)
                    },
                    {
                        where: { user_id }
                    }
                )
            } else {
                return res.send(false)
            }

            
            // 암호화 + 프로필 이미지 + 닉네임 중복검사
            if (isUpdated) {
                return res.send(true);
            } else {
                return res.send(false);
            }
        } catch(err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }