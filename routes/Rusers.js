const express = require('express');
<<<<<<< HEAD
const controller = require('../controller/Cusers');
const controller_rcp = require('../controller/Crecipes');
=======
const {getUsers,postUsers,main} = require('../controller/Cusers');
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
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