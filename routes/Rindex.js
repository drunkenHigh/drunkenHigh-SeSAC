const controller=require('../controller/Cmain.js')
const controller_rcp=require('../controller/Crecipes.js')
const express = require('express');
const router=express.Router();

router.get('/',controller.main);
router.get('/recipes',controller.getRecipe);
router.post('/write',controller.postRecipe);


module.exports = router;