// Kakao Map
var markers, mapContainer, mapOption, map, ps, infowindow;

$('#kakaoMapModal').on('shown.bs.modal', function() {
	$('#keyword').val($('#place').val()); // 검색 키워드 가져오기
	// 마커를 담을 배열
	markers = [];
	
	mapContainer = document.getElementById('kakaoMapDiv'); // 지도를 표시할 div
	mapOption = {
			center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
			level: 3 // 지도의 확대 레벨
	};
	// 지도를 생성
	map = new kakao.maps.Map(mapContainer, mapOption);
	// 장소 검색 객체를 생성
	ps = new kakao.maps.services.Places();
	
	// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
	infowindow = new kakao.maps.InfoWindow({
		zIndex: 1
	});
	// 키워드로 장소를 검색
	searchPlaces();
});

// 키워드 검색을 요청하는 함수
function searchPlaces() {
	var keyword = document.getElementById('keyword').value;
	console.log(keyword);

	// 유효성 검사
	if (!keyword.replace(/^\s+|\s+$/g, '')) {
		alert('키워드를 입력해주세요!');
		return false;
	}
	// 장소검색 객체를 통해 키워드로 장소검색을 요청
	ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수
function placesSearchCB(data, status, pagination) {
	if (status === kakao.maps.services.Status.OK) {
		// 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출
		displayPlaces(data);
		// 페이지 번호를 표출
		displayPagination(pagination);
	} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
		alert('검색 결과가 존재하지 않습니다.');
		return;
	} else if (status === kakao.maps.services.Status.ERROR) {
		alert('검색 결과 중 오류가 발생했습니다.');
		return;
	}
}

