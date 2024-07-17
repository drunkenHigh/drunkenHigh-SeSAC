// scroll spy
/* http://jsfiddle.net/LwLBx/ */

// Cache selectors
var lastId,
  topMenu = $("#menu-content"),
  topMenuHeight = topMenu.outerHeight() + 175,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function () {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  $("html, body").stop().animate(
    {
      scrollTop: offsetTop,
    },
    300
  );
  if (!helpMenuDiv.classList.contains("hidden")) {
    helpMenuDiv.classList.add("hidden");
  }
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function () {
    if ($(this).offset().top < fromTop) return this;
  });
  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
      .parent()
      .removeClass("font-bold border-yellow-600")
      .end()
      .filter("[href='#" + id + "']")
      .parent()
      .addClass("font-bold border-yellow-600");
  }
});

// 주재료 옵션 선택하면 주재료 상세 보이게 하기
const mainIng = document.querySelector("#main-ing-select");
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
// const mainIngDetailHtml = `<div class="" id="main-ing-detail">
//             <div class="">
//                 <label class="" for="my-textarea">
//                     주재료 상세
//                 </label>
//             </div>
//             <div class="">
//                 <textarea class="" value="" rows="2"></textarea>
//                 <p class="">예시: 잭 다니엘스 테네시 허니</p>
//             </div>
//         </div>`;
mainIng.addEventListener(
  "change",
  () => {
    console.log("Main ind selected");
    mainIng.insertAdjacentHTML("afterend", mainIngDetailHtml);
  },
  { once: true }
);

// 단계 추가하기 버튼 누르면 입력폼 추가
const addStepButton = document.querySelector("#add-step");
const recipeStepForm = document.querySelector("#add-step-wrap");
let recipeStep = 1;
addStepButton.addEventListener("click", () => {
  recipeStep++;
  const addStepHtml = `<div id="step-${recipeStep}">
                        <div class="md:flex mb-6">
                            <div class="md:w-1/3">
                                <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                    Step ${recipeStep}
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <textarea class="form-textarea block w-full focus:bg-white" id="my-textarea" value="" rows="3"></textarea>
                                <p class="py-2 text-sm text-gray-600">예시: 잭 다니엘스 테네시 허니</p>
                            </div>
                        </div>
                        <div class="md:flex mb-6">
                            <div class="md:w-1/3">
                                <input name="sub_image" id="sub-image-${recipeStep}" type="file" accept="image/png image/jpg image/jpeg"/>
                            </div>
                        </div>
                    </div>`;
  recipeStepForm.insertAdjacentHTML("beforebegin", addStepHtml);
});

// ==== 저장 =====
// axios로 레시피 정보 보내기

const writeRecipe = async (recipeObj) => {
  try {
    const formData = new FormData();

    formData.append("recipeTitle", recipeObj.recipeTitle);
    formData.append("mainIng", recipeObj.mainIng);
    formData.append("mainIngDetail", recipeObj.mainIngDetail);
    formData.append("main_image", recipeObj.mainImage);
    formData.append("sub_ingredient", recipeObj.subIngredient);
    formData.append("content", recipeObj.recipeRawHtml);
    formData.append("sub_imgs", recipeObj.recipeSubImgs);

    await axios({
      method: "post",
      url: "/recipe/write",
      data : formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      const {recipe_title, mainIngredient, sub_ing_detail, main_image, 
      step_textarea, sub_image} =res.data;
      console.log("axios res >> ", res);
      console.log("Img addr : ", res.data.path);
    });
  } catch (err) {
    console.error(err);
  }
};

// import path from "path";
// console.log(__dirname);
// 저장 버튼을 누를 시
//import * as FormData from 'form_data';

const saveButton = document.querySelector("#save-button");

saveButton.addEventListener("click", () => {
  console.log("click btn", saveButton);
  // recipe 제목을 저장
  const recipeTitle = document.querySelector("#recipe-title").value;
  // 주재료 저장
  const mainIng = document.querySelector("#main-ing-select select").value;
  // 주재료 상세설명 저장
  const mainIngDetail = document.querySelector(
    "#main-ing-detail textarea"
  ).value;
  // list 형식으로 부재료들 구분하여 저장
  const subIngList = document.querySelector("#sub-ing-detail").value.split(",");
  // 대표 이미지 저장
  const mainImage = document.querySelector("#main-image").files[0];
  console.log("mainImg  >> ", mainImage);
  // 레시피 내용 저장
  const recipeContents = document.querySelectorAll(".recipe-contents");
  let recipeRawHtml = ``;
  let recipeSubImgs = [];
  
  recipeContents.forEach((recipeContent) => {
    const recipeStepNum = recipeContent.querySelector("label").innerText;
    const recipeContentText = recipeContent.querySelector("textarea").value;
    const recipeSubImg = recipeContent.querySelector("input").files[0];
    // 조회 페이지에서 어떻게 렌더링할지 정해지면 raw html 수정하기!
    recipeRawHtml += `<div><div>${recipeStepNum}</div><div>${recipeContentText}</div></div>`;
    recipeSubImgs.push(recipeSubImg);
  });

  const recipeObj = {
    recipeTitle,
    mainIng,
    mainIngDetail,
    subIngList,
    mainImage,
    recipeRawHtml,
    recipeSubImgs,
  };
  
  
  writeRecipe(recipeObj);

  // console.log(`recipeStepNum >> ${recipeStepNum}`);
  //     if(confirm("저장되었습니다!")) {
  //         // 홈으로 이동
  //         window.location.href = "/";
  //     }
  // })
});


// 다시 작성하기 버튼을 누를 시
const refreshButton = document.querySelector("#refresh-button");
refreshButton.addEventListener("click", () => {
  if (confirm("다시 작성하시겠습니까?")) {
    location.reload();
  }
});
