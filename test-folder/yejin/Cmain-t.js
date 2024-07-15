// 모델 가져오기
const { Recipes, Users, Recipe_Img } = require('../models/Mindex');
const { setCookie } = require('./Ccookie');

// main page
exports.main = async (req,res) => {
    setCookie(req, res);
    // await this.getRecipeList(req, res);
    // res.render('index');
    res.render('index-test');
}

// 레시피 리스트 가져오기 (전체, 주재료)
exports.getRecipeList = async (req, res) => {
    try {
        const { main_ingredient } = req.params;
        const whereClause = main_ingredient ? { main_ingredient } : {};

        if (main_ingredient) {
            // main_ingredient가 존재할 경우 조건을 추가
            whereClause = { main_ingredient };
        }

        const lists = await Recipes.findAll({
            where: whereClause,
            include: [
                {
                    model: Users,
                    attributes: ['user_name']
                },
                {
                    model: Recipe_Img,
                    where: { main_img: 1 },
                    attributes: ['image_url'],
                    required: false 
                }
            ],
            attributes: ['title'],
            order: [['createdAt', 'DESC']] 
        });
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};






//
// 모든 레시피 가져오기 (이미지, 제목, 작성자)
exports.getRecipeListAll = async (req, res) => {
    try {
        const lists = await Recipes.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['user_name']
                },
                {
                    model: Recipe_Img,
                    where: { main_img: 1 },
                    attributes: ['image_url'],
                    required: false 
                }
            ],
            attributes: ['title'],
            order: [['createdAt', 'DESC']] 
        });
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// 주재료에 대한 레시피 리스트 가져오기 (이미지, 제목, 작성자)
exports.getRecipeListMain = async (req, res) => {
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
                    required: false 
                }
            ],
            attributes: ['title'],
            order: [['createdAt', 'DESC']] 
        });
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

