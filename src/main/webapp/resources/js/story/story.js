$(function () {
    window.onpopstate = function (event) {
        console.log("뒤로가기 버튼 누를시 나오는 내용");
    };

    // 전역변수 설정 & 클릭 이벤트 부여
    const currPage = document.querySelector(".currPage");
    // const divList = document.querySelector("#div-list");
    const inputSearch = document.querySelector(".input-search");
    const $list = $(".sec-story");
    let timer;
    // currPage.addEventListener("click", showList);
    inputSearch.addEventListener("change", showKeywordList);

    // 처음 열기 & 뒤로가기 페이지 로딩 완료 후 게시물 출력
    $(document).ready(showList);
    // 스크롤 맨 아래일 시 게시물 추가
    $(window).scroll(scrollList);

    function showKeywordList() {
        currPage.value = +12;
        $list.empty();
        showList();
    }

    // 리스트 더 보기 눌렀을 때 게시물 추가 함수
    function showList() {
        const keyword = inputSearch.value;
        const currListNum = +$list[0].childElementCount;
        let loadListNum = +currPage.value;
        // console.log("keyword : " + keyword);
        // console.log("현재 리스트 숫자 : " + currListNum);
        // console.log("불러올 리스트 숫자 : " + loadListNum);
        if (currListNum == loadListNum) loadListNum += 8; // 추가하는 게시글 수

        // ajax 요청해서 게시물 가져오기
        getList(currListNum + 1, loadListNum, keyword)
            .then(function (result) {
                addList(result);
                let imgProfileList = Array.from(document.querySelectorAll('img.profile-img'));
                imgProfileList.forEach(img => {
                    if (img.src.length < 79) img.src = '/resources/img/default-profile-img.jpeg';
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // 현재, 로딩할 리스트 숫자, 키워드 입력해서 추가 게시물 가져오기
    function getList(start, end, keyword) {
        return $.ajax({
            type: "get",
            url: `/api/story/${start}/${end}/${keyword}`, // story컨트롤러와 변수명 통일
            dataType: "json"
        });
    }

    // 가져온 게시물 내용을 화면에 뿌려주고 게시물 숫자 저장
    function addList(result) {
        let currListNum = $list[0].childElementCount; // 추가하기 전 현재 게시물 숫자 저장
        const $frag = $(document.createDocumentFragment());

        for (let i = 0; i < result.length; i++) {
            const {
                bno, rno, title, nickname, fileName, imageName, imgProfile, likes, views, cmt, dateUpdate
            } = result[i];
            const storyType = fileName ? "essay" : "route";
            const $article = $(`
                  <article class="story">
                    <div class="story-img-wrap">
                      <img src="${imageName}" alt="" class="story-img"/>
                    </div>
                    <div class="story-content-wrap">
                      <h5 class="story-title">
                        <a href="/${storyType}/view/${rno}">${title}</a>
                      </h5>
                      <div class="story-info">
                        <span class="info-icon views">${views}</span>
                        <span class="info-icon comments">${cmt}</span>
                      </div>
                    </div>
                    <div class="story-user-wrap">
                     <div class="image-wrap">
                          <img src="${imgProfile}" alt="" class="profile-img"/>
                      </div>
                      <div class="user-info">
                        <h6>${nickname}</h6>
                        <p>${dateUpdate}</p>
                      </div>
                    </div>
                  </article>
            `);
            $frag.append($article);
        }
        $list.append($frag);


        if (!currListNum) {
            // 현재 게시물이 0개(페이지가 처음 로딩)라면 스크롤 아래로 이동
            document.documentElement.scrollTop = $list[0].scrollHeight - 1400;
        }
        currListNum = $list[0].childElementCount; // 게시물 추가 후 현재 게시물 숫자 저장
        currPage.value = currListNum; // 현재 게시물 숫자 버튼벨류로 저장
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
                timer = setTimeout(function () {
                    timer = null;
                    showList();
                }, 200);
            }
        }
    }
});
