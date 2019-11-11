$(function() {
    const $modal = $('#modal-area'); //모달

    const btnWrite = document.querySelector('#btn-write');
    const btnLogin = document.querySelector('#btn-login');
    const btnRegist = document.querySelector('#btn-regist');
    const btnLogout = document.querySelector('#btn-logout');
    const btnMyinfo = document.querySelector('#btn-myinfo');

    btnWrite.addEventListener('click', createModalHandler);
    btnLogin.addEventListener('click', createModalHandler);

    //모달 생성 담당 핸들러
    function createModalHandler(e) {
        let [title, body, initFunction] = setTitleAndBody(e.target.id);
        $modal.html('');
        $modal.append(createModal(title, body));
        if (initFunction) initFunction();
        $modal.modal('show');
    }

    //어떤 버튼을 클릭했는지 감지해서
    //타이틀과 바디, 모달 초기화 함수를 실행
    function setTitleAndBody(id) {
        //case에는 해당하는 아이디의 값을,
        //return은 배열로 지정후 첫번째 값은 title,
        //두번째 값은 body에 들어갈 template를 넣어줌.
        switch (id) {
            case 'btn-write':
                return ['글선택', getTemplateWriteSelector(), initWriteSelector];
            case 'btn-login':
                return ['로그인', getTemplateLogin()];
            default:
                throw new Error('잘못된 id값을 입력했습니다');
        }
    }

    //모달창 생성
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

            console.log(writeType, isDomestic);
            moveTo(writeType, isDomestic);
        }

        function moveTo(writeType, isDomestic) {
            const defaultLink = 'http://' + location.host;
            if (writeType === 'essay') {
                location.href = defaultLink + '/essay/write?isDomestic=' + isDomestic;
            } else if (writeType === 'route') {
                //여기다 맞는 url 설정
                location.href = defaultLink + '/route/write?isDomestic=' + isDomestic;
            }
        }
    }

    //모달 템플릿
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

    //예제로 짜놓은 로그인 템플릿
    function getTemplateLogin() {
        return `
        <div class="input-group">
            <label class="input-group-text">계정</label>
            <input name="account" type="text" class="form-control">
        </div>
        <div class="input-group">
            <label class="input-group-text">비밀번호</label>
            <input name="password" type="password" class="form-control">
        </div>
        <button class="btn btn-outline-info">로그인</button> 
      `;
    }
});
