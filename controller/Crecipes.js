const RecipesModel = require('../models/Mrecipe');
const {Recipes,Recipe_Img,Users }= require('../models/Mindex');

// get /recipes?recipe_id=1 레시피 상세보기 페이지 예진
// select * from where rcp_id=?
exports.getRecipe = async(req,res) => {
    try {
        console.log('레시피 상세페이지 >> ',req.query);
        
        // 왜 안되는지 모르겠음 console.log("req.params >> ",req.params);
        const {recipe_num} = req.query;
        const recipe = await Recipes.findOne({
            where : {recipe_num}, // {recipe_num,recipe_num}
            include: [{
                model: Users,
                attributes: ['user_id']
            },
            {
                model: Recipe_Img,
                attributes: ['image_url']
            }
            ],
        });
        res.json(recipe);
        // res.send(`Recipe with ID: ${recipe}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        // console.log('error');
    }
}
/*
app.get('/',(req,res) =>{
    res.render('dynamic',{'title':'동적 폼 전송을 사용해보자 !'})
})
// app.get('/',(req,res)=>{
//     res.render('index',{title:"Home"});
// })
app.get('/getForm',(req,res)=>{
    res.render('submit_result',{title:"Form",uInfo:req.query});
    console.log(req.query);
})

*/
// select * from table
//recipe 상세조회
// exports.getRecipeView = async (req,res) => {
    
//     try {
//         const RECIPES = await RECIPES.findAll(); //findAll : select * from 
//         res.json(RECIPES);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// }

// 레시피 작성
exports.postRecipe = (req,res) => {
    console.log('레시피 작성 postRecipe')
    res.render('recipeWrite');
}

// 레시피 수정
exports.patchRecipe = (req,res) => {
    res.render('view-detail-test');
}

// 레시피 삭제
exports.deleteRecipe = async(req,res)=>{
        try {
            const {player_id} = req.params;
            const isDeleted = await Player.destroy({
                where : {player_id}
            });
            console.log(isDeleted); // 삭제되면 1 , 삭제실패시 0 
    
            if(isDeleted){
                return res.send(true);
            }else{
                return res.send(false);
            }
        } catch (error) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
