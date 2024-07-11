// 레시피 모델 정의
const RecipesModel = (sequelize, DataTypes) =>{
    const Recipes = sequelize.define(
        'Recipes',  // param1 : 테이블 이름 설정)
        
        { // param2 : 모델 컬럼 정의
        recipe_num:{
            // recipe int not null primary key auto_increment
            type:DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement :true,
            allowNull : false,
        },
        user_num :{
            // user_num int NOT NULL,
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        title:{
            // TITLE TEXT NOT NULL,
            type:DataTypes.TEXT,
            allowNull : false,
        },
        content:{
            // CONTENT TEXT NOT NULL,
            type:DataTypes.TEXT,
            allowNull : false,
        },
        likes_count:{
            // LIKES_COUNT INT NOT NULL,
            type:DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 0
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
        timestamps : false, // 데이터의 추가/수정 시간을 자동으로 기록(컬럼)
    }
);
    return Recipes;
}

module.exports=RecipesModel;


