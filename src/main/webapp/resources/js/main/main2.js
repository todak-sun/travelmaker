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
                    console.log('유효성 검사 모두 통과!');

                    checkHasId({realname: realname.value, email1: email1.value, email2: email2.value})
                        .then(ret => {

                        })
                        .catch(console.error);
                });

                function checkHasId(data) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: '',
                            data: JSON.stringify(data),
                            beforeSend: setRequestHeader,
                            dataType: 'text',
                            success: function (ret) {
                                resolve()
                            },
                            error: function (err) {
                                reject(err)
                            }
                        })
                    });
                }
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
                    console.log('유효성 검사 모두 통과!!!');
                    searchIdAndSendEmail({id: id.value, email1: email1.value, email2: email2.value})
                        .then(ret => {

                        })
                        .catch(console.error);
                });

                function searchIdAndSendEmail(data) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: '',
                            beforeSend: setRequestHeader,
                            data: JSON.stringify(data),
                            dataType: 'text',
                            success: function (ret) {
                                resolve(ret);
                            },
                            error: function (err) {
                                reject(err);
                            }
                        })
                    });
                }
            })
        });

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
    }

    function initRegisterModal() {
        // 미니모달
        const miniModal = new travelmaker.modal('#mini-modal');

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
        const btnEmailCheck = getEl('#btn-email-check');

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
        addEvent(email1, 'change', emailChangeHandler);
        addEvent(email2, 'change', emailChangeHandler);
        addEvent(btnEmailCheck, 'click', emailCheckHandler);

        // //여기부터
        function emailCheckHandler() {
            if (!v.isValid(email1)) return email1.focus();
            if (!v.isValid(email2)) return email2.focus();

            sendEmailCode()
                .then((emailCode) => {
                    miniModal.createMini(t.emailConfirm(), (e) => {
                        const emailConfirm = getEl('#input-email-confirm'); // 인증번호
                        const btnConfirm = getEl('#btn-email-confirm'); // 버튼

                        const timer = getEl('.timer');
                        const close = miniModal.m.querySelector('.close');

                        timerStart(180, timer, () => close.click());

                        addEvent(emailConfirm, 'keyup', (e) => {
                            if (e.keyCode === 13) btnConfirm.click();
                        });

                        addEvent(btnConfirm, 'click', () => {
                            const [vFeed, ivFeed] = v.getFeedBox(emailConfirm);
                            if (emailConfirm.value !== emailCode) {
                                v.setInvalid(emailConfirm, ivFeed, '발송한 인증코드와 불일치 합니다. 다시 확인해주세요.');
                                emailConfirm.value = '';
                                emailConfirm.focus();
                            } else {
                                close.click();
                                btnEmailCheck.innerText = '완료';
                                v.changeValid(btnEmailCheck);
                            }
                        });
                    });
                })
                .catch((error) => console.log('에러가 났네 ~_~', error));
        }

        function sendEmailCode() {
            return new Promise((resolve, reject) => {
                showLoading();
                $.ajax({
                    type: 'post',
                    url: '/user/emailCode',
                    data: 'email1=' + email1.value + '&email2=' + email2.value,
                    dataType: 'JSON',
                    beforeSend: setRequestHeader,
                    success: function (result) {
                        closeLoading();
                        resolve(result.emailCode);
                    },
                    error: function (error) {
                        closeLoading();
                        reject(error)
                    }
                });
            });
        }

        // //여기까지 이메일 코드
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

        function customRadioHandler(e) {
            customRadios.forEach((radio) => radio.classList.remove('clicked'));
            this.classList.add('clicked');
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

        function phoneHandler(e) {
            const regex = myRegex.number;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (!this.value)
                return v.setInvalid(this, ivFeed, '휴대폰번호를 입력해주세요.');
            if (!regex.test(this.value))
                return v.setInvalid(
                    this,
                    ivFeed,
                    '숫자가 아닌 값은 입력할 수 없습니다.'
                );
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
