window.addEventListener('DOMContentLoaded', ()=>{
function actionBtn(){
    $('.ham-btn').click(function () {
        $(this).toggleClass('on')
        $('.header__nav').fadeToggle(300)
    })
}

actionBtn()
})


// const customCurser = document.querySelector('.mouse-custom')
let posX = 0;
let posY = 0;
// 마우스 커서 커스텀
function mouseFn(){
    let gap = customCurser.clientWidth;
    document.body.onmousemove = function(e){
        posX = e.clientX + 10 + 'px'
        posY = e.clientY + 'px'

        customCurser.style.left = posX;
        customCurser.style.top = posY;
    }
}

// mouseFn()