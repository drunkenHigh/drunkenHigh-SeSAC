<<<<<<< HEAD
// 레시피 모델 정의
const recipesModel = (sequelize, DataTypes) =>{
    const Recipes = sequelize.define(
        'Recipe',  // param1 : 모델 이름 설정 
        
=======

// 레시피 모델 정의
const RECIPESMODEL = (sequelize, DataTypes) =>{
    // sequelize 매개변수 :  models/Mrecipe.js 에서의 sequelize (db 연결 정보를 입력하여)
    // DataTypes 매개변수 : models/Mrecipe.js 에서의 Sequelize(sequelize 패키지 자체 )
    const RECIPES = sequelize.define(
        'Recipe',  // param1 : 모델 이름 설정
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
        { // param2 : 모델 컬럼 정의
        recipe_num:{
            // recipe int not null primary key auto_increment
            type:DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement :true,
<<<<<<< HEAD

=======
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
        },
        user_id :{
            // USER_ID VARCHAR(50) NOT NULL,
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        title:{
            // TITLE TEXT NOT NULL,
            type:DataTypes.TEXT,
            allowNull : false,
        },
<<<<<<< HEAD
        
=======
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
        content:{
            // CONTENT TEXT NOT NULL,
            type:DataTypes.TEXT,
            allowNull : false,
        },
        likes_count:{
            // LIKES_COUNT INT NOT NULL,
            type:DataTypes.INTEGER,
            allowNull : false,
<<<<<<< HEAD
            defaultValue: 0


=======
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
        },
        main_ingredient:{
            // MAIN_INGREDIENT VARCHAR(50) NOT NULL,
            type:DataTypes.STRING(50),
            allowNull : false,
        },
        main_ing_detail:{
            // MAIN_ING_DETAIL TEXT NULL,
            type:DataTypes.TEXT,
            allowNull : true,
        },
        sub_ingredient_detail:{
            // SUB_INGREDIENT TEXT NULL,
            type:DataTypes.TEXT,
            allowNull : true,
        },
    },
    { // param3 : 모델 옵션 정의
        freezeTableName : true , // 테이블 명을 그대로 사용한다. (복수형으로 바까주지 X)
        // timestamps : false, // 데이터의 추가/수정 시간을 자동으로 기록(컬럼)
<<<<<<< HEAD

    });
    return RECIPES;
}

module.exports=recipesModel;


// 레시피 속의 이미지 저장 테이블
const recipe_img_Model = (sequelize, DataTypes) =>{
    const Recipe_Img = sequelize.define(
        'RecipeImg',  // param1 : 모델 이름 설정 
        
=======
    });
    return RECIPES;
}
module.exports=RECIPESMODEL;
// 레시피 속의 이미지 저장 테이블
const RECIPE_IMG_MODEL = (sequelize, DataTypes) =>{
    const RECIPES_IMG = sequelize.define(
        'RecipeImg',  // param1 : 모델 이름 설정
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
        { // param2 : 모델 컬럼 정의
        image_num:{
            // IMAGE_NUM INT auto_increment primary key,
            type:DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement :true,
<<<<<<< HEAD

        },
        recipe_num :{
            // RECIPE_NUM INT NOT NULL ,
            type:DataTypes.INTEGER,
=======
        },
        recipe_num :{
            // RECIPE_NUM INT NOT NULL ,
            type:DataTypes.INT,
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
            allowNull:false,
        },
        image_url:{
            // IMAGE_URL VARCHAR(255) ,
            type:DataTypes.STRING(255),
            allowNull : true,
        },
<<<<<<< HEAD
        
    },
    { // param3 : 모델 옵션 정의
        freezeTableName : true , 
        // timestamps : false, 

    });
    return Recipe_Img;
}

module.exports=recipe_img_Model;
=======
    },
    { // param3 : 모델 옵션 정의
        freezeTableName : true ,
        // timestamps : false,
    });
    return RECIPES_IMG;
}
module.exports=RECIPE_IMG_MODEL;
>>>>>>> c58a600a39f71a9482b760f6b38a00753dfd4c74
