<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>루트 게시물</title>
<!-- BootStrap -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<style type="text/css">
#map {
	height: 100%;
	width: 800px;
	display: inline-block;
}
.carousel-inner img {
	width: 50%;
	height: 50%;
}
</style>
</head>
<body style="background-color: gray;">
	<input type="hidden" value="${routeDTO.rno }" id="rno">
	<div id="routeContent"
		style="width: 1400px; height: 100%; text-align: center; background-color: white; margin: 100px;">
		<div id="routeTitle" style="display: inline-block;">
			<h1 style="margin: 0;">${routeDTO.title }</h1>
			<br /> <strong>${routeDTO.nickname }</strong>
		</div>
		<hr style="width: 100%;">
		<div id="mapContent"
			style="width: 100%; height: 400px; text-align: center; background-color: yellow;">
			<div id="map"></div>
		</div>
	</div>

	<!-- Google Map -->
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY"
		async defer></script> <!-- &callback=initMap -->
	<!-- JQuery -->
	<script type="text/javascript"
		src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
	<!-- BootStrap -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<script type="text/javascript">	
			$().ready(function(){
				console.log('rno = ' + $('#rno').val());
				$.ajax({
					type: 'post',
					url: '/story/getRouteContentStory',
					data: {'rno' : $('#rno').val()},
					dataType: 'json',
					success: function(data){
						var flightPlanCoordinates = [];
						
						$.each(data.list, function(index, items){
							$('<div/>', {
								class: 'conts_story',
								style: 'border: 1px solid red;'
							}).append($('<div/>', {
								class: 'story_para'
							}).append($('<div/>', {
								class: 'day_info'
							})).append($('<span/>', {
								class: 'day',
								text: 'Day ' + (index + 1)
							})).append($('<br/>')).append($('<span/>', {
								class: 'date',
								text: items.dateStart + ' / ' + items.dateEnd
							}))).append($('<div/>', {
								class: 'course'
							}).append($('<div/>', {
								class: 'carousel slide',
								'data-ride': 'carousel',
								id: 'routeImg' + index
							}).append($('<ul/>', {
								class: 'carousel-indicators'
							})).append($('<div/>', {
								class: 'carousel-inner'
							})).append($('<a/>', {
								class: 'carousel-control-prev',
								href: '#routeImg' + index,
								'data-slide': 'prev'
							}).append($('<span/>', {
								class: 'carousel-control-prev-icon'
							}))).append($('<a/>', {
								class: 'carousel-control-next',
								href: '#routeImg' + index,
								'data-slide': 'next'
							}).append($('<span/>', {
								class: 'carousel-control-next-icon'
							})))).append($('<div/>', {
								class: 'course_info'
							}).append($('<div/>', {
								class: 'course_info_box'
							}).append($('<div/>', {
								class: 'loc_info_ico',
								text: '아이콘 이미지'
							})).append($('<div/>', {
								class: 'loc_info_txt'
							}).append($('<span/>', {
								class: 'loc_txt',
								text: items.location
							}).append($('<br/>')).append($('<span/>', {
								class: 'loc_addr',
								text: items.location
							})))))).append($('<div/>', {
								class: 'course_story',
								text: items.content
							})).append($('<div/>', {
								class: 'course_rate'
							}).append($('<div/>', {
								class: 'star_rate'
							}).append($('<span/>', {
								class: 'star',
								text: '별'
							})).append($('<span/>', {
								class: 'star',
								text: '별'
							})).append($('<span/>', {
								class: 'star',
								text: '별'
							})).append($('<span/>', {
								class: 'star',
								text: '별'
							})).append($('<span/>', {
								class: 'star',
								text: '별'
							})).append($('<br/>')).append($('<div/>', {
								class: 'rate_txt',
								text: items.score + '점'
							}))))).appendTo($('#routeContent'));

							var routeContentId = $('#routeContent').children().last();
							/* routeLat.push(items.lat);
							routeLng.push(items.lng); */
							flightPlanCoordinates.push({lat : items.lat, lng : items.lng});
							
							$.each(items.imgs, function(indexImgs, img){
								console.log(img);
								$('<li/>', {
									'data-target': '#routeImg' + index,
									'data-slide-to': indexImgs
								}).appendTo(routeContentId.find('.carousel-indicators'));
								
								$('<div/>', {
									class: 'carousel-item'
								}).append($('<img/>', {
									src: '../../../storage/' + img
								})).appendTo(routeContentId.find('.carousel-inner'));
							});
							console.log('-----------------------');
							routeContentId.find('.carousel-indicators').children().first().attr('class', 'active');
							routeContentId.find('.carousel-inner').children().first().attr('class', 'carousel-item active');
						});
						console.log(flightPlanCoordinates);
						initMap(flightPlanCoordinates);
					},
					error: function(error){
						console.log(error);
					}
				});
			});

			// RouteView GoogleMap 마커 경로 표시
			// callback 함수
			function initMap(flightPlanCoordinates) {
				// 구글 지도 생성
				var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 12,
					center: {lat : 37.538541, lng : 126.9686362},
					mapTypeId: 'satellite'//'roadmap'
				});
				
				// 장소 위치들 저장
				/* var flightPlanCoordinates = [
					 {lat: 37.772, lng: -122.214},
			         {lat: 21.291, lng: -157.821},
			         {lat: -18.142, lng: 178.431},
			         {lat: -27.467, lng: 153.027}
				]; */
				var markers = [];
				
				// 마커 생성
				for(var i = 0; i < flightPlanCoordinates.length; i++) {
					markers.push(new google.maps.Marker({
						position: flightPlanCoordinates[i],
						map: map
					}));
				}
				// 마커 이미지 커스텀
				/* markers.push(new google.maps.Marker({
					map : map,
					/* icon: icon, */
				/* 	title : place.name,
					position : place.geometry.location
				})); */
				
				// 마커들을 선을 경로 표시
				var flightPath = new google.maps.Polyline({
					path: flightPlanCoordinates,
					geodesic: true,
					strokeColor: '#00FA9A',
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
		</script>
</body>
</html>