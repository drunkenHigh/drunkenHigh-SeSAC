const controller=require('../controller/Cmain.js')
const controller_rcp=require('../controller/Crecipes.js')
const { setCookie } = require('../controller/Ccookie');
const express = require('express');
const router=express.Router();

router.get('/', setCookie);
router.get('/',controller.main);
router.get('/recipes',controller_rcp.getRecipe);
router.post('/write',controller_rcp.postRecipe);

module.exports = router;