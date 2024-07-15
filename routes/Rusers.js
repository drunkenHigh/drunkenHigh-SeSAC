const express = require('express');
const {getUsers,postUsers,main} = require('../controller/Cusers');
const router = express.Router();
// get /user/register
router.get('/users/register', getUsers);
// post /user/register
router.post('/users/register', postUsers);
// // get /user/login
// router.get('/users/login', controller.getLogin);
// // post /user/login
// router.post('/users/login', controller.postLogin);
// // post /user/profile
//  router.post('/profile', controller.getUsers);
// // patch /user/profile/edit
// router.patch('/profile/edit', controller.updateUser);
// // delete /user/profile/delete
// router.delete('/profile/delete', controller.deleteUser);
module.exports = router;