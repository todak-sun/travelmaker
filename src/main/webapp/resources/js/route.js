/**
 *
 */

$(function() {
  // 루트 글작성 폼으로 이동
  $('#route-write-btn').on('click', function() {
    location.href = '/route/routeWriteForm';
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
          showWriteForm();
          break;
        case 'next-btn-2':
          showWriteForm();
          showCommand(3);
          break;
        case 'course-save-btn':
          saveCourse();
          // 코스 저장 버튼
          break;
        case 'preview-btn':
          // 미리보기 버튼
          break;
        case 'route-save-btn':
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

  //여러개 쓸 땐 dataset.어쩌구
  function showWriteForm() {
    // 제목, 국내&해외 변수값 선언
    let routeTitle = document.querySelector('#route-title').value;
    let destination;
    document
      .querySelectorAll('.route-destination>input')
      .forEach((radioBtn) => {
        if (radioBtn.checked) {
          destination = radioBtn.value;
        }
      });

    // 제목 작성 여부 체크
    if (routeTitle == '') {
      alert('제목을 입력해주세요');
    } else {
      // 제목이 빈칸이 아니면 DB에 route 틀 저장 및 작성 폼 생성
      showWriteFormAjax(routeTitle, destination)
        .then(function(result) {
          switch (destination) {
            case 'domestic':
              creatDomesticWriteForm2();
              break;

            case 'overseas':
              createOverseasWriteForm2();
              break;

            default:
              alert('잘못된 명령어');
              break;
          }
          $('.route-destination').hide();
          showCommand(2);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  // 서버에 루트폼 입력
  function showWriteFormAjax(routeTitle, destination) {
    return $.ajax({
      type: 'post',
      url: '/route/showWriteForm',
      data: {
        nickname: 'test1',
        title: routeTitle,
        destination: destination
      },
      dataType: 'json'
    });
  }
});

//국내루트 글작성 폼 생성 함수2
function creatDomesticWriteForm2() {
  // 국내 작성 폼 생성
  $('.route-info').show();
  $('.route-location')
    .append($('<label/>').text('장소'))
    .append(
      $('<input/>', {
        type: 'text',
        name: 'location',
        placeholder: '장소 입력'
      })
    );
  // $('.route-point')
  //   .append($('<label/>').text('지점선택'))
  //   .append($('<select/>'));
  // $('.route-point>select').append(
  //   $('<option/>', {
  //     text: '새 지점'
  //   })
  // );
  // $('.route-location')
  //   .append($('<label/>').text('여행지 찾기'))
  //   .append(
  //     $('<input/>', {
  //       type: 'text',
  //       name: 'location',
  //       placeholder: '여행지 입력'
  //     })
  //   );
  // $('.route-content')
  //   .append($('<label/>').text('내용입력'))
  //   .append(
  //     $('<textarea/>', {
  //       name: 'content',
  //       placeholder: '내용 입력'
  //     })
  //   );
  // $('.route-image')
  //   .append($('<label/>').text('사진'))
  //   .append(
  //     $('<input/>', {
  //       type: 'file',
  //       name: 'image'
  //     })
  //   );
  // $('.route-date')
  //   .append($('<label/>').text('날짜'))
  //   .append(
  //     $('<input/>', {
  //       type: 'text',
  //       name: 'dateStart',
  //       placeholder: '시작날짜 입력'
  //     })
  //   )
  //   .append(
  //     $('<input/>', {
  //       type: 'text',
  //       name: 'dateEnd',
  //       placeholder: '종료날짜 입력'
  //     })
  //   );
}

//해외루트 글작성 폼 생성 함수2
function createOverseasWriteForm2() {
  // 해외 작성 폼 생성
  $('.route-info').show();
  $('.route-location')
    .append($('<label/>').text('국가'))
    .append(
      $('<input/>', {
        type: 'text',
        name: 'nation',
        placeholder: '국가 입력'
      })
    )
    .append($('<label/>').text('도시'))
    .append(
      $('<input/>', {
        type: 'text',
        name: 'city',
        placeholder: '도시 입력'
      })
    )
    .append($('<label/>').text('장소'))
    .append(
      $('<input/>', {
        type: 'text',
        name: 'location',
        placeholder: '장소 입력'
      })
    );

  // $('.route-content')
  //   .append($('<label/>').text('내용입력'))
  //   .append(
  //     $('<textarea/>', {
  //       name: 'content',
  //       placeholder: '내용 입력'
  //     })
  //   );

  // $('.route-image')
  //   .append($('<label/>').text('사진'))
  //   .append(
  //     $('<input/>', {
  //       type: 'file',
  //       name: 'image'
  //     })
  //   );

  // $('.route-date')
  //   .append($('<label/>').text('날짜'))
  //   .append(
  //     $('<input/>', {
  //       type: 'text',
  //       name: 'dateStart',
  //       placeholder: '시작날짜 입력'
  //     })
  //   )
  //   .append(
  //     $('<input/>', {
  //       type: 'text',
  //       name: 'dateEnd',
  //       placeholder: '종료날짜 입력'
  //     })
  //   );
}

function saveCourse() {
  $.ajax({
    type: 'post',
    url: '/route/saveCourse',
    data: $('#route-write-form').serialize(),
    dataType: 'json',
    success: function(data) {
      console.log(data.test);
      //작성 폼 생성
      //글작성 단계를 커맨드버튼에 알려줌
      //이전 저장 다음 버튼 생성
      //루트 글작성 명령어 생성 및 제거, 글작성 단계에 따라 버튼 종류가 달라짐
      //이벤트 걸기
    },
    error: function(err) {
      console.log(err);
    }
  });
}
