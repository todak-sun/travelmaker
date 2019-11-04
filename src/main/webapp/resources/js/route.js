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
          showWriteForm(2);
          break;
        case 'next-btn-2':
          // showWriteForm(3);
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
  function showWriteForm(level) {
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
          showWriteForm2(destination);
          showCommand(level);
          $('.route-info').show();
          $('.route-destination').hide();
          $('#rno').val(result.rno);
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

function showWriteForm2(destination) {
  switch (destination) {
    case 'domestic':
      $('.route-location')
        .append($('<label/>').text('장소'))
        .append(
          $('<input/>', {
            type: 'text',
            name: 'location',
            placeholder: '장소 입력'
          })
        );
      break;

    case 'overseas':
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
            name: 'place',
            placeholder: '장소 입력'
          }).append(
            $('<input/>', {
              type: 'hidden',
              name: 'location'
            })
          )
        );
      break;

    default:
      alert('잘못된 명령어');
      break;
  }
}

// 코스 저장
function saveCourse() {
  if (document.querySelector('#overseas-radio').checked) {
    $('input[name=location]').val(
      $('input[name=nation]').val() +
        '_' +
        $('input[name=city]').val() +
        '_' +
        $('input[name=place]').val()
    );
  }

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
      document.forms['route-write-form'].reset();
    },
    error: function(err) {
      console.log(err);
    }
  });
}
