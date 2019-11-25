$(function () {
    //클래스
    const {getEl, addEvent, useState, getJSONfromQueryString} = new travelmaker.utils();
    const editor = new travelmaker.editor();
    const modal = new travelmaker.modal('#modal');
    const ajax = new travelMaker.ajax();

    //변수
    const title = getEl('#title');
    const btnMainImage = getEl('.btn-main-image');
    const inputFile = getEl('#input-file');
    const editorTitle = getEl('.editor-title');
    const btnPhoto = getEl('.btn-photo');
    const btnMap = getEl('.btn-map');
    const btnHr = getEl('.btn-hr');
    const btnVideo = getEl('.btn-video');
    const inputHash = getEl('#input-hash');
    const btnHash = getEl('#btn-hash');
    const hashView = getEl('.hash-view');
    let hashNodeList = [];  //해쉬태그 모음
    let backImage = null; //대표이미지가 설정되면 담을 변수

    const [setEssay, getEssay] = useState({
        rno: '',
        seq: getEl('#seq') ? +getEl('#seq').value : 1,
        title: '',
        content: '',
        hashtag: [],
        fixed: 0,
        isDomestic: +getJSONfromQueryString().isDomestic
    });

    const $editor = $('#editor');

    addEvent(title, 'change', (e) => setEssay({title: e.target.value}));
    addEvent(btnHr, 'click', () => $editor.summernote('insertNode', document.createElement('hr')));
    addEvent(btnVideo, 'click', () => $editor.summernote('videoDialog.show'));
    addEvent(btnPhoto, 'click', () => $editor.summernote('imageDialog.show'));
    addEvent(btnHash, 'click', () => {
        if (!inputHash.value) return;
        hashView.innerHTML = '';

        const span = document.createElement('span');
        span.classList.add('hash');
        span.innerText = inputHash.value;
        addEvent(span, 'click', (e) => hashNodeList = hashNodeList.filter(node => node !== e.target));

        inputHash.value = '';
        hashNodeList.push(span);
        hashNodeList.forEach(hashNode => hashView.appendChild(hashNode));
    });
    addEvent(inputHash, 'keyup', (e) => {
        if (e.keyCode === 13) btnHash.click();
    });

    addEvent(btnMap, 'click', () => {
        modal.create('map', () => {
            const {isDomestic} = getEssay();
            if (isDomestic) new travelmaker.kakaoMap().init();
            else new travelmaker.googleMap(modal, $editor).init();
        })
    });
    addEvent(inputFile, 'change', (e) => {
        if (!e.target.files.length) return;
        const image = e.target.files[0];
        const fr = new FileReader();
        fr.readAsDataURL(image);
        fr.onload = () => {
            editorTitle.style.backgroundImage = `url("${fr.result}")`;
            backImage = image;
        };
    });

    addEvent(btnMainImage, 'click', () => inputFile.click());
    //로드 끝나자 마자 호출할 함수
    initOnLoad();

    function initOnLoad() {
        $editor.summernote({
            ...editor.summernote,
            callback: {
                onInit: function () {
                    title.focus();
                }
            }
        });

        // 임시저장 목록을 다 가져옴
        // ajax.getEssayTempList()
    }

});