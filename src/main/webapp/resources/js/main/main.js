/*외부 임포트 함수*/
function includeJs(jsFilePath) {
  let js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = jsFilePath;
  document.body.appendChild(js);
}
/* 로그인 API 임포트 */

function initJsFile() {
  includeJs('http://developers.kakao.com/sdk/js/kakao.min.js');
  includeJs('https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js');
  includeJs('https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js');
}

function loginBtnDraw() {
  /* 카카오 버튼 그려주는곳 */
  Kakao.init('551e0a44c2899be91bf29306234db441');
  kakaoLogin();
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
}

$(function() {
  initJsFile(); // 처음화면 로드
  //클래스 임포트
  const template = new travelmaker.template(); //템플릿 모아둔 곳.
  const myRegex = new travelmaker.regex(); //정규식 모아둔 곳.
  const {
    getEl,
    setRequestHeader,
    setInValid,
    setValid,
    changeValid,
    changeInValid,
    isValid,
    getRegisterMethod,
    getFeedbackBox,
    resetMessageHandler
  } = new travelmaker.utils();


  const $modal = $('#modal-area'); // 모달
  const btnWrite = document.querySelector('#btn-write');
  const btnLogin = document.querySelector('#btn-login');
  const btnRegist = document.querySelector('#btn-regist');
  const csrfTokenName = document.getElementById('csrfTokenName').value;
  const csrfTokenValue = document.getElementById('csrfTokenValue').value;

  if (btnLogin) btnLogin.addEventListener('click', createModalHandler);
  if (btnRegist) btnRegist.addEventListener('click', createModalHandler);
  if (btnWrite) btnWrite.addEventListener('click', createModalHandler);

  // 모달 생성 담당 핸들러
  function createModalHandler(e) {
    let [title, body, initFunction] = setTitleAndBody(e.target.id);
    $modal.html('');
    $modal.append(createModal(title, body));
    if (initFunction) initFunction();
    // $modal.modal('show');
    $modal.modal({
      show: true,
      backdrop: 'static'
    });
    if (title === '로그인') {
      loginBtnDraw();
    }
  }

  // 어떤 버튼을 클릭했는지 감지해서
  // 타이틀과 바디, 모달 초기화 함수를 실행
  function setTitleAndBody(id) {
    // case에는 해당하는 아이디의 값을,
    // return은 배열로 지정후 첫번째 값은 title,
    // 두번째 값은 body에 들어갈 template를 넣어줌.
    switch (id) {
      case 'btn-write':
        return ['글선택', template.storySelector(), initWriteSelector];
      case 'btn-login':
        //initJsFile();
        includeJs('http://developers.kakao.com/sdk/js/kakao.min.js');
        includeJs('http://apis.google.com/js/platform.js');
        return [
          '로그인',
          template.login(csrfTokenName, csrfTokenValue),
          initLoginSelector
        ];
      case 'btn-regist':
        return [
          '회원가입',
          template.register(csrfTokenName, csrfTokenValue),
          initRegisterSelector
        ];
      default:
        throw new Error('잘못된 id값을 입력했습니다');
    }
  }

  // 모달창 생성
  function createModal(title, body) {
    const $frag = $(document.createDocumentFragment());
    $frag.append(template.modal(title, body));
    return $frag;
  }

  function initWriteSelector() {
    const btnToWrite = getEl('#btn-to-write');
    btnToWrite.addEventListener('click', btnToWriteHandler);

    function btnToWriteHandler(e) {
      const writeType = getEl('input[name="writeType"]:checked').value;
      const isDomestic = getEl('input[name="isDomestic"]:checked').value;

      function moveTo(writeType, isDomestic) {
        const defaultLink = 'http://' + location.host;
        if (writeType === 'essay') {
          location.href = defaultLink + '/essay/write?isDomestic=' + isDomestic;
        } else if (writeType === 'route') {
          // 여기다 맞는 url 설정
          location.href = defaultLink + '/route/write?isDomestic=' + isDomestic;
        }
      }
      moveTo(writeType, isDomestic);
    }
  }

  function initLoginSelector() {
    let btnGoogle;
    const btnLogin = getEl('#loginBtn');
    const btnNa = getEl('#btn-login-na');
    const btnKa = getEl('#btn-login-ka');
    const btnGo = getEl('#btn-login-go');
    const loginId = getEl('#login_id');
    const loginPwd = getEl('#login_pwd');

    btnLogin.addEventListener('click', btnLoginHandler);
    btnNa.addEventListener('click', loginNaHandler);
    btnKa.addEventListener('click', loginKaHandler);
    btnGo.addEventListener('click', loginGoHandler);
    loginId.addEventListener('blur', loginIdHandler);
    loginPwd.addEventListener('blur', loginPwdHandler);

    function loginNaHandler(e) {
      getEl('#naverIdLogin_loginButton').click();
    }

    function loginKaHandler(e) {
      getEl('#kakao-login-btn').click();
    }

    function loginGoHandler(e) {
      btnGoogle.click();
    }

    function btnLoginHandler(e) {
      if (!isValid(loginId)) return loginId.focus();
      if (!isValid(loginPwd)) return loginPwd.focus();
      loginId.value += '===travelMaker';
      document.loginForm.submit();
    }
  }

  function loginIdHandler(e) {
    const [inFeedback] = getFeedbackBox(e);
    const id = e.target.value;
    if (!id) return setInValid(e, inFeedback, '아이디를 입력하세요.');
    changeValid(e);
  }

  function loginPwdHandler(e) {
    const [inFeedback] = getFeedbackBox(e);
    const pwd = e.target.value;
    if (!pwd) return setInValid(e, inFeedback, '비밀번호를 입력하세요');
    changeValid(e);
  }

  const removeForced = setInterval(function() {
    btnGoogle = getEl('.abcRioButton');
    console.log('돌아가니?');
    if (btnGoogle) stopRemoveForced();
  }, 10);

  function stopRemoveForced() {
    clearInterval(removeForced);
    btnGoogle.innerHTML = '';
    btnGoogle.style = null;
  }

  function initRegisterSelector() {
    //필요한 변수를 모두 잡아옴.
    const registerForm = getEl('#register-form');
    const realname = getEl('#realname');
    const registerId = getEl('#register-id');
    const registerPassword = getEl('#register-password');
    const registerRepassword = getEl('#register-repassword');
    const bntUserRegister = getEl('#btn-user-register');
    const userAgreeBoxAll = getEl('#user-agree-box-all');
    const email1 = getEl('#register-email1');
    const email2 = getEl('#register-email2');
    const phone1 = getEl('#phone1');
    const phone2 = getEl('#phone2');
    const phone3 = getEl('#phone3');
    const userAgreeBoxList = document.querySelectorAll('.user-agree-box');

    //이벤트 추가.
    email1.addEventListener('blur', emailHandler);
    email2.addEventListener('blur', emailHandler);
    phone1.addEventListener('blur', phoneHandler);
    phone2.addEventListener('blur', phoneHandler);
    phone3.addEventListener('blur', phoneHandler);
    realname.addEventListener('blur', realnameHandler);
    realname.addEventListener('input', resetMessageHandler);
    registerId.addEventListener('blur', registerIdHandler);
    registerId.addEventListener('input', resetMessageHandler);
    registerPassword.addEventListener('blur', registerPasswordHandler);
    registerPassword.addEventListener('input', resetMessageHandler);
    registerPassword.addEventListener('change', registerChangeHandler);
    registerRepassword.addEventListener('blur', registerRepasswordHandler);
    bntUserRegister.addEventListener('click', btnUserHandler);
    userAgreeBoxAll.addEventListener('click', userAgreeBoxAllHandler);
    Array.from(userAgreeBoxList).forEach((agree) => {
      agree.addEventListener('click', userAgreeHandler);
    });
  }

  //핸들러 선언부
  function phoneHandler(e) {
    const regex = myRegex.number;
    const [inFeedback] = getFeedbackBox(e);
    const value = e.target.value;
    if (!value) return setInValid(e, inFeedback, '휴대폰번호를 입력해주세요.');
    if (!regex.test(value))
      return setInValid(e, inFeedback, '숫자가 아닌 값은 입력할 수 없습니다.');
    changeValid(e);
  }

  function emailHandler(e) {
    let regex;
    if (e.target.name === 'email1') regex = myRegex.englishAndNumber;
    if (e.target.name === 'email2') regex = myRegex.englishWithPoint;

    const [inFeedback] = getFeedbackBox(e);
    const value = e.target.value;
    if (!value) return setInValid(e, inFeedback, '이메일을 입력해주세요.');
    if (!regex.test(value))
      return setInValid(e, inFeedback, '정확한 이메일을 입력해주세요.');
    changeValid(e);
  }

  function realnameHandler(e) {
    const regex = myRegex.koreaName;
    const [inFeedback] = getFeedbackBox(e);
    const realname = e.target.value;
    if (!realname) return setInValid(e, inFeedback, '이름을 입력해주세요.');
    if (!regex.test(realname))
      return setInValid(
        e,
        inFeedback,
        '2 ~ 5글자의 정확한 이름을 입력해주세요.'
      );
    changeValid(e);
  }

  function userAgreeBoxAllHandler(e) {
    const isClicked = e.target.checked;
    if (isClicked) {
      Array.from(userAgreeBoxList).forEach((agree) => {
        agree.checked = true;
      });
    } else {
      Array.from(userAgreeBoxList).forEach((agree) => {
        agree.checked = false;
      });
    }
  }

  function registerChangeHandler(e) {
    const pwd = e.target.value;
    const repwd = registerRepassword.value;
    if (repwd)
      if (pwd !== repwd) {
        registerRepassword.classList.add('is-invalid');
        registerRepassword.classList.remove('is-valid');
      }
  }

  function registerPasswordHandler(e) {
    const password = e.target.value;
    const [inFeedback, vaFeedback] = getFeedbackBox(e);
    const regex = myRegex.password;
    if (!regex.test(password))
      return setInValid(
        e,
        inFeedback,
        '특수문자 / 문자 / 숫자 포함 형태의 8~15자리 비밀번호로 설정해주세요'
      );
    return setValid(e, vaFeedback, '사용 가능한 비밀번호 입니다.');
  }

  function registerRepasswordHandler(e) {
    const [inFeedback, vaFeedback] = getFeedbackBox(e);
    const pwd = registerPassword.value;
    const repwd = e.target.value;
    if (pwd !== repwd)
      return setInValid(e, inFeedback, '동일한 비밀번호를 입력해주세요.');
    if (!isValid(registerPassword))
      return setInValid(
        e,
        inFeedback,
        '유효한 비밀번호 설정후 다시 시도해주세요'
      );
    setValid(e, vaFeedback, '동일한 비밀번호를 입력하셨습니다.');
  }

  function userAgreeHandler(e) {
    userAgreeBoxAll.checked =
      document.querySelectorAll('.user-agree-box:checked').length === 3;
  }

  function btnUserHandler(e) {
    if (!userAgreeBoxAll.checked) return alert('약관에 동의 해주세요.');
    if (!isValid(realname)) return realname.focus();
    if (!isValid(registerId)) return registerId.focus();
    if (!isValid(registerPassword)) return registerPassword.focus();
    if (!isValid(registerRepassword)) return registerRepassword.focus();
    if (!isValid(email1)) return email1.focus();
    if (!isValid(email2)) return email2.focus();
    if (!isValid(phone1)) return phone1.focus();
    if (!isValid(phone2)) return phone2.focus();
    if (!isValid(phone3)) return phone3.focus();
    // console.log('유효성 검사 통과');
    registerForm.submit();
  }

  function registerIdHandler(e) {
    const regex = myRegex.email;
    const id = e.target.value;
    const [inFeedback, vaFeedback] = getFeedbackBox(e);
    if (!id) return setInValid(e, inFeedback, '아이디를 입력해주세요.');
    if (!regex.test(id))
      return setInValid(
        e,
        inFeedback,
        '아이디는 이메일 형식으로 입력해주세요.'
      );
    ajaxCheckId({ id: id, registerMethod: getRegisterMethod() })
      .then((ret) => {
        if (ret === 'exist') {
          return setInValid(
            e,
            inFeedback,
            '이미 사용중인 아이디입니다. 다시 입력해주세요.'
          );
        }
        return setValid(e, vaFeedback, '사용 가능한 아이디 입니다.');
      })
      .catch(console.error);
  }

  function ajaxCheckId(data) {
    return $.ajax({
      type: 'POST',
      url: `http://${location.host}`,
      data: JSON.stringify(data),
      dataType: 'text',
      beforeSend: setRequestHeader
    });
  }
});
