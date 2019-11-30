/**
 * 모달을 생성할 때는, new travelmaker.modal(CSS 셀렉터); 모달을 없앨 때는 생성한 모달을 담은 변수(여기서는
 * modal)에 있는 clear() 메소드를 사용하면 됨.
 * 
 */


$(function () {
<<<<<<< Updated upstream
	// 웹소켓을 지정한 url로 연결한다.
	let sock = new SockJS("/echo");
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	// 맵쪽에 뿌려줄 좌표를 담을 배열
	var flightPlanCoordinates = [];
	var $content = $('.content-item');
	
	flightPlanCoordinates.push({lat : $content.data('lat')*1, lng : $content.data('lng')*1});
	if($content.length > 1) {
		for(var i = 1; i < $content.length; i++) {
			// 좌표 담기
			flightPlanCoordinates.push({lat : $content.parent().next().children().data('lat')*1, lng : $content.parent().next().children().data('lng')*1});
		}
	}
	
	// 해외
	if($('#friendIs_domestic').val() == 0) {
		googleMap(flightPlanCoordinates);
	} else { // 국내
		kakaoMap(flightPlanCoordinates);
	}
	
	const modal = new travelmaker.modal('#modal');
    const {getElList, addAllSameEvent, getEl, addEvent} = new travelmaker.utils();
    const v = new travelmaker.validation();

    const btnTryList = getElList('.btn-try');
    addAllSameEvent(btnTryList, 'click', function (e) {
    	const $thisBtn = $(this);
    	var routeSDate = $thisBtn.parent().parent().prev().children().first().text();
    	var routeEDate = $thisBtn.parent().parent().prev().children().last().text();
    	
    	var srDate = new Date(routeSDate).getTime();
    	var erDate = new Date(routeEDate).getTime();
    	
        modal.create('request', function () {
            $('.form-request').prepend('<input type="hidden" name="fcno" value="' + $thisBtn.attr('id') + '">');
            
            const dateStart = getEl('#req-start-date');
            const dateEnd = getEl('#req-end-date');
            const content = getEl('#req-content');
            const btnTry = getEl('#req-btn-try');
            
            addEvent(dateStart, 'blur', (e) => {
        		const value = e.target.value;
        		const [vFeed, ivFeed] = v.getFeedBox(e.target);
        		if (!value) return v.setInvalid(e.target, ivFeed, '시작일을 입력해주세요.');
        		else {
        			var sDate = new Date(value).getTime();
        			
        			if(srDate > sDate || erDate < sDate) {
	            		v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
	            		return dateStart.focus();
	            	}
	            	return v.changeValid(e.target);
        		}
        	});
        	addEvent(dateEnd, 'blur', (e) => {
        		const value = e.target.value;
        		const [vFeed, ivFeed] = v.getFeedBox(e.target);
        		if (!value) return v.setInvalid(e.target, ivFeed, '종료일을 입력해주세요.');
        		else {
        			var eDate = new Date(dateEnd.value).getTime();
        			
        			if(srDate > eDate || erDate < eDate) {
	            		v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
	            		return dateEnd.focus();
	            	}
        			return v.changeValid(e.target);
        		}
        	});
        	addEvent(content, 'blur', (e) => {
        		const value = e.target.value;
        		const [vFeed, ivFeed] = v.getFeedBox(e.target);
        		if (!value) return v.setInvalid(e.target, ivFeed, '내용을 입력해주세요.');
        		
        		return v.changeValid(e.target);
        	});
            
            // 동행 신청 폼 저장
            $('#req-btn-try').click(function(){
            	addEvent(btnTry, 'click', (e) => {
            		if (!v.isValid(dateStart)) {
	            		v.setInvalid(dateStart, v.getFeedBox(dateStart)[1], '시작일을 입력해주세요');
	            		return dateStart.focus();
	            	} else if (!v.isValid(dateEnd)) {
	            		v.setInvalid(dateEnd, v.getFeedBox(dateEnd)[1], '종료일을 입력해주세요.');
	            		return dateEnd.focus();
	            	} else if (!v.isValid(content)) {
	            		v.setInvalid(content, v.getFeedBox(content)[1], '내용을 입력해주세요');
	            		return content.focus();
	            	} else {
	            		$.ajax({
		            		type: 'post',
		            		url: '/friend/setRequestWrite',
		            		data: $('.form-request').serialize(),
		            		beforeSend : function(xhr) {
		            			xhr.setRequestHeader(header, token);
		            		},
		            		success: function(){
		            			console.log('success');
		            			alert('신청 완료 하였습니다.');
		            			friendAlarm($('#friendFno').val(), $('#username').val());
		            			
		            			location.href='/friend/view/' + $('#friendFno').val();
		            		},
		            		error: function(error){
		            			console.log(error);
		            		}
		            	});
	            	}
            	});
            	function friendAlarm(fno, username) {
            		let json = '{"header":"friend","data":{"fno":"' + fno
            		+ '","username":"'+username+'"}}'
            		sock.send(json);
            	} 
            });
        });
    });
    
    // 내 게시물이면
    $('.btn-apply-check').click(function(){
    	$(this).parent().append('<button type="button" class="btn-apply-close">닫기</button>');
    	var $resultRequest = $(this).parent().parent().next();
    	$resultRequest.empty();
    	
    	$.ajax({
    		type: 'post',
    		url: '/friend/getRequestView',
    		data: {'fcno' : $(this).attr('id')},
    		dataType: 'json',
    		beforeSend : function(xhr) {
    			xhr.setRequestHeader(header, token);
    		},
    		success: function(data){
    			$.each(data.list, function(index, items){
    				$resultRequest.append(requestFriendsTemplate(items));
    				
    				 if(items.isPermit == 1 || items.isPermit == 2) {
	    				 var btnSaveDom = $('.btn.btn-tsave:last');
	    				 var btnDangerDom = $('.btn.btn-tdanger:last');
	    				 btnSaveDom.remove();
	    				 btnDangerDom.remove();
    				 }
    			});
    			
    			// 신청폼 수락, 거절
    		    $('.btn.btn-tsave').click(function(){
    		    	console.log('버튼 클릭!');
    		    	var result = confirm('수락하시겠습니까?');
    		 		    	
    		    	if(result) {
    		    		var fccno = $(this).data('fccno');
    		 			    	
    		    		$.ajax({
    		    			type: 'get',
    		    			url: '/friend/requestAccept',
    		    			data: 'fccno=' + fccno,
    		    			success: function(){
    		    				console.log('성공!');
    		    				alert('수락하셨습니다!');
    		    				location.reload();
    		    			},
    		    			error: function(error) {
    		    				console.log(error);
    		    			}
    		    		});
    		    	}
    		    });
    		    $('.btn.btn-tdanger').click(function(){
    		    	var result = confirm('정말로 거절하시겠습니까?');
    		 		    	
    		    	if(result) {
    		    		var fccno = $(this).data('fccno');
    		 		    		
    		    		$.ajax({
    		    			type: 'get',
    		    			url: '/friend/requestReject',
    		    			data: 'fccno=' + fccno,
    		    			success: function(){
    		    				alert('거절하셨습니다.');
    		    				location.reload();
    		    			},
    		    			error: function(error) {
    		    				console.log(error);
    		    			}
    		    		});
    		    	}
    		    });
    			
    		},
    		error: function(error){
    			console.log(error);
    		}
    	});
    	// 신청 닫기버튼 클릭
    	$('.btn-apply-close').click(function(){
    		var $resultRequest = $(this).parent().parent().next();
    		$resultRequest.empty();
    		$(this).remove();
    	});
    });
    
    // 삭제 버튼 클릭
    $('#btn-delete').click(function(){
    	var result = confirm('수정하시겠습니까?');
    	
    	if(result) {
	    	$.ajax({
	    		type: 'delete',
	    		url: '/friend/delete',
	    		data: $('#friendFno').val(),
=======
	
	// 웹소켓을 지정한 url로 연결한다.
	let sock = new SockJS("/echo");
	
    const {getElList, addEvent, getEls} = new travelmaker.utils();
    const modal = new travelmaker.modal('#modal');
    const v = new travelmaker.validation();
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    const btnTestList = getElList('.btn-test');
    btnTestList.forEach(btnTest => {
        addEvent(btnTest, 'click', () => {
            modal.create('request', (e) => {
                const [startDate, endDate, content, btnTry]
                    = getEls(modal.m, '#req-start-date', '#req-end-date', '#req-content', '#req-btn-try');
                // 차례대로 시작일, 종료일, 컨텐츠, 신청버튼
                console.log(startDate, endDate, content, btnTry);
                // 위의 노드의 값으로 Validation 검사를 하면 됨.
                // Validation 클래스 넣어놨으니 그걸로 시도해봐~~~
                // frined/write2.js 에 예시로 해둔 것 있으니 보면 금방 이해할 듯!

//                addEvent(startDate, 'blur', (e) => {
//                    const value = e.target.value;
//                    const [vFeed, ivFeed] = v.getFeedBox(e.target);
//                    if (!value) return v.setInvalid(e.target, ivFeed, '시작일을 입력해주세요.');
//                    return v.changeValid(e.target);
//                });
//                addEvent(endDate, 'blur', (e) => {
//                    const value = e.target.value;
//                    const [vFeed, ivFeed] = v.getFeedBox(e.target);
//                    if (!value) return v.setInvalid(e.target, ivFeed, '종료일을 입력해주세요.');
//                    return v.changeValid(e.target);
//                });
//                addEvent(content, 'blur', (e) => {
//                    const value = e.target.value;
//                    const [vFeed, ivFeed] = v.getFeedBox(e.target);
//                    if (!value) return v.setInvalid(e.target, ivFeed, '내용을 입력해주세요.');
//                    return v.changeValid(e.target);
//                });
//                
//                addEvent(btnTry, 'click', (e) => {
//                	alert('극 클릭!');
//                	if (!v.isValid(startDate)) {
//                        v.setInvalid(startDate, v.getFeedBox(startDate)[1], '시작일을 입력해주세요');
//                        return startDate.focus();
//                    }
//                    if (!v.isValid(endDate)) {
//                        v.setInvalid(endDate, v.getFeedBox(endDate)[1], '종료일을 입력해주세요.');
//                        return endDate.focus();
//                    }
//                    if (!v.isValid(content)) {
//                        v.setInvalid(content, v.getFeedBox(content)[1], '내용을 입력해주세요');
//                        return content.focus();
//                    }
//                    getEl('#requestForm').submit();
//                });
            })
        });
    })
    
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
				console.log(items.dateStart);
				$('.content-group').append(viewTemplate(items));
				
				if(items.friendRequestDTOs.length != 0 && ($('#friendSeq').val() == $('#seq').val())) {				
					$.each(items.friendRequestDTOs, function(temp, item) {
						$('.request-group').append(requestFriendsTemplate(item));
					});
				}
				/* console.log($('#seq').val()); */
				
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
    
	// 동행신청 폼 저장
	    $('#req-btn-try').click(function(){
	    	$.ajax({
	    		type: 'post',
	    		url: '/friend/setRequestWrite',
	    		data: $('#requestForm').serialize(),
>>>>>>> Stashed changes
	    		beforeSend : function(xhr) {
	    			xhr.setRequestHeader(header, token);
	    		},
	    		success: function(){
<<<<<<< Updated upstream
	    			console.log('delete success!!!');
	    			alert('삭제 완료!');
	    			location.href='/friend/list/1';
	    		},
	    		error: function(error) {
	    			console.log(error);
	    		}
	    	});
    	}
    });
});

// 수정버튼 클릭
function goModify(fno) {
	var result = confirm('수정하시겠습니까?');
	
	if(result) {
		location.href='/friend/modify/' + fno;
	}
}

function requestFriendsTemplate(items) {
=======
	    			console.log('success');
	    			alert('신청 완료 하였습니다.');
	    			friendAlarm($('#friendFno').val(), $('#username').val());
	    			
	    			location.href='/friend/list/1';
	    		},
	    		error: function(error){
	    			console.log(error);
	    		}
	    	});
	    });
	    
	    function friendAlarm(fno, username) {
	    	let json = '{"header":"friend","data":{"fno":"' + fno
	    			+ '","username":"'+username+'"}}'
	    	sock.send(json);
	    }


	    
	    
});

