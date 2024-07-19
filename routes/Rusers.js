const express = require('express');
const {getUsers, postUsers, getLogin, postLogin,getLogout, postChkId, postChkName, getMyprofile} = require('../controller/Cusers');
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


// get 
router.get('/mypage', getMyprofile);

// delete
router.delete('/mypage')

// // post /user/profile
//  router.post('/profile', controller.getUsers);
// // patch /user/profile/edit
// router.patch('/profile/edit', controller.updateUser);
// // delete /user/profile/delete
// router.delete('/profile/delete', controller.deleteUser);
module.exports = router;