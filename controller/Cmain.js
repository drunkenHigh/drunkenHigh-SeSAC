// 모델 가져오기
const { Recipes, Users, Recipe_Img } = require('../models/Mindex');

// main page
exports.main = (req,res) => {
    res.render('index');
}

// 메인 페이지 리스트 (주재료에 대한 이미지, 제목, 작성자 가져오기)
exports.recipeList = async (req, res) => {
    try {
        console.log(req.params.main_ingredient);
        const { main_ingredient } = req.params;

        const lists = await Recipes.findAll({
            where: { main_ingredient },
            include: [
                {
                    model: Users,
                    attributes: ['user_name']
                },
                {
                    model: Recipe_Img,
                    where: { main_img: 1 },
                    attributes: ['image_url'],
                    required: false // 메인 이미지가 없는 레시피도 포함되도록 설정
                }
            ],
            attributes: ['title']
        });
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};