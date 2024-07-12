const express = require("express");
const controller = require("../controller/Crecipes");
const { recipeList, allRecipes } = require("../controller/Cmain");
const router = express.Router();
// 주재료에 대한 레시피 리스트 가져오기
// router.get("/:main_ingredinet", controller.getRecipeListMain);
// const uploadImage = multer({
//     storage: multer.diskStorage({
//         destination(req, file, done) {
//             done(null, 'uploads/recipe') // 파일을 저장할 경로
//         },
//         filename(req, file, done) {
//             const ext = path.extname(file.originalname);
//             done(null, path.basename(req.params.recipe_num + '_img1',ext ) + Date.now() + ext); // 저장할 파일명
//         },
//     }),
//     limits: { fileSize: 10 * 1024 * 1024 }, //업로드 크기 제한
//     });
// get /recipes 레시피 작성 버튼 클릭시 페이지로 넘어가기
router.get('/',controller.getRecipe);
router.get("/write", controller.getRecipeWrite);
// post 레시피작성 페이지에서 작성완료 버튼 클릭시
router.post("/write",  controller.postRecipeWrite);
// patch /recipes?recipe_num=
router.patch('/:recipe_num', controller.patchRecipe);
// delete /recipes?recipe_num=
router.delete('/recipes?recipe_num=', controller.deleteRecipe);
module.exports = router;