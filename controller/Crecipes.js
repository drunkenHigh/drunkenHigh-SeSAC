
const { Recipes, Recipe_Img, Users } = require("../models/Mindex");

// get /recipe/read?recipe_num=1 레시피 상세보기 페이지 
// select * from where rcp_id=?
exports.getRecipe = async (req, res) => {
  try {
    console.log("레시피 상세페이지 >> ", req.query);
    const { recipe_num } = req.query;
    const image_path = '/uploads/recipe';
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
      plain: true, // 단일 객체로 반환
      nest: true // 중첩된 객체로 반환하도록 설정
    });
    // console.log(">>>> ", recipe)

  let imageUrls;
  let subImageUrls;
  if (recipe['Recipe_Imgs'] == null) {
    imageUrls = recipe['Recipe_Imgs'].map(img => img.image_url);
    subImageUrls = imageUrls.slice(1).map(url => `${image_path}/${url}`);
  }else {
    imageUrls=['default_img.jpg'];
    subImageUrls = [''];
  }
    const content_list = recipe.content.split('$').slice(0, -1);

    console.log("content list > ", content_list);
    console.log("main Image String >", `${image_path}/${imageUrls[0]}`);
    console.log("sub Image list >", subImageUrls);

    res.render("recipeView", {
      isLogin: req.session.loggedin,
      title: "레시피 상세페이지",
      recipe_title: recipe.title, //: "title",  //string
      main_img: `${image_path}/${imageUrls[0]}`, //: "imgPath",  //string   
      main_ing: recipe.main_ingredient, //: "vodka",  // string
      main_ing_detail: recipe.main_ing_detail, //: "ing detail",  // string
      sub_ing: recipe.sub_ingredient_detail, //: "sub ing",  // string
      recipe_content: recipe.content.split('$'), //: ["step1", "step2"], // array
      sub_image: subImageUrls, //: ["path1", "path2"],  // array    
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
    // console.log('error');
  }
};

// 레시피 작성 버튼 클릭시 
exports.getRecipeWrite = (req, res) => {
  var user_session = req.session.user_num;
  if (!user_session) {
    console.error("유저 정보가 없습니다. 로그인 해주세요.", user_session);
  }
  res.render("recipeWrite", {
    isLogin: req.session.loggedin,
    title: "레시피 작성페이지"
  });
};

