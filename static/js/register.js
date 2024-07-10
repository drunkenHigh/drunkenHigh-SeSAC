console.log('gdgd');

const registerMsg = document.querySelectorAll('.register-msg');
const registerBtn = document.querySelector('#register button');
let registerForm = document.forms['register']

console.log(registerForm);

// 회원가입 정보 전송
registerBtn.addEventListener('click', registerSubmit)

// 키 입력할때

// 포커스 빠졌을 때


// 메시지 함수
function sendMsg(index, msg) {
    registerMsg[index].textContent = msg
    registerMsg[index].classList.add('on')
}

// 회원가입 정보 전송 함수
async function registerSubmit(){
    registerForm = document.forms['register'];
    const registerData = {
        user_id : registerForm.user_id.value,
        user_pw : registerForm.user_pw.value,
        user_name : registerForm.user_name.value,
        birthday : registerForm.birthday.value
    }

    if(!registerForm.user_id.checkValidity() || !valRegExp(registerData.user_id, registerForm.user_id)){
        $('.register-msg').empty();
        sendMsg(0, '영문자로 시작하는 6~20글자의 영문 소문자/숫자 조합으로 입력해주세요')
    } else if(!registerForm.user_pw.checkValidity() || !valRegExp(registerData.user_pw, registerForm.user_pw)){
        $('.register-msg').empty();
        sendMsg(1, '8~16자의 영문 대/소문자, 숫자, 특수문자로 입력해주세요')
    } else if(!registerForm.user_name.checkValidity()){
        $('.register-msg').empty();
        sendMsg(2, '닉네임을 입력해주세요')
    } else if(!registerForm.birthday.checkValidity()){
        $('.register-msg').empty();
        sendMsg(3, '생년월일을 입력해주세요')
    } else {
        alert('가입성공 짝짝짝')
        // try {
        //     const registerAxios = await axios({
        //         method : 'POST',
        //         url : '/users/register',
        //         data : registerData
        //     })
        //     if(registerAxios.result){
        //         alert('회원가입 성공')
        //         document.location.href = '/'
        //     }
    
    
        // }catch(err){
    
        // }
    }
}




// 정규식 체크 함수
function valRegExp(value, input) { // value : 검사할 값 / input : 인풋태그
    // 정규식 담을 변수
    let reg;
    let regex = new RegExp(reg)

    switch(input){
        case "user_id" : 
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            break;
        case "user_pw" : 
            reg = /^.(?=^.{8,16}$)(?=.\d)(?=.[a-zA-Z])(?=.[!@#$%^&+=]).*$/;
            break;
    }

    return regex.test(value);
}