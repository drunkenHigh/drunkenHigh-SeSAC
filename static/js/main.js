const recommendList = document.querySelector('.recommend-container ul')
const recipeCategory = document.querySelector('.recipe-category .category-btn')
let ingredientArray = ['all', 'whiskey', 'vodka', 'soju', 'sake', 'etc']
const recipeLists = document.querySelector('.recipe-lists')

// 추천 리스트 렌더링 함수
async function recommendRender() {
    let hcode;

    for(let i = 0; i <= 10 ; i++){
        
    }
}

// 카테고리 버튼 만드는 함수
function makeCategoryBtn(){
    let hcode =``;
    let ingredientKr
    let categoryBtnColor;
    ingredientArray.forEach(ele=>{
        switch(ele){
            case 'all' : ingredientKr = '전체', categoryBtnColor = '#EA4949';
            break;
            case 'whiskey' : ingredientKr = '위스키', categoryBtnColor = '#F29B30' ;
            break;
            case 'vodka' : ingredientKr = '보드카', categoryBtnColor = '#25B7D3' ;
            break;
            case 'soju' : ingredientKr = '소주', categoryBtnColor = '#22A858';
            break;
            case 'sake' : ingredientKr = '사케', categoryBtnColor = '#32BEA6';
            break;
            case 'etc' : ingredientKr = '기타', categoryBtnColor = '#EA4949';
            break;
        }
        hcode += 
        `<li>
            <div class="btn-bx" title=${ele}>
                <figure style='background-color : ${categoryBtnColor}'>
                    <img src='./public/img/${ele}.png' alt='${ingredientKr}'/>
                </figure>
                <p class="category-title">${ingredientKr}</p>
            </div>       
        </li>`
    })

    recipeCategory.innerHTML = hcode
}

makeCategoryBtn();

const recipeBtn = document.querySelectorAll('.category-btn li')

recipeBtn.forEach(ele=>{
    ele.onclick = (e) => {
        e.preventDefault();
        const btnTitle = ele.querySelector('.category-title').innerText;
        getRecipeList(btnTitle)
    }
})


// 레시피 목록 조회 함수
async function getRecipeList(ingredient) {
    try{
        console.log(ingredient);
        const getRecipeAxios = await axios({
            method : 'get',
            url : `/${ingredient}`,
        })
        const recipeData = getRecipeAxios.data
        // 더보기 기능을 위한 함수
        
        let hcode = ``;    
        recipeData.forEach(ele => {
            console.log(ele);
            hcode += 
            `<li>
              <a href="/recipes?recipe_id=${ele.recipe_num}">
                <figure>
                  <img src="${ele.recipe_img}" alt="레시피이미지" class="recipe-list__img" />          
                </figure>
                <p class="receipe__title">${ele.title}</p>
                <p class="receipe__writer">${ele.user_name}</p>
              </a>
            </li>`
        })
        recipeLists.innerHTML = hcode;        

    }catch(err){
        console.error(err);
    }
}

// 더보기 기능을 위한 함수
function showMoreList(){
    const MAXCOUNT = 8;
    let start = 0;
    let cnt = 1;
}