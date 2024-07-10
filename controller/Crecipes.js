const recipesModel = require('../models/Mrecipe');
const {Recipes,Recipe_Img}= require('../models/Mindex');

exports.getRecipe = (req,res) => {
    res.render('view-test')
    // res.render('recipeWrite');
}

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
    //res.render('recipeWrite');
    console.log('레시피 작성 postRecipe')
}

// 레시피 수정
exports.patchRecipe = (req,res) => {
    res.render('recipeWrite');
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
