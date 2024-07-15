const controller=require('../controller/Cmain.js')
const controller_rcp=require('../controller/Crecipes.js')
const express = require('express');
const router=express.Router();

router.get('/',controller.main);
router.get('/recipes',controller_rcp.getRecipe);
router.post('/write',controller_rcp.postRecipe);


module.exports = router;