// 작은 게시물에 버튼 클릭하면 동행 신청 모달이동
function writeClick(id) {
	console.log($('#seq').val());
	
	
	if($('#seq').val()==undefined){
		alert('로그인 후 이용해주세요');
	}
	$('#fcno').val(id);
}


function viewTemplate(items) {
	var viewTemp = `
		<li>
					<div class="content-item">
						<p class="place">${items.city}</p>
						<p class="date">
							<span class="from">${items.dateStart}</span> <span class="to">${items.dateEnd}</span>
						</p>
						<div class="content-detail">
							<p>${items.content}</p>
							<div class="button-wrap">
								<!-- 자신의 글과 비교하여 한 개만 렌더링 -->
								<input type="button" class="routeRequestBtn btn-test" id="${items.fcno}" data-toggle="modal" data-target="#requestWriteModal" onClick="writeClick(this.id)" value="신청">
								<!-- <button>신청확인</button> -->
								<!-- 자신의 글과 비교하여 한 개만 렌더링 -->
							</div>
						</div>
						<ul class="request-group"></ul>
					</div>
				</li>
	`;
	
	return viewTemp;
}

function requestFriendsTemplate(item) {
>>>>>>> Stashed changes
	var requestTemp = `
		<li>
								<div class="request-item">
									<div class="user-area">
										<div class="image-wrap">
											<img
												src="https://source.unsplash.com/collection/190727/80x80"
												alt="" />
										</div>
<<<<<<< Updated upstream
										<p class="author">${items.nickname}</p>
									</div>
									<div class="content-area">
										<p class="date">
											<span class="from">${items.dateStart}</span> <span class="to">${items.dateEnd}</span>
										</p>
										<div class="content-detail">
											<p>${items.content}</p>
											<div class="button-wrap">
												<button class="btn btn-tsave" data-fccno="${items.fccno}">수락</button>
												<button class="btn btn-tdanger" data-fccno="${items.fccno}">거절</button>
=======
										<p class="author">아이디</p>
									</div>
									<div class="content-area">
										<p class="date">
											<span class="from">${item.dateStart}</span> <span class="to">${item.dateEnd}</span>
										</p>
										<div class="content-detail">
											<p>${item.content}</p>
											<div class="button-wrap">
												<button class="btn btn-tsave">수락</button>
												<button class="btn btn-tdanger">거절</button>
>>>>>>> Stashed changes
											</div>
										</div>
									</div>
								</div>
							</li>
	`;
	return requestTemp;
}

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
<<<<<<< Updated upstream
}
   /*
	 * btnTestList.forEach(btnTest => { addEvent(btnTest, 'click', () => {
	 * modal.create('request', (e) => { const [startDate, endDate, content,
	 * btnTry] = getEls(modal.m, '#req-start-date', '#req-end-date',
	 * '#req-content', '#req-btn-try'); // 차례대로 시작일, 종료일, 컨텐츠, 신청버튼
	 * console.log(startDate, endDate, content, btnTry);
	 */
                // 위의 노드의 값으로 Validation 검사를 하면 됨.
                // Validation 클래스 넣어놨으니 그걸로 시도해봐~~~
                // frined/write2.js 에 예시로 해둔 것 있으니 보면 금방 이해할 듯!

