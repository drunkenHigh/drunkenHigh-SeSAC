const express =require('express')
const multer = require('multer'); 
const path = require('path');
const app = express();
app.use('/uploads', express.static(__dirname + '/uploads/profile'));
console.log("middleware connected2.");

 const uploadProfile = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/profile'); // 파일을 저장할 경로
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, req.body.user_id + Date.now() + ext); // 저장할 파일명
        }
    }),

    //크기 제한: 5MB
    limits: { fileSize: 5 * 1024 * 1024 },


    fileFilter: (req, file, cb) => {

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, .jpeg'), false);
        }
    }
});

module.exports = uploadProfile;