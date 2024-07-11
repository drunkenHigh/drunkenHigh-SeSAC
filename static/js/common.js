const cookieBtn = document.getElementsByName('adult')
const cookieMsg = document.querySelector('.cookie-msg')
const cookieContainer = document.querySelector('.cookie__container')

cookieBtn.forEach(ele=>{
    ele.addEventListener('click', setCookie)
})

const cookie = '<%= age%>'
if(cookie){
    cookieContainer.remove()
}

// 쿠키 설정
async function setCookie(e){
    const cookieValue = e.target.value;
    if(cookieValue === 'yes'){
        try{
            const cookieAxios = await axios({
                method : 'get',
                url : '/setCookie'
            })
        }catch(err){

        }
        cookieContainer.remove();
    } else{
        cookieMsg.innerText = '만 19세 미만은 이 사이트를 이용할 수 없습니다😥'
    }
}