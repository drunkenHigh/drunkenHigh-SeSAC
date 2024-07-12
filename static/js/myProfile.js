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


// 작성한 레시피 목록 불러오기




// 회원정보 수정 버튼 누르면 수정 폼 나타나게 하기
const changeUserInfoButton = document.querySelector('#change-user-info');
const changeUserInfoWrap = document.querySelector('#change-user-info-wrap');
let changeUserFlag = false;

const waitForUserChange = () => {
    return new Promise((resolve) => {
        changeUserInfoButton.addEventListener('click', () => {
            const changeUserInfoHtml = `<!--divider-->
            <hr class="bg-gray-300 my-12">
            <!--Title-->
            <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-lg">회원정보를 수정해주세요</h2>

            <!--Card-->
            <div id='change-profile-info' class="p-8 mt-6 lg:mt-0 rounded bg-white">
                <form>
                    <div class="md:flex mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                프로필 사진 변경
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <label class="block mb-2 text-sm font-medium " for="file_input">사진을 올려주세요</label>
                            <input id="profile-image" class="block w-full text-sm bg-[#edf2f7] cursor-pointer focus:outline-none " aria-describedby="file_input_help" id="file_input" type="file">
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG or JPEG (MAX. 800x400px).</p>
                        </div>
                    </div>
                    <div class="md:flex mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                닉네임
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <textarea class="form-textarea block w-full focus:bg-white" id="changed-nickname" value="" rows="1"></textarea>
                            <p class="py-2 text-sm text-gray-600">특수문자 불가</p>
                        </div>
                    </div>
                
                
                    <div id="save-change-info-wrap" class="md:flex md:items-center">
                        <div class="md:w-1/3"></div>
                        <div class="md:w-2/3">
                            <button id="save-change-info" class="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                <!-- 저장하기 누르면 사라지게 만들기 -->
                                저장하기
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <!--/Card-->`;            
            changeUserInfoWrap.insertAdjacentHTML("afterend", changeUserInfoHtml);
            changeUserFlag = true;
            resolve();
        }, { once: true });
    });
};


const setupChangeUserInfoSaveButton = async () => {
    await waitForUserChange();

    const changeUserInfoSaveButton = document.querySelector('#save-change-info');
    changeUserInfoSaveButton.addEventListener('click', () => {
        // 프로필 이미지 저장
        const profileImage = document.querySelector('#change-profile-info input').files[0];
        // 변경된 닉네임 저장
        const changedUsername = document.querySelector('#changed-nickname').value;
        console.log(changedUsername);
    });
    
};

setupChangeUserInfoSaveButton();



// 회원탈퇴 누르면 delette로 axios 전송

