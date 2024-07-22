const express = require("express");
const controller = require("../controller/Crecipes");
const controller_img = require("../controller/Crecipes_image");
const {postAlreadyLiked, getLikesCount} = require('../controller/Clikes');

const mdware = require("../middleware/uploadRecipeImg");
const router = express.Router();

// get /recipe/read?recipe_num=1 레시피 상세보기 페이지
router.get("/read", controller.getRecipe);

// 좋아요 추가, 삭제
router.post('/likes/:recipe_num', postAlreadyLiked);

// 좋아요 조회
router.get('/count/:recipe_num', getLikesCount);

// get /recipe 레시피 "작성 화면" 보여주기
router.get("/write", controller.getRecipeWrite);

// get 레시피 수정 페이지
router.get("/write/:recipe_num", controller.getRecipeUpdate);
 
// post 레시피 작성 페이지에서 "저장" 버튼 클릭시
router.post("/write", mdware.upload, controller.postRecipeWrite);

// patch 레시피 수정 페이지에서 "수정하기" 버튼 클릭시
router.post("/update", mdware.upload, controller.patchRecipe);

// delete /recipe/read?recipe_num= "삭제" 버튼 클릭시 
router.delete("/read", controller.deleteRecipe);

module.exports = router;
