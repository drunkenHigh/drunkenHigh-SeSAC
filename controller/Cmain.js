// 모델 가져오기
const { Recipes, Users, Recipe_Img } = require('../models/Mindex');

// main page
exports.main = async (req, res) => {
    try {
        // 쿼리 파라미터에서 주재료 가져오기
        const { main_ingredient } = req.query

        // getRecipeList 함수 호출 (주재료가 있을 경우 필터링, 없을 경우 모든 레시피 가져오기)
        const recipes = await getRecipeList({ main_ingredient: main_ingredient || '' });

        res.render('index', { recipes });  // 'index' 페이지에 recipes 데이터를 전달
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// 레시피 리스트 가져오기 (전체, 주재료)
exports.getRecipeList = async (filters = {}) => {
    try {
        // 주재료 필터링 (기본값은 빈 객체, 즉 필터링 없음)
        const { main_ingredient } = filters;

        // 주재료가 있을 경우 필터링, 없을 경우 모든 레시피 가져오기
        const whereClause = main_ingredient ? { main_ingredient } : {};

        // 레시피 조회
        const lists = await Recipes.findAll({
            where: whereClause,
            include: [
                {
                    model: Users,
                    attributes: ['user_name']  // 작성자
                },
                {
                    model: Recipe_Img,
                    where: { main_img: 1 },  // 메인 이미지
                    attributes: ['image_url'],
                    required: false  // 이미지가 없을 시에도 가져오기
                }
            ],
            attributes: ['title'],  // 제목
            order: [['createdAt', 'DESC']]  // 최신 레시피부터 정렬
        });

        // 레시피 리스트를 반환
        return lists;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');  
    }
};









