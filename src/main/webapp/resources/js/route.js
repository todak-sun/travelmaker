/**
 *
 */

$(document).ready(function() {
  //루트 글작성 폼으로 이동
  $('#routeWriteBtn').on('click', function() {
    location.href = '/route/routeWriteForm';
  });

  //국내루트 글작성 폼 생성(자바스크립트)
  $('#domesticWriteBtn').on('click', function() {
    let $routeTitle = $('#routeTitle').val();
    if ($routeTitle == '') {
      alert('제목을 입력해주세요');
    } else {
      //제목이 빈칸이 아니면 DB에 route 틀 저장 및 작성 폼 생성
      $.ajax({
        type: 'post',
        url: '/route/domesticWriteForm',
        data: { nickname: 'test1', title: $routeTitle },
        dataType: 'text',
        success: function(data) {
          alert('임시저장 완료 & 폼 생성');
          createDomesticWriteForm();
          let level = 1;
          createCommandBtn(level);
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });

  //해외루트 글작성 폼 생성(자바스크립트)
  $('#overseaWriteBtn').on('click', function() {
    let $routeTitle = $('#routeTitle').val();
    if ($routeTitle == '') {
      alert('제목을 입력해주세요');
    } else {
      //제목이 빈칸이 아니면 DB에 route 틀 저장 및 작성 폼 생성
      $.ajax({
        type: 'post',
        url: '/route/overseaWriteForm',
        data: { nickname: 'test1', title: $routeTitle },
        dataType: 'text',
        success: function(data) {
          alert('임시저장 완료 & 폼 생성');
          //작성 폼 생성
          createOverseaWriteForm();
          //글작성 단계를 커맨드버튼에 알려줌
          let level = 1;
          //이전 저장 다음 버튼 생성
          //루트 글작성 명령어 생성 및 제거, 글작성 단계에 따라 버튼 종류가 달라짐
          createCommandBtn(level);
          //이벤트 걸기
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });
});

function createCommandBtn(level) {
  // 이전 저장 다음 버튼 생성
  $('.routeWriteCommand')
    .text('')
    .append(
      $('<input/>', {
        type: 'button',
        class: 'commandLevel' + level,
        id: 'previousBtn',
        name: 'previousBtn',
        value: '이전'
      })
    )
    .append(
      $('<input/>', {
        type: 'button',
        class: 'commandLevel' + level,
        id: 'courseSaveBtn',
        name: 'courseSaveBtn',
        value: '코스저장'
      })
    )
    .append(
      $('<input/>', {
        type: 'button',
        class: 'commandLevel' + level,
        id: 'nextBtn',
        name: 'nextBtn',
        value: '다음'
      })
    );
  $('#previousBtn').on('click', function() {});
  $('#courseSaveBtn').on('click', function() {
    saveCourse();
  });
  $('#nextBtn').on('click', function() {});
}

function createOverseaWriteForm() {
  // 해외 작성 폼 생성
  $('.routePoint')
    .append($('<label/>').text('지점선택'))
    .append($('<select/>', { name: 'point' }));
  $('.routePoint>select').append($('<option/>', { text: '새 지점' }));
  $('.routeLocation')
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
  $('.routeContent')
    .append($('<label/>').text('내용입력'))
    .append(
      $('<textarea/>', {
        name: 'content',
        placeholder: '내용 입력'
      })
    );
  $('.routeImage')
    .append($('<label/>').text('사진'))
    .append(
      $('<input/>', {
        type: 'file',
        name: 'image'
      })
    );
  $('.routeDate')
    .append($('<label/>').text('날짜'))
    .append(
      $('<input/>', {
        type: 'text',
        name: 'startDate',
        placeholder: '시작날짜 입력'
      })
    )
    .append(
      $('<input/>', {
        type: 'text',
        name: 'endDate',
        placeholder: '종료날짜 입력'
      })
    );
}

function creatDomesticWriteForm() {
  // 국내 작성 폼 생성
  $('.routePoint')
    .append($('<label/>').text('지점선택'))
    .append($('<select/>'));
  $('.routePoint>select').append(
    $('<option/>', {
      text: '새 지점'
    })
  );
  $('.routeLocation')
    .append($('<label/>').text('여행지 찾기'))
    .append(
      $('<input/>', {
        type: 'text',
        name: 'location',
        placeholder: '여행지 입력'
      })
    );
  $('.routeContent')
    .append($('<label/>').text('내용입력'))
    .append(
      $('<textarea/>', {
        name: 'content',
        placeholder: '내용 입력'
      })
    );
  $('.routeImage')
    .append($('<label/>').text('사진'))
    .append(
      $('<input/>', {
        type: 'file',
        name: 'image'
      })
    );
  $('.routeDate')
    .append($('<label/>').text('날짜'))
    .append(
      $('<input/>', {
        type: 'text',
        name: 'startDate',
        placeholder: '시작날짜 입력'
      })
    )
    .append(
      $('<input/>', {
        type: 'text',
        name: 'endDate',
        placeholder: '종료날짜 입력'
      })
    );
}

function moveNextLevel() {
  alert('다음레벨');
}

function movePreviousLevel() {
  alert('이전레벨');
}

function saveCourse() {
  $.ajax({
    type: 'post',
    url: '/route/saveCourse',
    data: $('#routeWriteForm').serialize,
    dataType: 'text',
    success: function(data) {
      //작성 폼 생성
      createOverseaWriteForm();
      //글작성 단계를 커맨드버튼에 알려줌
      let level = 1;
      //이전 저장 다음 버튼 생성
      //루트 글작성 명령어 생성 및 제거, 글작성 단계에 따라 버튼 종류가 달라짐
      createCommandBtn(level);
      //이벤트 걸기
    },
    error: function(err) {
      console.log(err);
    }
  });
}
//	  alert('여기로는오냐');
//    $.ajax({
//      type: 'post',
//      url: '/route/domesticWriteForm',
//      data: '',
//      dataType: 'json',
//      success: function(data) {
//        $('#routePoint')
//          .append('<select/>')
//          .append('<option/>', { text: '새 지점' });
//      },
//      error: function(err) {
//        console.log(err);
//      }
//    });
