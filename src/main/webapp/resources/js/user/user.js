const { setRequestHeader, useState, getEl } = new travelmaker.utils();

/* 로그아웃 csrf 토큰값 */
function logoutSubmit() {
  getEl('#logoutForm').submit();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {});
  auth2.disconnect();
}

const [setUserData, getUserData] = useState({
  id: null,
  name: null,
  registerMethod: null
});

/* 카카오 로그인 관련 */
//카카오 로그인 시도시 아래의 함수를 콜백 호출
function kakaoLogin() {
  Kakao.Auth.createLoginButton({
    container: '#kakao-login-btn',
    success: kakaoApiRequest,
    fail: console.error
  });
}

//카카오 API에 유저정보 요청
function kakaoApiRequest(authObj) {
  // console.log(authObj);
  Kakao.API.request({
    url: '/v1/user/me',
    success: getKakaoUserInfo
  });
}

//카카오 유저정보를 가지고 옴.
function getKakaoUserInfo(res) {
  setUserData({
    id: res.kaccount_email,
    name: res.properties['nickname'],
    registerMethod: 'kakao'
  });
  ajaxRegisterMethod(getUserData())
    .then(setRegisterByKakao)
    .catch(console.error);
}

/* 네이버 로그인 */
// 네이버 로그인 시 콜백 메소드
function naverLogin() {
  setUserData({
    id: getEl('#naverId').value,
    name: getEl('#naverEmail').value,
    registerMethod: 'naver'
  });
  ajaxRegisterMethod(getUserData())
    .then(setRegisterByNaver)
    .catch(console.error);
}

/* 구글 로그인 */
// 구글 로그인 시 콜백 메소드
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  setUserData({
    id: profile.getEmail(),
    name: profile.getName(),
    registerMethod: 'google'
  });

  const auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();

  ajaxRegisterMethod(getUserData())
    .then(setRegisterByGoogle)
    .catch((err) => {
      console.error(err);
      location.reload();
    });
}

function setRegisterByKakao(ret) {
  const { id, name, registerMethod } = getUserData();
  if (ret === 'null') {
    emitRegisterEvent();
    setRegisterForm(id, name, 'kakao');
  } else if (ret !== 'null') {
    doLogin(id, ret, registerMethod);
  }
}

function setRegisterByNaver(ret) {
  const { id, name, registerMethod } = getUserData();
  if (ret === 'null') {
    emitRegisterEvent();
    setRegisterForm(id, name, 'naver');
  } else if (ret !== 'null') {
    doLogin(id, ret, registerMethod);
  }
}

function setRegisterByGoogle(ret) {
  const { id, name, registerMethod } = getUserData();
  if (ret === 'null') {
    emitRegisterEvent();
    setRegisterForm(id, name, 'google');
  } else if (ret !== 'null') {
    doLogin(id, ret);
  }
}

//registerMethod에 요청
function ajaxRegisterMethod(data) {
  return $.ajax({
    type: 'post',
    url: './user/registerMethod',
    dataType: 'text',
    beforeSend: setRequestHeader,
    data: data
  });
}

function emitRegisterEvent() {
  const Link = getEl('#btn-regist');
  const event = document.createEvent('MouseEvents');
  event.initEvent('click', false, true);
  Link.dispatchEvent(event);
}

function doLogin(id, ret, methodName) {
  getEl('#login_id').value = id + '===' + methodName;
  getEl('#login_pwd').value = ret;
  document.loginForm.submit();
}

function setRegisterForm(id, name, methodName) {
  const registerMethod = getEl('#registerMethod');
  const realname = getEl('#realname');
  const registerId = getEl('#register-id');

  registerMethod.value = methodName;
  realname.value = name;
  registerId.value = id;
  registerId.setAttribute('readOnly', true);

  realname.classList.add('is-valid');
  registerId.classList.add('is-valid');
  // registerId.removeEventListener('blur', 'registerIdHandler');
  // registerId.removeEventListener('input');
}

function post_goto(url, parm, target) {
  var f = document.createElement('form');

  var objs, value;
  for (var key in parm) {
    value = parm[key];
    objs = document.createElement('input');
    objs.setAttribute('type', 'hidden');
    objs.setAttribute('name', key);
    objs.setAttribute('value', value);
    f.appendChild(objs);
  }

  if (target) f.setAttribute('target', target);

  f.setAttribute('method', 'post');
  f.setAttribute('action', url);
  document.body.appendChild(f);
  f.submit();
}

/* 마이페이지 */
function mypageGo(id) {
  var token = $("meta[name='_csrf']").attr('content');
  post_goto('http://localhost:8080/user/mypage', {
    id: id,
    _csrf: token
  });
}

$('#imgProfile').change(function() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function(data) {
      $('.select_img img')
        .attr('src', data.target.result)
        .width(300);
    };
    reader.readAsDataURL(this.files[0]);
  }
});

