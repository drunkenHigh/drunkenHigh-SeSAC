
const { users } = require('../models/Muser')



    //로그인 
     exports.getLogin = async (req, res) => {

       res.render('user')
    
    }

    exports.postLogin = async (req, res) => {

        console.log(req.body);
        const {user_id, user_pw} = req.body;

       try {

        const login = await users.fineOne({

            where:{
                user_id: user_id,
                user_pw: user_pw
            }
        })

       
        if(login.user_id !== user_id){
         
            return res.status(404),json('등록 되지 않은 사용자 입니다.')

        } 

        if(login.user_pw !== user_pw){
         
            return res.status(404),json('비밀번호를 다시 확인해 주세요.')

        }

        req.session.login = {
            
            user_id : login.user_id,
            user_pw: login.user_pw

        }

        res.json('로그인 성공')
        
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

            res.send('myprofile',{

                user_name: req.body.user_name,
                profile_img: profile_img,
                birth_day:birth_day
            })

          


            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
            

    }