const {Likes, Users, Recipes} = require('../models/Mindex');

// 좋아요 갯수 가져오기
exports.getLikesCount = async (req, res) => {
    try {
        const recipeNum = req.params.recipe_num; // URL 파라미터에서 recipe_num 가져오기
        let userNum = 0;
        if(!req.session.user) {
            return res.json({ alreadyLiked: false });
        } else {
            userNum = req.session.user.user_num;
        }

        // 기존 좋아요 여부 확인
        const checkLikes = await Likes.findOne({
            where: {
                recipe_num: recipeNum,
                user_num: userNum
            },
            attributes: ['user_num', 'recipe_num'],
            raw: true
        });
        
        //console.log('count >>', count);
        if (checkLikes) {
            res.json({ alreadyLiked: true });
        } else {
            res.json({ alreadyLiked: false });
        }
        
    } catch (error) {
        console.error('Error fetching likes count:', error);
        res.status(500).send('Internal Server Error');
    }
};


// 좋아요 추가 또는 삭제
exports.postAlreadyLiked = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    try {
      console.log('req.params >> ',req.data);
      const recipeNum = req.params.recipe_num;  // URL 경로에서 recipe_num 가져오기
      const userNum = req.session.user.user_num;
      // 기존 좋아요 여부 확인
      const checkLikes = await Likes.findOne({
          where: {
              recipe_num: recipeNum,
              user_num: userNum
           },
          attributes: ['user_num', 'recipe_num'],
          raw: true
        });
        console.log(checkLikes);
        if (checkLikes) {
            // 이미 좋아요를 누른 상태면 좋아요 삭제
            await Likes.destroy({ where: { recipe_num: recipeNum, user_num: userNum } });
            return res.json({ message: 'destroy', likes: -1 });
        } else {
            // 좋아요 추가
            await Likes.create({
                recipe_num: recipeNum,
                user_num: userNum
            });
            return res.json({ message: 'create', likes: 1 });
        }
    } catch (error) {
        console.error('Error updating likes:', error);
        res.status(500).send('Internal Server Error');
    }
  };