/**
 * 
 */
// Kakao Map
var markers, mapContainer, mapOption, kakaoMapDiv, ps, infowindow;

$('#kakaoMapModal').on('shown.bs.modal', function() {
	$('#keyword').val($('#place').val());
	// 마커를 담을 배열입니다
	markers = [];
	
	mapContainer = document.getElementById('kakaoMapDiv'); // 지도를 표시할 div
	      mapOption = {
	        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
	        level: 3 // 지도의 확대 레벨
	      };
	
	      // 지도를 생성합니다
	      map = new kakao.maps.Map(mapContainer, mapOption);
	
	      // 장소 검색 객체를 생성합니다
	      ps = new kakao.maps.services.Places();
	
	      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
	      infowindow = new kakao.maps.InfoWindow({
	        zIndex: 1
	        /* disableAutoPan:true */
	      });
	      // 키워드로 장소를 검색합니다
	      searchPlaces();
});


// Google Map
    	$("#searchBtn").on("click", function() {
			$("div#googleMapModal").modal();
			/* myMap(); */
		});

		// 모달창 이벤트 등록 -> myMap() 함수 호출, 동적 생성된 엘리먼트 삭제 연계
		$("div#googleMapModal").on("shown.bs.modal", function() {
			myMap();
		});

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

    
    
    
    
    
    // Kakao Map
    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
      // map.relayout();
      var keyword = document.getElementById('place').value;
      console.log(keyword);

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
      }
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
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
            console.log('aa', marker.getPosition().getLat());
            $('#place').val(title);
            $('#lat').val(marker.getPosition().getLat());
            $('#lng').val(marker.getPosition().getLng());

            $('#kakaoMapModal').modal('hide');
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      var el = document.createElement('li'),
        itemStr =
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

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      // relayout();
      var imageSrc =
          'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커
																							// 이미지
																							// url,
																							// 스프라이트
																							// 이미지를
																							// 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중
																// 사용할 영역의 좌상단
																// 좌표
          offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지번호를 삭제합니다
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

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
    function relayout() {
      // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
      // 크기를 변경한 이후에는 반드시 map.relayout 함수를 호출해야 합니다
      // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
      map.relayout();
    }
    
    // Google Map
    function myMap() {
				// 맵 요청
				$('#pac-input').val($('#place').val());
				var map = new google.maps.Map(document.getElementById('googleMapDiv'), {
					center : {
						lat : -33.8688,
						lng : 151.2195
					},
					zoom : 13,
					mapTypeId : 'roadmap'
				});
	
				/*
				 * //마커 표시 var marker = new google.maps.Marker({ position :
				 * handok }); marker.setMap(map);
				 * 
				 * //InfoWindow var infowindow = new google.maps.InfoWindow( {
				 * content : "<div style=\"text-align:center;\"><strong>한독약품빌딩</strong><br>서울특별시
				 * 강남구 역삼1동 735</div>" }); infowindow.open(map, marker);
				 */
				// Create the search box and link it to the UI element.
				var input = document.getElementById('pac-input');
				var searchBox = new google.maps.places.SearchBox(input);
				map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	
				// Bias the SearchBox results towards current map's viewport.
				map.addListener('bounds_changed', function() {
					searchBox.setBounds(map.getBounds());
				});
	
				var markers = [];
				// Listen for the event fired when the user selects a prediction
				// and retrieve
				// more details for that place.
				searchBox.addListener('places_changed', function() {
					var places = searchBox.getPlaces();
	
					if (places.length == 0) {
						return;
					}
	
					// Clear out the old markers.
					markers.forEach(function(marker) {
						marker.setMap(null);
					});
					markers = [];
	
					// For each place, get the icon, name and location.
					var bounds = new google.maps.LatLngBounds();
					places.forEach(function(place) {
						if (!place.geometry) {
							console.log("Returned place contains no geometry");
							return;
						}
						/*
						 * var icon = { url: place.icon, size: new
						 * google.maps.Size(71, 71), origin: new
						 * google.maps.Point(0, 0), anchor: new
						 * google.maps.Point(17, 34), scaledSize: new
						 * google.maps.Size(25, 25) };
						 */
	
						// Create a marker for each place.
						markers.push(new google.maps.Marker({
							map : map,
							/* icon: icon, */
							title : place.name,
							position : place.geometry.location
						}));
						/*
						 * google.maps.event.addListener(markers, 'click',
						 * function() {
						 * console.log(place.geometry.location.lat());
						 * 
						 * });
						 */
						var infoWindow = new google.maps.InfoWindow({
							content : '<h2>' + place.name + '</h2><p>'
									+ place.geometry.location.lat()
									+ '</p><button id="checkBtn">확인</button>'
						});
						console.log(markers);
						markers[0].addListener('click', function() {
							// infoWindow.open(map, this);
							$('#place').val(place.formatted_address);
							$('#lat').val(place.geometry.location.lat());
							$('#lng').val(place.geometry.location.lng());
							// $("div#map").empty();
							$('#googleMapModal').modal('hide');
							// $("div#map").empty();
						});
						if (place.geometry.viewport) {
							// Only geocodes have viewport.
							bounds.union(place.geometry.viewport);
						} else {
							bounds.extend(place.geometry.location);
						}
					});
					$('#place').val($('#pac-input').val());
					map.fitBounds(bounds);
				});
			}