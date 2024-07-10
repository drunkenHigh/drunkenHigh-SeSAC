// main page
exports.main = (req,res) => {
    res.render('index');
}


<<<<<<< HEAD
// 회원가입 ? 
exports.users = (req,res) => {
    res.render('users');
}

// 회원 추가 
exports.postRegisterUser = (req,res) => {

}

// 회원 정보 수정 
exports.patchUser = (req,res) => {

}
// 회원 삭제 
exports.deleteUser = (req,res) => {

}

//recipe 상세조회
exports.getRecipeView = (req,res) => {
    res.render('recipeView');
}

// 레시피 작성
exports.postRecipeWrite = (req,res) => {
    res.render('recipeWrite');
}

// 레시피 수정
exports.patchRecipe = (req,res) => {
    res.render('recipeView');
}

// 레시피 삭제
exports.deleteRecipe= async(req,res)=>{
        try {
            const {player_id} = req.params;
            const isDeleted = await Player.destroy({
                where : {player_id}
            });
            console.log(isDeleted); // 삭제되면 1 , 삭제실패시 0 
    
            if(isDeleted){
                return res.send(true);
            }else{
                return res.send(false);
            }
        } catch (error) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
=======
>>>>>>> daac2f2641ff3dba476409aa1a02b7575e68c10a
