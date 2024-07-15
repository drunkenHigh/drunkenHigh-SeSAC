const RecipesModel = require('../models/Mrecipe');
const Recipe_Img_Model = require('../models/Mrecipe_img');
const express = require('express');

const {Recipes,Recipe_Img,Users }= require('../models/Mindex');

// get /recipes?recipe_num=1 레시피 상세보기 페이지 - 완
// select * from where rcp_id=?
exports.getRecipe = async(req,res) => {
    try {
        console.log('레시피 상세페이지 >> ',req.query);
        
        const {recipe_num} = req.query;
        const recipe = await Recipes.findOne({
            where : {recipe_num}, 
            include: [{
                model: Users,
                attributes: ['user_id']
            },
            {
                model: Recipe_Img,
                attributes: ['image_url']
            }
            ],
        });
        res.render('view-detail-test',{title:'레시피 상세페이지',rcpInfo:recipe})        
        // res.json(recipe)
        /*
  "recipe_num": 1,
  "user_num": 1,
  "title": "레몬 짐빔 레시피",
  "content": "1. 우선 재료를 준비한다.",
  "likes_count": 5,
  "main_ingredient": "하이볼",
  "main_ing_detail": "짐빔_버본 토닉워터",
  "sub_ingredient_detail": "콜라 물",
  "user": {
    "user_id": "user"
  },
  "Recipe_Imgs": [
    {
      "image_url": "/uploads/recipe/1_img1.png"
    }
  ]
}
        */
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        // console.log('error');
    }
}

// 레시피 작성 버튼 클릭시  - 완
exports.getRecipeWrite = (req,res) => {
    // res.render('recipeWrite',{title:'글 작성'});
    res.render('write-detail-test',{title:'글 작성'});
}

// 레시피 작성페이지에서 저장 버튼 클릭시
exports.postRecipeWrite = async(req,res) => {
    try {
        console.log('레시피 저장 버튼 클릭 postRecipe >> \n', req.body);
        /*
        {
  title: '제목',
  content: '<div><div>Step 1</div><div>1</div></div>',
  main_ingredient: 'vodka',
  main_ing_detail: '잭다니엘',
  main_img: {},
  sub_imgs: [ {} ],
  recipeStep: 2
}
        */
        // const { title, content, main_ingredient, main_ing_detail, 
            // sub_ingredient_detail, thumnail_num, recipeStep , mainImage } = req.body;
        // const {main_img, sub_imgs} =
        console.log("image file path >>> ",req.files);
        
        
                /*
            if(req.file){
                const mainImagePath = req.file.path;
                Recipe_Img_Model.image_url =req.file.path;
                Recipe_Img_Model.recipe_num=recipe_num;
                res.send('upload successed!');
            }
        });
        
        sub_imgs.forEach(() => {
            upload.single(`sub-image-${recipeStep}`)
            console.log("recipeSubImgs >> ",recipeSubImgs);
        });
*/
        // 데이터베이스에 저장

        const post = await Recipe_Model.findByPk(req.body.recipe_num);
        const newRecipe = await Recipes.create({
            title : title,
            user_num :1,
            content,
            main_ingredient,
            main_ing_detail,
            sub_ingredient_detail
        });
        // const newImage = await Recipe_Img.create({
        //    recipe_num:req.params.recipe_num,
        //    image_url:req.body.image_url,
        //    main_img:req.body.thumnail_num
        // });
        
        // console.log('Main Image Path:', mainImage);
        // console.log('Sub Images Paths:', recipeSubImgs);
        // console.log('저장완료 : ', {recipe:newRecipe});

        // res.redirect('/') 작성 완료 버튼을 누를시 홈으로 돌아가기

        } catch (error) {
            console.error('postRecipeWrite 오류 발생:', error);
            res.status(500).send('레시피 작성버튼 클릭시 에러 발생! ');
    }
}

// 레시피 수정
/* 예슬
exports.patchRecipe = async (req,res) => {
    try{
        const {recipe_num} = req.params;

        const updatedRecipe = await Recipes.update(
            {title},
            {content},
            {main_ingredient},
            {main_ing_detail},
            {sub_ingredient},

            {where: {recipe_num}}
        );
        res.json(updatedRecipe);
    }catch(error){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}*/ 

exports.patchRecipe = async (req,res,next) => {
    try {
        const result = await Comment.update({
            comment : req.body.comment
        },{
            where : { id : req.params.id }
        })
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

// 레시피 삭제
exports.deleteRecipe = async(req,res)=>{
        try {
            const {recipe_num} = req.params;
            const isDeleted = await Recipes.destroy({
                where : {recipe_num}
            });
            console.log(isDeleted); // 삭제되면 1 , 삭제실패시 0 
    
            if(isDeleted){
                return res.send(true);
            }else{
                return res.send(false);
            }
        } catch (error) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

exports.deleteRecipey=async(req,res,next) => {
    try {
        const result = await Comment.destroy({where : {id : req.params.id}})
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
}