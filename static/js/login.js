const loginRegisterBtn = document.querySelector('.login-register a')
const loginLink = document.querySelectorAll('.login-link')
const loginBox = document.querySelector('.login__box')

if(loginLink){
    loginLink.forEach(ele=>{
        ele.addEventListener('click', getLogin)
    })
}

// 로그인창 열기
async function getLogin(e) {
    e.preventDefault();
    try {
        await axios({
            method : 'get',
            url : '/users/login'
        })
        let hcode = `
        <div class="login__container">
            <div class="login__content">
                <div class="login__close">
                    <button>
                        <span class="fa-solid fa-xmark"></span>
                    </button>
                </div>
                <h2 class="login__title">로그인</h2>
                <form name="login" id="login">
                    <div class="login-inputbx">
                        <label for="user_id">아이디</label>
                        <input 
                        type="text" 
                        name="user_id" 
                        id="user_id" 
                        minlength="6"
                        maxlength="20"
                        required>
                        <div class="login-msg"></div>
                    </div>
                    <div class="login-inputbx">
                        <label for="user_pw">비밀번호</label>
                        <input 
                        type="password" 
                        name="user_pw" 
                        id="user_pw"  
                        minlength="8"
                        maxlength="16"
                        required>
                        <div class="login-msg"></div>
                    </div>
                    <button type="button" class="login-btn">로그인</button>
                </form>
                <div class="login-register">
                    아직 회원이 아니신가요?
                    <a href="/users/register">회원가입</a>
                </div>
            </div>
        </div>`

        loginBox.innerHTML = hcode

        const loginContainer = document.querySelector('.login__container') 
        const loginBtn = document.querySelector('.login-btn')
        const loginCloseBtn = document.querySelector('.login__close button')
        const loginForm = document.querySelector('#login')

        loginBtn.addEventListener('click', postLogin)
        loginForm.addEventListener('keypress', (e)=>{
            if(e.keyCode === 13){
                postLogin()
            }
        })
        loginCloseBtn.addEventListener('click', ()=>{
            loginContainer.remove();
        })
    } catch(err){
        console.log(err);
    }
}

// 로그인 기능
async function postLogin(){
    console.log('로그인');
    const loginForm = document.forms['login'];
    const loginMsg = document.querySelectorAll('.login-msg');
    const loginContainer = document.querySelector('.login__container') 
    
    const currentURL = window.location.href;

    const data = {
        user_id : loginForm.user_id.value,
        user_pw : loginForm.user_pw.value
    }

    if(!loginForm.user_id.checkValidity()){
        loginMsg[0].textContent = '아이디를 입력해주세요';
    } else if(!loginForm.user_pw.checkValidity()){
        $('.login-msg').empty();
        loginMsg[1].textContent = '비밀번호를 입력해주세요';
    } else {
        try {
            const loginAxios = await axios({
                method : 'POST',
                url : '/users/login',
                data
            })
            const result = loginAxios.data;
            if(result.success){ // 로그인 성공 시
                alert('환영합니다!')
                loginContainer.remove();
                if(currentURL.slice(-8) === 'register'){
                    document.location.href = '/';
                } else {
                    document.location.href = currentURL;
                }
            } 
        } catch(err){
            console.error(err);
            loginMsg[1].textContent = '로그인 실패, 아이디와 비밀번호를 확인해주세요.'
        }
    }
}


