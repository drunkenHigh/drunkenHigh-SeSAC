const express = require("express");
const controller = require("../controller/Crecipes");
const controller_img = require("../controller/Crecipes_image");
// const { recipeList, allRecipes } = require("../controller/Cmain");

const mdware = require("../middleware/upload_recipeimg");
const router = express.Router();

// 주재료에 대한 레시피 리스트 가져오기
// router.get("/recipes/:main_ingredinet", controller.getRecipeListMain);

// get /recipe 레시피 상세보기 페이지
router.get("/", controller.getRecipe);

// get /recipe 레시피 "작성 화면" 보여주기
router.get("/write", controller.getRecipeWrite);

// post 레시피작성 페이지에서 "작성 완료" 버튼 클릭시
router.post("/write", mdware.uploadFile, controller.postRecipeWrite);
// router.post("/write", controller.postRecipeWrite);

// patch /recipe?recipe_num=
// router.patch('/update', controller.patchRecipe);
router.patch("/:recipe_num", controller.patchRecipe);

// delete /recipe?recipe_num=
router.delete("/delete", controller.deleteRecipe);

module.exports = router;
