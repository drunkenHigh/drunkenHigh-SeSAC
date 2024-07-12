
const { users } = require('../models/Muser')
exports.getUsers = (req, res) => {
    console.log("GET / MAIN")
    res.render('users');
}


    //로그인 
     exports.getLogin = async (req, res) => {

       res.render('/')
    
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

        if(login) {

            req.session.user_id = login.user_id
            req.session.user_pw= login.user_pw

            res.json("로그인 성공")

        }else{

            res.status(404).json('로그인 실패')
        }
        
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



    //회원가입
    exports.getUsers = async (req, res) => {
      
        try {
            const { user_id } = req.body;

            const existUser = await users.findOne({
               
                where: {
                    user_id: user_id
                }
            });

            // 사용자 아이디가 이미 존재하는 경우
            if (existUser) {
                return res.status(400).json('중복된 아이디 입니다.' );
            }

            // 사용자 아이디가 존재하지 않는 경우 (중복되지 않은 경우)
            return res.status(200).json('사용 가능한 아이디 입니다.');

          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
         }
    };


            exports.postUsers = async (req, res) => {
          
                try {

                console.log(req.body)

                const {user_id, user_name, user_pw,birth_day,profile_img} = req.body;
            
                const newUser = await users.create({
                    user_id, user_name, profile_img, user_pw, birth_day
                });

                res.json(newUser);

            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }

        }
