const registerMsg = document.querySelectorAll('.register-msg');
const registerBtn = $('.register__btn');
let registerForm = document.forms['register']
let regiterFormInput = registerForm.querySelectorAll('.register-inputbx input')
const registerFileInput = document.querySelector('.register__filebx input')

// 회원가입 통과여부 담을 변수
let pass = true;

// 포커스 빠졌을 때
regiterFormInput.forEach(ele=>{
    ele.onblur = async function() {
        // blur 된 아이디 읽어오기
        let inputId = this.getAttribute('id')
        let inputValue = this.value;

        if(inputId === 'user_id') {
            if(!this.checkValidity() || !valRegExp(inputValue, inputId)){
                pass = false;    
                sendMsg(0, '영문자로 시작하는 6~20글자의 영문 소문자/숫자 조합으로 입력해주세요')
            } else {
                $(this).next().empty();
                // 아이디 중복검사 넣어야함 -> axios 쓸것
                try {
                    const idCheck = await axios({
                        method : 'post',
                        url : '/users/register/chkid',
                        data : {user_id : inputValue}
                    })

                    if(idCheck.data.success) {
                        pass = true
                        sendMsg(0, '사용가능한 아이디입니다')
                        // 아이디 통과시에만 이미지 파일 올릴 수 있음
                        registerFileInput.disabled = false;
                    } 
                } catch(err){
                    if(err.response.status === 401){
                        pass = false
                        sendMsg(0, '이미 사용중인 아이디입니다')
                        // 아이디 통과시에만 이미지 파일 올릴 수 있음
                        registerFileInput.disabled = true;
                    }
                    console.log(err);
                    registerFileInput.disabled = true;
                    pass = false
                }
            }
        } else if(inputId === 'user_pw'){
            if(!this.checkValidity() || !valRegExp(inputValue, inputId)){
                pass = false;
                sendMsg(1, '8~16자의 영문 대/소문자, 숫자, 특수문자로 입력해주세요')
            } else {
                $(this).next().empty();
                pass = true;
                sendMsg(1, '사용가능한 비밀번호입니다')
            }
        } else if(inputId === 'user_name'){
            if(!this.checkValidity()){
                pass = false;
                sendMsg(2, '닉네임을 입력해주세요')
            } else {
                // 닉네임 중복검사 -> axios 쓸것 
                $(this).next().empty();
                try {
                    const nameCheck = await axios({
                        method : 'post',
                        url : '/users/register/chkName',
                        data : {user_name : inputValue}
                    })

                    if(nameCheck.data.success) {
                        pass = true
                        sendMsg(2, '사용가능한 닉네임입니다')
                        
                    } 
                } catch(err){
                    if(err.response.status === 401){
                        pass = false
                        sendMsg(2, '이미 사용중인 닉네임입니다')
                        
                    }
                    console.log(err);
                    registerFileInput.disabled = true;
                    pass = false
                }
            }
        } else if(inputId === 'birthday'){
            let year =  this.value.slice(0,4);
            let month = this.value.slice(4,6);
            let day = this.value.slice(6,8)
            let thisYear = new Date().getFullYear()

            if(!this.checkValidity() || isNaN(this.value) || 
            this.value.length < 8 || year < 1910 || month < '01' || month > 12 || day < '01' || day > 32 ){
                pass = false
                sendMsg(3, '8자리로 생년월일을 입력해주세요')
            } else if(thisYear - year < 19) {
                pass = false
                sendMsg(3, '만 19세 미만은 가입할 수 없습니다')
            } else {
                $(this).next().empty();
                pass = true
                sendMsg(3, '가입할 수 있는 나이입니다')
            }
        }
    }
})

// 가입버튼 클릭
registerBtn.click(()=>{
    pass = true;
    $('.register-inputbx input').trigger('blur')
    if(pass){
        registerSubmit()
    } else {
        alert('가입할 수 없습니다 작성한 정보를 확인해주세요')
    }
})

// 메시지 함수
function sendMsg(index, msg) {
    registerMsg[index].textContent = msg
    if(pass){
        registerMsg[index].classList.remove('on')
    } else {
        registerMsg[index].classList.add('on')
    }
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
    const formData =  new FormData()

    formData.append('user_id', registerForm.user_id.value)
    formData.append('user_pw', registerForm.user_pw.value)
    formData.append('user_name', registerForm.user_name.value)
    formData.append('birthday', registerForm.birthday.value)
    formData.append('profile_img', registerForm.profile_img.files[0])

    try {
        const registerAxios = await axios({
            method : 'post',
            url : '/users/register',
            data : formData
        })
        const result = registerAxios.data
        if(result.success){
            alert('환영합니다!')
            document.location.href = '/'
        }
    }catch(err){
        console.error(err);
        alert('가입할 수 없습니다 작성한 정보를 확인해주세요')
    }
}

// 정규식 체크 함수
function valRegExp(value, input) { // value : 검사할 값 / input : 인풋태그아이디
    // 정규식 담을 변수
    let reg;
    let regex = new RegExp(reg)

    switch(input){
        case 'user_id' : 
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            break;
        case 'user_pw' : 
            reg = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            break;
    }

    return reg.test(value);
}

// 파일 체크 함수
function fileExtCheck(obj) {
    pathPoint = obj.value.lastIndexOf('.');
    filePoint = obj.value.substring(pathPoint+1, obj.length);
    fileType = filePoint.toLowerCase();
    if(fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') return true;
    else return false;
}

// 파일 체크
function fileCheck() {
    const tempProfile = document.querySelector('.filebx-img img')
    registerFileInput.addEventListener('change', function(e){
        let file = this.files[0]
        if(fileExtCheck(this)){
            // 프사 설정한 대로 바꾸게 하기
            let reader = new FileReader();
            
            reader.addEventListener('load', function(){
                tempProfile.setAttribute('src', reader.result)
            })
            reader.readAsDataURL(file)
        } else {
            alert('이미지 파일만 올려주세요');
            this.value = '';
        }
    })
}

fileCheck();