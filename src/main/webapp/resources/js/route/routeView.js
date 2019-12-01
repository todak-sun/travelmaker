$().ready(function() {
  console.log("rno = " + $("#rno").val());
  console.log("seq = " + $("#seq").val());
  const { useState, setRequestHeader } = new travelmaker.utils();
  const rno = document.querySelector("#rno").value;
  const seq = document.querySelector("#seq")
    ? document.querySelector("#seq").value
    : 0;

  document.querySelector("#likes").addEventListener("click", UpdateLikes);
  function UpdateLikes() {
    $.ajax({
      type: "post",
      url: "/route/updateRouteLikes",
      data: { rno: rno, seq: seq },
      dataType: "json",
      beforeSend: setRequestHeader,
      success: function(data) {
        alert("좋아요 성공");
      },
      error: console.error
    });
  }

  $.ajax({
    type: "post",
    url: "/api/route/updateViews",
    data: { rno: rno, seq: seq },
    dataType: "json",
    beforeSend: setRequestHeader,
    success: function(data) {
      console.log("조회수 올리기");
    },
    error: function(error) {
      console.log(error);
    }
  });
});
// 카카오맵
function kakaoMap(flightPlanCoordinates) {
  var container = document.getElementById("map");
  var options = {
    center: new kakao.maps.LatLng(
      flightPlanCoordinates[0]["lat"],
      flightPlanCoordinates[0]["lng"]
    ),
    level: 3
  };
  var map = new kakao.maps.Map(container, options);
  var linePath = [];

  // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시
  for (var i = 0; i < flightPlanCoordinates.length; i++) {
    linePath.push(
      new kakao.maps.LatLng(
        flightPlanCoordinates[i]["lat"],
        flightPlanCoordinates[i]["lng"]
      )
    );
  }

  /*
   * // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시 var linePath = [ new
   * kakao.maps.LatLng(33.452344169439975, 126.56878163224233), new
   * kakao.maps.LatLng(33.452739313807456, 126.5709308145358), new
   * kakao.maps.LatLng(33.45178067090639, 126.5726886938753) ];
   */

  // 지도에 표시할 선을 생성
  var polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열
    strokeWeight: 10, // 선의 두께
    strokeColor: "#00FA9A", // 선의 색깔
    strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명
    strokeStyle: "solid" // 선의 스타일
  });

  var positions = [];

  // 마커를 표시할 위치와 title 배열
  for (var i = 0; i < linePath.length; i++) {
    positions.push({ latlng: linePath[i] });
  }

  // 마커를 표시할 위치와 title 배열
  /*
   * var positions = [ { title: '카카오', latlng: new
   * kakao.maps.LatLng(33.452344169439975, 126.56878163224233) }, { title:
   * '생태연못', latlng: new kakao.maps.LatLng(33.452739313807456,
   * 126.5709308145358) }, { title: '텃밭', latlng: new
   * kakao.maps.LatLng(33.45178067090639, 126.5726886938753) } ];
   */

  for (var i = 0; i < positions.length; i++) {
    /*
     * // 마커 이미지의 이미지 크기 var imageSize = new kakao.maps.Size(24, 35);
     *  // 마커 이미지를 생성 var markerImage = new kakao.maps.MarkerImage(imageSrc,
     * imageSize);
     */

    // 마커를 생성
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng // 마커를 표시할 위치
      // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
      /* image : markerImage // 마커 이미지 */
    });
  }

  // 지도에 선을 표시합니다
  polyline.setMap(map);
}

// RouteView GoogleMap 마커 경로 표시
// callback 함수
function googleMap(flightPlanCoordinates) {
  console.log(flightPlanCoordinates[0]["lat"]);
  // 구글 지도 생성
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {
      lat: flightPlanCoordinates[0]["lat"],
      lng: flightPlanCoordinates[0]["lng"]
    },
    mapTypeId: "satellite" // 'roadmap'
  });

  // 장소 위치들 저장
  /*
   * var flightPlanCoordinates = [ {lat: 37.772, lng: -122.214}, {lat: 21.291,
   * lng: -157.821}, {lat: -18.142, lng: 178.431}, {lat: -27.467, lng:
   * 153.027} ];
   */
  var markers = [];

  // 마커 생성
  for (var i = 0; i < flightPlanCoordinates.length; i++) {
    markers.push(
      new google.maps.Marker({
        position: flightPlanCoordinates[i],
        map: map
      })
    );
  }
  // 마커 이미지 커스텀
  /*
   * markers.push(new google.maps.Marker({ map : map, /* icon: icon,
   */
  /*
   * title : place.name, position : place.geometry.location }));
   */

  // 마커들을 선을 경로 표시
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#00FA9A",
    strokeOpacity: 0.5,
    strokeWeight: 10
  });

  // 맵에 마커 뿌림
  markers.forEach(function(marker) {
    marker.setMap(map);
  });
  // 마커들 경로 표시
  flightPath.setMap(map);
}

let flightPlanCoordinates = [];

$(function() {
  const { getEl } = new travelmaker.utils();
  const cmt = new travelmaker.comment();

  const bno = +getEl("#bno").value;
  const seq = getEl("#seq") ? +getEl("#seq").value : 0;
  cmt.init(getEl(".comment-wrap"), bno, seq);
});

// $( window ).resize( function() {
//   let slideBox = document.querySelectorAll(".slide-box");
//   let img = document.querySelector(".slide-box li img");
//   slideBox[i].style.width = img.width * imgNum[i];
// ​});