// addEvent(startDate, 'blur', (e) => {
// const value = e.target.value;
// const [vFeed, ivFeed] = v.getFeedBox(e.target);
// if (!value) return v.setInvalid(e.target, ivFeed, '시작일을 입력해주세요.');
// return v.changeValid(e.target);
// });
// addEvent(endDate, 'blur', (e) => {
// const value = e.target.value;
// const [vFeed, ivFeed] = v.getFeedBox(e.target);
// if (!value) return v.setInvalid(e.target, ivFeed, '종료일을 입력해주세요.');
// return v.changeValid(e.target);
// });
// addEvent(content, 'blur', (e) => {
// const value = e.target.value;
// const [vFeed, ivFeed] = v.getFeedBox(e.target);
// if (!value) return v.setInvalid(e.target, ivFeed, '내용을 입력해주세요.');
// return v.changeValid(e.target);
// });
//                
// addEvent(btnTry, 'click', (e) => {
// alert('극 클릭!');
// if (!v.isValid(startDate)) {
// v.setInvalid(startDate, v.getFeedBox(startDate)[1], '시작일을 입력해주세요');
// return startDate.focus();
// }
// if (!v.isValid(endDate)) {
// v.setInvalid(endDate, v.getFeedBox(endDate)[1], '종료일을 입력해주세요.');
// return endDate.focus();
// }
// if (!v.isValid(content)) {
// v.setInvalid(content, v.getFeedBox(content)[1], '내용을 입력해주세요');
// return content.focus();
// }
// getEl('#requestForm').submit();
// });
/*
 * }) }); })
 */
    
