let travelmaker = (function (window) {
    const _w = window;
    const travelmaker = {};
    const url = 'http://' + _w.location.host;

    const Utils = (function (w) {
        const Utils = function () {
        };

        Utils.prototype.getEl = getEl;
        Utils.prototype.getEls = getEls;
        Utils.prototype.getElList = getElList;
        Utils.prototype.getFormData = getFormData;
        Utils.prototype.getTokenCSRF = function () {
            return getEl('meta[name="_csrf"]').content;
        };
        Utils.prototype.addSameHandlerEvent = function (selector, handler, ...events) {
            let el = document.querySelector(selector);
            for (let i = 0; i < events.length; i++) {
                el.addEventListener(events[i], handler);
            }
        };

        Utils.prototype.removeSameHandlerEvent = function (selector, handler, ...events) {
            let el = document.querySelector(selector);
            if (!el) return;
            for (let i = 0; i < events.length; i++) {
                el.removeEventListener(events[i], handler);
            }
        };

        Utils.prototype.addAllSameEvent = function (elList, event, handler) {
            elList.forEach(el => el.addEventListener(event, handler));
        };

        Utils.prototype.addEvent = function (el, event, handler) {
            el.addEventListener(event, handler);
        };

        Utils.prototype.setRequestHeader = function (xhr) {
            const token = getEl('meta[name="_csrf"]').getAttribute('content');
            const header = getEl('meta[name="_csrf_header"]').getAttribute('content');
            xhr.setRequestHeader(header, token);
        };

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        Utils.prototype.getJSONfromQueryString = function () {
            let qs = location.search.slice(1);
            qs = qs.split('&');

            const obj = {};
            qs.forEach((q) => {
                q = q.split('=');
                obj[q[0]] = decodeURIComponent(q[1] || '');
            });
            return JSON.parse(JSON.stringify(obj));
        };

        Utils.prototype.getRegisterMethod = function () {
            return getEl('#registerMethod').value;
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

<<<<<<< Updated upstream
        Utils.prototype.showLoading = function(){
            const ldsBack = getEl('.lds-back');
            ldsBack.classList.remove('hidden');
        };

        Utils.prototype.closeLoading = function(){
            const ldsBack = getEl('.lds-back');
            ldsBack.classList.add('hidden');
        };

=======
>>>>>>> Stashed changes
        function getEl(selector) {
            return document.querySelector(selector);
        }

        function getEls(parent, ...targets) {
            let els = [];
            targets.forEach((target) => els.push(parent.querySelector(target)));
            return els;
        }

        function getElList(selectors) {
            return Array.from(document.querySelectorAll(selectors));
        }

<<<<<<< Updated upstream
        function getFormData(data) {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const formData = new FormData();
=======
        function getFormData(imageFile) {
            const essay = getEssay();
            const keys = Object.keys(essay);
            const values = Object.values(essay);

            const formData = new FormData();
            formData.append('imageFile', imageFile);
>>>>>>> Stashed changes
            for (let i = 0; i < keys.length; i++) {
                formData.append(keys[i], values[i]);
            }
            return formData;
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
<<<<<<< Updated upstream
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

        Template.prototype.message = function (message){
            return `
                <div class="message-item">
                    <span class="close">&times;</span>
                    <p>${message}</p>
                </div>
            `;
        }

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

        Template.prototype.kmap = function () {
            return `
            <div class="map-wrap">
                <div class="search-area">
                  <div class="input-wrap">
                    <input type="text" class="search-location" />
                    <button id="btn-search-location">검색</button>
                  </div>
                  <div class="result-wrap">
                    <ul class="result-group"></ul>
                    <ul class="page-group"></ul>
                  </div>
                </div>
                <div class="map-area">
                  <div id="map"></div>
                </div>
          </div>
            `;
        };

        Template.prototype.gmap = function () {
            return `
             <div class="map-wrap-g">
                <input type="text" class="search-location" placeholder="검색어를 입력하세요..."/>
                <div id="map"></div>
            </div>
            `;
        };

        Template.prototype.pageItem = function (index, pagination) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = '#';
            a.innerText = index;
            if (index === pagination.current) a.classList.add('on');
            else a.addEventListener('click', () => pagination.gotoPage(index));

            li.appendChild(a);
            return li;
        };

        Template.prototype.kmapResult = function (index, places) {
            let li = document.createElement('li');
            let placeName = places.place_name;
            let placeAddr = places.road_address_name || places.address_name;
            li.innerHTML = `
               <li class="result-item">
                <div class="result">
                  <h6 class="place-name">${placeName}</h6>
                  <span class="place-addr">${placeAddr}</span>
                </div>
               </li>
            `;
            li.classList.add('result-item');
            return li;
        };

        Template.prototype.story = function () {
            return `
               <div class="select-wrap">
                <div class="select-inner-wrap">
                  <button id="btn-route" type="button" data-sel="route"></button>
                  <div class="expression">
                    <h4>경로형</h4>
                    <p>
                      어디에, 어느곳에 다녀왔는지 단계별로 차곡차곡 적을 수 있어요.
                      완성된 글에는 내가 다녀온 여행 경로가 지도에 짠!
                    </p>
                  </div>
                </div>
                <div class="select-inner-wrap">
                  <button id="btn-essay" type="button" data-sel="essay"></button>
                  <div class="expression">
                    <h4>에세이형</h4>
                    <p>
                      편하고 익숙한 글쓰기 환경에서 마음껏 여행에 대한 이야길 나눌
                      수 있어요.
                    </p>
                  </div>
                </div>
              </div>
            `;
        };

        Template.prototype.domestic = function () {
            return `
              <div class="location-wrap">
                <h2>국내, 해외 중 어디에 다녀오셨나요?</h2>
                <div class="btn-wrap">
                  <button id="btn-korea" data-domestic="1"></button>
                  <button id="btn-global" data-domestic="0"></button>
                </div>
              </div>
            `
        };

        Template.prototype.essayTemp = function (essay) {
            const {rno, title, imageName, isDomestic, dateWrite} = essay;
            return `
               <li>
                    <div data-rno="${rno}" class="temp-item">
                        <span class="delete">&times;</span>
                        <span class="get">불러오기</span>
                        <div class="image-wrap">
                            <img src="/resources/storage/essay/${imageName}" alt="${imageName}"/>
                        </div>
                        <div class="temp-info">
                            <span class="mini-badge">${isDomestic ? '국내' : '해외'}</span>
                            <p>${title}</p>
                            <span class="date">${dateWrite}</span>
                        </div>
                    </div>
                </li>        
            `
        };

        Template.prototype.comment = function (mySeq, comment) {
            const {cno, bno, content, likes, unlikes, seq, dateWrite, pcno, userDTO: {realname}} = comment;
            let commentItem = `
                <li class="${cno === pcno ? '' : 're'}">
                    <div class="comment-item">
                        <div class="comment-author">
                            <div class="img-wrap">
                                <img src="https://source.unsplash.com/collection/190727/80x80" alt="" />
                            </div>
                            <p class="author-nickname">${realname}</p>
                        </div>
                        <div class="content-area">
                            <textarea class="comment-content" disabled>${content}</textarea>
                            <div data-cno="${cno}" data-likes="${likes}" data-unlikes="${unlikes}" class="comment-operation">`;
            if (mySeq !== 0) {
                if (mySeq !== seq)
                    commentItem += `<button class="like likes">${likes}</button><button class="like unlikes">${unlikes}</button>`;
                else
                    commentItem += `<button class="oper update">수정</button><button class="oper delete">삭제</button>`;
                commentItem += `<button class="oper recomment" data-pcno="${cno === pcno ? cno : pcno}">답글</button>`;
            }
            commentItem += `</div>
                        </div>
                    </div>
                </li>`;
            return commentItem;
        };

        Template.prototype.reComment = function (cno) {
            return `
            <li>
                <div class="comment-write-area">
                    <span class="content-length"><span>000</span> / 500</span>
                    <textarea class="comment-content" placeholder="바르고 고운말은 여행자에게 큰 힘이됩니다."></textarea>
                    <button class="btn-add-comment" data-cno="${cno}">작성</button>
                    <button class="btn-cancel-comment">취소</button>
                </div>
            </li>
            `
        };

        Template.prototype.login2 = function (csrfTokenValue) {
            return `
                <form name="loginForm" method="post" action="j_spring_security_check" class="form-login" autocomplete="off">
                    <div class="hidden">
                        <input type="hidden" id="csrfToken" name="_csrf" value="${csrfTokenValue}" />    
                        <input type="hidden" id="id" name="id">
                    </div>
                    <div class="input-wrap">
                      <input 
                        type="text"
                        id="mid" 
                        class="v" 
                        placeholder="아이디"
                      />
                       <div class="v-feed"></div>
                       <div class="iv-feed"></div>
                    </div>
                    <div class="input-wrap">
                      <input
                        type="password"
                        id="pwd"
                        name="pwd"
                        class="v"
                        placeholder="비밀번호"
                      />
                       <div class="v-feed"></div>
                       <div class="iv-feed"></div>
                    </div>
                    
                    <div class="wrap-link">
                        <a href="#" class="link-id-search">아이디 찾기</a>/<a href="#" class="link-password-search">비밀번호 찾기</a>
                    </div>
                    
                    <div class="wrap-buttons">
                      <button type="button" class="btn-register">회원가입</button>
                      <button type="button" id="btn-login">로그인</button>
                    </div>
                    
                    <div class="wrap-buttons-api">
                      <button type="button" class="btn-kakao">카카오로 로그인</button>
                      <button type="button" class="btn-google">구글로 로그인</button>
                      <button type="button" class="btn-naver">네이버 로그인</button>
                    </div>
                </form>
                <div class="hidden">
                    <input type="hidden" id="naverId">
                    <input type="hidden" id="naverEmail">
                    <a id="kakao-login-btn" class="btn-api-login"></a>
                    <div id="naverIdLogin" class="btn-api-login"></div>
                    <div class="g-signin2 btn-api-login" data-onsuccess="onSignIn"></div>
                </div>
                `;
        };

        Template.prototype.idSearch = function () {
            return `
            <form class="id-search">
                <label for="" class="label-need">이메일</label>
                <div class="input-wrap">
                  <input type="text" class="v" id="email1"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                <div class="input-wrap input-email2-wrap">
                  <input type="text" list="email" placeholder="직접입력...." class="v" id="email2"/>
                  <datalist id="email">
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="nate.com">nate.com</option>
                  </datalist>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
    
                <label for="" class="label-need">이름</label>
                <div class="input-wrap-4">
                  <div class="input-wrap">
                    <input type="text" class="v" id="realname"/>
                    <div class="v-feed"></div>
                    <div class="iv-feed">이름을 입력해주세요</div>
                  </div>
                  <button id="btn-search" type="button">찾기</button>
                </div>
                <div class="message-box">
                  <p>아이디를 조회해보세요!</p>
                </div>
            </form>
            `;
        }

        Template.prototype.passwordSearch = function(){
            return `
               <form class="pw-search">
                <label for="" class="label-need">아이디</label>
    
                <div class="input-wrap id-wrap">
                  <input type="text" class="v" id="id" />
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
    
                <label for="" class="label-need">이메일</label>
                <div class="input-wrap">
                  <input type="text" class="v" id="email1"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                <div class="input-wrap input-email2-wrap">
                  <input type="text" list="email" placeholder="직접입력...." class="v" id="email2"/>
                  <datalist id="email">
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="nate.com">nate.com</option>
                  </datalist>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
    
                <div class="button-wrap">
                  <button id="btn-send">전송</button>
                </div>
    
                <div class="message-box">
                  <p>아이디를 조회해보세요!</p>
                </div>
              </form>          
            `;
        }

        Template.prototype.tmodal = function () {
            return `
                <div class="tmodal-back"></div>
                <div class="tmodal">
                  <div class="tmodal-bar">
                    <span class="close">&times;</span>
                  </div>
                  <div class="tmodal-body">
                  </div>
                </div>
               `;
        };

        Template.prototype.tmodalMini = function () {
            return `
                <div class="tmodal-back tmodal-mini-back"></div>
                <div class="tmodal tmodal-mini">
                  <div class="tmodal-bar">
                    <span class="close">&times;</span>
                  </div>
                  <div class="tmodal-body">
                  </div>
                </div>
            `
        };

        Template.prototype.emailConfirm = function () {
            return `
                <div class="timer"></div>
                <div class="input-wrap">
                    <input type="text" id="input-email-confirm" class="v" placeholder="인증번호">
                    <button type="button" id="btn-email-confirm">확인</button>
                    <div class="v-feed"></div>
                    <div class="iv-feed"></div>
                </div>
            `
        };

        Template.prototype.register2 = function (csrfTokenValue) {
            return `
            <div id="mini-modal"></div>
            <form action="/user/register" method="post" class="form-register" id="register-form">
                <div class="hidden">
                    <input type="hidden" name="_csrf" value="${csrfTokenValue}"/>
                    <input type="hidden" name="registerMethod" id="registerMethod" value="travelMaker"/>
                </div>
                <div class='input-expression'>
                  <p>* 표시는 필수 입력 사항입니다</p>
                </div>
                <label for="realname" class="label-need">이름</label>
                <div class="input-wrap-4">
                  <input type="text" id="realname" name="realname" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                
                <label for="register-id" class="label-need">아이디</label>
                <div class="input-wrap-4">
                  <input id="register-id" name="id" type="text" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
            
                <label for="register-password" class="label-need">비밀번호</label>
                <div class="input-wrap-4">
                  <input id="register-password" name="password" type="password" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
            
                <label for="register-repassword" class="label-need">재확인</label>
                <div class="input-wrap-4">
                  <input id="register-repassword" type="password" class="v" />
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
            
                <label for="register-email1" class="label-need">이메일</label>
                <div class="input-wrap">
                  <input id="register-email1" name="email1" type="text" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                <div class="input-wrap-3 input-email2-wrap">
                  <input id="register-email2" name="email2" type="text" list="list" placeholder="직접입력...." class="v v-fail v-pass"/>
                  <datalist id="list">
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="nate.com">nate.com</option>
                  </datalist>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                <button id="btn-email-check" class="btn-travel-min" type="button">인증</button>
            
                <label for="phone1" class="label-need">휴대폰</label>
                <div class="input-wrap">
                  <select id="phone1" name="phone1">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                </div>
                <div class="input-wrap">
                  <input id="phone2" name="phone2" maxlength="4" type="text" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                <div class="input-wrap">
                  <input id="phone3" name="phone3" maxlength="4" type="text" class="v" />
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
            
                <label for="">생년월일</label>
                <div class="input-wrap-4">
                  <input type="date" id="birthdate" name="birthdate" />
                </div>
            
                <label for="">성별</label>
                <div class="radio-wrap">
                    <input id="mail" type="radio" value="0" name="gender" checked="true">
                    <label for="mail" class="clicked">남</label>
                    <input id="femail" type="radio" value="1" name="gender">
                    <label for="femail">여</label>
                </div>
                
                <div class="check-wrap">
                  <div class="check-item">
                    <input type="checkbox" name="" id="check-all">
                    <label for="check-all">회원약관 전체동의</label>
                  </div>
                  <div class="check-item">
                    <input type="checkbox" name="" id="check-service" class="checkbox">
                    <label for="check-service">서비스 이용동의</label>
                  </div>
                  <div class="check-item">
                    <input type="checkbox" name="" id="check-private" class="checkbox">
                    <label for="check-private">개인정보 이용동의</label>
                  </div>
                  <button id="btn-user-register" class="btn-travel">회원가입</button>
                </div>
              </div>
              
            </form>
            `;
        };

        Template.prototype.request = function () {
            return `
            <form class="form-request">
            <div class="input-box">
              <label for="req-start-date">동행 시작일</label>
              <div class="input-wrap">
                <input type="date" id="req-start-date" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            
            <div class="input-box">
              <label for="req-end-date">동행 종료일</label>
              <div class="input-wrap">
                <input type="date" id="req-end-date" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            
            <div class="input-box">
              <label for="req-content">신청 내용</label>
              <div class="input-wrap textarea">
                <textarea id="req-content" class="v"
                  placeholder="신청 내용을 구체적으로 적어주세요."
                ></textarea>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            <button type="button" id="req-btn-try" class="btn-travel">신청하기</button>
            </form>
            `;
        };

        return Template;
    })(_w);

    const Editor = (function (w) {
        const Editor = function () {
            this.summernote = {
                placeholder: '내용',
                airMode: true,
                lang: 'ko-KR',
                popover: {
                    image: [
                        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
                        ['float', ['floatLeft', 'floatRight', 'floatNone']],
                        ['remove', ['removeMedia']]
                    ],
                    link: [['link', ['linkDialogShow', 'unlink']]],
                    table: [
                        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
                    ],
                    air: [
                        ['color', ['color']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['para', ['ul', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'map']]
                    ]
                }
            };
        };
        return Editor;
    })(_w);

    const Ajax = (function (w) {
        const Ajax = function () {
            this.getEssay = getEssay;
            this.getEssayTempList = getEssayTempList;
            this.createEssay = createEssay2;
            this.essayImageUpload = essayImageUpload;
            this.updateEssay = updateEssay;
            this.essayDelete = essayDelete;
            this.getCommentList = getCommentList;
            this.createComment = createComment;
            this.createReComment = createReComment;
            this.updateComment = updateComment;
            this.deleteComment = deleteComment;
            this.checkId = checkId;
            this.alarmDataLoad = alarmDataLoad;
        };

        const {setRequestHeader} = new Utils();

        function alarmDataLoad(seq) {
            return $.ajax({
                type: 'get',
                url: '/alarm/load',
                data: 'seq=' + seq,
                dataType: 'json',
                beforeSend: setRequestHeader
            });
        }

=======
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

        Template.prototype.kmap = function () {
            return `
            <div class="map-wrap">
                <div class="search-area">
                  <div class="input-wrap">
                    <input type="text" class="search-location" />
                    <button id="btn-search-location">검색</button>
                  </div>
                  <div class="result-wrap">
                    <ul class="result-group"></ul>
                    <ul class="page-group"></ul>
                  </div>
                </div>
                <div class="map-area">
                  <div id="map"></div>
                </div>
          </div>
            `;
        };

        Template.prototype.pageItem = function (index, pagination) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = '#';
            a.innerText = index;
            if (index === pagination.current) a.classList.add('on');
            else a.addEventListener('click', () => pagination.gotoPage(index));

            li.appendChild(a);
            return li;
        };

        Template.prototype.kmapResult = function (index, places) {
            let li = document.createElement('li');
            let placeName = places.place_name;
            let placeAddr = places.road_address_name || places.address_name;
            li.innerHTML = `
               <li class="result-item">
                <div class="result">
                  <h6 class="place-name">${placeName}</h6>
                  <span class="place-addr">${placeAddr}</span>
                </div>
               </li>
            `;
            li.classList.add('result-item');
            return li;
        };

        Template.prototype.map = function () {
            return `
            <div class="row">
              <div class="">
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

        Template.prototype.story = function () {
            return `
               <div class="select-wrap">
                <div class="select-inner-wrap">
                  <button id="btn-route" type="button" data-sel="route"></button>
                  <div class="expression">
                    <h4>경로형</h4>
                    <p>
                      어디에, 어느곳에 다녀왔는지 단계별로 차곡차곡 적을 수 있어요.
                      완성된 글에는 내가 다녀온 여행 경로가 지도에 짠!
                    </p>
                  </div>
                </div>
                <div class="select-inner-wrap">
                  <button id="btn-essay" type="button" data-sel="essay"></button>
                  <div class="expression">
                    <h4>에세이형</h4>
                    <p>
                      편하고 익숙한 글쓰기 환경에서 마음껏 여행에 대한 이야길 나눌
                      수 있어요.
                    </p>
                  </div>
                </div>
              </div>
            `;
        };

        Template.prototype.domestic = function () {
            return `
              <div class="location-wrap">
                <h2>국내, 해외 중 어디에 다녀오셨나요?</h2>
                <div class="btn-wrap">
                  <button id="btn-korea" data-domestic="1"></button>
                  <button id="btn-global" data-domestic="0"></button>
                </div>
              </div>
            `
        };

        Template.prototype.purchase = function () {
            return `
              <div class="location-wrap">
                <h2>사다주세요 or 사다줄께요</h2>
                <div class="btn-wrap">
                  <button id="btn-Request" data-purchase="1"></button>
                  <button id="btn-Order" data-purchase="0"></button>
                </div>
              </div>
            `
        };
        
        
        Template.prototype.essayTemp = function (essay) {
            const {rno, title, imageName, isDomestic, dateWrite} = essay;
            return `
               <li>
                    <div data-rno="${rno}" class="temp-item">
                        <span class="delete">&times;</span>
                        <span class="get">불러오기</span>
                        <div class="image-wrap">
                            <img src="${imageName}" alt="${imageName}"/>
                        </div>
                        <div class="temp-info">
                            <span class="mini-badge">${isDomestic ? '국내' : '해외'}</span>
                            <p>${title}</p>
                            <span class="date">${dateWrite}</span>
                        </div>
                    </div>
                </li>        
            `
        };

        Template.prototype.comment = function (comment) {
            const {cno, bno, content, likes, unlikes, seq, dateWrite, pcno} = comment;
            if (cno !== pcno) {
                return `
            <li>
                <div class="media text-muted pt-3">
                  <svg
                          class="bd-placeholder-img mr-2 rounded"
                          width="32"
                          height="32"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          role="img"
                          aria-label="Placeholder: 32x32"
                  >
                    <rect width="100%" height="100%" fill="#f783ac" />
                    <text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text>
                  </svg>
                  <p
                          class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
                  >
                    <strong class="d-block text-gray-dark">@${seq}</strong>
                    <span class="comment-content">${content}</span>
                  </p>
                  <div class="btn-group btn-group-sm">
                    <button data-cno="${cno}" data-likes="${likes}" class="btn-primary btn-like-comment">좋아요${likes}</button>
                    <button data-cno="${cno}" data-unlikes="${unlikes}" class="btn-danger btn-unlike-comment">싫어요${unlikes}</button>
                    <button data-cno="${pcno}" data-on="false" class="btn btn-outline-secondary btn-recomment">답글</button>
                    <button data-cno="${cno}" class="btn btn-outline-secondary btn-recomment-remove">삭제</button>
                  </div>
                </div>
            </li>
            `;
            }
            return `
            <li>
                <div class="media text-muted pt-3">
                  <svg
                          class="bd-placeholder-img mr-2 rounded"
                          width="32"
                          height="32"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          role="img"
                          aria-label="Placeholder: 32x32"
                  >
                    <rect width="100%" height="100%" fill="#6f42c1" />
                    <text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text>
                  </svg>
                  <p
                          class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
                  >
                    <strong class="d-block text-gray-dark">@${seq}</strong>
                    <span class="comment-content">${content}</span>
                  </p>
                  <div class="btn-group btn-group-sm">
                    <button data-cno="${cno}" data-likes="${likes}" class="btn-primary btn-like-comment">좋아요${likes}</button>
                    <button data-cno="${cno}" data-unlikes="${unlikes}" class="btn-danger btn-unlike-comment">싫어요${unlikes}</button>
                    <button data-cno="${cno}" data-on="false" class="btn btn-outline-secondary btn-recomment">답글</button>
                    <button data-cno="${cno}" class="btn btn-outline-secondary btn-recomment-remove">삭제</button>
                  </div>
                </div>
            </li>
            `;
        };

        Template.prototype.reComment = function (cno) {
            return `
                <div class="input-group">
                    <textarea id="recomment-content" class="form-control"></textarea>
                    <button data-cno="${cno}" id="btn-add-recomment" class="input-group-append">작성</button>
                </div>
            `
        }

        Template.prototype.login2 = function (csrfTokenValue) {
            return `
                <form name="loginForm" method="post" action="j_spring_security_check" class="form-login" autocomplete="off">
                    <div class="hidden">
                        <input type="hidden" id="csrfToken" name="_csrf" value="${csrfTokenValue}" />    
                        <input type="hidden" id="id" name="id">
                    </div>
                    <div class="input-wrap">
                      <input 
                        type="text"
                        id="mid" 
                        class="v" 
                        placeholder="아이디"
                      />
                       <div class="v-feed"></div>
                       <div class="iv-feed"></div>
                    </div>
                    <div class="input-wrap">
                      <input
                        type="password"
                        id="pwd"
                        name="pwd"
                        class="v"
                        placeholder="비밀번호"
                      />
                       <div class="v-feed"></div>
                       <div class="iv-feed"></div>
                    </div>
                    
                    <div class="wrap-buttons">
                      <button type="button" class="btn-register">회원가입</button>
                      <button type="button" id="btn-login">로그인</button>
                    </div>
                    
                    <div class="wrap-buttons-api">
                      <button type="button" class="btn-kakao">카카오로 로그인</button>
                      <button type="button" class="btn-google">구글로 로그인</button>
                      <button type="button" class="btn-naver">네이버 로그인</button>
                    </div>
                </form>
                <div class="hidden">
                    <input type="hidden" id="naverId">
                    <input type="hidden" id="naverEmail">
                    <a id="kakao-login-btn" class="btn-api-login"></a>
                    <div id="naverIdLogin" class="btn-api-login"></div>
                    <div class="g-signin2 btn-api-login" data-onsuccess="onSignIn"></div>
                </div>
                `;
        };

        Template.prototype.tmodal = function () {
            return `
                <div class="tmodal-back"></div>
                <div class="tmodal">
                  <div class="tmodal-bar">
                    <span class="close">&times;</span>
                  </div>
                  <div class="tmodal-body">
                  </div>
                </div>
               `;
        };

        Template.prototype.tmodalMini = function () {
            return `
                <div class="tmodal-back tmodal-mini-back"></div>
                <div class="tmodal tmodal-mini">
                  <div class="tmodal-bar">
                    <span class="close">&times;</span>
                  </div>
                  <div class="tmodal-body">
                  </div>
                </div>
            `
        };

        Template.prototype.emailConfirm = function () {
            return `
                <div class="timer"></div>
                <div class="input-wrap">
                    <input type="text" id="input-email-confirm" class="v" placeholder="인증번호">
                    <button type="button" id="btn-email-confirm">확인</button>
                    <div class="v-feed"></div>
                    <div class="iv-feed"></div>
                </div>
            `
        };

        Template.prototype.register2 = function (csrfTokenValue) {
            return `
            <div id="mini-modal"></div>
            <form action="/user/register" method="post" class="form-register" id="register-form">
                <div class="hidden">
                    <input type="hidden" name="_csrf" value="${csrfTokenValue}"/>
                    <input type="hidden" name="registerMethod" id="registerMethod" value="travelMaker"/>
                </div>
                <div class='input-expression'>
                  <p>* 표시는 필수 입력 사항입니다</p>
                </div>
                <label for="realname" class="label-need">이름</label>
                <div class="input-wrap-4">
                  <input type="text" id="realname" name="realname" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                
                <label for="register-id" class="label-need">아이디</label>
                <div class="input-wrap-4">
                  <input id="register-id" name="id" type="text" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
            
                <label for="register-password" class="label-need">비밀번호</label>
                <div class="input-wrap-4">
                  <input id="register-password" name="password" type="password" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
            
                <label for="register-repassword" class="label-need">재확인</label>
                <div class="input-wrap-4">
                  <input id="register-repassword" type="password" class="v" />
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
            
                <label for="register-email1" class="label-need">이메일</label>
                <div class="input-wrap">
                  <input id="register-email1" name="email1" type="text" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                <div class="input-wrap-3 input-email2-wrap">
                  <input id="register-email2" name="email2" type="text" list="list" placeholder="직접입력...." class="v v-fail v-pass"/>
                  <datalist id="list">
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="nate.com">nate.com</option>
                  </datalist>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                <button id="btn-email-check" class="btn-travel-min" type="button">인증</button>
            
                <label for="phone1" class="label-need">휴대폰</label>
                <div class="input-wrap">
                  <select id="phone1" name="phone1">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                </div>
                <div class="input-wrap">
                  <input id="phone2" name="phone2" maxlength="4" type="text" class="v"/>
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
                <div class="input-wrap">
                  <input id="phone3" name="phone3" maxlength="4" type="text" class="v" />
                  <div class="v-feed"></div>
                  <div class="iv-feed"></div>
                </div>
            
                <label for="">생년월일</label>
                <div class="input-wrap-4">
                  <input type="date" id="birthdate" name="birthdate" />
                </div>
            
                <label for="">성별</label>
                <div class="radio-wrap">
                    <input id="mail" type="radio" value="0" name="gender" checked="true">
                    <label for="mail" class="clicked">남</label>
                    <input id="femail" type="radio" value="1" name="gender">
                    <label for="femail">여</label>
                </div>
                
                <div class="check-wrap">
                  <div class="check-item">
                    <input type="checkbox" name="" id="check-all">
                    <label for="check-all">회원약관 전체동의</label>
                  </div>
                  <div class="check-item">
                    <input type="checkbox" name="" id="check-service" class="checkbox">
                    <label for="check-service">서비스 이용동의</label>
                  </div>
                  <div class="check-item">
                    <input type="checkbox" name="" id="check-private" class="checkbox">
                    <label for="check-private">개인정보 이용동의</label>
                  </div>
                  <button id="btn-user-register" class="btn-travel">회원가입</button>
                </div>
              </div>
              
            </form>
            `;
        };

        Template.prototype.request = function () {
            return `
            <form class="form-request">
            <div class="input-box">
              <label for="req-start-date">동행 시작일</label>
              <div class="input-wrap">
                <input type="date" id="req-start-date" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            
            <div class="input-box">
              <label for="req-end-date">동행 종료일</label>
              <div class="input-wrap">
                <input type="date" id="req-end-date" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            
            <div class="input-box">
              <label for="req-content">신청 내용</label>
              <div class="input-wrap textarea">
                <textarea id="req-content" class="v"
                  placeholder="신청 내용을 구체적으로 적어주세요."
                ></textarea>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            <button type="button" id="req-btn-try" class="btn-travel">신청하기</button>
            </form>
            `;
        };

        return Template;
    })(_w);

    const Editor = (function (w) {
        const Editor = function () {
            this.summernote = {
                placeholder: '내용',
                airMode: true,
                lang: 'ko-KR',
                popover: {
                    image: [
                        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
                        ['float', ['floatLeft', 'floatRight', 'floatNone']],
                        ['remove', ['removeMedia']]
                    ],
                    link: [['link', ['linkDialogShow', 'unlink']]],
                    table: [
                        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
                    ],
                    air: [
                        ['color', ['color']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['para', ['ul', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'map']]
                    ]
                }
            };
        };
        return Editor;
    })(_w);

    const Ajax = (function (w) {
        const Ajax = function () {
            this.getEssay = getEssay;
            this.getEssayTempList = getEssayTempList;
            this.createEssay = createEssay;
            this.essayImageUpload = essayImageUpload;
            this.essayUpdate = essayUpdate;
            this.essayDelete = essayDelete;
            this.getCommentList = getCommentList;
            this.createComment = createComment;
            this.createReComment = createReComment;
            this.updateComment = updateComment;
            this.deleteComment = deleteComment;
            this.checkId = checkId;
        };

        const utils = new Utils();
        const {setRequestHeader} = utils;

>>>>>>> Stashed changes
        function getCommentList(bno) {
            return $.ajax({
                type: 'GET',
                url: `${url}/api/board/${bno}/comment`,
                dataType: 'json'
            });
        }

        function createComment(bno, data) {
            return $.ajax({
                type: 'POST',
                url: `${url}/api/board/${bno}/comment`,
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({data}),
                beforeSend: setRequestHeader
            });
        }

        function checkId(data) {
            return $.ajax({
                type: 'POST',
                url: `http://${location.host}/user/checkId`,
                data: data,
                dataType: 'text',
                beforeSend: setRequestHeader
            });
        }

        function createReComment(bno, cno, data) {
            return $.ajax({
                type: 'POST',
                url: `${url}/api/board/${bno}/comment/${cno}`,
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({data}),
                beforeSend: setRequestHeader
            });
        }

        function updateComment(bno, data) {
            return $.ajax({
                type: 'PUT',
<<<<<<< Updated upstream
                url: `${url}/api/board/${bno}/comment`,
=======
                url: `${url}/api/board/${bno}/comment/`,
>>>>>>> Stashed changes
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({data}),
                beforeSend: setRequestHeader
            });
        }

        function deleteComment(bno, cno) {
            return $.ajax({
                type: 'DELETE',
                url: `${url}/api/board/${bno}/comment/${cno}`,
                dataType: 'text',
                beforeSend: setRequestHeader
            });
        }

        function getEssay(rno) {
            return $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: url + '/api/essay/' + rno
            });
        }

        function getEssayTempList(seq, fixed, order) {
            return $.ajax({
                type: 'GET',
                contentType: 'application/json',
                data: {seq, fixed, order},
                url: url + '/api/essay'
            });
        }

<<<<<<< Updated upstream
        function createEssay2(data) {
=======
        function createEssay(data) {
>>>>>>> Stashed changes
            return $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                dataType: 'json',
<<<<<<< Updated upstream
                data: data,
                url: url + '/api/essay',
                beforeSend: setRequestHeader
            })
        }

        function updateEssay(rno, data) {
            return $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                data: data,
                dataType: 'json',
                url: url + '/api/essay/' + rno,
                beforeSend: setRequestHeader
=======
                url: url + '/api/essay',
                beforeSend: setRequestHeader
>>>>>>> Stashed changes
            });
        }

        function essayImageUpload(rno, formData) {
            return $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                dataType: 'text',
                data: formData,
                url: url + '/api/essay/' + rno + '/image',
                beforeSend: setRequestHeader
            });
        }

