/*외부 임포트 함수*/
function indcludeJs(jsFilePath) {
  var js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = jsFilePath;
  document.body.appendChild(js);
}
/* 로그인 API 임포트 */

function initJsFile() {
  indcludeJs('http://developers.kakao.com/sdk/js/kakao.min.js');
  indcludeJs('https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js');
  indcludeJs('https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js');
}

function loginBtnDraw() {
  /* 카카오 버튼 그려주는곳 */
  Kakao.init('551e0a44c2899be91bf29306234db441');
  kakaoLogin();
  var naverLogin = new naver.LoginWithNaverId({
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
  const $modal = $('#modal-area'); // 모달

  const btnWrite = document.querySelector('#btn-write');
  const btnLogin = document.querySelector('#btn-login');
  const btnRegist = document.querySelector('#btn-regist');
  const idpwdSearch = document.querySelector('#idpwdSearch');

  var csrfTokenName = document.getElementById('csrfTokenName').value;
  var csrfTokenValue = document.getElementById('csrfTokenValue').value;

  btnWrite.addEventListener('click', createModalHandler);

  if (btnLogin != null) {
    btnLogin.addEventListener('click', createModalHandler);
  }
  if (btnRegist != null) {
    btnRegist.addEventListener('click', createModalHandler);
  }

  // 모달 생성 담당 핸들러
  function createModalHandler(e) {
    let [title, body, initFunction] = setTitleAndBody(e.target.id);
    $modal.html('');
    $modal.append(createModal(title, body));
    if (initFunction) initFunction();
    $modal.modal('show');
    if (title == '로그인') {
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
        return ['글선택', getTemplateWriteSelector(), initWriteSelector];
      case 'btn-login':
        indcludeJs('http://developers.kakao.com/sdk/js/kakao.min.js');
        indcludeJs('http://apis.google.com/js/platform.js');
        return ['로그인', getTemplateLogin(), initLoginSelector];
      case 'btn-regist':
        return ['회원가입', getTemplateRegister(), initRegisterSelector];
      default:
        throw new Error('잘못된 id값을 입력했습니다');
    }
  }

  // 모달창 생성
  function createModal(title, body) {
    const $frag = $(document.createDocumentFragment());
    $frag.append(getTemplateModal(title, body));
    return $frag;
  }

  function initWriteSelector() {
    const btnToWrite = document.querySelector('#btn-to-write');
    btnToWrite.addEventListener('click', btnToWriteHandler);

    function btnToWriteHandler() {
      const writeType = document.querySelector(
        'input[name="writeType"]:checked'
      ).value;
      const isDomestic = document.querySelector(
        'input[name="isDomestic"]:checked'
      ).value;

      function moveTo(writeType, isDomestic) {
        const defaultLink = 'http://' + location.host;
        if (writeType === 'essay') {
          location.href = defaultLink + '/essay/write?isDomestic=' + isDomestic;
        } else if (writeType === 'route') {
          // 여기다 맞는 url 설정
          location.href = defaultLink + '/route/write?isDomestic=' + isDomestic;
        }
      }
    }
  }

  function initLoginSelector() {
    const btnLogin = document.querySelector('#loginBtn');
    btnLogin.addEventListener('click', btnLoginHandler);

    function btnLoginHandler(e) {
      // e.preventDefault();
      if ($('#login_id').val() == '') {
        alert('아이디를 입력해주세요');
      } else if ($('#login_pwd').val() == '') {
        alert('비밀번호를 입력해주세요');
      } else {
        $('#login_id').val($('#login_id').val() + '===travelMaker');
        document.loginForm.submit();
      }
    }

    $('#login_id').focusout(function() {
      if ($('#login_id').val() == '') {
        // $('#registerIdDiv').css({"color" : "black", })
        $('#spanCheckID').text('아이디를 입력하세요');
        $('#spanCheckID').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else {
        $('#spanCheckID').text('OK');
        $('#spanCheckID').css({
          color: 'blue',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      }
    });
    $('#login_pwd').focusout(function() {
      if ($('#login_pwd').val() == '') {
        $('#spanCheckPWD').text('패스워드를 입력하세요');
        $('#spanCheckPWD').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else {
        $('#spanCheckPWD').text('OK');
        $('#spanCheckPWD').css({
          color: 'blue',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      }
    });
  }

  function initRegisterSelector() {
    $('#userAgreeBoxAll').click('click', function(e) {
      if ($(this).prop('checked')) {
        $('.userAgreeBox').prop('checked', true);
      } else {
        $('.userAgreeBox').prop('checked', false);
      }
    });

    $('.userAgreeBox').click('click', function(e) {
      if ($('input.userAgreeBox:checked').length === 3) {
        $('#userAgreeBoxAll').click();
      } else {
        $('#userAgreeBoxAll').prop('checked', false);
      }
    });

    /* 회원가입 submit */
    $('#userRegisterBtn').click(function() {
      $('#realnameDiv').empty();
      $('#emailDiv').empty();
      $('#phoneDiv').empty();
      $('#birthdateDiv').empty();

      if ($('#userAgreeBoxAll').prop('checked') == false) {
        alert('약관 동의를 해주세요');
      } else if ($('#realname').val() == '') {
        $('#realnameDiv').text('이름을 입력하세요');
        $('#realnameDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else if ($('#registerId').val() == '') {
        $('#registerIdDiv').text('아이디를 입력하세요');
        $('#registerIdDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else if ($('#registerPassword').val() == '') {
        $('#RegisterPasswordDiv').text('비밀번호를 입력하세요');
        $('#RegisterPasswordDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else if (
        ($('#registerEmail1').val() == '', $('#registerEmail2').val() == '')
      ) {
        $('#emailDiv').text('이메일을 입력하세요');
        $('#emailDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else if (($('#phone2').val() == '', $('#phone3').val() == '')) {
        $('#phoneDiv').text('휴대전화를 입력하세요');
        $('#phoneDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else if ($('#birthdate').val() == '') {
        $('#birthdateDiv').text('생년월일를 입력하세요');
        $('#birthdateDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else {
        if ($('#registerIdDiv').text() != '사용 가능') {
          alert('ID 중복체크 해주세요');
        } else if ($('#RegisterPasswordDiv').text() != '사용 가능') {
          alert('비밀번호를 확인해주세요');
        } else {
          document.registerEmailForm.submit();
        }
      }
    });

    /* 아이디 중복확인 */
    $('#registerId').focusout(function() {
      /* 숫자 포함 형태의 6~15자리 이내의 암호 정규식 */
      var passRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

      if ($('#registerId').val() == '') {
        $('#registerIdDiv').text('아이디를 입력하세요');
        $('#registerIdDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else if (!passRule.test($("input[id='registerId']").val())) {
        $('#registerIdDiv').text('이메일 형식으로 아이디를 설정해주세요');
        $('#registerIdDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else {
        $('#registerIdDiv').empty();
        var token = $("meta[name='_csrf']").attr('content');
        var header = $("meta[name='_csrf_header']").attr('content');

        $.ajax({
          type: 'post',
          url: './user/checkId',
          data:
            'id=' +
            $('#registerId').val() +
            '&registerMethod=' +
            $('#registerMethod').val(),
          dataType: 'text',
          beforeSend: function(xhr) {
            // here it is
            xhr.setRequestHeader(header, token);
          },
          success: function(data) {
            if (data == 'exist') {
              $('#registerIdDiv').text('사용 불가능');
              $('#registerIdDiv').css({
                color: 'red',
                'font-size': '8pt',
                'font-weight': 'bold'
              });
            } else if (data == 'not_exist') {
              $('#registerIdDiv').text('사용 가능');
              $('#registerIdDiv').css({
                color: 'blue',
                'font-size': '8pt',
                'font-weight': 'bold'
              });
            }
          },
          error: function(err) {
            console.log(err);
            alert('실패');
          }
        });
      }
    });

    /* 패스워드 정규표현 만족 */
    $('#registerPassword').focusout(function() {
      /* 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 */
      var passRule = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

      if (!passRule.test($("input[id='registerPassword']").val())) {
        $('#RegisterPasswordDiv').text(
          '특수문자 / 문자 / 숫자 포함 형태의 8~15자리 비밀번호로 설정해주세요'
        );
        $('#RegisterPasswordDiv').css({
          color: 'red',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      } else {
        $('#RegisterPasswordDiv').text('사용 가능');
        $('#RegisterPasswordDiv').css({
          color: 'blue',
          'font-size': '8pt',
          'font-weight': 'bold'
        });
      }
    });

    /* 아이디,이름,패스워드 공백체크 */
    function noSpaceForm(obj) {
      // 공백사용못하게
      var str_space = /\s/; // 공백체크
      if (str_space.exec(obj.value)) {
        // 공백 체크
        alert(
          '해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다.'
        );
        obj.focus();
        obj.value = obj.value.replace(' ', ''); // 공백제거
      }
    }
  }

  // 모달 템플릿
  function getTemplateModal(title, body) {
    return `<div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                      <h5 class="modal-title">${title}</h5>
                      <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                      >
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>
                      <div class="modal-body">
                      ${body}
                      </div>
                  </div>
              </div>
              `;
  }

  function getTemplateWriteSelector() {
    return `
        <div class="row justify-content-center">
            <lable>여행루트 글쓰기</label>
            <input name="writeType" value="route" type="radio" checked />
            <label>여행에세이 글쓰기</label>
            <input name="writeType" value="essay" type="radio" />
        </div>
        <div class="row justify-content-center">
            <lable>국내</label>
            <input name="isDomestic" value="1" type="radio" checked />
            <label>해외</label>
            <input name="isDomestic" value="0" type="radio" />
        </div>
        <button id="btn-to-write" class="btn btn-outline-info">글쓰러 가기</button>
      `;
  }

  // 로그인 템플릿
  function getTemplateLogin() {
    return `
        <div class="login_display">
        <form name="loginForm" method="post"
				action="j_spring_security_check " autocomplete="off">
        
		<input type="hidden" id="csrfToken" name="${csrfTokenName}"
				value="${csrfTokenValue}" />
    
        <div class="input-group">
            <label class="input-group-text">계정</label>
            <input name="id" type="text" id="login_id" class="form-control"><span id="spanCheckID"></span>
        </div>
        
        <div class="input-group">
            <label class="input-group-text">비밀번호</label>
            <input name="pwd" type="password" id="login_pwd" class="form-control"><span id="spanCheckPWD"></span>
        </div>
        
        <button type="button" class="btn btn-outline-info" id="loginBtn">로그인</button> 
        </form>
         <button type="button" class="btn btn-outline-info" id="idpwdSearch">아이디찾기/비밀번호 찾기</button> 
		<table id="loginMeue">
				<tr>
					<td>
					<td><a id="kakao-login-btn"></a></td>
				</tr>
				<tr>
					<td><div class="g-signin2" data-onsuccess="onSignIn"></div></td>
				</tr>
				<tr>
				<td><div id="naverIdLogin"></div></td>
				</tr>
		</table>
		
		<div>
			<input type="hidden" id="naverId"> <input type="hidden"
				id="naverEmail">
		</div>

      `;
  }

  function getTemplateRegister() {
    return `
    	<div class="registerForm_email">
			<form name="registerEmailForm" action="/user/register" method="post">
				<input type="hidden" name="${csrfTokenName}"
					value="${csrfTokenValue}" /> <input type="hidden"
					name="registerMethod" id="registerMethod" value="travelMaker" />
				<div>
					<input type="checkbox" id="userAgreeBoxAll">회원약관 전체에 동의합니다
					</br> <input type="checkbox" class="userAgreeBox">서비스 이용약관 <a
						onclick="">약관보기</a> </br> <input type="checkbox" class="userAgreeBox">위치서비스
					이용약관 <a onclick="">약관보기</a> </br> <input type="checkbox"
						class="userAgreeBox"> 개인정보취급방침 <a onclick="">약관보기</a> </br> </br>
				</div>
				<div>
					<div>필수입력 사항</div>
					</br> <span class="icon"></span> <input type="text" name="realname"
						id="realname" placeholder="사용자 이름" onkeyup="noSpaceForm(this)"
						onchange="noSpaceForm(this)">
					<div id="realnameDiv"></div>
				</div>

				<div>
					<span class="icon"></span> <input type="text" name="id"
						id="registerId" placeholder="아이디" onkeyup="noSpaceForm(this)"
						onchange="noSpaceForm(this)">
					<div id="registerIdDiv"></div>
				</div>
				<br>
				<div>
					<span class="icon"></span> <input type="password" name="password"
						id="registerPassword" placeholder="비밀번호"
						onkeyup="noSpaceForm(this)" onchange="noSpaceForm(this)">
					<div id="RegisterPasswordDiv"></div>
				</div>
				<div>
					<span class="icon"></span> <input type="text" name="email1"
						id="registerEmail1" placeholder="이메일"> @ <input
						type="text" name="email2" id="registerEmail2" placeholder="직접입력"
						list="list" style="width: 150px;">
					<datalist id=list>
						<option value="naver.com">naver.com</option>
						<option value="daum.net">daum.net</option>
						<option value="google.com">google.com</option>
						<option value="nate.net">nate.net</option>
					</datalist>
					<div id="emailDiv"></div>
				</div>
				<div>
					<span class="icon"></span> <select name="phone1" id="phone1">
						<option value="010">010</option>
						<option value="011">011</option>
						<option value="019">016</option>
					</select><input type="text" name="phone2" id="phone2" placeholder="0000"
						maxlength="4"> <input type="text" name="phone3"
						id="phone3" placeholder="0000" maxlength="4">
					<div id="phoneDiv"></div>
				</div>


				<div>선택 항목</div>

				<div>
					<span class="icon"></span> <input type="date" name="birthdate"
						id="birthdate" placeholder="생년월일">
					<div id="birthdateDiv"></div>
				</div>

				<div>
					<input type="radio" name="gender" value="0" id="gender"
						checked="checked">남 <input type="radio" name="gender"
						value="1">여
				</div>

				<input type="button" value="회원가입" id="userRegisterBtn"
					style="WIDTH: 90pt; HEIGHT: 30pt">
			</form>
		</div>
    	`;
  }
});
