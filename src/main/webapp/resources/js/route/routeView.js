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
    url: "/route/getRouteView",
    data: { rno: rno, seq: seq },
    dataType: "json",
    beforeSend: setRequestHeader,
    success: function(data) {
      // 맵쪽에 뿌려줄 좌표를 담을 배열

      // 작은 Route Content를 동적으로 뿌려줌
      $.each(data.list, function(index, items) {
        // $("<div/>", {
        //   class: "conts_story",
        //   style: "border: 1px solid red;"
        // })
        //   .append(
        //     $("<div/>", {
        //       class: "story_para"
        //     })
        //       .append(
        //         $("<div/>", {
        //           class: "day_info"
        //         })
        //       )
        //       .append(
        //         $("<span/>", {
        //           class: "day",
        //           text: "Day " + (index + 1)
        //         })
        //       )
        //       .append($("<br/>"))
        //       .append(
        //         $("<span/>", {
        //           class: "date",
        //           text: items.dateStart + " / " + items.dateEnd
        //         })
        //       )
        //   )
        //   .append(
        //     $("<div/>", {
        //       class: "course"
        //     })
        //       .append(
        //         $("<div/>", {
        //           class: "carousel slide",
        //           "data-ride": "carousel",
        //           id: "routeImg" + index
        //         })
        //           .append(
        //             $("<ul/>", {
        //               class: "carousel-indicators"
        //             })
        //           )
        //           .append(
        //             $("<div/>", {
        //               class: "carousel-inner"
        //             })
        //           )
        //           .append(
        //             $("<a/>", {
        //               class: "carousel-control-prev",
        //               href: "#routeImg" + index,
        //               "data-slide": "prev"
        //             }).append(
        //               $("<span/>", {
        //                 class: "carousel-control-prev-icon"
        //               })
        //             )
        //           )
        //           .append(
        //             $("<a/>", {
        //               class: "carousel-control-next",
        //               href: "#routeImg" + index,
        //               "data-slide": "next"
        //             }).append(
        //               $("<span/>", {
        //                 class: "carousel-control-next-icon"
        //               })
        //             )
        //           )
        //       )
        //       .append(
        //         $("<div/>", {
        //           class: "course_info"
        //         }).append(
        //           $("<div/>", {
        //             class: "course_info_box"
        //           })
        //             .append(
        //               $("<div/>", {
        //                 class: "loc_info_ico",
        //                 text: "아이콘 이미지"
        //               })
        //             )
        //             .append(
        //               $("<div/>", {
        //                 class: "loc_info_txt"
        //               }).append(
        //                 $("<span/>", {
        //                   class: "loc_txt",
        //                   text: "위치 : " + items.location
        //                 })
        //                   .append($("<br/>"))
        //                   .append(
        //                     $("<span/>", {
        //                       class: "loc_addr",
        //                       text: "위치 : " + items.location
        //                     })
        //                   )
        //               )
        //             )
        //         )
        //       )
        //       .append(
        //         $("<div/>", {
        //           class: "course_story",
        //           text: "코스내용 : " + items.content
        //         })
        //       )
        //       .append(
        //         $("<div/>", {
        //           class: "course_rate"
        //         }).append(
        //           $("<div/>", {
        //             class: "star_rate"
        //           })
        //             .append(
        //               $("<span/>", {
        //                 class: "star",
        //                 text: "별"
        //               })
        //             )
        //             .append(
        //               $("<span/>", {
        //                 class: "star",
        //                 text: "별"
        //               })
        //             )
        //             .append(
        //               $("<span/>", {
        //                 class: "star",
        //                 text: "별"
        //               })
        //             )
        //             .append(
        //               $("<span/>", {
        //                 class: "star",
        //                 text: "별"
        //               })
        //             )
        //             .append(
        //               $("<span/>", {
        //                 class: "star",
        //                 text: "별"
        //               })
        //             )
        //             .append($("<br/>"))
        //             .append(
        //               $("<div/>", {
        //                 class: "rate_txt",
        //                 text: items.score + "점"
        //               })
        //             )
        //         )
        //       )
        //   )
        //   .appendTo($("#routeContent"));

        var routeContentId = $("#routeContent")
          .children()
          .last();
        /* routeLat.push(items.lat);
                routeLng.push(items.lng); */

        // 좌표 담기
        flightPlanCoordinates.push({ lat: items.lat, lng: items.lng });

        // 작은 Route Content 안에 있는 이미지 배열을 뿌림
        $.each(items.imgs, function(indexImgs, img) {
          console.log(img);
          $("<li/>", {
            "data-target": "#routeImg" + index,
            "data-slide-to": indexImgs
          }).appendTo(routeContentId.find(".carousel-indicators"));

          $("<div/>", {
            class: "carousel-item"
          })
            .append(
              $("<img/>", {
                src: "/resources/storage/route/" + img
              })
            )
            .appendTo(routeContentId.find(".carousel-inner"));
        });
        console.log("-----------------------");

        // 부트스트랩 사진 전환에 쓸 class 생성
        routeContentId
          .find(".carousel-indicators")
          .children()
          .first()
          .attr("class", "active");
        routeContentId
          .find(".carousel-inner")
          .children()
          .first()
          .attr("class", "carousel-item active");
      });
      console.log(flightPlanCoordinates);
      //////////////////////////////////////////////////////////////////
      // 해외
      if ($("#isdomestic").val() == 0) {
        googleMap(flightPlanCoordinates);
      } else {
        // 국내
        kakaoMap(flightPlanCoordinates);
      }

      //   // 에필로그랑 해시태그
      //   $("<div/>", {
      //     id: "routeFooter"
      //   })
      //     .append(
      //       $("<span>", {
      //         id: "rout eEpilogue",
      //         text: "Epilogue : " + $("#epilogue").val()
      //       })
      //     )
      //     .append(
      //       $("<span/>", {
      //         id: "routeHashtag",
      //         text: "HashTag : " + $("#hashtag").val()
      //       })
      //     )
      //     .appendTo($("#routeContent"));
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