$('#prePassword').focusout(function() {
  /* 숫자 포함 형태의 6~15자리 이내의 암호 정규식 */
  var passRule = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if ($('#prePassword').val() == '') {
    $('#prePasswordDiv').text('현재 비밀번호를 입력하세요');
    $('#prePasswordDiv').css({
      color: 'red',
      'font-size': '8pt',
      'font-weight': 'bold'
    });
  } else if (!passRule.test($("input[id='prePassword']").val())) {
    $('#prePasswordDiv').text(
      '특수문자 / 문자 / 숫자 포함 형태의 8~15자리 비밀번호로 설정해주세요'
    );
    $('#prePasswordDiv').css({
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
      url: './checkPassword',
      data:
        'id=' +
        $('#mypageId').val() +
        '&registerMethod=' +
        $('#registerMethod').val() +
        '&pwd=' +
        $('#prePassword').val(),
      dataType: 'text',
      beforeSend: function(xhr) {
        // here it is
        xhr.setRequestHeader(header, token);
      },
      success: function(data) {
        if (data == 'exist') {
          $('#prePasswordDiv').text('OK');
          $('#prePasswordDiv').css({
            color: 'blue',
            'font-size': '8pt',
            'font-weight': 'bold'
          });
        } else if (data == 'not_exist') {
          $('#prePasswordDiv').text('비밀번호가 틀립니다');
          $('#prePasswordDiv').css({
            color: 'red',
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

$('#nextPassword').focusout(function() {
  var passRule = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if ($('#prePassword').val() == '') {
    $('#nextPasswordDiv').text('현재 비밀번호를 입력하세요');
    $('#nextPasswordDiv').css({
      color: 'red',
      'font-size': '8pt',
      'font-weight': 'bold'
    });
  } else if (!passRule.test($("input[id='nextPassword']").val())) {
    $('#nextPasswordDiv').text(
      '특수문자 / 문자 / 숫자 포함 형태의 8~15자리 비밀번호로 설정해주세요'
    );
    $('#nextPasswordDiv').css({
      color: 'red',
      'font-size': '8pt',
      'font-weight': 'bold'
    });
  } else {
    $('#nextPasswordDiv').text('OK');
    $('#nextPasswordDiv').css({
      color: 'blue',
      'font-size': '8pt',
      'font-weight': 'bold'
    });
  }
});

$('#nextPasswordConfirm').focusout(function() {
  if ($('#nextPassword').val() == $('#nextPasswordConfirm').val()) {
    $('#nextPasswordConfirmDiv').text('OK');
    $('#nextPasswordConfirmDiv').css({
      color: 'blue',
      'font-size': '8pt',
      'font-weight': 'bold'
    });
  } else {
    $('#nextPasswordConfirmDiv').text('새 비밀번호가 틀립니다');
    $('#nextPasswordConfirmDiv').css({
      color: 'red',
      'font-size': '8pt',
      'font-weight': 'bold'
    });
  }
});

function modifyUser() {
  if ($('#prePassword').val() == '') {
    alert('현재비밀번호를 입력해주세요');
  } else if ($('#prePasswordDiv').text() != 'OK') {
    alert('현재 비밀번호가 틀립니다');
  } else {
    if (
      $('#nextPassword').val() != '' ||
      $('#nextPasswordConfirm').val() != ''
    ) {
      if ($('#nextPassword').val() != $('#nextPasswordConfirm').val()) {
        alert('새 비밀번호가 일치하지 않습니다');
      } else {
        $('#prePassword').val($('#nextPasswordConfirm').val());
        document.userModifyForm.submit();
      }
    } else {
      document.userModifyForm.submit();
    }
  }
}

function WithdrawalUser() {
  var id = $('#mypageId').val();
  var registerMethod = $('#registerMethod').val();
  if ($('#prePassword').val() == '') {
    alert('현재비밀번호를 입력해주세요');
  } else if ($('#prePasswordDiv').text() != 'OK') {
    alert('현재 비밀번호가 틀립니다');
  } else {
    var con = confirm('정말로 삭제하시겠습니까?');
    if (con == true) {
      var token = $("meta[name='_csrf']").attr('content');
      post_goto('http://localhost:8080/user/withdrawal', {
        id: id,
        registerMethod: registerMethod,
        _csrf: token
      });
    }
  }
}

function checkFirst() {
  new daum.Postcode({
    oncomplete: function(data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        // document.getElementById("sample6_extraAddress").value =
        // extraAddr;
      } else {
        // document.getElementById("sample6_extraAddress").value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('daum_postcode').value = data.zonecode;
      document.getElementById('daum_addr1').value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('daum_addr2').focus();
    }
  }).open();
}

/* 나중에 사용할지도 */
/*
 * function kakaoRegister(){ Kakao.Auth.login({ success : function(authObj) {
 * Kakao.API.request({ url : '/v1/user/me', success : function(res) {
 *
 * let id = res.kaccount_email; let name = res.properties['nickname'];
 *
 * var token = $("meta[name='_csrf']").attr("content"); var header =
 * $("meta[name='_csrf_header']").attr("content"); $ .ajax({ type : 'post', url :
 * './user/registerMethod', data : 'name=' + name + '&id=' + id +
 * '&registerMethod=kakao', dataType : 'text', beforeSend : function(xhr) { //
 * here it is xhr.setRequestHeader(header, token); }, success : function(data) {
 * if (data == 'null') { $('.login_display').css('display', 'none');
 * $('.register_display').css('display', 'none');
 * $('.registerForm_email').css('display', 'block');
 * $('#registerMethod').val('kakao'); $('#realname').val( name);
 * $('#registerId').val(id);
 *
 * $('#registerId').attr("readonly", true); //설정 $('#registerIdDiv').text('사용
 * 가능') $('#registerIdDiv').css('color', 'blue')
 * $('#registerIdDiv').css('font-size', '8pt')
 * $('#registerIdDiv').css('font-weight', 'bold') } else if (data != 'null') {
 * $('#login_id').val( id + '===kakao'); $('#login_pwd').val(data);
 * document.loginForm.submit(); } }, error : function(err) { console.log(err);
 * alert("카카오실패"); } }); } }) },
 *
 * fail : function(err) { alert(JSON.stringify(err)); } }); }
 */
