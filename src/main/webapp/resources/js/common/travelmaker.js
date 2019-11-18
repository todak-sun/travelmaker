let travelmaker = (function (window) {
    const _w = window;
    const travelmaker = {};
    const url = 'http://' + _w.location.host;

    const Utils = (function (w) {
        const Utils = function () {
        };

        Utils.prototype.getEl = getEl;

        Utils.prototype.getEls = getEls;

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

        Utils.prototype.resetMessageHandler = function (e) {
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

        Utils.prototype.getFormData = getFormData;

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

        Template.prototype.essayTemp = function (essay) {
            const {rno, title, imageName, isDomestic, dateWrite} = essay;
            return `
                <li class="tmp-content-item" data-rno="${rno}">
                    <img
                            src="http://placehold.it/50X50"
                            class="img-thumbnail"
                            alt="제목"
                    />
                    <div class="btn-group-sm">
                        <button data-rno="${rno}" class="badge badge-secondary btn-tmp-remove">X</button>
                        <button data-rno="${rno}" class="badge badge-secondary btn-tmp-get">불러오기</button>
                    </div>
                    <div class="tmp-content-box">
                        <span class="location badge badge-info">${isDomestic === 0 ? '국내' : '해외'}</span>
                        <h5 class="tmp-content-title">${title === null ? '제목없음' : title}</h5>
                        <span class="date text-muted small">${dateWrite}</span>
                    </div>
                </li>            
            `
        };

        Template.prototype.comment = function (comment) {
            const {cno, bno, content, likes, unlikes, seq, dateWrite, pcno} = comment;
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
                    ${content}
                  </p>
                  <div class="btn-group btn-group-sm">
                    <button class="btn-primary btn-like-comment">좋아요${likes}</button>
                    <button class="btn-danger btn-unlike-comment">싫어요${unlikes}</button>
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
            //
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
        const GoogleMap = function ($modal, $editor) {
            this.G_MAP = {
                center: {lat: -33.8688, lng: 151.2195},
                zoom: 13,
                mapTypeId: 'roadmap',
                fullscreenControl: false,
                mapTypeControl: false
            };
            this.$modal = $modal;
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

            let $modal = this.$modal;
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
                            btnAddMap.addEventListener('click', btnAddMapHandler.bind(null, place, $modal, $editor, G_KEY));
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


        function btnAddMapHandler(place, $modal, $editor, G_KEY) {
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            let width = 750;
            let height = 350;
            let link = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            let imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=${width}x${height}&markers=color:red%7C${lat},${lng}&key=${G_KEY}`;
            let $map = $(document.createDocumentFragment());
            $map.append(template.staticMap(link, imgUrl, place.formatted_address));

            $modal.modal('hide');
            $editor.summernote('restoreRange');
            $editor.summernote('insertNode', $map[0]);
        }

        return GoogleMap;
    })(_w);

    travelmaker.googleMap = GoogleMap;
    travelmaker.kakaoMap = KakaoMap;
    travelmaker.url = url;
    travelmaker.utils = Utils;
    travelmaker.template = Template;
    travelmaker.regex = Regex;
    travelmaker.editor = Editor;
    travelmaker.ajax = Ajax;

    _w.travelmaker = travelmaker;
    return travelmaker;
})(window);