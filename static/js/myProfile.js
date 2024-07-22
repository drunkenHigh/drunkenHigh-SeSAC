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

// user id 받아오기
const userId = document.querySelector('#user-id').innerText


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
                <form enctype="multipart/form-data">
                    <div class="md:flex mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                프로필 사진 변경
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <label class="block mb-2 text-sm font-medium " for="file_input">사진을 올려주세요</label>

                            <div class="flex items-center justify-center w-full">
                                    
                                    <label id="profile-image-label" for="profile-image-input" class="flex flex-col items-center justify-center w-full h-64 border-2 border-[#D9601A] border-dashed rounded-lg cursor-pointer bg-white hover:bg-white">
                                        <div id="profile-image-text" class="flex flex-col items-center justify-center">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">클릭하여 업로드 해주세요</span></p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px).</p>
                                        </div>
                                        <img class="hidden object-scale-down rounded-lg max-h-full p-5 hover:opacity-50" src="" alt="">
                                        <input hidden name="profile_image" id="profile-image-input"  aria-describedby="file_input_help" type="file">
                                    </label>
                            </div> 

                            
                        </div>
                    </div>
                    <div class="md:flex mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                닉네임
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <textarea class="form-textarea block w-full" id="changed-nickname" value="" rows="1"></textarea>
                            <p class="py-2 text-sm text-green-600"></p>
                        </div>
                    </div>
                    <div class="md:flex mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                현재 비밀번호
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input type="password" class="form-input block w-full" id="old-pw" value="" rows="1"></input>
                        </div>
                    </div>
                    <div class="md:flex mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                새로운 비밀번호
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input type="password" class="form-input block w-full" id="changed-pw" value="" rows="1"></input>
                            <p class="py-2 text-sm text-gray-600">비밀번호는 8~16자의 영문자, 숫자, 특수문자를 포함해야 합니다.</p>
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

const resetProfileImageEvent = async () => {
    let profileImageUpload = document.querySelector('#profile-image-input');
    const profileImage = document.querySelector(`#profile-image-label`);
    const profileImageText = document.querySelector(`#profile-image-text`)
    profileImageUpload.addEventListener('change', (e) => {
        const files = e.currentTarget.files;
        let reader = new FileReader();
    
        reader.onload = function(e) {
            profileImage.removeChild(profileImage.querySelector('img'));
            let img = document.createElement("img");
            img.setAttribute("src", e.target.result);
            img.setAttribute("class", "object-scale-down rounded-lg max-h-full p-2 hover:opacity-50");
            profileImageText.classList.add("hidden");
            profileImage.appendChild(img);
        };
        reader.readAsDataURL(e.target.files[0])
    })
    
}



const checkNameCheck = async () => {
    return new Promise((resolve) => {
        const changedUsername = document.querySelector('#changed-nickname');
        changedUsername.onblur = async function() {
            let inputUserName = changedUsername.value;
            await axios({
                method: 'POST',
                url: '/users/register/chkName',
                data: { user_name: inputUserName },
                header: { 'content-type': 'application/json'}
            }).then((nameCheck) => {
                if(nameCheck.data.success) {
                    $(this).next().text('사용가능한 닉네임입니다')
                    $(this).next().removeClass('text-red-600')
                    $(this).next().addClass('text-green-600')
                } else {
                    $(this).next().text('이미 사용중인 닉네임입니다')
                    $(this).next().removeClass('text-green-600')   
                    $(this).next().addClass('text-red-600')   
                }
            }).catch((err) => {
                console.error(err);
                if(err.response.status === 401){
                    $(this).next().text('이미 사용중인 닉네임입니다.')
                    $(this).next().removeClass('text-green-600')   
                    $(this).next().addClass('text-red-600')   
                }
            })
        }
        resolve();
    })
}


const setupChangeUserInfoSaveButton = async () => {
    // 정규식
    const valRegExp = (value) => {
        let reg;
        let regex = new RegExp(reg);

        reg = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

        return reg.test(value)
    }
    return new Promise((resolve) => {
        const changeUserInfoSaveButton = document.querySelector('#save-change-info');
        changeUserInfoSaveButton.addEventListener('click', () => {
            // 프로필 이미지 저장
            const profileImage = document.querySelector('#change-profile-info input').files[0];
            // 변경된 닉네임 저장
            const changedUsername = document.querySelector('#changed-nickname').value;
            
            // 원래 비밀번호
            const originalPw = document.querySelector('#old-pw').value;

            // 변경된 비밀번호 저장  
            const changedPw = document.querySelector('#changed-pw').value;
            if(!changedPw.trim() === ''){
                if(!valRegExp(changedPw)){
                    alert('비밀번호가 적합하지 않습니다.')
                }
            }

            const formData =  new FormData();
            formData.append('user_id', userId);
            formData.append('old_pw', originalPw);
            formData.append('new_pw', changedPw);
            formData.append('user_name', changedUsername);
            formData.append('profile_img', profileImage);
            
            axios ({
                method: 'POST',
                url: '/users/mypage/edit',
                data: formData
            }).then(res => {
                if (res.data) {
                    alert('회원정보가 수정되었습니다!');
                    document.location.href = window.location.href;
                } else {
                    alert('오류가 발생했습니다. 비밀번호를 확인해주세요!')
                }
            }).catch(err=>{
                console.error(err);
            })
        })
        resolve();
    })
};

const run = async () => {
    await waitForUserChange();
    await resetProfileImageEvent();
    await checkNameCheck();
    await setupChangeUserInfoSaveButton();
};
run();


// 회원탈퇴 누르면 delete로 axios 전송
const profileDelete = async () => {
    axios({
        method: 'DELETE',
        url: '/users/mypage',
        data: {
            user_id: userId
        },
        headers : {
            "Content-type": "application/json"
        }
    })
    .then((res) => {
        if (res.data) {
            alert('탈퇴 되었습니다!');
            document.location.href = '/';
        }
    });
};

const deleteButton = document.querySelector('#delete-user-button');
deleteButton.addEventListener('click', profileDelete, {once: true});