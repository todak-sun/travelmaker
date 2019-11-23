/**
 * 
 */

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$().ready(function(){
	$.ajax({
		type: 'post',
		url: '/friend/getRouteView',
		data: {'fno' : $('#friendFno').val()},
		dataType: 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(data){
			// 맵쪽에 뿌려줄 좌표를 담을 배열
			var flightPlanCoordinates = [];
			var fcno = null;
						
			// 작은 Route Content를 동적으로 뿌려줌
			$.each(data.list, function(index, items){
				$('<table/>', {
					class: 'table-dark'
				}).append($('<tr/>').append($('<td/>', {
					text: '작은글번호'
				})).append($('<td/>', {
					text: items.fcno,
				}))).append($('<tr/>').append($('<td/>', {
					text: '여행 기간'
				})).append($('<td/>', {
					text: items.date_start + ' ~ ' + items.date_end
				}))).append($('<tr/>').append($('<td/>', {
					text: '내용'
				})).append($('<td/>', {
					text: items.content
				}))).append($('<tr/>').append($('<td/>', {
					text: '도시'
				})).append($('<td/>', {
					text: items.city
				}))).append($('<tr/>').append($('<td/>', {
					colspan: '2'
				}).append($('<input/>', {
					type: 'button',
					class: 'routeRequestBtn btn btn-primary',
					id: items.fcno,
					'data-toggle': 'modal',
					'data-target': '#requestWriteModal',
					onClick: 'writeClick(this.id)',
					value: '신청'
				})))).appendTo($('#routeContent'));
				
				if(items.friendRequestDTOs.length != 0 && $('#friendSeq').val() == $('#seq').val()) {				
					$.each(items.friendRequestDTOs, function(temp, item) {
						$('<table/>', {
							class: 'table-sm'
						}).append($('<tr/>').append($('<td/>', {
							text: '신청번호'
						})).append($('<td/>', {
							text: item.fccno
						}))).append($('<tr/>').append($('<td/>', {
							text: '동행기간'
						})).append($('<td/>', {
							text: item.date_start + ' ~ ' + item.date_end
						}))).append($('<tr/>').append($('<td/>', {
							text: '신청 내용'
						})).append($('<td/>', {
							text: item.content
						}))).appendTo($('#routeContent'));
					});
				}
				
				// 좌표 담기
				flightPlanCoordinates.push({lat : items.lat, lng : items.lng});
				console.log(items.lat);
			});
			
			// 해외
			if($('#friendIs_domestic').val() == 0) {
				googleMap(flightPlanCoordinates);
			} else { // 국내
				kakaoMap(flightPlanCoordinates);
			}
			
			// 내 게시물이면 버튼 삭제
			if($('#friendSeq').val() == $('#seq').val()) {
				$('.routeRequestBtn').remove();
			}
		},
		error: function(error){
			console.log(error);
		}
	});
});

// 작은 게시물에 버튼 클릭하면 동행 신청 모달이동
function writeClick(id) {
	alert(id);
	$('#fcno').val(id);
}

// 동행신청 폼 저장
$('#requestSaveBtn').click(function(){
	$.ajax({
		type: 'post',
		url: '/friend/setRequestWrite',
		data: $('#requestForm').serialize(),
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(){
			console.log('success');
		},
		error: function(error){
			console.log(error);
		}
	});
});

// 카카오맵
function kakaoMap(flightPlanCoordinates) {
	var container = document.getElementById('map');
	var options = {
		center : new kakao.maps.LatLng(flightPlanCoordinates[0]['lat'],
				flightPlanCoordinates[0]['lng']),
		level : 3,
	};
	var map = new kakao.maps.Map(container, options);
	var linePath = [];

	// 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시
	for (var i = 0; i < flightPlanCoordinates.length; i++) {
		linePath.push(new kakao.maps.LatLng(flightPlanCoordinates[i]['lat'],
				flightPlanCoordinates[i]['lng']));
	}

	/*
	 * // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시 var linePath = [ new
	 * kakao.maps.LatLng(33.452344169439975, 126.56878163224233), new
	 * kakao.maps.LatLng(33.452739313807456, 126.5709308145358), new
	 * kakao.maps.LatLng(33.45178067090639, 126.5726886938753) ];
	 */

	// 지도에 표시할 선을 생성
	var polyline = new kakao.maps.Polyline({
		path : linePath, // 선을 구성하는 좌표배열
		strokeWeight : 10, // 선의 두께
		strokeColor : '#00FA9A', // 선의 색깔
		strokeOpacity : 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명
		strokeStyle : 'solid', // 선의 스타일
	});

	var positions = [];

	// 마커를 표시할 위치와 title 배열
	for (var i = 0; i < linePath.length; i++) {
		positions.push({
			latlng : linePath[i]
		});
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
		 * // 마커 이미지의 이미지 크기 var imageSize = new kakao.maps.Size(24, 35); // 마커
		 * 이미지를 생성 var markerImage = new kakao.maps.MarkerImage(imageSrc,
		 * imageSize);
		 */

		// 마커를 생성
		var marker = new kakao.maps.Marker({
			map : map, // 마커를 표시할 지도
			position : positions[i].latlng, // 마커를 표시할 위치
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
		zoom : 12,
		center : {
			lat : flightPlanCoordinates[0]['lat'],
			lng : flightPlanCoordinates[0]['lng'],
		},
		mapTypeId : 'satellite', // 'roadmap'
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
		markers.push(new google.maps.Marker({
			position : flightPlanCoordinates[i],
			map : map,
		}));
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
		path : flightPlanCoordinates,
		geodesic : true,
		strokeColor : '#00FA9A',
		strokeOpacity : 0.5,
		strokeWeight : 10,
	});

	// 맵에 마커 뿌림
	markers.forEach(function(marker) {
		marker.setMap(map);
	});
	// 마커들 경로 표시
	flightPath.setMap(map);
}