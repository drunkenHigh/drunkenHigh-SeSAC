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

const url = new URL(window.location.href);
const recipe_num = url.searchParams.get('recipe_num');


// 삭제 버튼
const deleteButton = document.querySelector('#delete-button');
if(deleteButton){
    deleteButton.addEventListener('click', async () => {
        if(confirm('삭제하시겠습니까?')) {
            await axios({
                method: 'delete',
                url: `/recipe/read?recipe_num=${recipe_num}`
            }).then((res) => {
                if(res.data) {
                    if(confirm("삭제되었습니다!")) {
                        // 홈으로 이동
                        window.location.href = "/";
                    }
                }
            })
        }
    }, {once: true})
}

// 수정 버튼
const updateButton = document.querySelector('#update-button');
if(updateButton){
    updateButton.addEventListener('click', async () => {
        if(confirm("수정하시겠습니까?")) {
            // 수정 페이지로 이동
            window.location.href = `/recipe/write/${recipe_num}`;
        }
    }, {once:true})
}


const btn = document.getElementById('like');
const likeCount = document.querySelector('#likes-count');

const getLikesCount = async () => {
    await axios({
        method: 'get',
        url: `/recipe/count/${recipe_num}`,
    }).then((res) => {

        if(res.data.alreadyLiked) {
            likeButton.classList.replace('fill-gray-200', 'fill-red-500');
        } 
    })
}
getLikesCount();

const likeButton = document.querySelector('#like');
btn.addEventListener('click', async ()=>{
    await axios({
        method: 'post',
        url: `/recipe/likes/${recipe_num}`,
    }).then((res) => {
        if(res.data.message === "destroy") {
            likeButton.classList.replace('fill-red-500', 'fill-gray-200');
        } else {
            likeButton.classList.replace('fill-gray-200', 'fill-red-500');
        }
        likeCount.innerText = parseInt(likeCount.innerText) + res.data.likes;
    }).catch((err) => {
        if (err.response.status == 401) {
            alert('좋아요는 로그인 후 가능합니다!');
        }
    })
})