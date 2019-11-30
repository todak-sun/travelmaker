$(function () {
    Kakao.init('551e0a44c2899be91bf29306234db441');

    // 클래스 활용
    const {
        getEl,
        getElList,
        addAllSameEvent,
        addEvent,
        getRegisterMethod,
        setRequestHeader,
        showLoading,
        closeLoading
    } = new travelmaker.utils();
    const modal = new travelmaker.modal('#modal');
    const ajax = new travelmaker.ajax();
    const myRegex = new travelmaker.regex();
    const v = new travelmaker.validation();
    const t = new travelmaker.template();
    const h = new travelmaker.handler();

    // 알람 [ 용주형 여기 정리좀해주세요 ]
    // const alarmOnBtn = document.querySelector('#alarmOn');
    // const alarmOffBtn = document.querySelector('#alarmOff');

    // var seq = $('#alarmOff').data('seq');
    // console.log(seq);
    //
    // if (seq > 0) {
    //   // 로그인 되어있으면 알람 로드
    //   alarmDataload(seq);
    // }
    // if (alarmOnBtn != null) {
    //   alarmOnBtn.addEventListener('click', alarmBtnHandler);
    // }
    //
    // if (alarmOffBtn != null) {
    //   alarmOffBtn.addEventListener('click', alarmBtnHandler);
    // }
    //
    // function alarmBtnHandler() {
    //   $('#alarmDisplay').show();
    // }

    // 배열형
    //seq의 존재여부로 로그인/비로그인 여부를 가림.
    const seq = getEl('#seq');

    //배열형
    const btnLoginList = getElList('.btn-login');
    addAllSameEvent(btnLoginList, 'click', loginModalHandler);

    // 핸들러
    function loginModalHandler(e) {
        modal.create('login', initLoginModal);
    }

    //로그인
    function initLoginModal() {
        const id = getEl('#id');
        const mid = getEl('#mid');
        const pwd = getEl('#pwd');

        const btnKa = getEl('.btn-kakao');
        const btnNa = getEl('.btn-naver');
        const btnGo = getEl('.btn-google');
        const btnLogin = getEl('#btn-login');
        const btnRegister = getEl('.btn-register');

        const linkIdSearch = getEl('.link-id-search');
        const linkPasswordSearch = getEl('.link-password-search');

        addEvent(linkIdSearch, 'click', function (e) {
            e.preventDefault();
            modal.createCustom(t.idSearch(), function () {
                const email1 = getEl('#email1');
                const email2 = getEl('#email2');
                const realname = getEl('#realname');
                const btnSearch = getEl('#btn-search');
                const messageBox = getEl('.message-box');

                addEvent(email1, 'blur', function (e) {
                    checkValueValidation(e, '입력하세요!')
                });

                addEvent(email2, 'blur', function (e) {
                    checkValueValidation(e, '뒷자리도 입력하세요!');
                });

                addEvent(realname, 'blur', function (e) {
                    checkValueValidation(e, '가입시 실명을 입력하세요!');
                });

                addEvent(btnSearch, 'click', function (e) {
                    if (!v.isValid(email1)) return email1.focus();
                    if (!v.isValid(email2)) return email2.focus();
                    if (!v.isValid(realname)) return realname.focus();

                    showLoading();
                    ajax.checkHasId({realname: realname.value, email1: email1.value, email2: email2.value})
                        .then(ret => {
                            messageBox.innerHTML = '';
                            let $messageBox = $(messageBox);
                            if (!ret.length) $messageBox.append(`<p>조회된 아이디가 없습니다.</p>`);
                            else {
                                $messageBox.append(`<p>총 ${ret.length}개의 아이디가 조회되었습니다.</p>`);
                                ret.forEach(id => $messageBox.append(`<p>${id}</p>`));
                            }
                            closeLoading();
                        })
                        .catch(console.error);
                });
            })
        });

        function checkValueValidation(e, message) {
            const [vFeed, ivFeed] = v.getFeedBox(e.target);
            if (!e.target.value) return v.setInvalid(e.target, ivFeed, message);
            v.changeValid(e.target)
        }

        addEvent(linkPasswordSearch, 'click', function (e) {
            e.preventDefault();
            modal.createCustom(t.passwordSearch(), function () {
                const id = getEl('#id');
                const email1 = getEl('#email1');
                const email2 = getEl('#email2');
                const btnSend = getEl('#btn-send');
                const messageBox = getEl('.message-box');

                addEvent(id, 'blur', function (e) {
                    checkValueValidation(e, '아이디를 입력하세요!');
                });

                addEvent(email1, 'blur', function (e) {
                    checkValueValidation(e, '입력하세요!');
                });

                addEvent(email2, 'blur', function (e) {
                    checkValueValidation(e, '뒷자리도 입력하세요!');
                });

                addEvent(btnSend, 'click', function (e) {
                    if (!v.isValid(id)) return id.focus();
                    if (!v.isValid(email1)) return email1.focus();
                    if (!v.isValid(email2)) return email2.focus();
                    showLoading();
                    ajax.searchIdAndSendEmail({id: id.value, email1: email1.value, email2: email2.value})
                        .then(ret => {
                            messageBox.innerHTML = '';
                            const $messageBox = $(messageBox);
                            if (ret) $messageBox.append(`<p>가입하신 이메일로 임시 비밀번호를 전송했습니다.</p>`);
                            else $messageBox.append(`<p>존재하지 않는 아이디 또는 가입시 입력한 이메일이 아닙니다.</p>`);
                            closeLoading();
                        })
                        .catch(console.error);
                });
            })
        });

        initApiLogin();
        mid.focus();
        addEvent(mid, 'blur', midBlurHandler);
        addEvent(pwd, 'blur', pwdBlurHandler);
        addEvent(btnKa, 'click', () => getEl('#kakao-login-btn').click());
        addEvent(btnNa, 'click', () => getEl('#naverIdLogin_loginButton').click());
        addEvent(btnGo, 'click', () => getEl('.abcRioButton').click());
        addEvent(btnLogin, 'click', btnLoginHandler);
        addEvent(btnRegister, 'click', () => modal.create('register', initRegisterModal));

        function midBlurHandler(e) {
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!this.value)
                return v.setInvalid(this, ivFeed, '아이디를 입력하세요.');
            v.changeValid(this);
        }

        function pwdBlurHandler(e) {
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!this.value)
                return v.setInvalid(this, ivFeed, '비밀번호를 입력해주세요.');
            v.changeValid(this);
        }

        function btnLoginHandler(e) {
            if (!v.isValid(mid)) return mid.focus();
            if (!v.isValid(pwd)) return pwd.focus();
            id.value = mid.value + '===travelMaker';
            document.loginForm.submit();
        }
    }

    function initRegisterModal() {
        // 미니모달
        const miniModal = new travelmaker.modal('#mini-modal');

        const checkAll = getEl('#check-all');
        const checkBoxes = getElList('.checkbox');
        const customRadios = getElList('.radio-wrap label');

        addEvent(checkAll, 'click', checkAllHandler);
        addAllSameEvent(customRadios, 'click', h.customRadioHandler.bind(null, customRadios));
        addAllSameEvent(checkBoxes, 'click', checkBoxHandler);

        const realname = getEl('#realname');
        const nickname = getEl('#nickname');
        const registerId = getEl('#register-id');
        const registerPassword = getEl('#register-password');
        const registerRepassword = getEl('#register-repassword');
        const btnUserRegister = getEl('#btn-user-register');
        const email1 = getEl('#register-email1');
        const email2 = getEl('#register-email2');
        const phone1 = getEl('#phone1');
        const phone2 = getEl('#phone2');
        const phone3 = getEl('#phone3');
        const btnEmailCheck = getEl('#btn-email-check');

        addEvent(realname, 'blur', realnameHandler);
        addEvent(realname, 'input', v.resetValidClass);
        addEvent(registerId, 'blur', registerIdHandler);
        addEvent(registerId, 'input', v.resetValidClass);
        addEvent(nickname, 'blur', nicknameHandler);
        addEvent(nickname, 'input', v.resetValidClass);
        addEvent(registerPassword, 'blur', registerPasswordHandler);
        addEvent(registerPassword, 'input', v.resetValidClass);
        addEvent(registerPassword, 'change', passwordChangeHandler);
        addEvent(registerRepassword, 'blur', registerRepasswordHandler);
        addEvent(btnUserRegister, 'click', btnUserHandler);
        addEvent(phone1, 'blur', h.phoneHandler);
        addEvent(phone2, 'blur', h.phoneHandler);
        addEvent(phone3, 'blur', h.phoneHandler);
        addEvent(email1, 'blur', h.emailHandler);
        addEvent(email2, 'blur', h.emailHandler);
        addEvent(email1, 'change', emailChangeHandler);
        addEvent(email2, 'change', emailChangeHandler);
        addEvent(btnEmailCheck, 'click', emailCheckHandler);


        function emailCheckHandler() {
            if (!v.isValid(email1)) return email1.focus();
            if (!v.isValid(email2)) return email2.focus();

            showLoading();
            ajax.sendEmailCode(email1.value, email2.value)
                .then((ret) => {
                    closeLoading();
                    miniModal.createMini(t.emailConfirm(), h.initEmailConfirmModal.bind(null, btnEmailCheck, ret.emailCode, email1, email2));
                })
                .catch((error) => console.log('에러가 났네 ~_~', error));
        }

        function timerStart(sec, timer, callbackFunc) {
            let restTime = sec;
            const start = setInterval(function () {
                restTime -= 1;
                if (restTime < 0) return timerEnd();
                let min = Math.floor(restTime / 60);
                let sec = restTime % 60;
                timer.innerText = `0${min}:${sec < 10 ? '0' + sec : sec}`;
            }, 1000);

            function timerEnd() {
                clearInterval(start);
                alert('시간이 초과되었습니다. 다시 시도해주세요.');
                if (callbackFunc) callbackFunc();
            }

            return timerEnd;
        }

        function emailChangeHandler(e) {
            if (v.isValid(btnEmailCheck)) {
                v.changeInvalid(btnEmailCheck);
                btnEmailCheck.innerText = '인증';
            }
        }

        function registerIdHandler(e) {
            const regex = myRegex.email;
            const id = this.value;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!id) return v.setInvalid(this, ivFeed, '아이디를 입력해주세요.');
            if (!regex.test(id))
                return v.setInvalid(
                    this,
                    ivFeed,
                    '아이디는 이메일 형식으로 입력해주세요.'
                );

            new travelmaker.ajax()
                .checkId({id: id, registerMethod: getRegisterMethod()})
                .then((ret) => {
                    if (ret === 'exist') {
                        return v.setInvalid(
                            registerId,
                            ivFeed,
                            '이미 사용중인 아이디입니다. 다시 입력해주세요.'
                        );
                    }
                    return v.setValid(registerId, vFeed, '사용 가능한 아이디 입니다.');
                })
                .catch(console.error);
        }

        function checkAllHandler(e) {
            if (this.checked)
                checkBoxes.forEach((checkBox) => (checkBox.checked = true));
            else checkBoxes.forEach((checkBox) => (checkBox.checked = false));
        }

        function checkBoxHandler(e) {
            checkAll.checked = getElList('.checkbox:checked').length === 2;
        }

        function nicknameHandler(e) {
            let regex = myRegex.nickname;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!this.value) return v.setInvalid(this, ivFeed, '닉네임을 입력해주세요.');
            if (!regex.test(this.value)) return v.setInvalid(this, ivFeed, '한글 최대 10자, 영문 20자로 한글, 영문, 숫자만 사용 가능합니다.');
            ajax.checkNickname(this.value)
                .then(ret => {
                    if (ret === 'exist') return v.setInvalid(e.target, ivFeed, '이미 존재하는 닉네임입니다. 다시 입력해주세요.');
                    if (ret === 'not_exist') return v.setValid(e.target, vFeed, '사용 가능한 닉네임입니다.');
                })
                .catch(console.error);
        }

        function realnameHandler(e) {
            const regex = myRegex.koreaName;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            const realname = e.target.value;
            if (!realname) return v.setInvalid(this, ivFeed, '이름을 입력해주세요.');
            if (!regex.test(realname))
                return v.setInvalid(
                    this,
                    ivFeed,
                    '2 ~ 5글자의 정확한 이름을 입력해주세요.'
                );
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
                return v.setInvalid(
                    this,
                    ivFeed,
                    '특수문자 / 문자 / 숫자 포함 형태의 8~15자리 비밀번호로 설정해주세요'
                );
            return v.setValid(this, vFeed, '사용 가능한 비밀번호 입니다.');
        }

        function registerRepasswordHandler(e) {
            const [vFeed, ivFeed] = v.getFeedBox(this);
            const pwd = registerPassword.value;
            const repwd = e.target.value;
            if (pwd !== repwd)
                return v.setInvalid(this, ivFeed, '동일한 비밀번호를 입력해주세요.');
            if (!v.isValid(registerPassword))
                return v.setInvalid(
                    this,
                    ivFeed,
                    '유효한 비밀번호 설정후 다시 시도해주세요'
                );
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
            if (!v.isValid(btnEmailCheck)) return btnEmailCheck.focus();
            getEl('#register-form').submit();
        }
    }

    //리모컨 & 소켓 처리
    if (seq) {
        const remocon = getEl('.remote-controller');
        const scrollUp = getEl('.scroll-up');
        const scrollDown = getEl('.scroll-down');
        const myPage = getEl('.my-page');
        const message = getEl('.message');

        const $html = $('html');

        addEvent(remocon, 'click', (e) => {
            const target = e.target;
            target.classList.remove('on');
            if (target.classList.contains('onfocus')) {
                return target.classList.remove('onfocus');
            } else {
                return target.classList.add('onfocus');
            }
        });
        addEvent(scrollUp, 'click', (e) => {
            e.preventDefault();
            $html.stop().animate({scrollTop: 0}, 800);
        });
        addEvent(scrollDown, 'click', (e) => {
            e.preventDefault();
            $html.stop().animate({scrollTop: document.body.scrollHeight}, 800);
        });

        let sock = new SockJS("/echo");

        sock.onmessage = function (msg) {
            const data = JSON.parse(msg.data);
            console.log('메시지 왔음 : ', data);

            if (data.header === 'friend') {
                remocon.classList.add('on');
                ajax.alarmDataLoad(seq.value)
                    .then()
                    .catch(console.error);
            }
        };

        sock.onclose = function (e) {
            console.log('소켓 연결 끊김 : ', e);
        };
    }
});


function success(data) {
    $.each(data, function (index, items) {
        $('#alarmDisplay').append(
            '<button type="button" class="alarmBtn" data-ano ="'
            + items.ano + '" data-header="' + items.header
            + '">' + items.content + '</button><br>');
        $('#alarmDisplay').append('<input type="hidden" ');
    });
    console.log(data.length);
    if (data.length < 1) {
        $('#alarmOff').show();
        $('#alarmOn').hide();
        $('#alarmDisplay').hide();
    } else {
        $('#alarmOff').hide();
        $('#alarmOn').show();
        $('#alarmDisplay').hide();
    }

    $('.alarmBtn').click(function () {
        console.log('음..아주 좆같구먼');
        var ano = $(this).data('ano');
        var header = $(this).data('header');

        $.ajax({
            type: 'get',
            url: '/alarm/' + header + '/' + ano,
            dataType: 'json',
            success: function (data) {
                console.log(data.fno);
                location.href = '/' + header + '/view/' + data.fno;
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
};

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

function alarm() {
}

