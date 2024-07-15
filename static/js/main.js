const recommendList = document.querySelector('.recommend-container ul')
const recipeCategory = document.querySelector('.recipe-category .category-btn')
const recipeLists = document.querySelector('.recipe-lists')
const recipeMoreBtnBx = document.querySelector('.recipe-morebtn')

// 카테고리 버튼용 배열
let ingredientArray = ['all', 'whiskey', 'vodka', 'soju', 'sake', 'etc']

// 더보기 기능을 위한 변수 설정
const MAXCOUNT = 8;
let start = 0;
let cnt = 1;

// 추천 리스트 스와이퍼
// 중앙 스와이퍼
let centerSwiper = new Swiper('.recommendSwiper .recommend-centerSwiper', {
    spaceBetween : 20,
    loop : true,
    pagination : {
        el : '.swiper-pagination',
        type : 'progressbar'
    }, 
    navation : {
        nextEl : '.swiper-btnGroup .swiper-button-next',
        prevEl : '.swiper-btnGroup .swiper-button-prev'
    },
    slidePerView : 1,
})
// 사이드 스와이퍼
let sideSwiper = new Swiper('.recommendSwiper .recommend-rightSwiper, .recommendSwiper .recommend-leftSwiper', {
    spaceBetween : 5,
    loop : true,
    slidePerView : 1,
    allowTouchMove : false
})

centerSwiper.controller.control = sideSwiper;


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
                    <img src='/public/img/${ele}.png' alt='${ingredientKr}'/>
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
    ele.onclick = async (e) => {
        e.preventDefault();
        start = 0;
        const btnTitle = ele.querySelector('.category-title').innerText;
        // 초기화 
        recipeLists.innerHTML = '';
        recipeMoreBtnBx.innerHTML = `<button class="morebtn2 morebtn">더보기</bottion>`
        await getRecipeList(btnTitle)
    }
})



// 레시피 목록 조회 함수
async function getRecipeList(ingredient) {
    try{
        const getRecipeAxios = await axios({
            method : 'get',
            url : `/${ingredient}`,
        })
        const recipeData = getRecipeAxios.data;
        // let hcode = '';
        renderRecipeLists(recipeData.slice(start, start + MAXCOUNT));
        let recipeMoreBtn = recipeMoreBtnBx.querySelector('.morebtn2')

        recipeMoreBtn.addEventListener('click', ()=>{
            if(recipeData.length > MAXCOUNT) {
                start += MAXCOUNT;
                renderRecipeLists(recipeData.slice(start, start + MAXCOUNT));
                // 더보기 버튼 처리
                if(start + MAXCOUNT >= recipeData.length) {
                    recipeMoreBtn.style.display = 'none'
                } else {
                    recipeMoreBtn.style.display = 'block'
                }
            }
        })

        // 더보기 버튼 처리
        if(start + MAXCOUNT >= recipeData.length) {
            recipeMoreBtn.style.display = 'none'
        } else {
            recipeMoreBtn.style.display = 'block'
        }

    }catch(err){
        console.error(err);
    }
}


function renderRecipeLists(recipes){
    let hcode = ``;
    recipes.forEach(recipe=>{
        hcode += 
            `<li>
              <a href="/recipes?recipe_id=${recipe.recipe_num}">
                <figure>
                  <img src="${recipe.Recipe_Img[0].recipe_img}" alt="레시피이미지" class="recipe-list__img" />          
                </figure>
                <p class="receipe__title">${recipe.title}</p>
                <p class="receipe__writer">${recipe.Users.user_name}</p>
              </a>
            </li>`
    })
    
    recipeLists.innerHTML += hcode;
}


// 메인페이지에서 더보기 버튼 클릭 시 목록 더 나오기
const recipeMoreBtn = recipeMoreBtnBx.querySelector('.morebtn1')
recipeMoreBtn.addEventListener('click', async ()=>{
    try {
        const btnAxios = await axios({
            method : 'get',
            url : '/전체'
        })
        const moreData = btnAxios.data
        if(moreData.length > MAXCOUNT) {
            start += MAXCOUNT;
            renderRecipeLists(moreData.slice(start, start + MAXCOUNT));
            // 더보기 버튼 처리
            if(start + MAXCOUNT >= moreData.length) {
                recipeMoreBtn.style.display = 'none'
            } else {
                recipeMoreBtn.style.display = 'block'
            }
        }
    }catch(err){
        console.error(err);
    }
})

