/**
 *
 */
$(function() {
  document.querySelector('#loadList').addEventListener('click', moreShowList);

  // 들어오자마자 리스트 12개 출력
  showList();
  function showList() {
    $('.list').empty();
    getList()
      .then(addList)
      .catch(function(error) {
        console.log(error);
      });
  }

  function getList() {
    return $.ajax({
      type: 'post',
      url: '/api/story/list',
      dataType: 'json',
    });
  }

  // 리스트 더 보기 눌렀을 때 리스트 9개 출력
  function moreShowList() {
    getMoreList(document.querySelector('.list').childElementCount)
      .then(addList)
      .catch(function(error) {
        console.log(error);
      });
  }

  function getMoreList(start) {
    return $.ajax({
      type: 'get',
      url: `../api/story/list/${start}/${start + 8}`,
      dataType: 'json',
    });
  }

  // json 내용을 화면에 html로 추가해주는 함수
  function addList(result) {
    let $frag = $(document.createDocumentFragment());
    for (let i = 0; i < result.length; i++) {
      let $div = $(`
      <div class="item" id=${result[i].bno}>
      <a href="../story/list/${result[i].bno}">
      <div class="card">
      <h3>${result[i].title}</h3>
      <div class="thumb"></div>
      <div class="user">${result[i].seq}</div>
      <div class="info"></div>
      </div>
      </a>
      </div>
      `);
      $frag.append($div);
    }
    $('.list').append($frag);
  }
});
