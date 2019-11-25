$(function() {
  // window.onpopstate = loadStateContent;

  // function loadStateContent(event) {
  //   console.log(event);
  // }

  window.onpopstate = function(event) {
    console.log(event.state);
  };

  document.querySelector('#loadList').addEventListener('click', moreShowList);

  document.querySelector('#pushgo').addEventListener('click', pushfunction);
  function pushfunction() {
    history.pushState(
      {
        total: document.querySelector('.list').childElementCount,
        test: 'test',
      },
      'title입니다',
      '/story/list'
    );
  }

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
      <a href="/story/list/${result[i].bno}">
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

// 카카오맵
function kakaoMap(flightPlanCoordinates) {
  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(
      flightPlanCoordinates[0]['lat'],
      flightPlanCoordinates[0]['lng']
    ),
    level: 3,
  };
  var map = new kakao.maps.Map(container, options);
  var linePath = [];

  // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시
  for (var i = 0; i < flightPlanCoordinates.length; i++) {
    linePath.push(
      new kakao.maps.LatLng(
        flightPlanCoordinates[i]['lat'],
        flightPlanCoordinates[i]['lng']
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
    strokeColor: '#00FA9A', // 선의 색깔
    strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명
    strokeStyle: 'solid', // 선의 스타일
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
      position: positions[i].latlng, // 마커를 표시할 위치
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
  console.log(flightPlanCoordinates[0]['lat']);
  // 구글 지도 생성
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: flightPlanCoordinates[0]['lat'],
      lng: flightPlanCoordinates[0]['lng'],
    },
    mapTypeId: 'satellite', // 'roadmap'
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
        map: map,
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
    strokeColor: '#00FA9A',
    strokeOpacity: 0.5,
    strokeWeight: 10,
  });

  // 맵에 마커 뿌림
  markers.forEach(function(marker) {
    marker.setMap(map);
  });
  // 마커들 경로 표시
  flightPath.setMap(map);
}
