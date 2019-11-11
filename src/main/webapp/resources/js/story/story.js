/**
 *
 */
$(function() {
  document.querySelector('#loadList').addEventListener('click', test);

  function test() {
    getList()
      .then(function(result) {
        console.log('리절트', result);
        // console.log(result);
        // console.log(data.length);
        // console.log(Object.keys(result).length);
        let $frag = $(document.createDocumentFragment());
        for (let i = 1; i < result.length; i++) {
          let $div = $(`
          <div class="item">
          <a href="../story/list">
          <div class="card">
          <h3>${result[i].title}</h3>
          <div class="thumb"></div>
          <div class="user">${result[i].nickname}</div>
          <div class="info"></div>
          </div>
          </a>
          </div>
          `);
          $frag.append($div);
        }
        $('.list').append($frag);
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
