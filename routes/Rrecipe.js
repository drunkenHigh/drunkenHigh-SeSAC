const express = require('express');
const controller = require('../controller/Crecipes');
const router = express.Router();



// get /recipes
router.get('/recipes', controller.getRecipe);

// post /user/signin
// router.post('/signin', controller.postSignin);

// // post /user/profile
// router.post('/profile', controller.getUser);

// // patch /user/profile/edit
// router.patch('/profile/edit', controller.updateUser);

// // delete /user/profile/delete
// router.delete('/profile/delete', controller.deleteUser);

module.exports = router;