$().ready(function() {
  // 슬라이드 필요 변수 선언
  let slide = document.querySelector(".slide");
  let slideBox = document.querySelectorAll(".slide-box");
  let leftBtn = document.querySelectorAll(".slide-left");
  let rightBtn = document.querySelectorAll(".slide-right");
  let s_itv;
  let s_count = [];
  let s_posX = [];
  let imgNum = [];
  let img = document.querySelector(".slide-box li img");
  // for(let i = 0; i < boxNum; i++){
  //   s_count.push
  // }

  // 각각 슬라이드에 배열변수들 값 초기화 및 이벤트 생성
  for (let i = 0; i < slideBox.length; i++) {
    // imgNum[i] = slideBox[i].childElementCount;
    // s_count[i] = 0;
    // s_posX[i] = 0;

    // 각 배열에 초기값 설정
    imgNum.push(slideBox[i].childElementCount);
    s_count.push(0);
    s_posX.push(0);
    slideBox[i].offsetWidth = slideBox[i].offsetWidth * imgNum[i];

    // 왼, 오른쪽 버튼에 이벤트 생성
    leftBtn[i].addEventListener("click", function() {
      if (s_count[i] > 0) {
        clearInterval(s_itv);
        s_count[i]--;
        slideToLeft(i);
      }
      if (s_count[i] == 0) {
        leftBtn[i].style.display = "none";
      } else {
        rightBtn[i].style.display = "block";
      }
    });

    // 왼쪽 이동 함수
    function slideToLeft(i) {
      s_itv = setInterval(frame, 1);
      function frame() {
        let slideX = -(s_count[i] * img.width + s_posX[i]);
        if (0 == slideX) {
          clearInterval(s_itv);
        } else if (100 < slideX) {
          s_posX[i] += 6;
          slideBox[i].style.left = s_posX[i] + "px";
        } else if (40 < slideX) {
          s_posX[i] += 3;
          slideBox[i].style.left = s_posX[i] + "px";
        } else if (10 < slideX) {
          s_posX[i] += 2;
          slideBox[i].style.left = s_posX[i] + "px";
        } else {
          s_posX[i] += 1;
          slideBox[i].style.left = s_posX[i] + "px";
        }
      }
    }

    rightBtn[i].addEventListener("click", function() {
      if (s_count[i] < imgNum[i]) {
        clearInterval(s_itv);
        s_count[i]++;
        slideToRight(i);
      }
      if (s_count[i] == imgNum[i] - 1) {
        rightBtn[i].style.display = "none";
      } else {
        leftBtn[i].style.display = "block";
      }
    });

    // 오른쪽 이동 함수
    function slideToRight(i) {
      s_itv = setInterval(frame, 1);
      function frame() {
        let slideX = s_count[i] * img.offsetWidth + s_posX[i];
        if (0 == slideX) {
          clearInterval(s_itv);
        } else if (100 < slideX) {
          s_posX[i] -= 6;
          slideBox[i].style.left = s_posX[i] + "px";
        } else if (40 < slideX) {
          s_posX[i] -= 3;
          slideBox[i].style.left = s_posX[i] + "px";
        } else if (10 < slideX) {
          s_posX[i] -= 2;
          slideBox[i].style.left = s_posX[i] + "px";
        } else {
          s_posX[i] -= 1;
          slideBox[i].style.left = s_posX[i] + "px";
        }
      }
    }
  }
});

// $(function() {
//   let slide = document.getElementById("slide_box");
//   let slide_bt_L = document.getElementById("left_bt");
//   let slide_bt_R = document.getElementById("right_bt");
//   let s_itv;
//   let s_count = 0;
//   let s_posX = 0;
//   let $img = $("#slide_box li img");
//   let img = document.querySelector("#slide_box li img");

//   // slide.style.width =

//   slide_bt_R.addEventListener("click", function() {
//     if (s_count < 4) {
//       clearInterval(s_itv);
//       s_count++;
//       S_ani_R();
//     }
//     if (s_count == 4) {
//       slide_bt_R.style.display = "none";
//     } else {
//       slide_bt_L.style.display = "block";
//     }
//   });
//   function S_ani_R() {
//     s_itv = setInterval(frame, 1);
//     function frame() {
//       const slideX = s_count * img.width + s_posX;
//       if (0 == slideX) {
//         clearInterval(s_itv);
//       } else if (100 < slideX) {
//         s_posX -= 6;
//         slide.style.left = s_posX + "px";
//       } else if (40 < slideX) {
//         s_posX -= 3;
//         slide.style.left = s_posX + "px";
//       } else if (10 < slideX) {
//         s_posX -= 2;
//         slide.style.left = s_posX + "px";
//       } else {
//         s_posX -= 1;
//         slide.style.left = s_posX + "px";
//       }
//     }
//   }

//   slide_bt_L.addEventListener("click", function() {
//     if (s_count > 0) {
//       clearInterval(s_itv);
//       s_count--;
//       S_ani_L();
//     }
//     if (s_count == 0) {
//       slide_bt_L.style.display = "none";
//     } else {
//       slide_bt_R.style.display = "block";
//     }
//   });
//   function S_ani_L() {
//     s_itv = setInterval(frame, 1);
//     function frame() {
//       const slideX = -(s_count * img.width + s_posX);
//       if (0 == slideX) {
//         clearInterval(s_itv);
//       } else if (100 < slideX) {
//         s_posX += 6;
//         slide.style.left = s_posX + "px";
//       } else if (40 < slideX) {
//         s_posX += 3;
//         slide.style.left = s_posX + "px";
//       } else if (10 < slideX) {
//         s_posX += 2;
//         slide.style.left = s_posX + "px";
//       } else {
//         s_posX += 1;
//         slide.style.left = s_posX + "px";
//       }
//     }
//   }
// });
