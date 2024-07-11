const express = require('express');
const controller = require('../controller/Crecipes');
const { recipeList, allRecipes } = require('../controller/Cmain');
const router = express.Router();

// 모든 레시피 가져오기
router.get('/recipes', getRecipeListAll);

// 주재료에 대한 레시피 리스트 가져오기
router.get('/recipes/:main_ingredinet', controller.getRecipeListMain);

module.exports = router;