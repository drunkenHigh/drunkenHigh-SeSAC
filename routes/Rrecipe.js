const express = require("express");
const controller = require("../controller/Crecipes");
const controller_img = require("../controller/Crecipes_image");

const mdware = require("../middleware/uploadRecipeImg");
const router = express.Router();

// get /recipe/read?recipe_num=
// get /recipe 레시피 상세보기 페이지
router.get("/read", controller.getRecipe);

// get /recipe 레시피 "작성 화면" 보여주기
router.get("/write", controller.getRecipeWrite);

// post 레시피작성 페이지에서 "작성 완료" 버튼 클릭시
router.post("/write", mdware.upload, controller.postRecipeWrite);

// patch /recipe/update?recipe_num=
router.patch("/update", controller.patchRecipe);

// delete /recipe?recipe_num=
router.delete("/read", controller.deleteRecipe);

module.exports = router;
