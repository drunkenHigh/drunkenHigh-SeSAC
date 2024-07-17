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
            attributes: ['title'],
            order: [['created_at', 'DESC']], // 최신 레시피부터 정렬
        });

        return listsALl;
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
                attributes: ['title'],
                order: [['created_at', 'DESC']], // 최신 레시피부터 정렬
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
                attributes: ['title'],
                order: [['createdat', 'DESC']] 
            });
        }
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
        // res.render('index', { listsALl });
        res.render('index-test', { listsALl });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { main, getRecipeListAll, getRecipeListMain };

