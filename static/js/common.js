const cookieBtn = document.getElementsByName('adult')
const cookieMsg = document.querySelector('.cookie-msg')
const cookieContainer = document.querySelector('.cookie__container')

cookieBtn.forEach(ele=>{
    ele.addEventListener('click', setCookie)
})

// 쿠키 가져오기 함수
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
      start += cName.length;
      var end = cookieData.indexOf(';', start);
      if(end == -1)end = cookieData.length;
      cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

let ageCookie = getCookie('age')
if(ageCookie){
    cookieContainer.remove()
} 

// 쿠키 설정
async function setCookie(e){
    const cookieValue = e.target.value;
    console.log(cookieValue);
    try {
        const cookieAxios = await axios({
            method : 'get',
            url : '/setCookie'
        })

        if(cookieValue === 'yes'){
            cookieContainer.remove();
        } else {
            cookieMsg.innerText = '만 19세 미만은 이 사이트를 이용할 수 없습니다😥'
        }

    }catch(err){
        console.error(err);
    }
}

