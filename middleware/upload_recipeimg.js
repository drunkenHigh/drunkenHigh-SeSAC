const multer = require('multer');
const path = require("path");


// 이미지 저장하기 

// multer 미들 웨어 등록 
const uploadImage = multer({
    storage: multer.diskStorage({ 
        destination(req, file, done) {
            done(null, 'uploads/recipe') // 파일을 저장할 경로 
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            // const recipeStep=req.body.recipeStep;
            done(null, path.basename(req.params.recipe_num + `_img`,ext ) + Date.now() + ext); // 저장할 파일명
    
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, //업로드 크기 제한
    });

// multer 미들 웨어 등록 
const uploadMainImage = multer({
    storage: multer.diskStorage({ 
        destination(req, file, done) {
            done(null, 'uploads/recipe') // 파일을 저장할 경로 
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(req.params+'_img0',ext ) + Date.now() + ext); // 저장할 파일명
    
        },
    }),
    limits: { fileSize: 100 * 1024 * 1024 }, //업로드 크기 제한
    });

exports.singleup= uploadMainImage.single('main-image');