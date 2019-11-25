$(function () {
    Kakao.init('551e0a44c2899be91bf29306234db441');

    //클래스 활용
    const {getEl, getElList, addAllSameEvent, addEvent, getRegisterMethod} = new travelmaker.utils();
    const modal = new travelmaker.modal('#modal');
    const v = new travelmaker.validation();
    const myRegex = new travelmaker.regex();

    //배열형
    const btnLoginList = getElList('.btn-login');
    addAllSameEvent(btnLoginList, 'click', loginModalHandler);

    //핸들러
    function loginModalHandler(e) {
        modal.create('login', initLoginModal);
    }

    function initLoginModal() {
        const id = getEl('#id');
        const mid = getEl('#mid');
        const pwd = getEl('#pwd');

        const btnKa = getEl('.btn-kakao');
        const btnNa = getEl('.btn-naver');
        const btnGo = getEl('.btn-google');
        const btnLogin = getEl('#btn-login');
        const btnRegister = getEl('.btn-register');

        initApiLogin();
        mid.focus();
        addEvent(mid, 'blur', midBlurHandler);
        addEvent(pwd, 'blur', pwdBlurHandler);
        addEvent(btnKa, 'click', loginKaHandler);
        addEvent(btnNa, 'click', loginNaHandler);
        addEvent(btnGo, 'click', loginGoHandler);
        addEvent(btnLogin, 'click', btnLoginHandler);
        addEvent(btnRegister, 'click', btnRegisterHandler);

        function midBlurHandler(e) {
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!this.value) return v.setInvalid(this, ivFeed, '아이디를 입력하세요.');
            v.changeValid(this);
        }

        function pwdBlurHandler(e) {
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!this.value) return v.setInvalid(this, ivFeed, '비밀번호를 입력해주세요.');
            v.changeValid(this);
        }

        function btnLoginHandler(e) {
            if (!v.isValid(mid)) {
                return mid.focus();
            }
            if (!v.isValid(pwd)) {
                return pwd.focus();
            }
            id.value = mid.value + '===travelMaker';
            document.loginForm.submit();
        }

        function btnRegisterHandler(e) {
            modal.create('register', initRegisterModal);
        }

        function loginNaHandler(e) {
            getEl('#naverIdLogin_loginButton').click();
        }

        function loginKaHandler(e) {
            getEl('#kakao-login-btn').click();
        }

        function loginGoHandler(e) {
            getEl('.abcRioButton').click();
        }
    };

    function initRegisterModal() {
        const checkAll = getEl('#check-all');
        const checkBoxes = getElList('.checkbox');
        const customRadios = getElList('.radio-wrap label');
        addEvent(checkAll, 'click', checkAllHandler);
        addAllSameEvent(customRadios, 'click', customRadioHandler);
        addAllSameEvent(checkBoxes, 'click', checkBoxHandler);

        const realname = getEl('#realname');
        const registerId = getEl('#register-id');
        const registerPassword = getEl('#register-password');
        const registerRepassword = getEl('#register-repassword');
        const btnUserRegister = getEl('#btn-user-register');
        const email1 = getEl('#register-email1');
        const email2 = getEl('#register-email2');
        const phone1 = getEl('#phone1');
        const phone2 = getEl('#phone2');
        const phone3 = getEl('#phone3');

        addEvent(realname, 'blur', realnameHandler);
        addEvent(realname, 'input', v.resetValidClass);
        addEvent(registerId, 'blur', registerIdHandler);
        addEvent(registerId, 'input', v.resetValidClass);
        addEvent(registerPassword, 'blur', registerPasswordHandler);
        addEvent(registerPassword, 'input', v.resetValidClass);
        addEvent(registerPassword, 'change', passwordChangeHandler);
        addEvent(registerRepassword, 'blur', registerRepasswordHandler);
        addEvent(btnUserRegister, 'click', btnUserHandler);
        addEvent(phone1, 'blur', phoneHandler);
        addEvent(phone2, 'blur', phoneHandler);
        addEvent(phone3, 'blur', phoneHandler);
        addEvent(email1, 'blur', emailHandler);
        addEvent(email2, 'blur', emailHandler);

        function customRadioHandler(e) {
            customRadios.forEach((radio) => radio.classList.remove('clicked'));
            this.classList.add('clicked');
        }

        function registerIdHandler(e) {
            const regex = myRegex.email;
            const id = this.value;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!id) return v.setInvalid(this, ivFeed, '아이디를 입력해주세요.');
            if (!regex.test(id)) return v.setInvalid(this, ivFeed, '아이디는 이메일 형식으로 입력해주세요.');

            new travelmaker.ajax().checkId({id: id, registerMethod: getRegisterMethod()})
                .then((ret) => {
                    if (ret === 'exist') {
                        return v.setInvalid(registerId, ivFeed, '이미 사용중인 아이디입니다. 다시 입력해주세요.');
                    }
                    console.log(ret);
                    return v.setValid(registerId, vFeed, '사용 가능한 아이디 입니다.');
                })
                .catch(console.error);
        }

        function checkAllHandler(e) {
            if (this.checked) checkBoxes.forEach((checkBox) => (checkBox.checked = true));
            else checkBoxes.forEach((checkBox) => (checkBox.checked = false));
        }

        function checkBoxHandler(e) {
            checkAll.checked = getElList('.checkbox:checked').length === 2;
        }

        function phoneHandler(e) {
            const regex = myRegex.number;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!this.value) return v.setInvalid(this, ivFeed, '휴대폰번호를 입력해주세요.');
            if (!regex.test(this.value))
                return v.setInvalid(this, ivFeed, '숫자가 아닌 값은 입력할 수 없습니다.');
            v.changeValid(this);
        }

        function emailHandler(e) {
            let regex;
            if (e.target.name === 'email1') regex = myRegex.englishAndNumber;
            if (e.target.name === 'email2') regex = myRegex.englishWithPoint;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            const value = e.target.value;
            if (!value) return v.setInvalid(this, ivFeed, '이메일을 입력해주세요.');
            if (!regex.test(value))
                return v.setInvalid(e, ivFeed, '정확한 이메일을 입력해주세요.');
            v.changeValid(this);
        }

        function realnameHandler(e) {
            const regex = myRegex.koreaName;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            const realname = e.target.value;
            if (!realname) return v.setInvalid(this, ivFeed, '이름을 입력해주세요.');
            if (!regex.test(realname))
                return v.setInvalid(this, ivFeed, '2 ~ 5글자의 정확한 이름을 입력해주세요.');
            v.changeValid(this);
        }

        function passwordChangeHandler(e) {
            const repwd = registerRepassword.value;
            if (repwd && this.value !== repwd) v.changeInvalid(registerRepassword);
        }

        function registerPasswordHandler(e) {
            const password = this.value;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            const regex = myRegex.password;
            if (!regex.test(password))
                return v.setInvalid(this, ivFeed, '특수문자 / 문자 / 숫자 포함 형태의 8~15자리 비밀번호로 설정해주세요');
            return v.setValid(this, vFeed, '사용 가능한 비밀번호 입니다.');
        }

        function registerRepasswordHandler(e) {
            const [vFeed, ivFeed] = v.getFeedBox(this);
            const pwd = registerPassword.value;
            const repwd = e.target.value;
            if (pwd !== repwd)
                return v.setInvalid(this, ivFeed, '동일한 비밀번호를 입력해주세요.');
            if (!v.isValid(registerPassword))
                return v.setInvalid(this, ivFeed, '유효한 비밀번호 설정후 다시 시도해주세요');
            v.setValid(this, vFeed, '동일한 비밀번호를 입력하셨습니다.');
        }

        function btnUserHandler(e) {
            if (!checkAll.checked) return alert('약관에 동의 해주세요.');
            if (!v.isValid(realname)) return realname.focus();
            if (!v.isValid(registerId)) return registerId.focus();
            if (!v.isValid(registerPassword)) return registerPassword.focus();
            if (!v.isValid(registerRepassword)) return registerRepassword.focus();
            if (!v.isValid(email1)) return email1.focus();
            if (!v.isValid(email2)) return email2.focus();
            if (!v.isValid(phone1)) return phone1.focus();
            if (!v.isValid(phone2)) return phone2.focus();
            if (!v.isValid(phone3)) return phone3.focus();
            getEl('#register-form').submit();
        }
    }

    function initRequestModal() {
    }
});

function includeJs(jsFilePath) {
    let js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = jsFilePath;
    document.body.appendChild(js);
}

/* 로그인 API 임포트 */

function initApiLogin() {
    let naverLogin = new naver.LoginWithNaverId({
        clientId: 'tq8xdJqWevoI0Tbj3WgL',
        callbackUrl: 'http://localhost:8080/user/naverLogin',
        isPopup: true,
        loginButton: {
            color: 'green',
            type: 3,
            height: 60
        }
    });
    naverLogin.init();

    Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: kakaoApiRequest,
        fail: console.error
    });

    includeJs('http://apis.google.com/js/platform.js');
}

function logoutSubmit() {
    getEl('#logoutForm').submit();
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    auth2.disconnect();
}

