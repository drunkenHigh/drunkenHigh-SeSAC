const recommendList = document.querySelector('.recommend-container ul')
const recipeCategory = document.querySelector('.recipe-category .category-btn')

// 추천 리스트 렌더링 함수
async function recommendRender() {
    let hcode;

    for(let i = 0; i <= 10 ; i++){
        
    }
}

// 카테고리 버튼 만드는 함수
function makeCategoryBtn(){
    let ingredientArray = ['all', 'whiskey', 'vodka', 'soju', 'sake', 'etc']
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
            <a href='/${ele}'>
                <figure style='background-color : ${categoryBtnColor}'>
                    <img src='/public/img/${ele}.png' alt='category icon' />
                </figure>
                <p class="category-title">${ingredientKr}</p>
            </a>       
        </li>`
    })

    recipeCategory.innerHTML = hcode
}

makeCategoryBtn();


// 전체 목록 조회 함수
async function getRecipeList() {
    try{

    }catch(err){

    }
}