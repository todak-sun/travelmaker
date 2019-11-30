$(function() {
  window.onpopstate = function(event) {
    console.log("뒤로가기 버튼 누를시 나오는 내용");
  };

  // 전역변수 설정 & 클릭 이벤트 부여
<<<<<<< Updated upstream
  const currPage = document.querySelector(".currPage");
  // const divList = document.querySelector("#div-list");
  const inputSearch = document.querySelector(".input-search");
  const $list = $(".sec-story");
  let timer;
  // currPage.addEventListener("click", showList);
=======
  const btnList = document.querySelector("#btn-list");
  // const divList = document.querySelector("#div-list");
  const inputSearch = document.querySelector("#input-search");
  const $list = $(".list");
  let timer;
  btnList.addEventListener("click", showList);
>>>>>>> Stashed changes
  inputSearch.addEventListener("change", showKeywordList);

  // 처음 열기 & 뒤로가기 페이지 로딩 완료 후 게시물 출력
  $(document).ready(showList);
  // 스크롤 맨 아래일 시 게시물 추가
  $(window).scroll(scrollList);

  function showKeywordList() {
<<<<<<< Updated upstream
    currPage.value = +12;
=======
    btnList.value = +12;
>>>>>>> Stashed changes
    $list.empty();
    showList();
  }

  // 리스트 더 보기 눌렀을 때 게시물 추가 함수
  function showList() {
    const keyword = inputSearch.value;
    const currListNum = +$list[0].childElementCount;
<<<<<<< Updated upstream
    let loadListNum = +currPage.value;
    console.log("keyword : " + keyword);
    console.log("현재 리스트 숫자 : " + currListNum);
    console.log("불러올 리스트 숫자 : " + loadListNum);
    if (currListNum == loadListNum) loadListNum += 8; // 추가하는 게시글 수

    // ajax 요청해서 게시물 가져오기
    getList(currListNum + 1, loadListNum, keyword)
=======
    let loadListNum = +btnList.value;
    if (currListNum == loadListNum) loadListNum += 8; // 나중에 화면 사이즈별로 추가 갯수 변경 가능

    // ajax 요청해서 게시물 가져오기
    getList(currListNum, loadListNum, keyword)
>>>>>>> Stashed changes
      .then(function(result) {
        addList(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // 현재, 로딩할 리스트 숫자, 키워드 입력해서 추가 게시물 가져오기
<<<<<<< Updated upstream
  function getList(start, end, keyword) {
    return $.ajax({
      type: "get",
      url: `/api/story/${start}/${end}/${keyword}`, // story컨트롤러와 변수명 통일
=======
  function getList(currListNum, loadListNum, keyword) {
    return $.ajax({
      type: "get",
      url: `/api/story/${currListNum}/${loadListNum}/${keyword}`,
>>>>>>> Stashed changes
      dataType: "json"
    });
  }

  // 가져온 게시물 내용을 화면에 뿌려주고 게시물 숫자 저장
  function addList(result) {
    let currListNum = $list[0].childElementCount; // 추가하기 전 현재 게시물 숫자 저장
    const $frag = $(document.createDocumentFragment());

    for (let i = 0; i < result.length; i++) {
      const {
        bno,
        rno,
        title,
        nickname,
        fileName,
        imageName,
        likes,
        views,
        cmt,
        dateUpdate
      } = result[i];
      const storyType = fileName ? "essay" : "route";
<<<<<<< Updated upstream

      const $article = $(`
      <article class="story">
        <div class="story-img-wrap">
          <img
            src="https://picsum.photos/300/200?random=1"
            alt=""
            class="story-img"
          />
        </div>
        <div class="story-content-wrap">
          <h5 class="story-title">
            <a href="/${storyType}/view/${rno}">${title}</a>
          </h5>
          <div class="story-info">
            <span class="info-icon likes">${likes}</span>
            <span class="info-icon views">${views}</span>
            <span class="info-icon comments">${cmt}</span>
          </div>
        </div>
        <div class="story-user-wrap">
          <img
            src="https://picsum.photos/300/200?random=2"
            alt=""
            class="profile-img"
          />
          <div class="user-info">
            <h6>${nickname}</h6>
            <p>${dateUpdate}</p>
          </div>
        </div>
      </article>
=======
      const $div = $(`
      <div class="item" id=${bno}>
      <a href="/${storyType}/view/${rno}">
        <div class="card">
          <h3>${title}</h3>
          <div class="thumb"> 추후 이미지 경로 : ${imageName}</div>
          <div class="user">작성자 : ${nickname}</div>
          <div class="info">
            <span>좋아요 : ${likes}</span>
            <span>조회수 : ${views}</span>
            <span>댓글수 : ${cmt}</span>
            <span>업뎃날짜 : ${dateUpdate}</span>
          </div>
        </div>
      </a>
      </div>
>>>>>>> Stashed changes
      `);
      $frag.append($article);
    }
    $list.append($frag);

    if (!currListNum) {
      // 현재 게시물이 0개(페이지가 처음 로딩)라면 스크롤 아래로 이동
      document.documentElement.scrollTop = $list[0].scrollHeight - 1400;
    }
    currListNum = $list[0].childElementCount; // 게시물 추가 후 현재 게시물 숫자 저장
<<<<<<< Updated upstream
    currPage.value = currListNum; // 현재 게시물 숫자 버튼벨류로 저장
=======
    btnList.value = currListNum; // 현재 게시물 숫자 버튼벨류로 저장
>>>>>>> Stashed changes
    history.pushState(
      {
        currListNum: currListNum
      },
      "story : " + currListNum,
      `/story/${currListNum}/${inputSearch.value}` // 뒤로가기를 위한 현재 게시물 숫자 주소창에 저장
    );
  }

  // 스크롤 시 맨아래일 때 게시글 더 가져오기
  function scrollList() {
    if (
      parseInt($(window).scrollTop()) + $(window).height() >
      $(document).height() - 5
    ) {
      if (!timer) {
        timer = setTimeout(function() {
          timer = null;
          showList();
        }, 200);
      }
    }
  }
});
