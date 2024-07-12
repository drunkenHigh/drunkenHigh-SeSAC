const RecipesModel = require('../models/Mrecipe');
const {Recipes,Recipe_Img,Users }= require('../models/Mindex');

// get /recipes?recipe_id=1 레시피 상세보기 페이지
// select * from where rcp_id=?
exports.getRecipe = async(req,res) => {
    try {
        console.log('레시피 상세페이지 >> ',req.query);
        
        // 왜 안되는지 모르겠음 console.log("req.params >> ",req.params);
        const {recipe_num} = req.query;
        const recipe = await Recipes.findOne({
            where : {recipe_num}, // {recipe_num,recipe_num}
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
        // res.json(recipe);
        res.render('view-detail-test',{title:'레시피 상세페이지',rcpInfo:req.query})
        //rcpInfo :req.query =
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
/*
app.get('/',(req,res) =>{
    res.render('dynamic',{'title':'동적 폼 전송을 사용해보자 !'})
})
// app.get('/',(req,res)=>{
//     res.render('index',{title:"Home"});
// })
app.get('/getForm',(req,res)=>{
    res.render('submit_result',{title:"Form",uInfo:req.query});
    console.log(req.query);
})

*/

// 레시피 작성
exports.postRecipe = (req,res) => {
    console.log('레시피 작성 postRecipe')
    res.render('recipeWrite');
}

// 레시피 수정
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


