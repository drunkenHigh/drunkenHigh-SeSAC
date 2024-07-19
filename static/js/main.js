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
let centerSwiper = new Swiper('.recommend-container .recommend-centerSwiper', {
    spaceBetween : 10,
    loop : true,
    speed : 700,
    autoplay : {
        delay : 3000,
        disableOnInteraction: false,
    },
    pagination : {
        el : '.swiper-pagination',
        type : 'progressbar'
    }, 
    navigation : {
        nextEl : '.swiper-btnGroup .swiper-button-next',
        prevEl : '.swiper-btnGroup .swiper-button-prev'
    },
    slidePerView : 1,
})
// 사이드 스와이퍼
let sideSwiper = new Swiper('.recommend-container .recommend-rightSwiper, .recommend-container .recommend-leftSwiper', {
    spaceBetween : 5,
    loop : true,
    slidePerView : 1,
    allowTouchMove : false
})
centerSwiper.controller.control = sideSwiper;

// 타이틀 꾸미기용 JS
function drawStarTitle() {
    let index = 0, interval = 1000;

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const animate = star => {
        star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
        star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

        star.style.animation = "none";
        star.offsetHeight;
        star.style.animation = "";
    }

    for(const star of document.getElementsByClassName("magic-star")) {
        setTimeout(() => {
            animate(star);
            
            setInterval(() => animate(star), 1000);
        }, index++ * (interval / 3))
    }
}

drawStarTitle()

// 탄산수 효과 주는 JS
// 변수
const bubbleWrap = document.querySelector('.bubble-wrap')
let spawnNumber = 30;
let bubbles = [];
let radius, speed, leftDeviation, topLimit = 0;

for(let i = 0; i < spawnNumber; i++){
    attributeRandomizer();

    bubbles[i] = document.createElement('div');
    bubbles[i].classList.add('bubble');
    bubbleWrap.appendChild(bubbles[i]);

    setBubbleRadius(bubbles[i], radius);
    setBubbleDeviation(bubbles[i], leftDeviation);

    bubbleFlow(bubbles[i], speed, topLimit);
}

function setBubbleRadius(bubble, size){
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
}

function setBubbleDeviation(bubble, deviation){
    bubble.style.left = deviation + 'px';
}

function attributeRandomizer(){
    speed = Math.floor(Math.random() * 10) + 1; 
    radius = Math.floor(Math.random() * 25) + 3; 
    leftDeviation = Math.floor(Math.random() * 1240) + 20;
    topLimit = Math.floor(Math.random() * 350) + 200;
}

function bubbleFlow(bubble, time, limit){
    let startingPosition = 0;

    let id = setInterval(flow, time, limit)

    function flow(){
        if(startingPosition == limit){
            startingPosition = 0;
            startingPosition++;
            bubble.style.bottom = 0 + startingPosition + 'px';
        } else {
            startingPosition++;
            bubble.style.bottom = startingPosition + 'px';
        }
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
        const currentScroll = document.querySelector('.recipe-list__container').offsetTop
        start = 0;
        const btnTitle = ele.querySelector('.btn-bx').getAttribute('title');
        // 초기화 
        recipeLists.innerHTML = '';
        recipeMoreBtnBx.innerHTML = `<button class="morebtn2 morebtn">+ 더보기</bottion>`
        window.scrollTo({top : currentScroll, behavior: 'smooth'})
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

// 리스트 렌더링 함수
function renderRecipeLists(recipes){
    let hcode = ``;
    recipes.forEach(recipe=>{
        if(recipe['Recipe_Imgs.image_url']){
            hcode += 
                `<li>
                  <a href="/recipes/read?recipe_num=${recipe.recipe_num}">
                    <figure>
                      <img src="${recipe['Recipe_Imgs.image_url']}" alt="레시피이미지" class="recipe-list__img" />          
                    </figure>
                    <p class="recipe__writer">${recipe['User.user_name']}</p>
                    <p class="recipe__title">${recipe.title}</p>
                  </a>
                </li>`
        } else {
            hcode += 
                `<li>
                  <a href="/recipes/read?recipe_num=${recipe.recipe_num}">
                    <figure>
                      <img src="/public/img/default_img.jpg" alt="레시피이미지" class="recipe-list__img" />          
                    </figure>
                    <p class="recipe__writer">${recipe['User.user_name']}</p>
                    <p class="recipe__title">${recipe.title}</p>
                  </a>
                </li>`

        }
    })
    
    recipeLists.innerHTML += hcode;
}


// 메인페이지에서 더보기 버튼 클릭 시 목록 더 나오기
const recipeMoreBtn = recipeMoreBtnBx.querySelector('.morebtn1')
if(recipeMoreBtn){
    recipeMoreBtn.addEventListener('click', async ()=>{
        try {
            const btnAxios = await axios({
                method : 'get',
                url : '/all'
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
}

