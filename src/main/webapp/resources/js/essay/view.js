$(function () {
    const {useState, setRequestHeader, getEl, getEls} = new travelmaker.utils();
    const {comment, reComment} = new travelmaker.template();
    const ajax = new travelmaker.ajax();

    const bno = +getEl('#bno').value;
    const seq = +getEl('#seq').value;

    let commentData = {
        bno: 0,
        cno: 0,
        seq: 0,
        content: '',
        likes: 0,
        unlikes: 0,
        dateWrite: null
    };

    let essayData = {
        rno: '',
        seq: 1,
        title: '',
        content: '',
        hashtag: '',
        fixed: 0,
        isDomestic: 0
    };

    const [setComment, getComment] = useState(commentData);
    const [setReComment, getReComment] = useState(commentData);

    const [btnAddComment, commentContent, commentGroup] = getEls(
        document,
        '#btn-add-comment',
        '#comment-content',
        '#comment-group'
    );

    commentContent.addEventListener('change', commentContentHandler);
    btnAddComment.addEventListener('click', btnAddCommentHandler);

    initOnLoad();

    function initOnLoad() {
        ajax.getCommentList(bno)
            .then(getCommentList)
            .then(renderComment)
            .catch(console.error);
    }

    function initCommentGroup() {
        const btnRecommentList = Array.from(document.querySelectorAll('.btn-recomment'));
        const btnLikeComment = Array.from(document.querySelectorAll('.btn-like-comment'));
        const btnUnlikeComment = Array.from(document.querySelectorAll('.btn-unlike-comment'));
        const btnRemoveComment = Array.from(document.querySelectorAll('.btn-recomment-remove'));

        btnRecommentList.forEach(btnRe => btnRe.addEventListener('click', btnReHandler));
        btnRemoveComment.forEach(btnRemove => btnRemove.addEventListener('click', btnRemoveHandler));
    }

    function btnAddCommentHandler(e) {
        setComment({bno: bno, seq: seq});
        ajax.createComment(bno, getComment())
            .then((ret) => {
                commentContent.value = '';
                return ajax.getCommentList(bno);
            })
            .then(getCommentList)
            .then(renderComment)
            .catch(console.error);
    }

    //handler
    function btnRemoveHandler(e) { //댓글 삭제 핸들러
        if (!confirm('해당 댓글을 삭제하시겠습니까?')) return;
        ajax.deleteComment(bno, +this.dataset.cno);
        $(this).parents('li')[0].remove();
    }

    function btnReHandler(e) { //댓글 추가 영역소환하는 핸들러
        if (this.dataset.on === 'false') {
            $(this).parents('li').after(reComment(this.dataset.cno));
            this.dataset.on = 'true';
            const recommentContent = getEl('#recomment-content');
            const btnReComment = getEl('#btn-add-recomment');

            recommentContent.addEventListener('change', function (e) {
                setReComment({content: this.value});
            });

            btnReComment.addEventListener('click', function (e) {
                setReComment({seq: seq, cno: +this.dataset.cno, bno: bno});
                ajax.createReComment(bno, getReComment().cno, getReComment())
                    .then((ret) => {
                        return ajax.getCommentList(bno)
                    })
                    .then(getCommentList)
                    .then(renderComment)
                    .catch(console.error);
            });
        } else {
            $(this).parents('li').next()[0].remove();
            this.dataset.on = 'false';
        }
    }

    function commentContentHandler(e) {
        setComment({content: this.value});
    }

    //util
    function renderComment(ret) {
        resetCommentGroup();
        $(commentGroup).append(ret);
        initCommentGroup();
    }

    function resetCommentGroup() {  //댓글영역 초기화
        commentGroup.innerHTML = '';
    }

    function getCommentList(ret) { //가져온 데이터로 모든 댓글을 다시 그려준 후 반환
        const commentList = ret.data;
        const $frag = $(document.createDocumentFragment());
        Array.from(commentList).forEach(cmt => {
            $frag.append($(comment(cmt)));
        });
        return $frag;
    }
});
