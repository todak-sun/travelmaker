let travelmaker = (function (window) {
    const _w = window;
    const travelmaker = {};
    const url = _w.location.host;

    const Utils = (function (w) {
        const Utils = function () {
        };

        Utils.prototype.getEl = getEl;

        Utils.prototype.setRequestHeader = function (xhr) {
            const token = getEl('meta[name="_csrf"]').getAttribute('content');
            const header = getEl('meta[name="_csrf_header"]').getAttribute('content');
            xhr.setRequestHeader(header, token);
        };

        Utils.prototype.setInValid = function (e, el, message) {
            el.innerText = message;
            e.target.classList.add('is-invalid');
            e.target.classList.remove('is-valid');
        };

        Utils.prototype.setValid = function (e, el, message) {
            el.innerText = message;
            e.target.classList.add('is-valid');
            e.target.classList.remove('is-invalid');
        };

        Utils.prototype.changeValid = function (e) {
            e.target.classList.add('is-valid');
            e.target.classList.remove('is-invalid');
        };

        Utils.prototype.changeInValid = function (e) {
            e.target.classList.add('is-invalid');
            e.target.classList.remove('is-valid');
        };

        Utils.prototype.isValid = function (el) {
            return el.classList.contains('is-valid');
        };

        Utils.prototype.resetMessageHandler = function(e){
            if (!e.target.value) {
                e.target.classList.remove('is-invalid');
                e.target.classList.remove('is-valid');
            }
        };

        Utils.prototype.getRegisterMethod = function () {
            return getEl('#registerMethod').value;
        };

        Utils.prototype.getFeedbackBox = function (e) {
            return [e.target.parentElement.querySelector('.invalid-feedback'),
                e.target.parentElement.querySelector('.valid-feedback')]
        };

        Utils.prototype.useState = function (data) {
            let state = data;

            function setState(newState) {
                state = {
                    ...state,
                    ...newState
                };
                console.log(state);
            }

            function getState() {
                return state;
            }

            return [setState, getState];
        };

        function getEl(selector) {
            return document.querySelector(selector);
        }

        return Utils;
    })(_w);

    const Regex = (function (w) {
        const Regex = function () {
            this.email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            this.password = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            this.koreaName = /^[가-힣]{2,4}$/;
            this.englishAndNumber = /^[a-zA-Z0-9]+$/;
            this.englishWithPoint = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            this.number = /^[0-9]+$/;
        };

        return Regex;
    })(_w);

    const Template = (function (w) {
        const Template = function () {
        };

        Template.prototype.infoWindow = function (place, address) {
            return `<div>
              지명 : ${place}
              주소 : ${address}
              <button id="btn-add-map">추가</button>
            </div>`;
        };

        Template.prototype.staticMap = function (link, imgUrl, description) {
            return `
            <a href="${link}">
              <img src="${imgUrl}"/>
            </a>
            <p>${description}</p>
            `;
        };

        Template.prototype.hashBox = function () {
            return `
                <div>
                    <div class="input-group">
                      <input id="hashtag" type="text" class="form-control"/>
                      <button id="btn-add-hashtag">추가</button>
                    </div>
                    <div id="content-hashtag" class="form-control"></div>
                </div>
                `;
        };

        Template.prototype.map = function () {
            return `
            <div class="row">
              <div class="col col-sm-3 bg-light" style="padding:0">
                  <div class="input-group">
                      <input type="text" id="keyword" class="form-control"/>
                      <button id="btn-keyword-search">검색</button>
                  </div>
                  <ul id="placesList" class="list-group list-group-flush" style="height:350px;overflow-y:auto;padding:0;">
                  </ul>
                  <ul id="pagination" class="pagination"></ul>
              </div>
              <div id="map" class="col col-sm-9"></div>
            </div>
            `;
        };

        Template.prototype.register = function (csrfTokenName, csrfTokenValue) {
            return `
    	<div class="register-form-email">
      <form id="register-form" action="/user/register" method="post">
        <input
          type="hidden"
          name="${csrfTokenName}"
          value="${csrfTokenValue}"
        />
        <input
          type="hidden"
          name="registerMethod"
          id="registerMethod"
          value="travelMaker"
        />
        <div>
          <ul class="group-checkbox">
            <li>
              <input type="checkbox" id="user-agree-box-all"/>
              <label for="user-agree-box-all">회원약관 전체에 동의합니다</label>
            </li>
            <li>
              <input id="agree-1" type="checkbox" class="user-agree-box" />
              <label for="agree-1">서비스 이용약관</label>
              <a onclick="">약관보기</a>
            </li>
            <li>
              <input id="agree-3" type="checkbox" class="user-agree-box" />
              <label for="agree-3">위치서비스 이용약관</label>
              <a onclick="">약관보기</a>
            </li>
            <li>
              <input id="agree-4" type="checkbox" class="user-agree-box" />
              <label for="agree-4">개인정보취급방침</label>
              <a onclick="">약관보기</a>
            </li>
          </ul>
        </div>
        <h4>필수입력 사항</h4>
        <div class="input-group">
          <label for="realname" class="input-group-text">이름</label>
          <input
            type="text"
            name="realname"
            id="realname"
            class="form-control"
            placeholder="이름"
          />
          <div class="invalid-feedback"></div>
        </div>

        <div class="input-group">
          <label for="register-id" class="input-group-text">아이디</label>
          <input
            type="text"
            name="id"
            id="register-id"
            class="form-control"
            placeholder="id"
          />
          <div class="invalid-feedback"></div>
          <div class="valid-feedback"></div>
        </div>
        <div class="input-group">
          <label for="register-password" class="input-group-text">비밀번호</label>
          <input
            type="password"
            name="password"
            id="register-password"
            class="form-control"
            placeholder="password"
          />
          <div class="invalid-feedback"></div>
          <div class="valid-feedback"></div>
        </div>
        <div class="input-group">
          <label for="register-repassword" class="input-group-text">재확인</label>
          <input
            type="password"
            id="register-repassword"
            class="form-control"
            placeholder="password"
          />
          <div class="invalid-feedback"></div>
          <div class="valid-feedback"></div>
        </div>
        <div>
          <div class="input-group">
              <label for="register-email1" class="input-group-text">이메일</label>
              <input
                type="text"
                name="email1"
                id="register-email1"
                class="form-control"
                placeholder="이메일"
              />
              <span class="input-group-text">@</span>
              <input
                type="text"
                name="email2"
                id="register-email2"
                placeholder="직접입력"
                class="form-control"
                list="list"
                style="width: 150px;"
              />
              <datalist id="list">
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="google.com">google.com</option>
                <option value="nate.net">nate.net</option>
              </datalist>
              <button class="btn btn-secondary input-group-append">인증</button>
              <div class="invalid-feedback"></div>
          </div>
        </div>
        <div>
        <div class="input-group">
          <label for="phone1" class="input-group-text">휴대폰번호</label>
          <select name="phone1" id="phone1" class="form-control">
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="019">016</option>
          </select>
          <input
            type="text"
            name="phone2"
            id="phone2"
            class="form-control"
            placeholder="0000"
            maxlength="4"
          />
          <input
            type="text"
            name="phone3"
            id="phone3"
            placeholder="0000"
            class="form-control"
            maxlength="4"
          />
         <div class="invalid-feedback"></div> 
         </div>
        </div>
        
        <h4>선택 항목</h4>
        <div>
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            placeholder="생년월일"
          />
          <div id="birthdateDiv"></div>
        </div>

        <div>
          <input
            type="radio"
            name="gender"
            value="0"
            id="gender-mail"
            checked="checked"
          />
          <label for="gender-mail">남</label>
          <input id="gender-femail" type="radio" name="gender" value="1" />
          <label for="gender-femail">여</label>
        </div>
        <button
          id="btn-user-register"
          type="button"
          class="btn btn-outline-secondary"
        >
          회원가입
        </button>
      </form>
    </div>
    	`;
        };

        Template.prototype.login = function (csrfTokenName, csrfTokenValue) {
            return `
            <div class="login_display">
            <form name="loginForm" method="post"
                    action="j_spring_security_check " autocomplete="off">
            
            <input type="hidden" id="csrfToken" name="${csrfTokenName}"
                    value="${csrfTokenValue}" />
        
            <div class="input-group">
                <label class="input-group-text">계정</label>
                <input name="id" type="text" id="login_id" class="form-control">
                <div class="invalid-feedback"></div>
                <div class="valid-feedback"></div>
            </div>
            
            <div class="input-group">
                <label class="input-group-text">비밀번호</label>
                <input name="pwd" type="password" id="login_pwd" class="form-control">
                <div class="invalid-feedback"></div>
                <div class="valid-feedback"></div>
            </div>
            
            <button type="button" class="btn btn-outline-info" id="loginBtn">로그인</button> 
            </form>
             <button type="button" class="btn btn-outline-info" id="idpwdSearch">아이디찾기/비밀번호 찾기</button> 
            <div id="loginMeue">
                <button id="btn-login-na" class="btn btn-secondary">네이버로 로그인하기</button>
                <button id="btn-login-ka" class="btn btn-secondary">카카오로 로그인하기</button>
                <button id="btn-login-go" class="btn btn-secondary">구글로 로그인하기</button>
            </div>
            <div>
                <input type="hidden" id="naverId"> <input type="hidden"
                    id="naverEmail">
            </div>
            <a id="kakao-login-btn" class="btn-api-login"></a>
            <div id="naverIdLogin" class="btn-api-login"></div>
            <div class="g-signin2" class="btn-api-login" data-onsuccess="onSignIn"></div>
          `;
        };

        Template.prototype.storySelector = function () {
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
        };

        Template.prototype.modal = function (title, body) {
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
        };

        return Template;
    })(_w);

    travelmaker.url = url;
    travelmaker.utils = Utils;
    travelmaker.template = Template;
    travelmaker.regex = Regex;

    _w.travelmaker = travelmaker;
    return travelmaker;
})(window);