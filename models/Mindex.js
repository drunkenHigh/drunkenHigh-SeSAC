const { DataTypes, Sequelize } = require("sequelize"); // sequelize 패키지를 불러옴
const { USE } = require("sequelize/lib/index-hints");

const config = require(__dirname + "/../config/config.js"); // db 연결 정보
const db = {}; // 빈 객체

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // sequelize 객체
// 모델 불러오기
const RecipesModel = require("./Mrecipe")(sequelize, Sequelize);
const Recipe_Img_Model = require("./Mrecipe_img")(sequelize, Sequelize);
const UsersModel = require("./Muser")(sequelize, Sequelize);
const LikesModel = require('./Mlikes')(sequelize, Sequelize);

// --- sequelize 사용시

// force: true = 서버 실행때마다 테이블을 재생성
// force: false = 서버 실행때마다 테이블이 없으면 생성
async function syncModels() {
  try {
    // UsersModel 테이블 먼저 생성
    await UsersModel.sync({ force: false });
    console.log("*** Users table created");

    // 그 다음 RecipesModel 테이블 생성
    await RecipesModel.sync({ force: false });
    console.log("*** Recipes table created");

    // 마지막으로 Recipe_Img_Model 테이블 생성
    await Recipe_Img_Model.sync({ force: false });
    console.log("*** Recipe Images table created");

    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

// 모델간 관계 연결
// Users <-> Recipe 1:N 관계 연결
UsersModel.hasMany(RecipesModel, {
  // recipe 테이블에서 'user_num' fk 생성
  // user 테이블에서 참조될 키는 'user_num'
  foreignKey: "user_num",
  sourceKey: "user_num",
  onDelete: 'cascade',
  onUpdate: 'cascade'
});
RecipesModel.belongsTo(UsersModel, {
  foreignKey: "user_num",
  targetKey: "user_num",
});

// Recipes <-> Recipe_Img 1:N 관계 연결
RecipesModel.hasMany(Recipe_Img_Model, {
  // recipe_img 테이블에서 'recipe_num' fk 생성
  foreignKey: "recipe_num",
  // recipe 테이블에서 참조될 키는 'recipe_num'
  sourceKey: "recipe_num",
  onDelete: 'cascade',
  onUpdate: 'cascade'
});
Recipe_Img_Model.belongsTo(RecipesModel, {
  // recipe_img 테이블에 'recipe_num' fk 생성
  foreignKey: "recipe_num",
  // 참조하게 될 recipe 의 키는 'recipe_num'
  targetKey: "recipe_num",
});

// 좋아요
LikesModel.belongsTo(UsersModel, {
  foreignKey: 'user_num',
  targetKey: 'user_num'
});
LikesModel.belongsTo(RecipesModel, {
  foreignKey: 'recipe_num',
  targetKey: 'recipe_num'
});

UsersModel.hasMany(LikesModel, {
  foreignKey: 'user_num',
  sourceKey: 'user_num',
  onDelete: 'cascade',
  onUpdate: 'cascade'
});
RecipesModel.hasMany(LikesModel, {
  foreignKey: 'recipe_num',
  sourceKey: 'recipe_num',
  onDelete: 'cascade',
  onUpdate: 'cascade'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Recipes = RecipesModel;
db.Recipe_Img = Recipe_Img_Model;
db.Likes = LikesModel;

db.Users = UsersModel;

syncModels();

module.exports = db;
