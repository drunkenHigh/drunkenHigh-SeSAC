const {main} =require('../controller/Cmain.js')
const {setCookie} = require('../controller/Ccookie');
const {getRecipeList} = require('../controller/Cmain.js');
const express = require('express');
const router=express.Router();

// main
router.get('/', main);

// 쿠키 설정
router.get('/setCookie', setCookie);

// (전체, 주재료) 레시피 리스트 
// router.get('/:main_ingredient?', getRecipeList);

module.exports = router;