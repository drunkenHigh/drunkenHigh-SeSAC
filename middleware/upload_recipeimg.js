const multer = require('multer');
const path = require("path");
console.log("111");

// 이미지 저장하기 

// multer 미들 웨어 등록 
const uploadImage = multer({
    storage: multer.diskStorage({ 
        destination(req, file, done) {
            console.log("uploadImage func");
            done(null, 'uploads/recipe') // 파일을 저장할 경로 
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            console.log("ext >>>>", req.params);
            done(null, path.basename(req.params+'_img0',ext ) + Date.now() + ext); // 저장할 파일명
    
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, //업로드 크기 제한
    });

exports.singleup= uploadImage.fields([{name:'main-image'}, {name:'sub-image-1'}])