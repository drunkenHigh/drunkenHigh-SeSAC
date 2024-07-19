const {Likes, Users, Recipes} = require('../models/Mindex');

// 좋아요 갯수 가져오기
exports.getLikesCount = async (req, res) => {
    try {
        const recipeNum = req.params.recipe_num; // URL 파라미터에서 recipe_num 가져오기
        const count = await Likes.count({
            where: { recipe_num: recipeNum }
        });
        console.log('count >>', count);
        res.json({ count });
    } catch (error) {
        console.error('Error fetching likes count:', error);
        res.status(500).send('Internal Server Error');
    }
};


// 좋아요 추가 또는 삭제
exports.postLikes = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    try {
      console.log('req.params >> ',req.params);
      const recipenum = req.params.recipe_num;  // URL 경로에서 recipe_num 가져오기
      const usernum = req.session.user.usernum;
      // 기존 좋아요 여부 확인
      const checkLikes = await Likes.findOne({
          where: {
              recipe_num: recipenum,
              user_num: usernum
           },
          attributes: ['user_num', 'recipe_num'],
          raw: true
        });
        console.log(checkLikes);
        if (checkLikes) {
            // 이미 좋아요를 누른 상태면 좋아요 삭제
            await Likes.destroy({ where: { recipe_num: recipenum, user_num: usernum } });
            return res.json({ message: '좋아요 - 1', likes: -1 });
        } else {
            // 좋아요 추가
            await Likes.create({
                recipe_num: recipenum,
                user_num: usernum
            });
            return res.json({ message: '좋아요 + 1', likes: 1 });
        }
    } catch (error) {
        console.error('Error updating likes:', error);
        res.status(500).send('Internal Server Error');
    }
  };