<<<<<<< Updated upstream

        function essayDelete(rno) {
=======
        function essayUpdate(data) {
>>>>>>> Stashed changes
            return $.ajax({
                type: 'DELETE',
                contentType: 'application/json',
                dataType: 'json',
<<<<<<< Updated upstream
                url: url + '/api/essay/' + rno,
=======
                url: url + '/api/essay',
>>>>>>> Stashed changes
                beforeSend: setRequestHeader
            });
        }

<<<<<<< Updated upstream

        return Ajax;
    })(_w);

    const KakaoMap = (function (w) {
        const KakaoMap = function (kmap) {
            this.kmap = kmap;
            this.mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
        };

        const {getEl, addEvent, useState, getEls} = new Utils();
        const t = new Template();

        let markers = [];
        let map, ps, infoWindow;
        let setMapData;
        let _modal, _resultGroup, _pageGroup, _mapEventFunc;

        KakaoMap.prototype.create = function (modal, mapEventFunc) {
            const [btnSearch, inputSearch, resultGroup, pageGroup] = getEls(modal.m, '#btn-search-location', '.search-location', '.result-group', '.page-group');
            map = new kakao.maps.Map(this.kmap, this.mapOption);
            ps = new kakao.maps.services.Places(); //장소검색
            infoWindow = new kakao.maps.InfoWindow({zIndex: 1}); //인포윈도우

            addEvent(btnSearch, 'click', searchPlaces.bind(null, inputSearch));
            addEvent(inputSearch, 'keyup', (e) => {
                if (e.keyCode === 13) btnSearch.click();
=======
        function essayDelete(rno) {
            return $.ajax({
                type: 'DELETE',
                contentType: 'application/json',
                dataType: 'json',
                url: url + '/api/essay/' + rno,
                beforeSend: setRequestHeader
>>>>>>> Stashed changes
            });

            let [setState, getState] = useState({lat: null, lng: null, address: null, placeName: null});
            setMapData = setState;
            _modal = modal;
            _mapEventFunc = mapEventFunc;
            _resultGroup = resultGroup;
            _pageGroup = pageGroup;

            return getState;
        };

        KakaoMap.prototype.getStaticMap = function (container, {lat, lng, address, placeName}) {
            let markerPosition = new kakao.maps.LatLng(lat, lng);
            let staticMarker = {position: markerPosition, text: placeName};
            let staticMapOption = {
                center: new kakao.maps.LatLng(lat, lng),
                level: 3,
                marker: staticMarker
            };

            new kakao.maps.StaticMap(container, staticMapOption);
            let link = container.querySelector('a').href;
            let image = container.querySelector('img').src;
            let $frag = $(document.createDocumentFragment());
            $frag.append(t.staticMap(link, image, address + placeName));

            return $frag[0];
        };

        function searchPlaces(inputSearch) {
            if (!inputSearch.value.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return false;
            }
            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(inputSearch.value, placesSearchCB);
        }

<<<<<<< Updated upstream
        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);
                // 페이지 번호를 표출합니다
                displayPagination(pagination);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                return alert('검색 결과가 존재하지 않습니다.');
            } else if (status === kakao.maps.services.Status.ERROR) {
                return alert('검색 결과 중 오류가 발생했습니다.');
            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {
            let fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds();

            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(_resultGroup);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for (let i = 0; i < places.length; i++) {
                // 마커를 생성하고 지도에 표시합니다
                let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
                let marker = addMarker(
                    placePosition,
                    i,
                    places[i].road_address_name
                        ? places[i].road_address_name
                        : places[i].address_name
                );
                let itemEl = t.kmapResult(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                (function (marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function () {
                        displayinfoWindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function () {
                        infoWindow.close();
                    });

                    kakao.maps.event.addListener(marker, 'click', function () {
                        setAndCloseModal(marker, title);
                    });

                    itemEl.onmouseover = function () {
                        displayinfoWindow(marker, title);
                    };

                    itemEl.onmouseout = function () {
                        infoWindow.close();
                    };

                    itemEl.onclick = function () {
                        setAndCloseModal(marker, title);
                    }
                })(marker, places[i].place_name);
                fragment.appendChild(itemEl);
            }
            // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
            _resultGroup.appendChild(fragment);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }

        function setAndCloseModal(marker, title) {
            setMapData({
                lat: marker.getPosition().getLat(),
                lng: marker.getPosition().getLng(),
                placeName: title,
                address: marker.getTitle()
            });
            if (_mapEventFunc) _mapEventFunc();
            _modal.clear();
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            let marker = new kakao.maps.Marker({
                position: position // 마커의 위치
            });
            marker.setTitle(title);
            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker); // 배열에 생성된 마커를 추가합니다
            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            let fragment = document.createDocumentFragment(), i;
            // 기존에 추가된 페이지번호를 삭제합니다
            while (_pageGroup.hasChildNodes()) {
                _pageGroup.removeChild(_pageGroup.lastChild);
            }
            for (i = 1; i <= pagination.last; i++) {
                fragment.appendChild(t.pageItem(i, pagination));
            }
            _pageGroup.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayinfoWindow(marker, title) {
            let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }

        return KakaoMap;
    })(_w);

    const GoogleMap = (function (w) {
        const GoogleMap = function (gmap) {
            this.gmap = gmap;
            this.mapOption = {
                center: {lat: -33.8688, lng: 151.2195},
                zoom: 13,
                mapTypeId: 'roadmap',
                fullscreenControl: false,
                mapTypeControl: false
            };
        };

        const t = new Template();
        const {getEl, useState} = new Utils();

        let markers = []; //마커 보관
        let infoWindows = [];
        let infoWindow;
        let G_KEY = 'AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY';

        let _modal, _map, _searchBox, _mapEventFunc, _setMapData;

        GoogleMap.prototype.create = function (modal, mapEventFunc) {
            const inputSearch = getEl('.search-location');
            const [setMapData, getMapData] = useState({});

            _modal = modal;
            _map = new google.maps.Map(this.gmap, this.mapOption);
            _searchBox = new google.maps.places.SearchBox(inputSearch);
            _setMapData = setMapData;
            _mapEventFunc = mapEventFunc;

            setEventToMap();
            setEventToSearchBox();
            return getMapData;
        };

        GoogleMap.prototype.getStaticMap = function (container, {lat, lng, address, placeName}) {
            let width = 750, height = 350;
            let link = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            let image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=${width}x${height}&markers=color:red%7C${lat},${lng}&key=${G_KEY}`;
            let $frag = $(document.createDocumentFragment());
            $frag.append(t.staticMap(link, image, placeName + address));

            return $frag[0];
        };

        function setEventToMap() {
            //searchBox의 위치를 지도의 내부로 고정.
            _map.addListener('bounds_changed', function () {
                _searchBox.setBounds(_map.getBounds());
            });
        }

        function setEventToSearchBox() {
            _searchBox.addListener('places_changed', function () {
                let places = _searchBox.getPlaces();
                if (places.length === 0) {
                    return;
                }
                //기존 마커를 모두 날림.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                let bounds = new google.maps.LatLngBounds();

                places.forEach(function (place) {
                    if (!place.geometry) {
                        return;
                    }
                    //마커 생성
                    let marker = new google.maps.Marker({
                        map: _map,
                        title: place.name,
                        position: place.geometry.location
                    });

                    //마커 이벤트
                    marker.addListener('click', function () {
                        //기존 infowindow를 모두 닫음
                        infoWindows.forEach((info) => {
                            info.close();
                        });
                        //infowindow를 빈 배열로 초기화.
                        infoWindows = [];

                        infoWindow = new google.maps.InfoWindow({
                            content: t.infoWindow(place.name, place.formatted_address)
                        });

                        google.maps.event.addListener(infoWindow, 'domready', function () {
                            const btnAddMap = document.querySelector('#btn-add-map');
                            btnAddMap.addEventListener('click', btnAddMapHandler.bind(null, place, _modal));
                        });

                        infoWindow.open(_map, marker);
                        infoWindows.push(infoWindow);
                    });

                    markers.push(marker);

                    // Only geocodes have viewport.
                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                _map.fitBounds(bounds);
            });
        }

        function btnAddMapHandler(place, modal) {
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            let placeName = place.name;
            let address = place.formatted_address;
            let etc = place.plus_code ? place.plus_code.compound_code.split(' ') : null;
            _setMapData({lat, lng, placeName, address, etc});

            if (_mapEventFunc) _mapEventFunc();
            modal.clear();
        }

        return GoogleMap;
    })(_w);

    const Modal = (function (w) {
        const modal = function (selector, option) {
            this.m = document.querySelector(selector);
            this.option = {
                beforeClear: function () {
                    console.log('beforeClear....');
                },
                ...option
            }
        };

        const utils = new Utils();
        const t = new Template();
        let close, body;

        modal.prototype.createCustom = function (template, initFunction) {
            setDefault(this);
            this.setModal(template, initFunction);
        };

        modal.prototype.create = function (type, initFunction) {
            setDefault(this);
            initModal(type, initFunction);
        };

        modal.prototype.createMini = function (template, initFunction) {
            this.m.innerHTML = t.tmodalMini();
            const [close, body] = utils.getEls(this.m, '.close', '.tmodal-body');
            utils.addEvent(close, 'click', () => this.m.innerHTML = '');
            body.innerHTML = template;
            if (initFunction) initFunction();
        };

        modal.prototype.setModal = setModal;

        modal.prototype.clear = function () {
            this.option.beforeClear();
            utils.getElList('html, body').forEach((el) => {
                el.style.overflow = 'auto';
                el.style.height = '100%';
            });
            utils.removeSameHandlerEvent('.tmodal-back', stopEvent, 'scroll', 'touchmove', 'mousewheel');
            this.m.innerHTML = '';
        };

        function initModal(type, initFunction) {
            switch (type) {
                case 'login':
                    return setModal(t.login2(utils.getTokenCSRF()), initFunction);
                case 'register':
                    return setModal(t.register2(utils.getTokenCSRF()), initFunction);
                case 'request':
                    return setModal(t.request(), initFunction);
                case 'story' :
                    return setModal(t.story(), initFunction);
                case 'domestic' :
                    return setModal(t.domestic(), initFunction);
                default:
                    throw new Error('정의되지 않은 모달 형식입니다.');
            }
        }

        function setDefault(modal) {
            modal.clear();
            modal.m.innerHTML = t.tmodal();
            utils.getElList('html, body').forEach((el) => {
                el.style.overflow = 'hidden';
                el.style.height = '100%';
            });
            utils.addSameHandlerEvent('.tmodal-back', stopEvent, 'scroll', 'touchmove', 'mousewheel');

            close = utils.getEl('.tmodal-bar .close');
            body = utils.getEl('.tmodal-body');
            close.addEventListener('click', (e) => modal.clear());
        }

        function setModal(template, initFunction) {
            body.innerHTML = template;
            if (initFunction) initFunction();
        }

        function stopEvent(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        return modal;
    })(_w);

=======

        return Ajax;
    })(_w);

    const KakaoMap = (function (w) {
        const KakaoMap = function (kmap) {
            this.kmap = kmap;
            this.mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
        };

        const {getEl, addEvent, useState, getEls} = new Utils();
        const template = new Template();
        const $editor = $('#editor');

        let markers = [];
        let map, ps, infoWindow;
        let setMapData;
        let _modal, _resultGroup, _pageGroup;

        KakaoMap.prototype.create = function (modal) {
            const [btnSearch, inputSearch, resultGroup, pageGroup] = getEls(modal.m, '#btn-search-location', '.search-location', '.result-group', '.page-group');
            map = new kakao.maps.Map(this.kmap, this.mapOption);
            ps = new kakao.maps.services.Places(); //장소검색
            infoWindow = new kakao.maps.InfoWindow({zIndex: 1}); //인포윈도우
            
            addEvent(btnSearch, 'click', searchPlaces.bind(null, inputSearch));
            addEvent(inputSearch, 'keyup', (e) => {
                if (e.keyCode === 13) btnSearch.click();
            });

            let [setState, getState] = useState({lat: null, lng: null, address: null, placeName: null});
            setMapData = setState;
            _modal = modal;
            _resultGroup = resultGroup;
            _pageGroup = pageGroup;

            return getState;
        };

        function searchPlaces(inputSearch) {
            if (!inputSearch.value.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return false;
            }
            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(inputSearch.value, placesSearchCB);
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);
                // 페이지 번호를 표출합니다
                displayPagination(pagination);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                return alert('검색 결과가 존재하지 않습니다.');
            } else if (status === kakao.maps.services.Status.ERROR) {
                return alert('검색 결과 중 오류가 발생했습니다.');
            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {
            let fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds();

            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(_resultGroup);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for (let i = 0; i < places.length; i++) {
                // 마커를 생성하고 지도에 표시합니다
                let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
                let marker = addMarker(
                    placePosition,
                    i,
                    places[i].road_address_name
                        ? places[i].road_address_name
                        : places[i].address_name
                );
                let itemEl = template.kmapResult(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                (function (marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function () {
                        displayinfoWindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function () {
                        infoWindow.close();
                    });

                    kakao.maps.event.addListener(marker, 'click', function () {
                        setAndCloseModal(marker, title);
                    });

                    itemEl.onmouseover = function () {
                        displayinfoWindow(marker, title);
                    };

                    itemEl.onmouseout = function () {
                        infoWindow.close();
                    };

                    itemEl.onclick = function () {
                        setAndCloseModal(marker, title);
                    }
                })(marker, places[i].place_name);
                fragment.appendChild(itemEl);
            }
            // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
            _resultGroup.appendChild(fragment);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }

        function setAndCloseModal(marker, title) {
            setMapData({
                lat: marker.getPosition().getLat(),
                lng: marker.getPosition().getLng(),
                placeName: title,
                address: marker.getTitle()
            });
            _modal.clear();
        }

        function btnAddMapHandler(marker, title) {
            let lat = marker.getPosition().getLat();
            let lng = marker.getPosition().getLng();
            let description = marker.getTitle() + title;

            let staticMapContainer = document.querySelector('#map-container');

            //정적마커의 옵션
            let markerPosition = new kakao.maps.LatLng(lat, lng);
            let staticMarker = {position: markerPosition, text: title};
            let staticMapOption = {
                center: new kakao.maps.LatLng(lat, lng),
                level: 3,
                marker: staticMarker
            };
            new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

            let link = staticMapContainer.querySelector('a').href;
            let imgUrl = staticMapContainer.querySelector('img').src;
            let $sMap = $(document.createDocumentFragment());
            $sMap.append(template.staticMap(link, imgUrl, description));

            $modal.modal('hide');
            $editor.summernote('restoreRange');
            $editor.summernote('insertNode', $sMap[0]);
            staticMapContainer.innerHTML = '';
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            let marker = new kakao.maps.Marker({
                position: position // 마커의 위치
            });
            marker.setTitle(title);
            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker); // 배열에 생성된 마커를 추가합니다
            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            let fragment = document.createDocumentFragment(), i;
            // 기존에 추가된 페이지번호를 삭제합니다
            while (_pageGroup.hasChildNodes()) {
                _pageGroup.removeChild(_pageGroup.lastChild);
            }
            for (i = 1; i <= pagination.last; i++) {
                fragment.appendChild(template.pageItem(i, pagination));
            }
            _pageGroup.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayinfoWindow(marker, title) {
            let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }

        return KakaoMap;
    })(_w);

    const GoogleMap = (function (w) {
        const GoogleMap = function (modal, $editor) {
            this.G_MAP = {
                center: {lat: -33.8688, lng: 151.2195},
                zoom: 13,
                mapTypeId: 'roadmap',
                fullscreenControl: false,
                mapTypeControl: false
            };
            this.modal = modal;
            this.$editor = $editor;
        };

        const template = new Template();

        GoogleMap.prototype.init = function () {
            //마커를 보관하는 변수
            let markers = [];
            let infowindows = [];
            let infowindow, searchBox;

            let map = new google.maps.Map(
                document.getElementById('map'),
                this.G_MAP
            );

            let modal = modal;
            let $editor = this.$editor;
            let G_KEY = 'AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY';

            // input태그를 잡아와서 search box로 만드는 부분.
            let input = document.getElementById('keyword');
            searchBox = new google.maps.places.SearchBox(input);

            // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });

            //검색결과 중 하나 또는 그 이상을 선택 할 경우 아래의 이벤트를 실행.
            searchBox.addListener('places_changed', function () {
                let places = searchBox.getPlaces();
                if (places.length === 0) {
                    return;
                }

                //기존 마커를 모두 날림.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                var bounds = new google.maps.LatLngBounds();

                places.forEach(function (place) {
                    if (!place.geometry) {
                        return;
                    }

                    //마커 생성
                    let marker = new google.maps.Marker({
                        map: map,
                        title: place.name,
                        position: place.geometry.location
                    });

                    //마커 이벤트
                    marker.addListener('click', function () {
                        //기존 infowindow를 모두 닫음
                        infowindows.forEach((info) => {
                            info.close();
                        });
                        //infowindow를 빈 배열로 초기화.
                        infowindows = [];

                        infowindow = new google.maps.InfoWindow({
                            content: template.infoWindow(place.name, place.formatted_address)
                        });

                        google.maps.event.addListener(infowindow, 'domready', function () {
                            const btnAddMap = document.querySelector('#btn-add-map');
                            btnAddMap.addEventListener('click', btnAddMapHandler.bind(null, place, modal, $editor, G_KEY));
                        });
                        infowindow.open(map, marker);
                        infowindows.push(infowindow);
                    });

                    markers.push(marker);

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        };


        function btnAddMapHandler(place, modal, $editor, G_KEY) {
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            let width = 750;
            let height = 350;
            let link = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            let imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=${width}x${height}&markers=color:red%7C${lat},${lng}&key=${G_KEY}`;
            let $map = $(document.createDocumentFragment());
            $map.append(template.staticMap(link, imgUrl, place.formatted_address));

            modal.clear();
            $editor.summernote('restoreRange');
            $editor.summernote('insertNode', $map[0]);
        }

        return GoogleMap;
    })(_w);

    const Modal = (function (w) {
        const modal = function (selector, option) {
            this.m = document.querySelector(selector);
            this.option = {
                beforeClear: function () {
                    console.log('beforeClear....');
                },
                ...option
            }
        };

        const utils = new Utils();
        const t = new Template();
        let close, body;

        modal.prototype.createCustom = function (template, initFunction) {
            setDefault(this);
            this.setModal(template, initFunction);
        };

        modal.prototype.create = function (type, initFunction) {
            setDefault(this);
            initModal(type, initFunction);
        };

        modal.prototype.createMini = function (template, initFunction) {
            this.m.innerHTML = t.tmodalMini();
            const [close, body] = utils.getEls(this.m, '.close', '.tmodal-body');
            utils.addEvent(close, 'click', () => this.m.innerHTML = '');
            body.innerHTML = template;
            if (initFunction) initFunction();
        };

        modal.prototype.setModal = setModal;

        modal.prototype.clear = function () {
            this.option.beforeClear();
            utils.getElList('html, body').forEach((el) => {
                el.style.overflow = 'auto';
                el.style.height = '100%';
            });
            utils.removeSameHandlerEvent('.tmodal-back', stopEvent, 'scroll', 'touchmove', 'mousewheel');
            this.m.innerHTML = '';
        };

        function initModal(type, initFunction) {
            switch (type) {
                case 'login':
                    return setModal(t.login2(utils.getTokenCSRF()), initFunction);
                case 'register':
                    return setModal(t.register2(utils.getTokenCSRF()), initFunction);
                case 'request':
                    return setModal(t.request(), initFunction);
                case 'story' :
                    return setModal(t.story(), initFunction);
                case 'domestic' :
                    return setModal(t.domestic(), initFunction);
                case 'purchase':
                	return setModal(t.purchase(),initFunction );
                default:
                    throw new Error('정의되지 않은 모달 형식입니다.');
            }
        }

        function setDefault(modal) {
            modal.clear();
            modal.m.innerHTML = t.tmodal();
            utils.getElList('html, body').forEach((el) => {
                el.style.overflow = 'hidden';
                el.style.height = '100%';
            });
            utils.addSameHandlerEvent('.tmodal-back', stopEvent, 'scroll', 'touchmove', 'mousewheel');

            close = utils.getEl('.tmodal-bar .close');
            body = utils.getEl('.tmodal-body');
            close.addEventListener('click', (e) => modal.clear());
        }

        function setModal(template, initFunction) {
            body.innerHTML = template;
            if (initFunction) initFunction();
        }

        function stopEvent(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        return modal;
    })(_w);

>>>>>>> Stashed changes
    const Validation = (function (w) {
        const validation = function () {

        };
        const {getEl} = new Utils();
        validation.prototype.setInvalid = function (el, feedBox, message) {
            feedBox.innerText = message;
            el.classList.add('v-fail');
            el.classList.remove('v-pass');
        };

        validation.prototype.setValid = function (el, feedBox, message) {
            feedBox.innerText = message;
            el.classList.add('v-pass');
            el.classList.remove('v-fail');
        };
<<<<<<< Updated upstream

        validation.prototype.getFeedBox = function (el) {
            return [el.parentElement.querySelector('.v-feed'),
                el.parentElement.querySelector('.iv-feed')];
        };

        validation.prototype.isValid = function (el) {
            return el.classList.contains('v-pass');
        };

        validation.prototype.changeValid = function (el) {
            el.classList.add('v-pass');
            el.classList.remove('v-fail');
        };

        validation.prototype.changeInvalid = function (el) {
            el.classList.add('v-fail');
            el.classList.remove('v-pass');
        };

        validation.prototype.resetValidClass = function (e) {
            e.target.classList.remove('v-fail');
            e.target.classList.remove('v-pass');
        };

        return validation;
    })(_w);

    const Comment = (function () {
        const Comment = function () {
        };

        const {getEl, getEls, getElList, addAllSameEvent, addEvent, useState} = new Utils();
        const ajax = new Ajax();
        const t = new Template();

        // let commentWrap;
        let _bno, _seq;
        let _setCmt, _getCmt;
        let _commentGroup, _btnAddComment;

        Comment.prototype.init = function (commentWrap, bno, seq) {
            const [setCmt, getCmt] = useState({seq: 0, content: null});
            const [commentGroup, commentContent, btnAddComment]
                = getEls(commentWrap, '.comment-group', '#comment-content', '#btn-add-comment');
            console.log(commentWrap);
            console.log('bno', bno);
            console.log('seq', seq);
            _bno = bno;
            _seq = seq;
            _setCmt = setCmt;
            _getCmt = getCmt;
            _commentGroup = commentGroup;
            _btnAddComment = btnAddComment;

            if (commentContent && btnAddComment) {
                addEvent(commentContent, 'change', (e) => setCmt({content: e.target.value, seq: seq}));
                addEvent(commentContent, 'keyup', countContentLengthHandler);
                addEvent(btnAddComment, 'click', (e) => {
                    if (!commentContent.value) return;
                    ajax.createComment(bno, getCmt())
                        .then((ret) => {
                            commentContent.value = '';
                            printCommentList();
                        })
                        .catch(console.error);
                });
            }

            initOnLoad();
        };

        function initOnLoad() {
            printCommentList();
        }

        function printCommentList() {
            _commentGroup.innerHTML = '';
            ajax.getCommentList(_bno)
                .then((ret) => {
                    _commentGroup.appendChild(getCommentList(ret));
                    initCommentGroup();
                })
                .catch(console.error);
        }

        function initCommentGroup() {
            const commentLikeList = getElList('.comment-group .likes');
            const commentUnlikeList = getElList('.comment-group .unlikes');
            const commentUpdateList = getElList('.comment-group .update');
            const commentDeleteList = getElList('.comment-group .delete');
            const commentReList = getElList('.comment-group .recomment');

            const [setCmtInner, getCmtInner] = useState();
            addAllSameEvent(commentUpdateList, 'click', (e) => {
                let btnUpdate = e.target;
                let commentContent = e.target.parentElement.previousElementSibling;
                let innerCno = +e.target.parentElement.dataset.cno;
                setCmtInner({content: commentContent.value, seq: _seq, cno: innerCno});
                commentContent.disabled = false;
                commentContent.focus();

                addEvent(commentContent, 'change', (e) => setCmtInner({
                    content: e.target.value,
                    seq: _seq,
                    cno: innerCno
                }));
                addEvent(btnUpdate, 'click', (e) => {
                    if (!commentContent.value) return;
                    ajax.updateComment(_bno, getCmtInner())
                        .then((ret) => printCommentList())
                        .catch(console.error);
                });
            });

            addAllSameEvent(commentDeleteList, 'click', (e) => {
                if (!confirm('해당 댓글을 삭제하시겠습니까?')) return;
                const innerCno = +e.target.parentElement.dataset.cno;
                ajax.deleteComment(_bno, innerCno)
                    .then((ret) => printCommentList())
                    .catch(console.error);
            });

            addAllSameEvent(commentLikeList, 'click', (e) => {
                const data = parseDatasetToNumber(e.target.parentElement.dataset);
                const commentContent = e.target.parentElement.previousElementSibling;
                setCmtInner({...data, likes: data.likes + 1, content: commentContent.value});
                ajax.updateComment(_bno, getCmtInner())
                    .then((ret) => printCommentList())
                    .catch(console.error);
            });

            addAllSameEvent(commentUnlikeList, 'click', (e) => {
                const data = parseDatasetToNumber(e.target.parentElement.dataset);
                const commentContent = e.target.parentElement.previousElementSibling;
                setCmtInner({...data, unlikes: data.unlikes + 1, content: commentContent.value});
                ajax.updateComment(_bno, getCmtInner())
                    .then((ret) => printCommentList())
                    .catch(console.error);
            });

            addAllSameEvent(commentReList, 'click', (e) => {
                const btnRe = e.target;
                const pcno = +e.target.dataset.pcno;
                const $parentLi = $(e.target).closest('li');
                $parentLi.after(t.reComment(pcno));
                const reCommentBox = $parentLi.next()[0];

                const [btnAddComment, btnCancelComment, commentContent]
                    = getEls(reCommentBox, '.btn-add-comment', '.btn-cancel-comment', '.comment-content');

                addEvent(btnCancelComment, 'click', () => reCommentBox.remove());
                addEvent(btnRe, 'click', () => reCommentBox.remove());
                addEvent(commentContent, 'keyup', countContentLengthHandler);
                addEvent(commentContent, 'change', (e) => setCmtInner({seq: _seq, content: e.target.value}));
                addEvent(btnAddComment, 'click', (e) => {
                    const cno = +e.target.dataset.cno;
                    ajax.createReComment(_bno, cno, getCmtInner())
                        .then(ret => {
                            printCommentList()
                        })
                        .catch(console.error);

                });


            });
        }

        function countContentLengthHandler(e) {
            const text = e.target.value;
            const [contentLengthBox] = getEls(e.target.parentElement, '.content-length>span');
            if (text.length > 500) e.target.value = text.substr(0, 500);
            contentLengthBox.innerText = `${text.length < 10 ? '00' + text.length : text.length < 100 ? '0' + text.length : text.length}`;
        }

        function parseDatasetToNumber(dataset) {
            let obj = {};
            let keys = Object.keys(dataset);
            let values = Object.values(dataset);
            for (let i = 0; i < keys.length; i++) {
                obj[keys[i]] = isNaN(+values[i]) ? values[i] : +values[i];
            }
            return obj;
        }

        function getCommentList(ret) { //가져온 데이터로 모든 댓글을 다시 그려준 후 반환
            const commentList = ret.data;
            const $frag = $(document.createDocumentFragment());
            commentList.forEach(cmt => $frag.append($(t.comment(_seq, cmt))));
            return $frag[0];
        }


        return Comment;
    })(_w);

=======

        validation.prototype.getFeedBox = function (el) {
            return [el.parentElement.querySelector('.v-feed'),
                el.parentElement.querySelector('.iv-feed')];
        };

        validation.prototype.isValid = function (el) {
            return el.classList.contains('v-pass');
        };

        validation.prototype.changeValid = function (el) {
            el.classList.add('v-pass');
            el.classList.remove('v-fail');
        };

        validation.prototype.changeInvalid = function (el) {
            el.classList.add('v-fail');
            el.classList.remove('v-pass');
        };

        validation.prototype.resetValidClass = function (e) {
            e.target.classList.remove('v-fail');
            e.target.classList.remove('v-pass');
        };

        return validation;
    })(_w);

>>>>>>> Stashed changes
    travelmaker.googleMap = GoogleMap;
    travelmaker.kakaoMap = KakaoMap;
    travelmaker.url = url;
    travelmaker.utils = Utils;
    travelmaker.template = Template;
    travelmaker.regex = Regex;
    travelmaker.editor = Editor;
    travelmaker.ajax = Ajax;
    travelmaker.modal = Modal;
    travelmaker.validation = Validation;
<<<<<<< Updated upstream
    travelmaker.comment = Comment;
=======
>>>>>>> Stashed changes

    _w.travelmaker = travelmaker;
    return travelmaker;
})(window);