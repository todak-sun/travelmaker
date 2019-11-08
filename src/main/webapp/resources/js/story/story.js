/**
 *
 */
$(function() {
  document.querySelector('#loadList').addEventListener('click', test);

  function test() {
    getList()
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // <-- DB에 route 임시저장
  function getList() {
    return $.ajax({
      type: 'post',
      url: '/story/getList',
      dataType: 'json',
      data: {
        startNum: 1,
        endNum: 5
      }
    });
  }
});
