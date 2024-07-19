// Likes 모델 정의
const LikesModel = (sequelize, DataTypes) => {
    const Likes = sequelize.define(
        'Likes',
        {
            like_num: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            user_num: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            recipe_num: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Likes;
}

module.exports = LikesModel;
