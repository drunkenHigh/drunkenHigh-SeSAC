const multer = require("multer");
const path = require("path");

console.log("middleware connected.");



const { Recipes, Recipe_Img, Users } = require("../models/Mindex");

// recipe_num 을 받기 위한 조회
// user_n




// 이미지 저장하기
// multer 미들 웨어 등록
const uploadFile = multer({
    storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/recipe"); // 파일을 저장할 경로
    },
    filename(req, file, done) {
        
        const recipe = Recipes.findOne({
          order: [[ 'createdAt', 'DESC' ]],
          where: { user_num: 2 },
          attributes: ['recipe_num']
        });
        // console.log("asdfadfasfa >>>>> ", recipe.recipe_num);
        const ext = path.extname(file.originalname);
        let fileCount = 0;
        for (const key in req.files) {
          
          fileCount += req.files[key].length;
          done(null, path.basename(`${recipe.recipe_num}-img` + fileCount , ext) + ext); // 저장할 파일명
        }
    },
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