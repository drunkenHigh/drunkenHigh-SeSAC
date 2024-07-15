const express = require('express');
const {getUsers, postUsers, getLogin, postLogin,postLogout} = require('../controller/Cusers');
const router = express.Router();
const getFileUpload= require('../middleware/uploadProfile')



// get /user/register
router.get('/register', getUsers);
// post /user/register
router.post('/register', postUsers);

// get /user/login
router.get('/login', getLogin);

// post /user/login
router.post('/login', postLogin);

//post /user/logout
router.post('/logout',postLogout)



// // post /user/profile
//  router.post('/profile', controller.getUsers);
// // patch /user/profile/edit
// router.patch('/profile/edit', controller.updateUser);
// // delete /user/profile/delete
// router.delete('/profile/delete', controller.deleteUser);
module.exports = router;