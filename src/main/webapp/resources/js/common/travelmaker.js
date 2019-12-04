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

        Utils.prototype.showLoading = function () {
            const ldsBack = getEl('.lds-back');
            ldsBack.classList.remove('hidden');
        };

        Utils.prototype.closeLoading = function () {
            const ldsBack = getEl('.lds-back');
            ldsBack.classList.add('hidden');
        };

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

        function getFormData(data) {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const formData = new FormData();
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
            this.password = /^.*(?=^.{7,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            this.koreaName = /^[가-힣]{2,4}$/;
            this.englishAndNumber = /^[a-zA-Z0-9]+$/;
            this.englishWithPoint = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            this.number = /^[0-9]+$/;
            this.nickname = /^[0-9a-zA-Z가-힣]{4,20}$/;
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

        Template.prototype.purReqRequest = function(bno, nickname, seq){
            return `
                <form id="requestForm" class="write-form">
                    <div class="hidden">
                        <input type="hidden" name="bno" id="bno" value="${bno}">
                        <input type="hidden" name="nickname" id="nickname" value="${nickname}">
                        <input type="hidden" name="requestUserSeq" id="requestUserSeq" value="${seq}">
                    </div>
                    
                    <div class="input-wrap textarea">
                        <label for="req-content">상세내용</label>
                        <textarea id="req-content" name="content"></textarea>
                    </div>
                    
                    <div class="button-wrap">
                        <button type="button" class="btn btn-tsave" id="btn-try-req">신청하기</button>
                    </div>
                </form>
            `
        };

        Template.prototype.purOrderRequest = function (bno, nickname, seq, id, content) {
            return `
                <form id="requestForm" class="write-form">
                    <div class="hidden">
                        <input type="hidden" name="bno" id="request-bno" value="${bno}"> 
                        <input type="hidden" name="nickname" id="nickname" value="${nickname}">
                        <input type="hidden" name="requestUserSeq" id="requestUserSeq" value="${seq}">
                        <input type="hidden" name="id" id="id" value="${id}">
                    </div>
                    
                    <div class="input-wrap">
                        <label for="productname">상품명</label>
                        <input type="text" id="productname" name="productname"/>
                    </div>
                    
                    <div class="input-wrap">
                        <label for="quantity">수량</label>
                        <input type="number" id="quantity" name="quantity" min="1" max="100" step="1" value="1"/>
                    </div>
                    
                     <div class="input-wrap">
                        <label for="price">예상가격</label>
                        <input type="text" id="price" name="price"/>
                    </div>
                    
                    <div class="input-wrap textarea">
                        <label for="req-content">상세내용</label>
                        <textarea id="req-content" name="content"></textarea>
                    </div>
                    
                    <div class="button-wrap">
                        <button type="button" class="btn btn-tsave" id="btn-try-req">신청하기</button>
                    </div>
                </form>
            `;
        };

        Template.prototype.purOrderView = function (order) {
            const {isPermit, prno, nickname, productname, price, quantity, content} = order;
            const agree = isPermit === 1 ? '수락됨[OK]' : '수락';
            const disagree = isPermit === 2 ? '거절됨[OK]' : '거절';
            return `
                <li>
                    <div class="request-item">
                        <div class="user-area">
                            <p class="author">아이디 : ${nickname}</p>
                            ${productname ? '${<p class="author">상품명 : ${productname}</p>}' : ''}
                            ${price ? '${<p class="author">가격 : ${price}</p>}' : ''}
                            ${quantity ? '${<p class="author">수량 : ${quantity}</p>}' : ''}
                        </div>
                        <div class="content-area">
                            <div class="content-detail">
                                <p>내용: ${content}</p>
                                <div class="button-wrap">
                                    <button class="btn-agree" data-seq="${prno}">${agree}</button>
                                    <button class="btn-disagree" data-seq="${prno}">${disagree}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            `
        };

        Template.prototype.message = function (alarm) {
            if (typeof alarm === 'string') {
                return `
                 <li>
                    <div class="message-item">
                        <span class="close">&times;</span>
                        <p>${alarm}</p>
                    </div>
                 </li>
                `;
            }
            const {alarmDate, ano, content, dataSeq, header, is_read, sendUserFid} = alarm;
            let time = (new Date().getTime() - new Date(alarmDate + 43200000).getTime()) / (1000 * 60 * 60);
            time = time < 1 ? Math.floor(time * 60) + '분 ' : Math.floor(time) + ' 시간 ';
            let description;
            return `
               <li>
                <div class="message-item">
                    <span class="close">&times;</span>
                    <p>${alarm.content}</p>
                    <div class="button-wrap" data-ano="${ano}" data-header="${header}">
                        <span class="time">${time}</span>
                        <a href="#" class="check">확인</a>
                        <a href="#" class="delete">삭제</a>
                    </div>
                </div>
               </li>
            `;
        };

        Template.prototype.purListItem = function (pur) {
            const {nickname, title, location, productname, con, bno} = pur;
            return `
            <li>
              <div class="pur-item ${con === 1 ? 'to-request' : 'to-buy'}">
                <span class="badge">${con === 1 ? '사 주세요!' : '사 줄게요!'}</span>
                <div class="item-top">
                  <div class="user-wrap">
                    <div class="image-wrap">
                      <img src="https://source.unsplash.com/collection/190727/200x150" alt=""/>
                    </div>
                    <p class="nickname">${nickname}</p>
                  </div>
                  <h3>${title}</h3>
                </div>
                <div class="item-bottom">
                  <p class="location">${location}</p>
                  ${con === 1 ? `<p class="product">${productname}</p>` : ''}
                  <a href="/pur/view/${con}/${bno}">보러가기</a>
                </div>
              </div>
            </li>
            `
        };


        Template.prototype.routeItem = function (city, from, to, detail) {
            return `
            <li>
                <div class="list-item">
                    <h4 class="city">${city}</h4>
                    <p class="date">
                        <span class="from">${from}</span>
                        <span class="to">${to}</span>
                    </p>
                    <p class="detail">${detail}</p>
                </div>
            </li>
            `
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

        Template.prototype.purchase = function () {
            return `
              <div class="select-wrap">
                <div class="btn-wrap">
                  <button data-purchase="0" class="to-buy">사 줄게요</button>
                  <button data-purchase="1" class="to-request">사 주세요</button>
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

        Template.prototype.passwordSearch = function () {
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
                  <button id="btn-send" type="button">전송</button>
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

        Template.prototype.newPassword = function () {
            return `
                  <div class="input-box">
                      <label for="npwd">새 비밀번호</label>
                      <div class="input-wrap">
                        <input type="password" class="v" id="npwd"/>
                        <div class="v-feed"></div>
                        <div class="iv-feed"></div>
                      </div>
                  </div>
                  
                  <div class="input-box">
                      <label for="renpwd">새 비밀번호 확인</label>
                      <div class="input-wrap">
                        <input type="password" class="v" id="renpwd"/>
                        <div class="v-feed"></div>
                        <div class="iv-feed"></div>
                      </div>
                  </div>
                  
                  <div class="button-wrap">
                    <button id="btn-change-npwd" type="button">변경하기</button>
                  </div>
           `
        };

        Template.prototype.register1 = function () {
            return `
              <div id="mini-modal"></div>
              <form action="" class="form-register">
              <div><input type="hidden" id="registerMethod"></div>
              <label for="realname">이름</label>
              <div class="input-wrap-4">
                <input type="text" id="realname" class="v" disabled/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>

              <label for="nickname">닉네임</label>
              <div class="input-wrap-4">
                <input type="text" id="nickname" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
              
              <label for="id">아이디</label>
              <div class="input-wrap-4">
                <input type="text" class="v" id="id" disabled/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
          
              <label for="cpwd">현재 비밀번호</label>
              <div class="input-wrap-4">
                <input type="password" class="v" id="cpwd" />
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
              <button id="btn-change-pwd" class="btn-travel-min" type="button">변경</button>
                
              <label for="email1">이메일</label>
              <div class="input-wrap">
                <input type="text" class="v" id="email1" name="email1" disabled/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
              <div class="input-wrap-3 input-email2-wrap">
                <input type="text" id="email2" name="email2" list="email" placeholder="직접입력...." class="v" disabled/>
                <datalist id="email">
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="nate.com">nate.com</option>
                </datalist>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
              <button id="btn-email-change" class="btn-travel-min off" type="button">변경</button>
          
              <label for="phone1">휴대폰</label>
              <div class="input-wrap">
                <select id="phone1" >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
              </div>
              <div class="input-wrap">
                <input type="text" class="v" id="phone2"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
              <div class="input-wrap">
                <input type="text" class="v" id="phone3"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
          
              <label for="birthdate">생년월일</label>
              <div class="input-wrap-4">
                <input type="date"  id="birthdate"/>
              </div>

              <label for="postcode">주소</label>
              <div class="input-wrap">
                <input type="text" id="postcode">
              </div>
              <div class="input-wrap-3">
                <input type="text" id="addr1">
              </div>

              <label for="addr2">상세주소</label>
              <div class="input-wrap-4">
                <input type="text" id="addr2">
              </div>
              
              <label for="gender">성별</label>
              <div class="radio-wrap">
                  <input id="mail" type="radio" value="0" name="gender" checked="true">
                  <label for="mail" class="clicked">남</label>
                  <input id="femail" type="radio" value="1" name="gender">
                  <label for="femail">여</label>
              </div>
              
              <label for="img-profile">프로필</label>
              <div class="img-wrap">
                <div class="img-area"></div>
                <input type="file" id="img-profile" style="display:none;">
              </div>
              <div class="input-textarea">
                <textarea id="content-profile"></textarea>
              </div>
              
              <div class="button-wrap">
                  <button class="btn-update" type="button">수정</button>
                  <button class="btn-withdraw" type="button">탈퇴</button>
              </div>
            </div>
          </form>  
            `;
        }

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
                
                <label for="nickname" class="label-need">닉네임</label>
                <div class="input-wrap-4">
                  <input type="text" id="nickname" name="nickname" class="v"/>
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
                <input type="date" id="req-start-date" name="dateStart" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            
            <div class="input-box">
              <label for="req-end-date">동행 종료일</label>
              <div class="input-wrap">
                <input type="date" id="req-end-date" name="dateEnd" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            
            <div class="input-box">
              <label for="req-content">신청 내용</label>
              <div class="input-wrap textarea">
                <textarea id="req-content" class="v" name="content" placeholder="신청 내용을 구체적으로 적어주세요."></textarea>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
              </div>
            </div>
            <button type="button" id="req-btn-try" class="btn-travel">신청하기</button>
            </form>
            `;
        };

        Template.prototype.friendRequest = function (request) {
            let result = `
                <li>
                    <div class="request-item">
                        <div class="user-area">
                            <div class="image-wrap">
                                <img src="https://source.unsplash.com/collection/190727/80x80" alt=""/>
                            </div>
                            <p class="author">${request.nickname}</p>
                        </div>
                        <div class="content-area">
                            <p class="date">
                                <span class="from">${request.dateStart}</span> <span class="to">${request.dateEnd}</span>
                            </p>
                            <div class="content-detail">
                                <p>${request.content}</p>
                                <div class="button-wrap">`;
            if (!request.isPermit) {
                result += `<button class="btn btn-tsave" data-fccno="${request.fccno}">수락</button>
                           <button class="btn btn-tdanger" data-fccno="${request.fccno}">거절</button>`;
            }
            result += `</div>
                            </div>
                        </div>
                    </div>
               </li>`;
            return result;
        };


        Template.prototype.myArticle = function () {
            return `
            <nav class="lnb-my-article">
                <ul>
                    <li><a href="#" class="on" data-page="my-essay">에세이</a></li>
                    <li><a href="#" data-page="my-route">경로</a></li>
                    <li><a href="#" data-page="my-friend">동행</a></li>
                    <li><a href="#" data-page="my-purchase">대리구매</a></li>
                    <li><a href="#" data-page="my-comment">내가 쓴 댓글</a></li>
                </ul>
            </nav>
            <table class="table">
                <thead class="table-head"></thead>
                <tbody class="table-content"></tbody>
            </table>
            `
        };

        Template.prototype.storyTableHead = function () {
            return `
             <tr>
                <th class="title">제목</th>
                <th class="date">작성일</th>
                <th class="like">좋아요</th>
                <th class="view">조회수</th>
            </tr>
          `;
        };

        Template.prototype.storyTableBody = function (story) {
            const {title, dateWrite, likes, views, rno} = story;
            return `
                <tr>
                    <td data-rno="${rno}">${title}</td>
                    <td>${dateWrite}</td>
                    <td>${likes}</td>
                    <td>${views}</td>
                </tr>
            `;
        };

        Template.prototype.commentTableHead = function () {
            return `
             <tr>
                <th class="title">게시물제목</th>
                <th class="content">댓글내용</th>
                <th class="date">작성일</th>
            </tr>
          `;
        };

        Template.prototype.commentTableBody = function (comment) {
            const {essayDTO, routeDTO, content, dateWrite} = comment;
            let story = essayDTO ? essayDTO : routeDTO;
            let category = essayDTO ? '에세이' : '경로';
            return `
              <tr>
                <td data-rno="${story.rno}">[${category}]${story.title}</td>
                <td>${content}</td>
                <td>${dateWrite}</td>
              </tr>
            `
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
            this.getEssayList = getEssayList;
            this.createEssay = createEssay2;
            this.essayImageUpload = essayImageUpload;
            this.updateEssay = updateEssay;
            this.essayDelete = essayDelete;
            this.getCommentList = getCommentList;
            this.getCommentListBySearchFilter = getCommentListBySearchFilter;
            this.createComment = createComment;
            this.createReComment = createReComment;
            this.updateComment = updateComment;
            this.deleteComment = deleteComment;
            this.checkId = checkId;
            this.alarmDataLoad = alarmDataLoad;
            this.checkNickname = checkNickname;
            this.getRouteList = getRouteList;
            this.getUser = getUser;
            this.checkPassword = checkPassword;
            this.updateUser = updateUser;
            this.checkHasId = checkHasId;
            this.searchIdAndSendEmail = searchIdAndSendEmail;
            this.changePassword = changePassword;
            this.sendEmailCode = sendEmailCode;
            this.createFriendRequest = createFriendRequest;
            this.acceptFrinedRequest = acceptFriendRequest;
            this.rejectFriendRequest = rejectFriendRequest;
            this.getFriendRequestView = getFriendRequestView;
            this.checkAlarm = checkAlarm;
            this.deleteFriendRequest = deleteFriendRequest;
            this.setRouteWrite = setRouteWrite;
            this.updateDivision = updateDivision
            this.deleteRouteWrite = deleteRouteWrite;
            this.getPurchaseList = getPurchaseList;
            this.getOrderView = getOrderView;
            this.deletePur0 = deletePur0;
            this.deletePur1 = deletePur1;
            this.createPurOrder = createPurOrder;
            this.createPurRequest = createPurRequest;
            this.updatePermitStatusOrder = updatePermitStatusOrder;
            this.updatePermitStatusReq = updatePermitStatusReq;
            this.getRequestView = getRequestView;
        };

        const {setRequestHeader} = new Utils();

        function deletePur0(bno) {
            return $.ajax({
                type: 'delete',
                url: '/pur/deletePurchaseO/' + bno,
                beforeSend: setRequestHeader
            });
        }

        function deletePur1(bno) {
            return $.ajax({
                type: 'delete',
                url: '/pur/deletePurchaseR/' + bno,
                beforeSend: setRequestHeader
            });
        }

        function updatePermitStatusReq(data) {
            return $.ajax({
                type: 'put',
                url: '/pur/setRequestPermit',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: setRequestHeader
            });
        }

        function updatePermitStatusOrder(data) {
            return $.ajax({
                type: 'put',
                url: '/pur/setOrderPermit',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: setRequestHeader
            });
        }

        function createPurOrder(data) {
            return $.ajax({
                type: 'post',
                url: '/pur/setOrderWrite',
                data: data,
                beforeSend: setRequestHeader
            });
        }

        function createPurRequest(data) {
            return $.ajax({
                type: 'post',
                url: '/pur/setRequestWrite',
                data: data,
                beforeSend: setRequestHeader
            });
        }

        function getRequestView(bno) {
            return $.ajax({
                type: 'get',
                url: '/pur/getRequestView',
                data: {bno: bno},
                dataType: 'json',
                beforeSend: setRequestHeader
            });
        }

        function getOrderView(bno) {
            return $.ajax({
                type: 'get',
                url: '/pur/getOrderView',
                data: {bno: bno},
                dataType: 'json',
                beforeSend: setRequestHeader
            });
        }

        function getPurchaseList(pg) {
            return $.ajax({
                type: 'get',
                url: '/pur/getList',
                data: {pg: pg},
                dataType: 'json',
                beforeSend: setRequestHeader
            });
        }

        function setRouteWrite(data) {
            return $.ajax({
                type: 'post',
                url: '/friend/setRouteWrite',
                data: data,
                beforeSend: setRequestHeader
            });
        }
        
        function updateDivision(data) {
			return $.ajax({
				type: 'post',
				url: '/friend/updateDivision',
				data: data,
				beforeSend: setRequestHeader
			});
		}

        function deleteRouteWrite(fno) {
            return $.ajax({
                type: 'post',
                url: '/friend/cancelWrite',
                data: {fno: fno},
                beforeSend: setRequestHeader
            });
        }

        function checkAlarm(header, ano) {
            return $.ajax({
                type: 'get',
                url: '/alarm/' + header + '/' + ano,
                dataType: 'json'
            });
        }

        function deleteFriendRequest(fno) {
            return $.ajax({
                type: 'delete',
                url: '/friend/delete',
                data: fno,
                beforeSend: setRequestHeader
            });
        }

        function getFriendRequestView(fcno) {
            return $.ajax({
                type: 'post',
                url: '/friend/getRequestView',
                data: {'fcno': fcno},
                dataType: 'json',
                beforeSend: setRequestHeader
            });
        }

        function acceptFriendRequest(fccno) {
            return $.ajax({
                type: 'get',
                url: '/friend/requestAccept',
                data: 'fccno=' + fccno
            })
        }

        function rejectFriendRequest(fccno) {
            return $.ajax({
                type: 'get',
                url: '/friend/requestReject',
                data: 'fccno=' + fccno,
            })
        }

        function createFriendRequest(data) {
            return $.ajax({
                type: 'post',
                url: '/friend/setRequestWrite',
                data: data,
                beforeSend: setRequestHeader
            })
        }

        function sendEmailCode(email1, email2) {
            return $.ajax({
                type: 'post',
                url: '/user/emailCode',
                data: 'email1=' + email1 + '&email2=' + email2,
                dataType: 'JSON',
                beforeSend: setRequestHeader
            })
        }

        function changePassword(seq, npwd) {
            return $.ajax({
                type: 'POST',
                url: '/api/user/' + seq + '/password',
                data: {npwd: npwd},
                dataType: 'text',
                beforeSend: setRequestHeader
            })
        }

        function checkHasId(data) {
            return $.ajax({
                type: 'POST',
                url: '/user/userIdFind',
                data: data,
                beforeSend: setRequestHeader,
                dataType: 'json'
            });
        }

        function searchIdAndSendEmail(data) {
            return $.ajax({
                type: 'post',
                url: '/user/userPwFind',
                beforeSend: setRequestHeader,
                data: data,
                dataType: 'text'
            })
        }

        function updateUser(data, seq) {
            return $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                url: url + '/api/user/' + seq + '/update',
                dataType: 'text',
                data: data,
                beforeSend: setRequestHeader
            })
        }

        function checkPassword(data) {
            return $.ajax({
                type: 'POST',
                url: `/user/checkPassword`,
                data: data,
                dataType: 'text',
                beforeSend: setRequestHeader
            })
        }

        function getUser(seq) {
            return $.ajax({
                type: 'POST',
                url: '/api/user/' + seq,
                dataType: 'json',
                beforeSend: setRequestHeader
            })
        }

        function alarmDataLoad(seq) {
            return $.ajax({
                type: 'get',
                url: '/alarm/load',
                data: 'seq=' + seq,
                dataType: 'json',
                beforeSend: setRequestHeader
            });
        }

        function getCommentList(bno) {
            return $.ajax({
                type: 'GET',
                url: `${url}/api/board/${bno}/comment`,
                dataType: 'json'
            });
        }

        function getCommentListBySearchFilter(seq, order) {
            return $.ajax({
                type: 'GET',
                url: `${url}/api/comment`,
                dataType: 'json',
                data: {seq, order}
            });
        }

        function getRouteList(seq) {
            return $.ajax({
                type: 'GET',
                url: `${url}/api/route/seq/${seq}`,
                dataType: 'json'
            })
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

        function checkNickname(nickname) {
            return $.ajax({
                type: 'GET',
                url: `${url}/user/checkNickname?nickname=${nickname}`,
                dataType: 'text'
            })
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
                url: `${url}/api/board/${bno}/comment`,
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

        function getEssayList(seq, fixed, order) {
            return $.ajax({
                type: 'GET',
                contentType: 'application/json',
                data: {seq, fixed, order},
                url: url + '/api/essay'
            });
        }

        function createEssay2(data) {
            return $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                dataType: 'json',
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


        function essayDelete(rno) {
            return $.ajax({
                type: 'DELETE',
                contentType: 'application/json',
                dataType: 'json',
                url: url + '/api/essay/' + rno,
                beforeSend: setRequestHeader
            });
        }


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
                case 'purchase':
                    return setModal(t.purchase(), initFunction);
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

    const Validation = (function (w) {
        const validation = function () {

        };
        const {getEl} = new Utils();
        const myRegex = new Regex();

        validation.prototype.setInvalid = setInvalid;
        validation.prototype.setValid = setValid;
        validation.prototype.getFeedBox = getFeedBox;
        validation.prototype.isValid = isValid;
        validation.prototype.changeValid = changeValid;
        validation.prototype.changeInvalid = changeInvalid;
        validation.prototype.resetValidClass = resetValidClass;

        function setInvalid(el, feedBox, message) {
            feedBox.innerText = message;
            el.classList.add('v-fail');
            el.classList.remove('v-pass');
        }

        function setValid(el, feedBox, message) {
            feedBox.innerText = message;
            el.classList.add('v-pass');
            el.classList.remove('v-fail');
        }

        function getFeedBox(el) {
            return [el.parentElement.querySelector('.v-feed'),
                el.parentElement.querySelector('.iv-feed')];
        }

        function isValid(el) {
            return el.classList.contains('v-pass');
        }

        function changeValid(el) {
            el.classList.add('v-pass');
            el.classList.remove('v-fail');
        }

        function changeInvalid(el) {
            el.classList.add('v-fail');
            el.classList.remove('v-pass');
        }

        function resetValidClass(e) {
            e.target.classList.remove('v-fail');
            e.target.classList.remove('v-pass');
        }

        return validation;
    })(_w);

    const Handler = (function (w) {
        const Handler = function () {
        };

        const myRegex = new Regex();
        const v = new Validation();
        const {addEvent} = new Utils();

        Handler.prototype.phoneHandler = phoneHandler;
        Handler.prototype.emailHandler = emailHandler;
        Handler.prototype.registerPasswordHandler = registerPasswordHandler;
        Handler.prototype.registerRepasswordHandler = registerRepasswordHandler;
        Handler.prototype.customRadioHandler = customRadioHandler;
        Handler.prototype.initEmailConfirmModal = initEmailConfirmModal;

        function initEmailConfirmModal(changedBtn, emailCode, email1, email2) {
            const emailConfirm = getEl('#input-email-confirm'); // 인증번호
            const btnConfirm = getEl('#btn-email-confirm'); // 버튼
            const timer = getEl('.timer');
            const close = getEl('.tmodal-mini .close');
            const timerEnd = timerStart(180, timer, () => close.click());

            addEvent(emailConfirm, 'keyup', (e) => {
                if (e.keyCode === 13) btnConfirm.click();
            });

            addEvent(close, 'click', () => timerEnd());

            addEvent(btnConfirm, 'click', () => {
                const [vFeed, ivFeed] = v.getFeedBox(emailConfirm);
                if (emailConfirm.value !== emailCode) {
                    v.setInvalid(emailConfirm, ivFeed, '발송된 인증코드와 불일치 합니다. 다시 확인해주세요.');
                    emailConfirm.value = '';
                    emailConfirm.focus();
                } else {
                    close.click();
                    timerEnd();
                    changedBtn.innerText = '완료';
                    changedBtn.classList.remove('ing');
                    email1.disabled = true;
                    email2.disabled = true;
                    v.changeValid(changedBtn);
                }
            });
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


        function phoneHandler(e) {
            const regex = myRegex.number;
            const [vFeed, ivFeed] = v.getFeedBox(e.target);
            if (!e.target.value)
                return v.setInvalid(e.target, ivFeed, '휴대폰번호를 입력해주세요.');
            if (!regex.test(e.target.value))
                return v.setInvalid(e.target, ivFeed, '숫자가 아닌 값은 입력할 수 없습니다.');
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

        function registerPasswordHandler(e) {
            const password = this.value;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            const regex = myRegex.password;
            if (!regex.test(password))
                return v.setInvalid(this, ivFeed, '특수문자 / 문자 / 숫자 포함 형태의 8~15자리 비밀번호로 설정해주세요');
            return v.setValid(this, vFeed, '사용 가능한 비밀번호 입니다.');
        }

        function registerRepasswordHandler(pwd, repwd) {
            const [vFeed, ivFeed] = v.getFeedBox(repwd);
            if (pwd.value !== repwd.value)
                return v.setInvalid(repwd, ivFeed, '동일한 비밀번호를 입력해주세요.');
            if (!v.isValid(pwd))
                return v.setInvalid(repwd, ivFeed, '유효한 비밀번호 설정후 다시 시도해주세요');
            v.setValid(repwd, vFeed, '동일한 비밀번호를 입력하셨습니다.');
        }

        function customRadioHandler(customRadios, e) {
            customRadios.forEach((radio) => radio.classList.remove('clicked'));
            e.target.classList.add('clicked');
        }

        return Handler;
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

    const Alarm = (function (w) {
        const Alarm = function (sock) {
            this.sock = sock;
        };

        Alarm.prototype.send = function (header, data) {
            let message = {header, data};
            this.sock.send(JSON.stringify(message));
        };

        return Alarm;
    })(_w);

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
    travelmaker.comment = Comment;
    travelmaker.handler = Handler;
    travelmaker.alarm = Alarm;

    _w.travelmaker = travelmaker;
    return travelmaker;
})(window);