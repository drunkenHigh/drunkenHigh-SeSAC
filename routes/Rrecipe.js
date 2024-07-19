const express = require("express");
const controller = require("../controller/Crecipes");
const controller_img = require("../controller/Crecipes_image");
const {postLikes} = require('../controller/Clikes');

const mdware = require("../middleware/uploadRecipeImg");
const router = express.Router();

// get /recipe/read?recipe_num=
// get /recipe 레시피 상세보기 페이지
router.get("/read", controller.getRecipe);

// 좋아요
router.post('/:recipe_num/likes', postLikes);

// get /recipe 레시피 "작성 화면" 보여주기
router.get("/write", controller.getRecipeWrite);

// 수정 버튼클릭시
router.get("/write/:recipe_num", controller.getRecipeUpdate);

// post 레시피작성 페이지에서 "저장" 버튼 클릭시
router.post("/write", mdware.upload, controller.postRecipeWrite);

// patch 레시피수정 페이지에서 "수정하기" 버튼 클릭시
router.patch("/update", controller.patchRecipe);

// delete /recipe?recipe_num=
router.delete("/read", controller.deleteRecipe);

module.exports = router;
