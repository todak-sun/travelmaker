/**
 * 반드시 jQuery 임포트 후 추가할 것~!
 */
let travelmaker = (function (window, jQuery) {
    const travelmaker = {};
    const w = window;
    const d = w.document;
    const url = 'http://' + location.host;
    const $ = jQuery;
    const setting = {
        summernote: {
            placeholder: '내용',
            airMode: true,
            lang: 'ko-KR',
            popover: {
                image: [
                    [
                        'image',
                        ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']
                    ],
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
            },
            // map: {
            //     apiKey: 'AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY',
            //     center: {
            //         lat: -33.8688,
            //         lng: 151.2195
            //     },
            //     zoom: 13
            // }
        },
        G_KEY: 'AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY',
        G_MAP: {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 13,
            mapTypeId: 'roadmap',
            fullscreenControl: false,
            mapTypeControl: false
        }
    };

    //에세이
    const Essay /** @class */ = (function (d, url) {
        function Essay(requestData, editor) {
            this.hashes = [];
            this.data = requestData;
            this.editor = editor;
            this.elems = getElsToObj(
                ['title', 'btnImage', 'btnMap', 'btnVideo',
                    'btnBreakLine', 'btnSaveTmp', 'boxHashTag', 'imgBackground',
                    'inputFileUpload', 'btnSave', 'tmpContentGroup'],
                ['#title', '#btn-image',
                    '#btn-map', '#btn-video', '#btn-breakline',
                    '#btn-save-tmp', '#box-hashtag', '#img-background',
                    '#input-file-upload', '#btn-save', '#tmp-content-group']);
            this.init();
        }

        // const $editor = this.editor;
        const $modal = $('.modal');

        Essay.prototype.getData = function () {
            return this.data
        };

        Essay.prototype.setData = function (data) {
            this.data = {...this.data, ...data}
        };

        Essay.prototype.init = function () {
            const {
                inputFileUpload, title, btnImage, btnMap, btnVideo, btnBreakLine, btnSave, btnSaveTmp, boxHashTag,
                imgBackground
            } = this.elems;

            inputFileUpload.addEventListener('change', inputFileUploadHandler.bind(this), false);
            title.addEventListener('change', titleChangeHandler.bind(this), false);
            btnImage.addEventListener('click', btnImageHandler);
            btnMap.addEventListener('click', btnMapHandler);
            btnVideo.addEventListener('click', btnVideoHandler);
            btnBreakLine.addEventListener('click', btnBreakLineHandler);
            btnSave.addEventListener('click', btnSaveHandler);
            btnSaveTmp.addEventListener('click', btnSaveTmpHandler);
            boxHashTag.addEventListener('click', hashBoxHandler);
            imgBackground.addEventListener('click', imgBackgroundHandler.bind(this, inputFileUpload), false);

            console.log('초기화 무사히 됨');

            // ajaxCreate(this.getData())
            //             //     .then((ret) => {
            //             //         // this.data.rno = ret.data.rno;
            //             //         this.setData({rno: ret.data.rno});
            //             //         console.log(ret.data);
            //             //         console.log('그냥 데이터', ret);
            //             //     })
            //             //     .catch(console.error);
            //             //
            //             // ajaxGetEssayListTmp(this.data.seq, 0)
            //             //     .then((ret) => console.log(ret.data))
            //             //     .catch(console.error);
            //             // //todo console 코드 다음에 지울 것.
        };

        Essay.prototype.getFormData = function (data) {
            console.log(data);
            const formData = new FormData();
            const keys = Object.keys(data);
            const values = Object.values(data);
            for (let i = 0; i < keys.length; i++) {
                formData.append(keys[i], values[i]);
            }
            return formData;
        };

        function btnImageHandler(e) {
            $editor.summernote('imageDialog.show');
        }

        function titleChangeHandler(e) {
            console.log('실행');
            this.setData({title: e.target.value});
        }

        function inputFileUploadHandler(e) {
            console.log(e.target.files[0]);
            const formData = this.getFormData({imageFile: e.target.files[0]});
            console.log(formData);
            // ajaxImageUpload(this.data.rno, formData)
            //     .then((ret) => console.log('이미지 업로드', ret))
            //     .catch(console.error);
        }

        function imgBackgroundHandler(inputFileUpload) {
            inputFileUpload.click();
        }

        function btnSaveTmpHandler(e) {
            setData({fixed: 0, content: $editor.summernote('code')});
            ajaxUpdate(getData())
                .then((ret) => console.log('임시저장', ret.data))
                .catch(console.error);
        }

        function btnSaveHandler(e) {
            this.setData({fixed: 1, content: $editor.summernote('code')});
            ajaxUpdate(getData())
                .then((ret) => console.log('발행', ret.data))
                .catch(console.error);
        }

        function btnVideoHandler(e) {
            $editor.summernote('videoDialog.show');
        }

        function hashBoxHandler(e) {
            const titleContent = '해쉬태그';
            const bodyContent = getTemplateHashModal();
            setModal($modal, titleContent, bodyContent);
            $modal.modal('show');
            initHashtag();
        }

        function btnBreakLineHandler(e) {
            const hr = document.createElement('hr');
            $editor.summernote('insertNode', hr);
        }

        function btnMapHandler(e) {
            $editor.summernote('saveRange');
            const titleContent = '지도검색';
            const bodyContent = getTemplateMapModal();
            setModal($modal, titleContent, bodyContent);
            $modal.modal('show');

            if (confirm('다음은 O, 구글은 X')) initMap();
            else initGoogleMap();
        }

        function ajaxGetEssayListTmp(seq, fixed) {
            return $.ajax({
                type: 'GET',
                contentType: 'application/json',
                data: {seq, fixed},
                url: url + '/api/essay'
            });
        }

        function ajaxCreate(data) {
            return $.ajax({
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({data}),
                dataType: 'json',
                url: url + '/api/essay'
            });
        }

        function ajaxImageUpload(rno, formData) {
            return $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                dataType: 'text',
                data: formData,
                url: url + '/api/essay/' + rno + '/image'
            });
        }

        function ajaxUpdate(data) {
            return $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({data}),
                dataType: 'json',
                url: url + '/api/essay'
            });
        }

        function ajaxDelete(rno) {
            return $.ajax({
                type: 'DELETE',
                contentType: 'application/json',
                dataType: 'json',
                url: url + '/api/essay/' + rno
            });
        }

        return Essay;
    })(d, url);

    //공통 유틸 메소드
    const Utils /** @class */ = (function () {
        function Utils() {
        }

        Utils.prototype.getJSONfromQueryString = getJSONfromQueryString;
        Utils.prototype.getEls = getEls;
        return Utils;
    })();

    // const utils = new Utils();
    // const essay = new Essay(utils);

    function getJSONfromQueryString() {
        let qs = location.search.slice(1).split('%');
        const obj = {};
        qs.forEach((q) => {
            q = q.split('=');
            obj[q[0]] = decodeURIComponent(q[1] || '');
        });
        return JSON.parse(JSON.stringify(obj));
    }

    function getEl(selector) {
        return d.querySelector(selector);
    }

    function getEls(parent, ...selectors) {
        let els = [];
        selectors.forEach((sel) => els.push(parent.querySelector(sel)));
        return els;
    }

    function getElsToObj(keynames, selectors) {
        let obj = {};
        for (let i = 0; i < keynames.length; i++) {
            obj[keynames[i]] = getEl(selectors[i]);
        }
        return obj;
    }

    const Modal = (function () {
        function Modal() {

        }

        function setModal($modal, titleContent, bodyContent) {
            const modal = $modal[0];
            const [title, body] = this.getEls(modal, '.modal-title', '.modal-body');
            title.innerHTML = titleContent;
            body.innerHTML = bodyContent;
        }

        function getTemplateMap() {
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
        }

        function getTemplateHash() {
            return `
            <div>
                <div class="input-group">
                  <input id="hashtag" type="text" class="form-control"/>
                  <button id="btn-add-hashtag">추가</button>
                </div>
                <div id="content-hashtag" class="form-control"></div>
            </div>
            `;
        }

        return Modal;
    })();

    travelmaker.modal = Modal;
    travelmaker.essay = Essay;
    travelmaker.utils = Utils;

    w.travelmaker = travelmaker;
    return travelmaker;
})(this, jQuery);


