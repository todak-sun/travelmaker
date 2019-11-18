$(function () {
    const {useState} = new travelmaker.utils();

    let commentData = {
        bno: +document.querySelector('#bno').value,
        cno: '',
        seq: +document.querySelector('#seq').value,
        content: '',
        likes: 0,
        unlikes: 0
    };

    const [setComment, getComment] = useState(commentData);

    const [btnAddComment, commentContent] = getEls(
        document,
        '#btn-add-comment',
        '#comment-content'
    );

    btnAddComment.addEventListener('click', btnAddCommentHandler);

    function btnAddCommentHandler(e) {
        ajaxCreateComment(bno, {seq, content: commentContent.value})
            .then((ret) => {
                console.log(ret);
            })
            .catch(console.error);
    }

    ajaxGetComment(bno)
        .then((ret) => {
            console.log(ret);
        })
        .catch(console.error);

    function ajaxGetComment(bno) {
        return $.ajax({
            type: 'GET',
            url: `http://localhost:8080/api/board/${bno}/comment`,
            dataType: 'json'
        });
    }

    function ajaxCreateComment(bno, data) {
        return $.ajax({
            type: 'POST',
            url: `http://localhost:8080/api/board/${bno}/comment`,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data)
        });
    }

    function ajaxCreateReComment(bno, cno, data) {
        return $.ajax({
            type: 'POST',
            url: `http://localhost:8080/api/board/${bno}/comment/${cno}`,
            contentType: 'application/json',
            dataType: 'json',
            data: data
        });
    }

    function ajaxUpdateComment(bno, data) {
        return $.ajax({
            type: 'PUT',
            url: `http://localhost:8080/api/board/${bno}/comment/`,
            contentType: 'application/json',
            dataType: 'json',
            data: data
        });
    }

    function ajaxDeleteComment(bno, cno) {
        return $.ajax({
            type: 'DELETE',
            url: `http://localhost:8080/api/board/${bno}/comment/${cno}`,
            dataType: 'text'
        });
    }

    function getEls(parent, ...targets) {
        let els = [];
        targets.forEach((target) => els.push(parent.querySelector(target)));
        return els;
    }
});