// $.ajax({
// type: 'post',
// url: '/friend/getRouteView',
// data: {'fno' : $('#friendFno').val()},
// dataType: 'json',
// beforeSend : function(xhr) {
// xhr.setRequestHeader(header, token);
// },
// success: function(data){
// // 맵쪽에 뿌려줄 좌표를 담을 배열
// //var flightPlanCoordinates = [];
// var fcno = null;
//						
// // 작은 Route Content를 동적으로 뿌려줌
// $.each(data.list, function(index, items){
// console.log(items.dateStart);
// $('.content-group').append(viewTemplate(items));
//				
// if(items.friendRequestDTOs.length != 0 && ($('#friendSeq').val() ==
// $('#seq').val())) {
// $.each(items.friendRequestDTOs, function(temp, item) {
// $('.request-group').append(requestFriendsTemplate(item));
//						
// if(item.isPermit == 1 || item.isPermit == 2) {
// var btnSaveDom = $('.btn.btn-tsave:last');
// var btnDangerDom = $('.btn.btn-tdanger:last');
// btnSaveDom.remove();
// btnDangerDom.remove();
// }
// });
// }
//				
// // 좌표 담기
// //flightPlanCoordinates.push({lat : items.lat, lng : items.lng});
// console.log(items.lat);
// });
//    
// // // 해외
// // if($('#friendIs_domestic').val() == 0) {
// // googleMap(flightPlanCoordinates);
// // } else { // 국내
// // kakaoMap(flightPlanCoordinates);
// // }
// // 내 게시물이면 버튼 삭제
// if($('#friendSeq').val() == $('#seq').val()) {
// $('.routeRequestBtn').remove();
// }
//			
// // 신청폼 수락, 거절
// $('.btn.btn-tsave').click(function(){
// console.log('버튼 클릭!');
// var result = confirm('수락하시겠습니까?');
//		    	
// if(result) {
// var fccno = $(this).data('fccno');
//			    	
// $.ajax({
// type: 'get',
// url: '/friend/requestAccept',
// data: 'fccno=' + fccno,
// success: function(){
// console.log('성공!');
// alert('수락하셨습니다!');
// location.reload();
// },
// error: function(error) {
// console.log(error);
// }
// });
// }
// });
// $('.btn.btn-tdanger').click(function(){
// var result = confirm('정말로 거절하시겠습니까?');
//		    	
// if(result) {
// var fccno = $(this).data('fccno');
//		    		
// $.ajax({
// type: 'get',
// url: '/friend/requestReject',
// data: 'fccno=' + fccno,
// success: function(){
// alert('거절하셨습니다.');
// location.reload();
// },
// error: function(error) {
// console.log(error);
// }
// });
// }
// });
// },
// error: function(error){
// console.log(error);
// }
// });
    
	// 동행신청 폼 저장
// $('#req-btn-try').click(function(){
// $.ajax({
// type: 'post',
// url: '/friend/setRequestWrite',
// data: $('#requestForm').serialize(),
// beforeSend : function(xhr) {
// xhr.setRequestHeader(header, token);
// },
// success: function(){
// console.log('success');
// alert('신청 완료 하였습니다.');
// friendAlarm($('#friendFno').val(), $('#username').val());
//	    			
// location.href='/friend/list/1';
// },
// error: function(error){
// console.log(error);
// }
// });
// });
//	    
// function friendAlarm(fno, username) {
// let json = '{"header":"friend","data":{"fno":"' + fno
// + '","username":"'+username+'"}}'
// sock.send(json);
// }
// });
=======
}
>>>>>>> Stashed changes
