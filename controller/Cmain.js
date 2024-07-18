// 모델 가져오기
const { Recipes, Users, Recipe_Img } = require('../models/Mindex');

// 전체 레시피 리스트 가져오기 (이미지, 제목, 작성자) // 테스트 완료!!!
const getRecipeListAll = async () => {
    try {
        const listsALl = await Recipes.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['user_name'],
                },
                {
                    model: Recipe_Img,
                    attributes: ['image_url'],
                    where: { main_img: 1 }, // 메인 이미지 필터링
                    required: false, // 이미지가 없어도 레시피를 가져옴
                }
            ],
            attributes: ['title', 'recipe_num'],
            order: [['createdAt', 'DESC']], // 최신 레시피부터 정렬
        });

        // 배열객체 만드는 함수
        const listsData = () =>{
            const data = listsALl.map(ele=>({
                title : ele.dataValues.title,
                recipe_num : ele.dataValues.recipe_num,
                user_name : ele.dataValues.User.user_name,
                image_url : ele.dataValues.Recipe_Imgs[0].dataValues.image_url
            }))

            return data
         }

        const listsDatas = listsData()

        return listsDatas;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};


// 주재료에 대한 레시피 리스트 가져오기 (이미지, 제목, 작성자)
const getRecipeListMain = async (req, res) => {
    try {
        console.log(req.params.main_ingredient);
        const { main_ingredient } = req.params;
        let lists;
        if(main_ingredient==='전체'){
            lists = await Recipes.findAll({
                include: [
                    {
                        model: Users,
                        attributes: ['user_name'],
                    },
                    {
                        model: Recipe_Img,
                        attributes: ['image_url'],
                        where: { main_img: 1 }, // 메인 이미지 필터링
                        required: false, // 이미지가 없어도 레시피를 가져옴
                    }
                ],
                attributes: ['title', 'recipe_num'],
                order: [['createdAt', 'DESC']], // 최신 레시피부터 정렬
            });
        }else{
            lists = await Recipes.findAll({
                where: { main_ingredient },
                include: [
                    {
                        model: Users,
                        attributes: ['user_name']
                    },
                    {
                        model: Recipe_Img,
                        attributes: ['image_url'],
                        where: { main_img: 1 },
                        required: false 
                    }
                ],
                attributes: ['title', 'recipe_num'],
                order: [['createdAt', 'DESC']] 
            });
        }
        console.log(lists);
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// main 페이지
const main = async (req, res) => {
    try {
        const listsALl = await getRecipeListAll();
        console.log('로그인함?',req.session.loggedin);
        res.render('index', { listsALl, isLogin :req.session.loggedin})
    } catch (error) {
        console.error(error);
        res.render('index', { listsALl : null, isLogin : req.session.loggedin})
        // res.status(500).send('Internal Server Error');

    }
};

module.exports = { main, getRecipeListAll, getRecipeListMain };