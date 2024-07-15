// 레시피 속의 이미지 저장 테이블
const Recipe_Img_Model = (sequelize, DataTypes) =>{
    const Recipe_Img = sequelize.define(
        'Recipe_Img',  // param1 : 모델 이름 설정 
        
        { // param2 : 모델 컬럼 정의
        image_num:{
            // IMAGE_NUM INT auto_increment primary key,
            type:DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement :true,

        },
        recipe_num :{
            // RECIPE_NUM INT NOT NULL (fk) ,
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'Recipes',
                key:'recipe_num'
            }
        },
        image_url:{
            // IMAGE_URL VARCHAR(255) ,
            type:DataTypes.STRING(255),
            allowNull : true,
        },
        main_img:{
            //main_img int default 0
            type:DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    { // param3 : 모델 옵션 정의
        freezeTableName : true , 
        timestamps : false, 

    });
    return Recipe_Img;
}


module.exports=Recipe_Img_Model ;

