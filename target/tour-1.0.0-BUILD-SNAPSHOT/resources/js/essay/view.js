$(function() {

  let requestData = {
    cno: '',
    seq : +document.querySelector('#seq').value,
    content : '',
    likes : 0,
    unlikes : 0
  };

  function setData(data){
    requestData = {
      ...requestData,
      ...data
    };
    console.log(requestData)
    //todo 테스트 코드, 삭제합시다~!
  }

  function getData(){
    return requestData;
  }

  const bno = +document.querySelector('#bno').value;

  const [btnAddComment, commentContent] = getEls(
    document,
    '#btn-add-comment',
    '#comment-content'
  );

  btnAddComment.addEventListener('click', btnAddCommentHandler);

  function btnAddCommentHandler(e) {
    createComment(bno, { seq, content: commentContent.value })
      .then((ret) => {
        console.log(ret);
      })
      .catch(console.error);
  }

  getComment(bno)
    .then((ret) => {
      console.log(ret);
    })
    .catch(console.error);

  function getComment(bno) {
    return $.ajax({
      type: 'GET',
      url: `http://localhost:8080/api/board/${bno}/comment`,
      dataType: 'json'
    });
  }

  function createComment(bno, data) {
    return $.ajax({
      type: 'POST',
      url: `http://localhost:8080/api/board/${bno}/comment`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data)
    });
  }

  function createReComment(bno, cno, data) {
    return $.ajax({
      type: 'POST',
      url: `http://localhost:8080/api/board/${bno}/comment/${cno}`,
      contentType: 'application/json',
      dataType: 'json',
      data: data
    });
  }

  function updateComment(bno, data) {
    return $.ajax({
      type: 'PUT',
      url: `http://localhost:8080/api/board/${bno}/comment/`,
      contentType: 'application/json',
      dataType: 'json',
      data: data
    });
  }

  function deleteComment(bno, cno) {
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
