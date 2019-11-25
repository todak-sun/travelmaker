$(function () {
    const template = new travelmaker.template();
    const editor = new travelmaker.editor();
    const ajax = new travelmaker.ajax();

    const {useState, getJSONfromQueryString, getFormData, getEls, getEl} = new travelmaker.utils();

    let hashes = [];

    let requestData = {
        rno: '',
        seq: +getEl('#seq').value,
        title: '',
        content: '',
        hashtag: '',
        fixed: 0,
        isDomestic: +getJSONfromQueryString().isDomestic
    };

    const [setEssay, getEssay] = useState(requestData);

    const $editor = $('#editor');
    const $modal = $('.modal');

    const [
        title,
        btnImage,
        btnMap,
        btnVideo,
        btnBreakLine,
        btnSaveTmp,
        boxHashTag,
        imgBackground,
        inputFileUpload,
        btnSave,
        tmpContentGroup
    ] = getEls(
        document,
        '#title',
        '#btn-image',
        '#btn-map',
        '#btn-video',
        '#btn-breakline',
        '#btn-save-tmp',
        '#box-hashtag',
        '#img-background',
        '#input-file-upload',
        '#btn-save',
        '#tmp-content-group'
    );

    inputFileUpload.addEventListener('change', inputFileUploadHandler);
    title.addEventListener('change', titleChangeHandler);
    btnImage.addEventListener('click', btnImageHandler);
    btnMap.addEventListener('click', btnMapHandler);
    btnVideo.addEventListener('click', btnVideoHandler);
    btnBreakLine.addEventListener('click', btnBreakLineHandler);
    btnSave.addEventListener('click', btnSaveHandler);
    btnSaveTmp.addEventListener('click', btnSaveTmpHandler);
    boxHashTag.addEventListener('click', hashBoxHandler);
    imgBackground.addEventListener('click', imgBackgroundHandler);

    function titleChangeHandler(e) {
        setEssay({title: this.value});
    }

    initOnLoad();

    function initOnLoad() {
        // ajax.createEssay(getEssay())
        //     .then((ret) => setEssay({rno: ret.data.rno}))
        //     .catch(console.error);
        //
        // ajax.getEssayTempList(1, 0, 'date_write')
        //     .then(printTmpList)
        //     .then(() => setTmpEvents())
        //     .catch(console.error);

        $editor.summernote({
            ...editor.summernote,
            callbacks: {
                onInit: function () {
                    title.focus();
                }
            }
        });
    }

    function setTmpEvents() {
        const btnGetList = document.querySelectorAll('.btn-tmp-get');
        const btnRemoveList = document.querySelectorAll('.btn-tmp-remove');
        Array.from(btnGetList).forEach(btn => btn.addEventListener('click', getEssayTmpHandler));
        Array.from(btnRemoveList).forEach(btn => btn.addEventListener('click', deleteEssayTmpHandler));
    }

    function deleteEssayTmpHandler(e) {
        const item = this.parentElement.parentElement;
        if (!confirm('해당 임시글을 삭제하시겠습니까?')) return;
        ajax.essayDelete(this.dataset.rno)
            .then((ret) => item.remove())
    }

    function getEssayTmpHandler(e) {
        if (!confirm('임시저장 한 글을 불러오시겠습니까?')) return;
        const item = this.parentElement.parentElement;

        ajax.getEssay(this.dataset.rno)
            .then(({data}) => {
                setEssay(data);
                title.value = data.title || '';
                if (data.content) $editor.summernote('code', data.content);
                changeBackground(imgBackground, data.imageName);
                item.remove();
            })
            .catch(console.error);
    }

    function getBackgroundImage(el) {
        let style = window.getComputedStyle(el, null);
        return style.backgroundImage.slice(5, -2);
    }

    function printTmpList({data}) {
        const $frag = $(document.createDocumentFragment());
        data.forEach(essay => {
            $frag.append(template.essayTemp(essay));
        });
        $(tmpContentGroup).append($frag);
    }

    function imgBackgroundHandler(e) {
        inputFileUpload.click();
    }

    function btnSaveTmpHandler(e) {
        setEssay({fixed: 0, content: $editor.summernote('code')});
        ajax.essayUpdate(getEssay())
            .then((ret) => console.log('임시저장', ret.data))
            .catch(console.error);
    }

    function btnSaveHandler(e) {
        setEssay({fixed: 1, content: $editor.summernote('code')});
        ajax.essayUpdate(getEssay())
            .then((ret) => console.log('발행', ret.data))
            .catch(console.error);
    }

    function btnVideoHandler(e) {
        $editor.summernote('videoDialog.show');
    }

    function hashBoxHandler(e) {
        const titleContent = '해쉬태그';
        const bodyContent = template.hashBox();
        setModal($modal, titleContent, bodyContent);
        $modal.modal('show');
        initHashtag();
    }

    function btnBreakLineHandler(e) {
        const hr = document.createElement('hr');
        $editor.summernote('insertNode', hr);
    }

    function btnMapHandler(e) {
        const {isDomestic} = getEssay();
        $editor.summernote('saveRange');
        const titleContent = '지도검색';
        const bodyContent = template.map();
        setModal($modal, titleContent, bodyContent);
        $modal.modal('show');

        if (isDomestic) new travelmaker.kakaoMap().init();
        else new travelmaker.googleMap($modal, $editor).init();
    }

    function inputFileUploadHandler(e) {
        console.log(this.files[0]);
        if (!this.files[0]) return;
        const formData = getFormData(this.files[0]);
        ajax.essayImageUpload(getEssay().rno, formData)
            .then((ret) => {
                changeBackground(imgBackground, ret);
            })
            .catch(console.error);
    }

    function changeBackground(el, imageName) {
        if (imageName) {
            el.style.backgroundImage = `url("/resources/storage/essay/${imageName}")`;
            el.innerHTML = '';
        } else {
            el.style.background = `url("/resources/img/essay-default-background.jpg")`;
            el.innerHTML = '<h3>클릭하시면, 대표이미지를 설정할 수 있어요!</h3>'
        }
    }

    function btnImageHandler(e) {
        $editor.summernote('imageDialog.show');
    }

    function initHashtag() {
        const [contentHashtag, inputHashtag, btnAddHashtag, btnAddAtModal] = getEls(
            document,
            '#content-hashtag',
            '#hashtag',
            '#btn-add-hashtag',
            '#add-at-modal'
        );

        if (hashes.length) {
            hashes.forEach(setHashContent);
        }

        btnAddHashtag.addEventListener('click', function (e) {
            if (!inputHashtag.value) return;
            hashes.push(inputHashtag.value);

            if (hashes.length) {
                contentHashtag.innerHTML = '';
                hashes.forEach(setHashContent);
            }
            inputHashtag.value = '';
            inputHashtag.focus();
            setEssay({hashtag: hashes.join(',')});
        });

        btnAddAtModal.addEventListener('click', function (e) {
            $modal.modal('hide');
            let hashText = '';
            hashes.forEach((hash) => {
                hashText += '#' + hash + ' ';
            });
            boxHashTag.innerText = hashText;
        });

        function setHashContent(hash) {
            const btn = createHashButton(hash);
            btn.addEventListener('click', function (e) {
                hashes = hashes.filter((hash) => hash !== this.innerText.slice(1));
                this.remove();
            });
            contentHashtag.appendChild(btn);
        }

        function createHashButton(hashValue) {
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.classList.add('btn-outline-primary');
            btn.appendChild(document.createTextNode('#' + hashValue));
            return btn;
        }
    }

    function setModal($modal, titleContent, bodyContent) {
        const modal = $modal[0];
        const [title, body] = getEls(modal, '.modal-title', '.modal-body');
        title.innerHTML = titleContent;
        body.innerHTML = bodyContent;
    }
});