// post 레시피 작성 페이지에서 "저장" 버튼 클릭시
exports.postRecipeWrite = async (req, res) => {
  try {
    var user_session = req.session.user_num_num;
    if (!user_session) {
      console.error("유저 정보가 없습니다. 로그인 해주세요.", user_session);
    }
    console.log("레시피 저장 버튼 클릭 postRecipe >> \n", req.body);
    // console.log("user > ",req.session.user_num);
    const { title, content, main_ingredient, main_ing_detail,
      sub_ingredient_detail, mainImage } = req.body;

    // 레시피 데이터베이스에 저장
    const newRecipe = await Recipes.create({
      title,
      user_num: user_session,
      content,
      main_ingredient,
      main_ing_detail,
      sub_ingredient_detail
    });

    // recipe_num 을 받기 위한 조회
    const recipe = await Recipes.findOne({
      order: [['createdAt', 'DESC']],
      where: { user_num: user_session },
      attributes: ['recipe_num']

    });
    console.log("recipe >>>>>> ", recipe.recipe_num);

    var imgFileArr = req.files;
    // filename 속성을 추출하는 함수
    const extractFilenames = (imgArr) => {
      const filenames = [];
      for (const key in imgArr) {
        if (Object.prototype.hasOwnProperty.call(imgArr, key)) {
          imgArr[key].forEach((file) => {
            filenames.push(file.filename);
          });
        }
      }

      return filenames;
    };

    // 추출된 filename들
    const filenames = extractFilenames(imgFileArr);
    for (i = 0; i < filenames.length; i++) {
      console.log("i >> ", i);
      const newImage = await Recipe_Img.create({
        recipe_num: recipe.recipe_num,
        image_url: filenames[i],
        main_img: i == 0 ? 1 : 0
      });
    }
    res.send("File upload completed");

  } catch (error) {
    console.error("postRecipeWrite 오류발생:", error);
    res.status(500).send("레시피 작성버튼 클릭시 에러 발생! ");
  }
};
// get 레시피 수정 페이지
exports.getRecipeUpdate = async (req, res) => {
  var user_session = req.session.user_num;
  if (!user_session) {
    console.error("유저 정보가 없습니다. 로그인 해주세요.", user_session);
  }
  console.log("params > ", req.params);
  const { recipe_num } = req.params;
  console.log("recipe_num > ", recipe_num);

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
    plain: true, // 단일 객체로 반환
    nest: true // 중첩된 객체로 반환하도록 설정
  });
  // console.log(">>>> ", recipe)

  const image_path = '/uploads/recipe';
  let imageUrls;
  let subImageUrls;
  if (recipe['Recipe_Imgs'] == null) {
    imageUrls = recipe['Recipe_Imgs'].map(img => img.image_url);
    subImageUrls = imageUrls.slice(1).map(url => `${image_path}/${url}`);
  }else {
    imageUrls=['default_img.jpg'];
    subImageUrls = [''];
  }
 
  const content_list = recipe.content.split('$').slice(0, -1);

  console.log("content list > ", content_list);
  console.log("main Image String >", `${image_path}/${imageUrls[0]}`);
  console.log("sub Image list >", subImageUrls);
  console.log("레시피 수정 페이지 getRecipeUpdate > ", recipe);
  res.render('recipeUpdate', {
    isLogin: req.session.loggedin,
    title: "레시피 수정페이지",
    recipe_title: recipe.title, //: "title",  //string
    main_img: `${image_path}/${imageUrls[0]}`, //: "imgPath",  //string   

    main_ingredient: recipe.main_ingredient, //: "vodka",  // string
    // main_ing: recipe.main_ingredient, //: "vodka",  // string
    main_ing_detail: recipe.main_ing_detail, //: "ing detail",  // string
    sub_ing: recipe.sub_ingredient_detail, //: "sub ing",  // string
    recipe_content: content_list, //: ["step1", "step2"], // array
    sub_image: subImageUrls, //: ["path1", "path2"],  // array    
    step_num: recipe.content.split('$').length
  });
};
// patch 레시피 수정 페이지에서 "수정하기" 버튼 클릭시
exports.patchRecipe = async (req, res, next) => {
  var user_session = req.session.user_num;
  if (!user_session) {
    console.error("유저 정보가 없습니다. 로그인 해주세요.", user_session);
  }
  console.log(`update >>> `, req.query);
  const {recipe_num} = req.query;
  const { title, content, main_ingredient, main_ing_detail,
    sub_ingredient_detail, mainImage } = req.body;
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
    var imgFileArr = req.files;
    // filename 속성을 추출하는 함수
    const extractFilenames = (imgArr) => {
      const filenames = [];
      for (const key in imgArr) {
        if (Object.prototype.hasOwnProperty.call(imgArr, key)) {
          imgArr[key].forEach((file) => {
            filenames.push(file.filename);
          });
        }
      }

      return filenames;
    };

    // 추출된 filename들
    const filenames = extractFilenames(imgFileArr);
    for (i = 0; i < filenames.length; i++) {
      const newImage = await Recipe_Img.update({
        recipe_num: recipe.recipe_num,
        image_url: filenames[i],
        main_img: i == 0 ? 1 : 0
      });
    }

  } catch (error) {
    console.error(error);
  }
};

// delete /recipe/read?recipe_num= "삭제" 버튼 클릭시 
exports.deleteRecipe = async (req, res) => {
  try {
    var user_session = req.session.user_num;
    if (!user_session) {
      console.error("유저 정보가 없습니다. 로그인 해주세요.", user_session);
    }
    const { recipe_num } = req.query;
    console.log("삭제할 레시피 번호 : ", req.query);
    const isDeleted = await Recipes.destroy({
      where: { recipe_num },
    });
    console.log(isDeleted); // 삭제되면 1 , 삭제실패시 0

    if (isDeleted) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
