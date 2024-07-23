const multer = require("multer");
const path = require("path");

console.log("middleware connected.");

const { Recipes, Recipe_Img, Users } = require("../models/Mindex");

// recipe_num 을 받기 위한 조회

// 이미지 저장하기
// multer 미들 웨어 등록
const uploadFile = multer({
  storage: multer.diskStorage({
  destination(req, file, done) {
    done(null, "uploads/recipe"); // 파일을 저장할 경로
  },
  filename: async (req, file, done) => {
    try{
      const recipe = await Recipes.findOne({
        order: [[ 'createdAt', 'DESC' ]],
        attributes: ['recipe_num']
      });

      // const recipeNum = recipe ? recipe.recipe_num + 1 : 1;
      const recipeNum = recipe ? recipe.recipe_num + 1 : "error";
      const ext = path.extname(file.originalname);
      
      let fileCount = 0;
      // 파일 이름 생성
      const filename = `${recipeNum}-` + path.basename(file.originalname, ext) + ext;
      done(null, filename); // 저장할 파일명
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  }),
limits: { fileSize: 100 * 1024 * 1024 }, //업로드 크기 제한
});

exports.upload = uploadFile.fields([
    { name: "main_image" },
    { name: "sub_imgs_1" },
    { name: "sub_imgs_2" },
    { name: "sub_imgs_3" },
    { name: "sub_imgs_4" },
    { name: "sub_imgs_5" },
    { name: "sub_imgs_6" },
    { name: "sub_imgs_7" },
    { name: "sub_imgs_8" },
    { name: "sub_imgs_9" },
    { name: "sub_imgs_10" },
]);

const uploadPatch = multer({
  storage: multer.diskStorage({
  destination(req, file, done) {
    done(null, "uploads/recipe"); // 파일을 저장할 경로
  },
  filename: async (req, file, done) => {
    try{
      const recipe = await Recipes.findOne({
        order: [[ 'createdAt', 'DESC' ]],
        attributes: ['recipe_num']
      });

      // const recipeNum = recipe ? recipe.recipe_num + 1 : 1;
      const recipeNum = recipe ? recipe.recipe_num : "error";
      const ext = path.extname(file.originalname);
      
      let fileCount = 0;
      // 파일 이름 생성
      const filename = `${recipeNum}-` + path.basename(file.originalname, ext) + ext;
      done(null, filename); // 저장할 파일명
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  }),
limits: { fileSize: 100 * 1024 * 1024 }, //업로드 크기 제한
});

exports.uploadpatch = uploadPatch.fields([
    { name: "main_image" },
    { name: "sub_imgs_1" },
    { name: "sub_imgs_2" },
    { name: "sub_imgs_3" },
    { name: "sub_imgs_4" },
    { name: "sub_imgs_5" },
    { name: "sub_imgs_6" },
    { name: "sub_imgs_7" },
    { name: "sub_imgs_8" },
    { name: "sub_imgs_9" },
    { name: "sub_imgs_10" },
]);