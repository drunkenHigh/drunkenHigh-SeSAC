const registerMsg = document.querySelectorAll('.register-msg');

// 회원가입 정보 전송
registerForm.addEventListener('submit', registerSubmit)

// 메시지 함수
function sendMsg(index, msg) {
    registerMsg[index].textContent = msg
    registerMsg[index].classList.add(on)
}

// 회원가입 정보 전송 함수
async function registerSubmit(){
    const registerForm = document.forms('register');
    const registerData = {
        user_id : registerForm.user_id.value,
        user_pw : registerForm.user_pw.value,
        user_name : registerForm.user_name.value,
        birthday : registerForm.birthday.value
    }

    if(!registerForm.user_id.checkValidity()){
        sendMsg(0, '아이디를 입력해주세요')
    } else if(valRegExp()){

    } else if(!registerForm.user_pw.checkValidity()){
        sendMsg(1, '비밀번호를 입력해주세요')
    } else if(!registerForm.user_name.checkValidity()){
        sendMsg(2, '닉네임을 입력해주세요')
    } else if(!registerForm.birthday.checkValidity()){
        sendMsg(3, '생년월일을 입력해주세요')
    } else {
        try {
            const registerAxios = await axios({
                method : 'POST',
                url : '/users/register',
                data : registerData
            })
            if(registerAxios.result){
                alert('회원가입 성공')
                document.location.href = '/'
            }
    
    
        }catch(err){
    
        }
    }
}

// 정규식 체크 함수
function valRegExp(value, input) {
    // 정규식 담을 변수
    let reg;

    switch(input){
        case "user_id" : 
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            break;
        case "user_pw" : 
            reg = /^.(?=^.{8,16}$)(?=.\d)(?=.[a-zA-Z])(?=.[!@#$%^&+=]).*$/;
            break;
    }

    return reg.test(value);
}