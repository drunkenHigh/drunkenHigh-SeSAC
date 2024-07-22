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
const mainIngDetailHtml = `<div class="md:flex mb-6" id="main-ing-detail">
                <div class="md:w-1/3">
                    <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                        주재료 상세
                    </label>
                </div>
                <div class="md:w-2/3">
                    <textarea class="form-textarea block w-full focus:bg-white" id="my-textarea" value="" rows="2"></textarea>
                    <p class="py-2 text-sm text-gray-600">예시: 잭 다니엘스 테네시 허니</p>
                </div>
            </div>`;
mainIng.addEventListener("change", () => {
    mainIng.insertAdjacentHTML("afterend", mainIngDetailHtml);
}, {once: true});


// 메인 이미지 선택하면 미리보기 하기
const mainImageUpload = document.querySelector('#main-image');
const mainImage = document.querySelector('#recipe-img label');
const mainImageText = document.querySelector('#main-image-text');
mainImageUpload.addEventListener('change', (e) => {
    const files = e.currentTarget.files;
    let reader = new FileReader();

    reader.onload = function(e) {
        mainImage.removeChild(mainImage.querySelector('img'));
        let img = document.createElement("img");
        img.setAttribute("src", e.target.result);
        img.setAttribute("class", "object-scale-down rounded-lg max-h-full p-5 hover:opacity-50");
        mainImageText.classList.add("hidden");
        mainImage.appendChild(img);
    };
    reader.readAsDataURL(e.target.files[0])
})

// 부재료 이미지 미리보기 기능
let subImageUpload = document.querySelectorAll('.sub-image');
function resetSubImageEvent() {
    subImageUpload = document.querySelectorAll('.sub-image');
    subImageUpload.forEach((element, index) => {
        const subImage = document.querySelector(`#step-${index+1} label`);
        const subImageText = document.querySelector(`#sub-image-text-${index+1}`)
        element.addEventListener('change', (e) => {
            const files = e.currentTarget.files;
            let reader = new FileReader();
        
            reader.onload = function(e) {
                subImage.removeChild(subImage.querySelector('img'));
                let img = document.createElement("img");
                img.setAttribute("src", e.target.result);
                img.setAttribute("class", "object-scale-down rounded-lg max-h-full p-2 hover:opacity-50");
                subImageText.classList.add("hidden");
                subImage.appendChild(img);
            };
            reader.readAsDataURL(e.target.files[0])
        })
    })
}
resetSubImageEvent();



// 단계 추가하기 버튼 누르면 입력폼 추가
const addStepButton = document.querySelector('#add-step');
const recipeStepForm = document.querySelector('#add-step-wrap');
let recipeStep = document.querySelector('.recipe-contents').childElementCount;

addStepButton.addEventListener('click', () => {
    recipeStep++;
    const addStepHtml = `<div id="step-${recipeStep}" class="recipe-contents">
                        <div class="md:flex mb-6">
                            <div class="md:w-1/3">
                                <span class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                    Step ${recipeStep}
                                </span>
                            </div>
                            <div class="md:w-2/3">
                                <textarea class="form-textarea block w-full focus:bg-white" id="my-textarea" value="" rows="3"></textarea>
                                <p class="py-2 text-sm text-gray-600">예시: 잭 다니엘스 테네시 허니</p>
                            </div>
                        </div>
                        <div class="md:flex mb-6">
                            <div class="md:w-1/3">
                                <span class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                    
                                </span>
                            </div>
                            <div class="md:w-2/3">
                                <!-- <input id="sub-image-${recipeStep}" type="file" accept="image/png image/jpg image/jpeg"/> -->
                                <span class="block mb-2 text-sm font-medium " for="file_input">사진을 올려주세요</span>
                                <div class="flex items-center justify-center w-full">
                                    <label for="sub-image-${recipeStep}" class="flex flex-col items-center justify-center w-full h-64 border-2 border-[#D9601A] border-dashed rounded-lg cursor-pointer bg-white hover:bg-white">
                                        <div id="sub-image-text-${recipeStep}" class="flex flex-col items-center justify-center">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">클릭하여 업로드 해주세요</span></p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px).</p>
                                        </div>
                                        <img class="hidden object-scale-down rounded-lg max-h-full p-5 hover:opacity-50" src="" alt="">
                                        <input class="sub-image" hidden name="sub_image_${recipeStep}" id="sub-image-${recipeStep}"  aria-describedby="file_input_help" type="file">
                                    </label>
                                </div> 
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG or JPEG (MAX. 800x400px).</p>
                            </div>
                        </div>
                    </div>`;
    recipeStepForm.insertAdjacentHTML("beforebegin", addStepHtml);
    // 추가된 부재료 이미지에 이벤트 리스너 붙이기
    resetSubImageEvent();
})

