const RecipesModel = require("../models/Mrecipe");
const Recipe_Img_Model = require("../models/Mrecipe_img");
const express = require("express");

const { Recipes, Recipe_Img, Users } = require("../models/Mindex");

// get /recipe?recipe_num=1 레시피 상세보기 페이지 - 완
// select * from where rcp_id=?
exports.getRecipe = async (req, res) => {
  console.log("레시피 상세페이지 1 >> ", req.query);
  try {
    console.log("레시피 상세페이지 >> ", req.query);

    const { recipe_num } = req.query;
    const recipe = await Recipes.findOne({
      where: { recipe_num },
      include: [
        {
          model: Users,
          attributes: ["user_id"],
        },
        {
          model: Recipe_Img,
          attributes: ["image_url"],
        },
      ],
    });
    res.render("recipeView", {
      title: "레시피 상세페이지",
    });
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
    res.status(500).send("Internal Server Error");
    // console.log('error');
  }
};

// 레시피 작성 버튼 클릭시  - 완
exports.getRecipeWrite = (req, res) => {
  // res.render('recipeWrite',{
  res.render("test-recipeWrite", {
    title: "글 작성",
    isLogin: true,
  });
};

// 레시피 작성페이지에서 저장 버튼 클릭시 - 부재료 값 안들어감, 이미지 추가필요)
exports.postRecipeWrite = async (req, res) => {
  try {
    /*
        const files = req.files;
        const imagesData = [];
        // 각 파일 정보를 데이터베이스에 저장
        for (const key in files) {
            files[key].forEach(file => {
                imagesData.push({
                    filename: file.filename,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                });
            });
        }

        const images = await Image.bulkCreate(imagesData);

        res.json({ message: '이미지가 성공적으로 업로드되었습니다.', images });
        req.session. 을 이용하여 유저 정보 저장하기
        */

    console.log("레시피 저장 버튼 클릭 postRecipe >> \n", req.body);
    

    /*
    {
      title: '1',
      main_ingredient: 'vodka',
      main_ing_detail: '2',
  main_img: {},
  content: '<div><div>Step 1</div><div>4</div></div>',
  sub_imgs: [ null ]
  }
  */
    // const { user_num, title, content, main_ingredient, main_ing_detail,
    //     sub_ingredient_detail, mainImage } = req.body;

    // 레시피 데이터베이스에 저장
    // const newRecipe = await Recipes.create({
    //     title,
    //     user_num :1,
    //     content,
    //     main_ingredient,
    //     main_ing_detail,
    //     sub_ingredient_detail
    // });

    var imgFileArr = req.files; // 객체
    //  완료된 것 
    // filename 속성을 추출하는 함수
    // const extractFilenames = (imgArr) => {
    //   const filenames = [];
    //   for (const key in imgArr) {
    //     if (Object.prototype.hasOwnProperty.call(imgArr, key)) {
    //       imgArr[key].forEach((file) => {
    //         filenames.push(file.filename);
    //       });
    //     }
    //   }

    //   return filenames;
    // };

    // // 추출된 filename들
    // const filenames = extractFilenames(imgFileArr);
    // for (i = 0; i < filenames.length; i++) {
    //   console.log("i>> ", i);
    //   // const newImage = await Recipe_Img.create({
    //   // recipe_num:req.body.recipe_num,
    //   // image_url:filenames[i],
    //   // main_img:req.body.thumnail_num
    //   // });
    // }
    
    res.send("File upload completed"); // 프론트로 다시 보내주는 것 

    // res.redirect('/') 작성 완료 버튼을 누를시 홈으로 돌아가기
  } catch (error) {
    console.error("postRecipeWrite 오류발생:", error);
    res.status(500).send("레시피 작성버튼 클릭시 에러 발생! ");
  }
};

// 레시피 수정 - 프엔연결 필요
exports.patchRecipe = async (req, res, next) => {
  console.log(`update >>> `, req.params);
  try {
    const result = await Recipes.update(
      {
        title,
        content,
        main_ingredient,
        main_ing_detail,
        sub_ingredient_detail,
      },
      {
        where: { recipe_num },
      }
    );
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

// 레시피 삭제 - 프엔연결 필요
exports.deleteRecipe = async (req, res) => {
  try {
    const { recipe_num } = req.params;
    const isDeleted = await Recipes.destroy({
      where: { recipe_num },
    });
    console.log(isDeleted); // 삭제되면 1 , 삭제실패시 0

    if (isDeleted) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  } catch (error) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
