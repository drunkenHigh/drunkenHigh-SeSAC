const loginContainer = document.querySelector('.login__container') 
const loginBtn = document.querySelector('.login-btn')

if(loginContainer){
    loginBtn.addEventListener('click', login)
}

async function login(){
    const loginForm = document.forms['login'];
    const loginMsg = document.querySelectorAll('.login-msg');
    
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
                url : 'users/login',
                data
            })
            const result = loginAxios.data;
            if(result){ // 로그인 성공 시
                alert('환영합니다!')
                loginContainer.remove();
                document.location.href = currentURL;
            } else { // 로그인 실패 시 
                loginMsg[1].textContent = '로그인 실패, 아이디와 비밀번호를 확인해주세요.'
            }
        } catch(err){
            console.error(err);
        }
    }
}