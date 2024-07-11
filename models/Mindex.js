// models/Mindex.js

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.js');
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: 'mysql',
        host: config.host,
        port: config.port,
        // 기타 설정
    }
);




const db = {};

// 모델 정의 파일 불러오기
const RecipesModel = require('./Mrecipe')(sequelize, Sequelize);
// const RecipeImgModel = require('./Mrecipe_img')(sequelize, Sequelize); // RecipeImgModel 주석 처리

const UsersModel = require('./Muser')(sequelize, Sequelize); // PascalCase로 모델 이름 수정

async function getUsers() {
    try {
        const users = await UsersModel.findAll();
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

getUsers();
// 모델 간 관계 설정
// RECIPES <-> RECIPE_IMG 1:N 관계 설정
// RecipesModel.hasMany(RecipeImgModel, {
//     foreignKey: 'recipe_num',
//     sourceKey: 'recipe_num'
// });
// RecipeImgModel.belongsTo(RecipesModel, {
//     foreignKey: 'recipe_num',
//     targetKey: 'recipe_num'
// });

// Sequelize 인스턴스와 모델들을 db 객체에 할당
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Recipes = RecipesModel;
// db.RecipeImg = RecipeImgModel; // RecipeImgModel 주석 처리
db.Users = UsersModel;

module.exports = db;
