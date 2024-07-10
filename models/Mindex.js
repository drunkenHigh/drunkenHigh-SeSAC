const Sequelize = require("sequelize"); // sequelize 패키지를 불러옴
const config = require(__dirname + "/../config/config.js")// db 연결 정보
const db = {}; // 빈 객체

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
); // sequelize 객체

// 모델 불러오기
const RecipesModel = require("./Mrecipe")(sequelize, Sequelize);
const Recipe_Img_Model = require("./Mrecipe")(sequelize, Sequelize);

// 모델간 관계 연결
// RECIPES <-> RECIPE_IMG 1:N 관계 연결
RecipesModel.hasMany(Recipe_Img_Model,{
    // recipe_img 테이블에서 'recipe_num' fk 생성
    foreignKey : 'recipe_num',
    // recipe 테이블에서 참조될 키는 'recipe_num' 
    sourceKey: 'recipe_num'
});
Recipe_Img_Model.belongsTo(RecipesModel,{
    // recipe_img 테이블에 'user_id' fk 생성
    foreignKey:'recipe_num',
    // 참조하게 될 recipe 의 키는 'user_id'
    targetKey:'recipe_num'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Recipes = RecipesModel;
db.Recipe_Img = Recipe_Img_Model;

module.exports = db;