// 검색 결과 목록과 마커를 표출하는 함수
function displayPlaces(places) {
	var listEl = document.getElementById('placesList');
	var menuEl = document.getElementById('menu_wrap');
    var fragment = document.createDocumentFragment();
    var bounds = new kakao.maps.LatLngBounds();
    var listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거
    removeAllChildNods(listEl);
    // 지도에 표시되고 있는 마커를 제거
    removeMarker();

    for (var i = 0; i < places.length; i++) {
    	// 마커를 생성하고 지도에 표시
    	var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
    	var marker = addMarker(placePosition, i);
    	var itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

    	// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가
    	bounds.extend(placePosition);

    	// 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우에 장소명을 표시
    	// mouseout 했을 때는 인포윈도우를 닫음
    	(function(marker, title) {
    		kakao.maps.event.addListener(marker, 'mouseover', function() {
    			displayInfowindow(marker, title);
    		});
    		kakao.maps.event.addListener(marker, 'mouseout', function() {
    			infowindow.close();
    		});
    		itemEl.onmouseover = function() {
    			relayout();
    			displayInfowindow(marker, title);
    		};
    		itemEl.onmouseout = function() {
    			infowindow.close();
    		};
    		itemEl.onclick = function() {
    			$('#place').val(title);
    			$('#lat').val(marker.getPosition().getLat());
    			$('#lng').val(marker.getPosition().getLng());

    			$('#kakaoMapModal').modal('hide');
    		};
    	})(marker, places[i].place_name);
    	fragment.appendChild(itemEl);
    }
    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수
function getListItem(index, places) {
	var el = document.createElement('li');
    var itemStr =
    	'<span class="markerbg marker_' +
    	(index + 1) +
    	'"></span>' +
    	'<div class="info">' +
    	'   <h5>' +
    	places.place_name +
    	'</h5>';
    
    if (places.road_address_name) {
    	itemStr +=
    		'    <span>' +
    		places.road_address_name +
    		'</span>' +
    		'   <span class="jibun gray">' +
    		places.address_name +
    		'</span>';
    } else {
    	itemStr += '    <span>' + places.address_name + '</span>';
    }
    itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수
function addMarker(position, idx, title) {
	// 마커, 이미지, url, 스프라이트 이미지
	var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';																		
	// 마커 이미지의 크기
	var imageSize = new kakao.maps.Size(36, 37);
    var imgOptions = {
    		spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    		spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    		offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };
    // 마커 이미지 등록
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    var marker = new kakao.maps.Marker({
    	position: position, // 마커의 위치
    	image: markerImage // 마커 이미지
    });
    marker.setMap(map); // 지도 위에 마커를 표출
    markers.push(marker); // 배열에 생성된 마커를 추가

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거
function removeMarker() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = []; // 마커값 초기화
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수
function displayPagination(pagination) {
	var paginationEl = document.getElementById('pagination');
	var fragment = document.createDocumentFragment();
	var i;

	// 기존에 추가된 페이지번호를 삭제
	while (paginationEl.hasChildNodes()) {
		paginationEl.removeChild(paginationEl.lastChild);
	}
	for (i = 1; i <= pagination.last; i++) {
		var el = document.createElement('a');
		el.href = '#';
		el.innerHTML = i;
		
		if (i === pagination.current) {
			el.className = 'on';
		} else {
			el.onclick = (function(i) {
				return function() {
					pagination.gotoPage(i);
				};
			})(i);
		}
		fragment.appendChild(el);
	}
	paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
// 인포윈도우에 장소명을 표시
function displayInfowindow(marker, title) {
	var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

	infowindow.setContent(content);
	infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수
function removeAllChildNods(el) {
	while (el.hasChildNodes()) {
		el.removeChild(el.lastChild);
	}
}
function relayout() {
	// 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있음
	// 크기를 변경한 이후에는 반드시 map.relayout 함수를 호출해야함
	// window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됨
	map.relayout();
}

// Google Map
// 검색 버튼 클릭하면 Google Map 모달창 실행
$("#searchBtn").on("click", function() {
	$("div#googleMapModal").modal();
});

// 모달창 이벤트 등록 -> myMap() 함수 호출, 동적 생성된 엘리먼트 삭제 연계
$("div#googleMapModal").on("shown.bs.modal", function() {
	myMap();
});

// 모달창이 hide 되면 실행
$("div#googleMapModal").on("hidden.bs.modal", function() {
	$("#googleMapDiv").empty();
	$('<input/>', {
		id: 'pac-input',
		class: 'controls',
		type: 'text',
		placeholder: 'Search Box',
		style: 'width: 230px;'
	}).appendTo($('.google-modal-body'));
});
 
function myMap() {
	// 검색 키워드 가져오기
	$('#pac-input').val($('#place').val());
	// 구글 맵 생성
	var map = new google.maps.Map(document.getElementById('googleMapDiv'), {
		// 기본 좌표
		center : {
			lat : -33.8688,
			lng : 151.2195
		},
		zoom : 13,
		mapTypeId : 'roadmap'
	});
	var input = document.getElementById('pac-input');
	// 입력받은 키워드로 검색하기
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});
	var markers = [];

	// 검색 데이터 맵에 추가
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();
	
		if (places.length == 0) {
			return;
		}
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
	
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			if (!place.geometry) {
				console.log("Returned place contains no geometry");
				return;
			}
			// 마커 아이콘 생성 (없으면 기본 마커)
			/*
			 * var icon = { url: place.icon, size: new
			 * google.maps.Size(71, 71), origin: new
			 * google.maps.Point(0, 0), anchor: new
			 * google.maps.Point(17, 34), scaledSize: new
			 * google.maps.Size(25, 25) };
			 */
			markers.push(new google.maps.Marker({
				map : map,
				/* icon: icon, */
				title : place.name,
				position : place.geometry.location
			}));
			// 인포윈도우
			var infoWindow = new google.maps.InfoWindow({
				content : '<h2>' + place.name + '</h2><p>'
				+ place.geometry.location.lat()
				+ '</p><button id="checkBtn">확인</button>'
			});
			console.log(markers);
			// 마커 클릭 이벤트
			markers[0].addListener('click', function() {
				// infoWindow.open(map, this);
				$('#place').val(place.formatted_address);
				$('#lat').val(place.geometry.location.lat());
				$('#lng').val(place.geometry.location.lng());

				$('#googleMapModal').modal('hide');
			});
			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		$('#place').val($('#pac-input').val());
		map.fitBounds(bounds);
	});
}