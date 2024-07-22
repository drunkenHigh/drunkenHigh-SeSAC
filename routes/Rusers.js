const express = require('express');
const {getUmain,getUsers, postUsers, getLogin, postLogin,getLogout, postChkId, postChkName, getMyprofile, deleteMyprofile, patchMyprofile} = require('../controller/Cusers');
const router = express.Router();
const uploadProfile = require('../middleware/uploadProfile');


// get /users/register
router.get('/register', getUsers);

// post /users/register
router.post('/register', uploadProfile.single('profile_img'), postUsers);

// get /users/login
router.get('/login', getLogin);

// post /users/login
router.post('/login', postLogin);

//post /users/logout
router.get('/logout',getLogout)

// 중복검사
router.post('/register/chkid', postChkId)
router.post('/register/chkName', postChkName)


// get /users/mypage
router.get('/mypage', getMyprofile);

// delete /users/mypage
router.delete('/mypage', deleteMyprofile);

// patch /users/mypage
router.post('/mypage/edit', uploadProfile.single('profile_img'), patchMyprofile);


module.exports = router;