// 단계 삭제하기 버튼 누르면 입력폼 단계 하나 삭제
const deleteStepButton = document.querySelector('#delete-step');
const recipeStepWrap = document.querySelector('#recipe-cont form');
deleteStepButton.addEventListener('click', () => {
    // Step Recipe 안에 있는 child element의 총 개수 -> initial: 2개 (step1, button wrap)
    const totalChildNum = recipeStepWrap.childElementCount;
    if (totalChildNum > 2) {
        recipeStep--;
        recipeStepWrap.children[totalChildNum - 2].remove();
    }
    // 지워진 부재료 이미지에 이벤트 리스너 빼기
    resetSubImageEvent();
})

// recipe_num 가져오기
const url = new URL(window.location.href);
const recipe_num = url.parmas;

// ==== 저장 =====
// axios로 레시피 정보 보내기 
const updateRecipe = async (recipeObj, recipe_num) => {
    try {
      const formData = new FormData();
  
      formData.append("title", recipeObj.recipeTitle);
      formData.append("main_ingredient", recipeObj.mainIng);
      formData.append("main_ing_detail", recipeObj.mainIngDetail);
      formData.append("main_image", recipeObj.mainImage);
      formData.append("sub_ingredient_detail", recipeObj.subIngString);

    //   recipeObj.recipeRawHtml.forEach((recipeStep, index) => {
    //     formData.append(`content_${index}`, recipeStep);
    //   })
    formData.append("content", recipeObj.recipeRawHtml);
    formData.append("recipe_num", recipe_num);


      recipeObj.recipeSubImgs.forEach((sub_imgs, index) => {
        formData.append(`sub_imgs_${index+1}`, sub_imgs);
      })
      
      
      await axios({
        method: "post",
        url: `/recipe/update`,
        data : formData,
        headers: { 
            "Content-Type": "multipart/form-data" 
        },
      }).then((res) => {
        // 저장하면 홈으로 이동
        if(res.data === "saved") {
            if(confirm("저장되었습니다!")) {
                // 홈으로 이동
                window.location.href = `/recipe/read?recipe_num=${recipe_num}`;
            }
        }
      });
    } catch (err) {
      console.error(err);
    }
  };


// 저장 버튼을 누를 시
const formData = new FormData();
const saveButton = document.querySelector('#save-button');

saveButton.addEventListener('click', async () => {
        // recipe 제목을 저장
        const recipeTitle = document.querySelector('#recipe-title').value;
        const recipeNum = document.querySelector('#recipe-title').getAttribute('data-num');
        // 주재료 저장
        const mainIng = document.querySelector('#main-ing-select select').value;
        // 주재료 상세설명 저장
        let mainIngDetail;
        if (document.getElementById('#my-textarea')) {
            mainIngDetail = document.querySelector('#main-ing-detail textarea').value;
        } else {
            mainIngDetail = '';
        }
        

        // string 형식으로 부재료들 구분하여 저장
        const subIngString = document.querySelector('#sub-ing-detail').value;
        // 대표 이미지 저장
        const mainImage = document.querySelector('#main-image').files[0];
        // 레시피 내용 저장
        const recipeContents = document.querySelectorAll('.recipe-contents');
        let recipeRawHtml = "";
        let recipeSubImgs = [];
        recipeContents.forEach((recipeContent, index) => {
            const recipeStepNum = recipeContent.querySelector('label').innerText;
            const recipeContentText = recipeContent.querySelector('textarea').value;
            const recipeSubImg = recipeContent.querySelector('input').files[0];
            if(index != recipeContents.length-1) {
                recipeRawHtml += (recipeContentText + "$");
            } else {
                recipeRawHtml += (recipeContentText);
            }
            recipeSubImgs.push(recipeSubImg);
        })

        const recipeObj = {
            recipeTitle, 
            mainIng, 
            mainIngDetail, 
            subIngString, 
            mainImage,
            recipeRawHtml,
            recipeSubImgs
        }
        await updateRecipe(recipeObj, recipeNum);
})



// 다시 작성하기 버튼을 누를 시
const refreshButton = document.querySelector('#refresh-button');
refreshButton.addEventListener('click', () => {
    if(confirm("다시 작성하시겠습니까?")) {
        location.reload();
    }
})