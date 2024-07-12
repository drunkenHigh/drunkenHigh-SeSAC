const express = require('express');
const controller = require('../controller/Crecipes');
const { recipeList, allRecipes } = require('../controller/Cmain');
const router = express.Router();


// 모든 레시피 가져오기
router.get('/recipes', getRecipeListAll);

// 주재료에 대한 레시피 리스트 가져오기
router.get('/recipes/:main_ingredinet', controller.getRecipeListMain);

// get /recipes?recipe_id=1
// router.get('/recipes', controller.getRecipe);
router.get('/:recipe_id', controller.getRecipe);

// post /recipes 레시피 작성 페이지로 넘어가기
router.post('/write', controller.postRecipe);

// patch /recipes?recipe_id=
// router.patch('/recipes?recipe_id=', controller.updateRecipe);

// delete /recipes?recipe_id=
// router.delete('/recipes?recipe_id=', controller.deleteRecipe);

module.exports = router;