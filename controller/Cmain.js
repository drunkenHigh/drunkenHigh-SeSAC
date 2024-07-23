// 모델 가져오기
const { Recipes, Users, Recipe_Img, Likes, sequelize } = require('../models/Mindex');
const image_path = '/uploads/recipe/';

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
            raw : true
        });
        
        return listsALl;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};


// 좋아요 순으로 리스트 가져오기
const getlikeCountList = async (req, res) =>{
    try {
        const likeLists = await Recipes.findAll({
            include : [
                {
                    model : Recipe_Img,
                    attributes : ['image_url'],
                    where : { main_img : 1 },
                    required : false,
                }, 
            ],
            attributes : [
                'title', 
                'recipe_num',
                [sequelize.literal('(SELECT COUNT(*) FROM Likes WHERE Likes.recipe_num = Recipes.recipe_num)'), 'like_count']
            ],
            order: [[sequelize.literal('like_count'), 'DESC']],
            limit : 10,
            raw : true
        })

        return likeLists;
    } catch(err){
        console.log(err);
        throw new Error('Internal Server Error')
    }
}


// 주재료에 대한 레시피 리스트 가져오기 (이미지, 제목, 작성자)
const getRecipeListMain = async (req, res) => {
    try {
        console.log(req.params.main_ingredient);
        const { main_ingredient } = req.params;
        let lists;
        if(main_ingredient==='all'){
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
                raw : true
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
                order: [['createdAt', 'DESC']],
                raw : true 
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
        const bestLists = await getlikeCountList();
        res.render('index', { listsALl, isLogin :req.session.loggedin, image_path, bestLists})
    } catch (error) {
        console.error(error);
        res.render('index', { listsALl : null, isLogin : req.session.loggedin, image_path})
    }
};

module.exports = { main, getRecipeListAll, getRecipeListMain };