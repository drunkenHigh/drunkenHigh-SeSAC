const controller=require('../controller/Cmain.js')
const controller_rcp=require('../controller/Crecipes.js')
const express = require('express');
const router=express.Router();
<<<<<<< HEAD

router.get('/',controller.main);
router.get('/recipes',controller.getRecipe);
router.post('/write',controller.postRecipe);


=======
router.get('/',controller.main);
router.get('/recipes',controller.getRecipe);
router.post('/write',controller.postRecipe);
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
module.exports = router;