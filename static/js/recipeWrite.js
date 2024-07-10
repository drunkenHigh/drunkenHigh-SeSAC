// scroll spy
/* http://jsfiddle.net/LwLBx/ */
    
// Cache selectors
var lastId,
    topMenu = $("#menu-content"),
    topMenuHeight = topMenu.outerHeight()+175,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    if (!helpMenuDiv.classList.contains("hidden")) {
        helpMenuDiv.classList.add("hidden");
        }
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("font-bold border-yellow-600")
            .end().filter("[href='#"+id+"']").parent().addClass("font-bold border-yellow-600");
    }                   
});


// 주재료 옵션 선택하면 주재료 상세 보이게 하기    
const mainIng = document.querySelector('#main-ing-select');
// const mainIgDetail = document.querySelector('#main-ing-detail');
// const mainIngDetailHtml = `<div class="md:flex mb-6 opacity-0" id="main-ing-detail">
//                 <div class="md:w-1/3">
//                     <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
//                         주재료 상세
//                     </label>
//                 </div>
//                 <div class="md:w-2/3">
//                     <textarea class="form-textarea block w-full focus:bg-white" id="my-textarea" value="" rows="2"></textarea>
//                     <p class="py-2 text-sm text-gray-600">예시: 잭 다니엘스 테네시 허니</p>
//                 </div>
//             </div>`;
const mainIngDetailHtml = `<div class="" id="main-ing-detail">
            <div class="">
                <label class="" for="my-textarea">
                    주재료 상세
                </label>
            </div>
            <div class="">
                <textarea class="" value="" rows="2"></textarea>
                <p class="">예시: 잭 다니엘스 테네시 허니</p>
            </div>
        </div>`;
mainIng.addEventListener("change", () => {
    console.log("Main ind selected");
    mainIng.insertAdjacentHTML("afterend", mainIngDetailHtml);
}, {once: true});


// ==== 저장 =====
// axios로 레시피 정보 보내기 
const writeRecipe = async (recipeObj) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/write',
            data: {
                "title": recipeObj.recipeTitle,
                "content": "",
                "main_ingredient": recipeObj.mainIng,
                "main_ing_detail": recipeObj.mainIngDetail,
                "sub_ingredient": recipeObj.subIngredient
            }
        })
    } catch(err) {
        console.error(err);
    }
}

// 저장 버튼을 누를 시
import * as FormData from 'form-data';
const formData = new FormData();
const saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', () => {
    // recipe 제목을 저장
    const recipeTitle = document.querySelector('#recipe-title').value;
    // 주재료 저장
    const mainIng = document.querySelector('#main-ing-select select').value;
    // 주재료 상세설명 저장
    const mainIngDetail = document.querySelector('#main-ing-detail textarea').value;
    // list 형식으로 부재료들 구분하여 저장
    const subIngList = document.querySelector('#sub-ing-detail').value.split(',');
    // 대표 이미지 저장
    
    const mainImage = document.querySelector('#main-image');
    console.log(mainImage);
    const recipeObj = {
        recipeTitle, mainIng, mainIngDetail, subIngList
    }
    console.log(recipeObj.recipeTitle, recipeObj.mainIng, recipeObj.mainIngDetail, recipeObj.subIngList);

    writeRecipe(recipeObj);
})

// 다시 작성하기 버튼을 누를 시
const refreshButton = document.querySelector('#refresh-button');

