const controller=require('../controller/Cmain.js')
const { setCookie } = require('../controller/Ccookie');
const express = require('express');
const router=express.Router();

// router.get('/', setCookie);
router.get('/',controller.main);

module.exports = router;