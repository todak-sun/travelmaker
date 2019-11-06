/**
 *
 */

$(function() {
	// rno 전역
	var rno;
  // 루트 글작성 폼으로 이동
  $('#route-write-btn').on('click', function() {
    location.href = '/route/write';
  });

  // 버튼 변수 선언 & 클릭 이벤트 부여
  const previousBtn = document.querySelector('#previous-btn');
  const saveBtn = document.querySelector('#save-btn');
  const nextBtn = document.querySelector('#next-btn');

  previousBtn.addEventListener('click', clickBtn);
  saveBtn.addEventListener('click', clickBtn);
  nextBtn.addEventListener('click', clickBtn);

  // 버튼 클릭 이벤트 모음
  function clickBtn(e) {
    selectCommand(e);
  }

  function selectCommand(e) {
    return new Promise(function() {
      let command = e.target.name;
      switch (command) {
        case 'previous-btn-2':
          showCommand(1);
          break;
        case 'previous-btn-3':
          showCommand(2);
          break;
        case 'next-btn-1':
          showWriteForm(2);
          break;
        case 'next-btn-2':
          showEpilogueForm();
          break;
        case 'course-save-btn':
          saveCourse();
          // 코스 저장 버튼
          break;
        case 'preview-btn':
          showPreview();
          // 미리보기 버튼
          break;
        case 'route-save-btn':
          saveRoute();
          // 최종 저장 버튼
          break;

        default:
          alert('없는 명령어');
          break;
      }
    });
  }

  // 단계별 버튼 내용 변경
  function showCommand(commandLevel) {
    switch (commandLevel) {
      case 1:
        previousBtn.setAttribute('disabled', 'disabled');
        saveBtn.setAttribute('disabled', 'disabled');
        nextBtn.name = 'next-btn-1';
        break;
      case 2:
        previousBtn.removeAttribute('disabled');
        previousBtn.name = 'previous-btn-2';
        saveBtn.removeAttribute('disabled');
        saveBtn.name = 'course-save-btn';
        saveBtn.value = '코스저장';
        nextBtn.name = 'next-btn-2';
        nextBtn.value = '다음';
        break;
      case 3:
        previousBtn.name = 'previous-btn-3';
        saveBtn.name = 'route-save-btn';
        saveBtn.value = '저장';
        nextBtn.name = 'preview-btn';
        nextBtn.value = '미리보기';
        break;

      default:
        alert('코딩 다시해');
        break;
    }
  }

  function showEpilogueForm() {
    // 코스가 1개 이상 저장되어있는지 확인 후
    // 루트 인포 숨기기
    $('.route-info-form').hide();
    $('.route-epilogue-form').show();
    showCommand(3);
    // 에필로그 작성창 열기
  }

  //여러개 쓸 땐 dataset.어쩌구
  function showWriteForm(level) {
    // 제목, 국내&해외 변수값 선언
    let routeTitle = document.querySelector('#route-title');
    let destinations = document.querySelectorAll('.route-destination>input');
    let destination;
    destinations.forEach((radioBtn) => {
      if (radioBtn.checked) {
        destination = radioBtn.value;
      }
    });
    // 제목 작성 여부 체크
    if (!routeTitle.value) {
      alert('제목을 입력해주세요');
    } else {
      // 제목이 빈칸이 아니면 DB에 route 틀 저장 및 작성 폼 생성
      showWriteFormAjax(routeTitle.value, destination)
        .then(function(result) {
          showWriteForm2(destination);
          showCommand(level);
          $('.route-info-form').show();
          $('.route-destination').hide();
          $('#rno').val(result.rno);
          routeTitle.disabled = true;
          // destinations[0].disabled = true;
          // destinations[1].disabled = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  // <-- DB에 route 임시저장
  function showWriteFormAjax(title, destination) {
    return $.ajax({
      type: 'post',
      url: '/route/showWriteForm',
      data: {
        nickname: 'test1',
        title: title,
        destination: destination
      },
      dataType: 'json'
    });
  }
  // DB에 route 임시저장 -->

  // <-- 국내 해외 폼 보여주기
  function showWriteForm2(destination) {
    switch (destination) {
      case 'domestic':
        $('.abroad-info').hide();
        break;

      case 'abroad':
        break;

      default:
        alert('잘못된 명령어');
        break;
    }
    let today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    document.querySelector('input[name=dateStart]').value = today;
    document.querySelector('input[name=dateEnd]').value = today;
  }
  // 국내 해외 폼 보여주기 -->

  // <-- 코스 저장
  function saveCourse() {
    let title = document.querySelector('input[name=title]');
    let nation = document.querySelector('input[name=nation]');
    let city = document.querySelector('input[name=city]');
    let place = document.querySelector('input[name=place]');
    let content = document.querySelector('textarea[name=content]');
    let location = document.querySelector('input[name=location]');
    let dateStart = document.querySelector('input[name=dateStart]');
    let dateEnd = document.querySelector('input[name=dateEnd]');
    let score = document.querySelector('input[name=score]');

    // <- 유효성 검사
    if (document.querySelector('#abroad-radio').checked) {
      if (!nation.value) {
        alert('나라를 입력해주세요');
        nation.focus();
        return;
      } else if (!city.value) {
        alert('도시를 입력해주세요');
        city.focus();
        return;
      } else if (!place.value) {
        alert('장소를 입력해주세요');
        place.focus();
        return;
      }
      location.value = nation.value + '_' + city.value + '_' + place.value;
    } else {
      location.value = place.value;
    }

    if (!location.value) {
      alert('장소를 입력해주세요');
      location.focus();
      return;
    } else if (!content.value) {
      alert('내용을 입력해주세요');
      content.focus();
      return;
    } else if (!dateStart.value) {
      alert('시작날짜를 입력해주세요');
      dateStart.focus();
      return;
    } else if (!dateEnd.value) {
      alert('종료날짜를 입력해주세요');
      dateEnd.focus();
      return;
    }
    // 유효성 검사 ->

    // <- DB에 코스 임시저장 프로미스
    countStar()
      .then(function(starNum) {
        return new Promise(function(resolve, reject) {
          resolve();
          score.value = starNum;
        });
      })
      .then(saveCourseAjax)
      .then(saveCourseAjaxSuccess)
      .catch(function(error) {
        console.log(error);
      });

    // < 별점수 숫자로
    function countStar() {
      return new Promise(function(resolve, reject) {
        resolve(document.querySelectorAll('.route-score a.on').length);
      });
    }
    // 별점수 숫자로 >

    // < DB에 코스 임시저장
    function saveCourseAjax() {
      return $.ajax({
        type: 'post',
        url: '/route/saveCourse',
        data: $('#route-write-form').serialize(),
        dataType: 'json'
      });
    }
    // DB에 코스 임시저장 >

    // < 웹페이지에 코스 임시저장
    function saveCourseAjaxSuccess() {
      const $frag = $(document.createDocumentFragment());
      const $li = $(`
      <li>
      <h4>${place.value}</h4>
      <span>날짜 : ${dateStart.value} - ${dateEnd.value}</span>
      <input type="button" value="위로">
      </li>
      `);
      $frag.append($li);
      $('.saved-courses').append($frag);
      nation.value = '';
      city.value = '';
      place.value = '';
      location.value = '';
      content.value = '';
    }
    // 웹페이지에 코스 임시저장 >
    // DB에 코스 임시저장 프로미스 ->
  }
  // 코스 저장 -->

  // <-- 루트 저장
  function saveRoute() {
    title = document.querySelector('#route-title');
    epilogue = document.querySelector('#route-epilogue');
    hashtag = document.querySelector('#hashtag');
    rno = document.querySelector('#rno');
    $.ajax({
      type: 'post',
      url: '/route/saveRoute',
      data: {
        title: title.value,
        content: epilogue.value,
        hashtag: hashtag.value,
        rno: rno.value,
        nickname: 'test1'
      },
      success: function(data) {
        alert('저장 성공');
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
  // 루트 저장 -->

  // 별점수 매기기
  $('.star_rating a').click(function() {
    $(this)
      .parent()
      .children('a')
      .removeClass('on');
    $(this)
      .addClass('on')
      .prevAll('a')
      .addClass('on');
    return false;
  });
});
