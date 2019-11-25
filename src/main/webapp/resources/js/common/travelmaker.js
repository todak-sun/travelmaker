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

        function getFormData(imageFile) {
            const essay = getEssay();
            const keys = Object.keys(essay);
            const values = Object.values(essay);

            const formData = new FormData();
            formData.append('imageFile', imageFile);
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
                <input type="hidden" id="csrfToken" name="_csrf" value="${csrfTokenValue}" />    
                    <input type="hidden" id="id" name="id">
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

        Template.prototype.register2 = function (csrfTokenValue) {
            return `
            <form action="/user/register" method="post" class="form-register" id="register-form">
                <input
                  type="hidden"
                  name="_csrf"
                  value="${csrfTokenValue}"
                />
                <input
                  type="hidden"
                  name="registerMethod"
                  id="registerMethod"
                  value="travelMaker"
                />
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
              <label for="">동행 시작일</label>
              <div class="input-wrap">
                <input type="date" />
              </div>
            </div>
            
            <div class="input-box">
              <label for="">동행 종료일</label>
              <div class="input-wrap">
                <input type="date" />
              </div>
            </div>
            
            <div class="input-box">
              <label for="">신청 내용</label>
              <div class="input-wrap textarea">
                <textarea
                  placeholder="신청 내용을 구체적으로 적어주세요."
                ></textarea>
              </div>
            </div>
            <button class="btn-travel">신청하기</button>
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
                url: `${url}/api/board/${bno}/comment/`,
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

        function createEssay(data) {
            return $.ajax({
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({data}),
                dataType: 'json',
                url: url + '/api/essay',
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

        function essayUpdate(data) {
            return $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({data}),
                dataType: 'json',
                url: url + '/api/essay',
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
        const KakaoMap = function () {

        };

        const {getEls} = new Utils();
        const template = new Template();

        const $modal = $('.modal');
        const $editor = $('#editor');

        let markers = [];
        let map, ps, infowindow, mapContainer, mapOption;

        KakaoMap.prototype.init = function () {
            const [keyword, btnSearchByKeyword] = getEls(
                document,
                '#keyword',
                '#btn-keyword-search'
            );

            mapContainer = document.querySelector('#map'); // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

            map = new kakao.maps.Map(mapContainer, mapOption); //지도생성
            ps = new kakao.maps.services.Places(); //장소검색
            infowindow = new kakao.maps.InfoWindow({zIndex: 1}); //인포윈도우
            btnSearchByKeyword.addEventListener('click', searchPlaces);
        };

        function searchPlaces() {
            if (!keyword.value.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return false;
            }
            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(keyword.value, placesSearchCB);
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
            var listEl = document.getElementById('placesList'),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds();

            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for (let i = 0; i < places.length; i++) {
                // 마커를 생성하고 지도에 표시합니다
                let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(
                        placePosition,
                        i,
                        places[i].road_address_name
                            ? places[i].road_address_name
                            : places[i].address_name
                    ),
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                (function (marker, title) {
                    const btnAddMap = itemEl.querySelector('.btn-add-map');

                    kakao.maps.event.addListener(marker, 'mouseover', function () {
                        displayInfowindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function () {
                        infowindow.close();
                    });

                    kakao.maps.event.addListener(marker, 'click', function () {
                    });

                    itemEl.onmouseover = function () {
                        displayInfowindow(marker, title);
                        btnAddMap.classList.remove('hide');
                    };

                    itemEl.onmouseout = function () {
                        infowindow.close();
                        btnAddMap.classList.add('hide');
                    };
                    //버튼에 이벤트 추가.
                    btnAddMap.addEventListener('click', btnAddMapHandler.bind(null, marker, title));
                })(marker, places[i].place_name);
                fragment.appendChild(itemEl);
            }
            // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
            listEl.appendChild(fragment);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
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

        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {
            let el = document.createElement('li'),
                itemStr = `
                    <div class="box-place">
                      <h6 class="place-name">
                      ${places.place_name}
                      </h6>
                   `;
            if (places.road_address_name) {
                itemStr += `
                    <span class="place-addr">
                    ${places.road_address_name}
                    </span>
                   `;
            } else {
                itemStr += `
                    <span class="place-addr">
                    ${places.address_name}
                    </span>
                   `;
            }
            itemStr += `<button class="btn-add-map hide">추가</button></div>`;

            el.innerHTML = itemStr;
            el.classList.add('list-group-item');

            return el;
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
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                var li = document.createElement('li');
                li.className = 'page-item';

                var el = document.createElement('a');
                el.className = 'page-link';
                el.href = '#';
                el.innerHTML = i;

                if (i === pagination.current) {
                    li.classList.add('active');
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        };
                    })(i);
                }
                li.appendChild(el);
                fragment.appendChild(li);
            }
            paginationEl.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
            let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
            infowindow.setContent(content);
            infowindow.open(map, marker);
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
        const modal = function (selector) {
            this.m = document.querySelector(selector);
        };

        const utils = new Utils();
        const template = new Template();
        let close, body;

        modal.prototype.create = function (type, initFunction) {
            this.clear();
            this.m.innerHTML = template.tmodal();
            utils.getElList('html, body').forEach((el) => {
                el.style.overflow = 'hidden';
                el.style.height = '100%';
            });
            utils.addSameHandlerEvent('.tmodal-back', stopEvent, 'scroll', 'touchmove', 'mousewheel');
            initModal(type, this, initFunction);
        };

        modal.prototype.setModal = setModal;

        modal.prototype.clear = function () {
            utils.getElList('html, body').forEach((el) => {
                el.style.overflow = 'auto';
                el.style.height = '100%';
            });
            utils.removeSameHandlerEvent('.tmodal-back', stopEvent, 'scroll', 'touchmove', 'mousewheel');
            this.m.innerHTML = '';
        };

        function initModal(type, modal, initFunction) {
            close = utils.getEl('.tmodal-bar .close');
            body = utils.getEl('.tmodal-body');
            close.addEventListener('click', (e) => modal.clear());

            switch (type) {
                case 'login':
                    return setModal(template.login2(utils.getTokenCSRF()), initFunction);
                case 'register':
                    return setModal(template.register2(utils.getTokenCSRF()), initFunction);
                case 'request':
                    return setModal(template.request(), initFunction);
                case 'story' :
                    return setModal(template.story(), initFunction);
                case 'map' :
                    return setModal(template.map(), initFunction);
                default:
                    throw new Error('정의되지 않은 모달 형식입니다.');
            }
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

    _w.travelmaker = travelmaker;
    return travelmaker;
})(window);