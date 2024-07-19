window.addEventListener('DOMContentLoaded', ()=>{
function actionBtn(){
    $('.ham-btn').click(function () {
        $(this).toggleClass('on')
        $('.header__nav').fadeToggle(300)
    })
}

actionBtn()

const iconRefer = document.querySelector('.icon-reference')
const hiddenDiv =document.querySelector('.hidden-div')
iconRefer.addEventListener('mouseover', ()=>{
    $('.hidden-div').addClass('on');
})

hiddenDiv.addEventListener('mouseout', ()=>{
    $('.hidden-div').removeClass('on');
})

})