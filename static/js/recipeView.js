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



// 추가해야 하는 기능
// - 해당글의 작성자만 수정/삭제 보이게 하기
// - 깔쌈한 시각화 방법 고민해보기
// - 좋아요 기능 완성하기


const url = new URL(window.location.href);
const recipe_num = url.searchParams.get('recipe_num');


// 삭제 버튼
const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', async () => {
    await axios({
        method: 'delete',
        url: "/write/delete",
        data: {
            recipe_num
        },
        headers: {
            'content-type': 'application/json'
        }
    }).then((res) => {
        if(res.data === "true") {
            if(confirm("삭제되었습니다!")) {
                // 홈으로 이동
                window.location.href = "/";
            }
        }
    })
}, {once: true})

// 수정 버튼
const updateButton = document.querySelector('#update-button');
updateButton.addEventListener('click', async () => {
    if(confirm("수정하시겠습니까?")) {
        // 수정 페이지로 이동
        window.location.href = `/write?recipe_num=${recipe_num}`;
    }
}, {once:true})

// 좋아요 기능: 미완성 -------------------------
let main = {

    init: function () {
    },

    plusLike : function (form) {
        const data = form.postId.value;
        form.postId.value= form.postId.value.trim();
        const likeCount = document.getElementById("likeCount");

        axios.post(
            url = "/likes",
            data,
            {
                headers: {
                    'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log("좋아요 성공");
            console.log(response);
            console.log(response.status);
            console.log(response.data);
            console.log(response.data.resultCode);
            console.log(response.data.result.count);
            console.log(response.data.result.userName);
            console.log(response.data.result.likeId);
            console.log(response.data.result.postId);
            //좋아요
            likeCount.innerHTML = response.data.result.count;
            }
        ).catch((error) => {
            console.log(error.response.data.result);
            console.log(error.response);
            console.log(error.toJSON());
            if (error.response.data.result["errorCode"] == "ALREADY_LIKED") {
                alert("이미 해당 글에 좋아요를 누르셨습니다");
                window.location.href = '/post/getOne/'+form.postId.value;
            } else if (error.response.data.result["errorCode"] == "USERNAME_NOT_FOUND") {
                alert("로그인 후에 이용해주세요!");
                window.location.href = '/users/login';  // 아니면 메인페이지로
            }
        });
    }
};

main.init();
// -------------------------