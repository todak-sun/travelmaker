<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>루트 게시물</title>
<!-- BootStrap -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
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
	<input type="hidden" value="${routeDTO.isDomestic }" id="isdomestic">
	<input type="hidden" value="${routeDTO.content }" id="epilogue">
	<input type="hidden" value="${routeDTO.hashtag }" id="hashtag">
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
		async defer></script>
	<!-- &callback=initMap -->
	<!-- Kakao Map -->
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=58d9a72c9db8da0b849a32734093767e"></script>
	<!-- JQuery -->
	<script type="text/javascript"
		src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
	<!-- BootStrap -->
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="../../../resources/js/story/story.js"></script>

	<script type="text/javascript">	
			$().ready(function(){
				console.log('rno = ' + $('#rno').val());
				$.ajax({
					type: 'post',
					url: '/story/getRouteContentStory',
					data: {'rno' : $('#rno').val()},
					dataType: 'json',
					success: function(data){
						// 맵쪽에 뿌려줄 좌표를 담을 배열
						var flightPlanCoordinates = [];
						
						// 작은 Route Content를 동적으로 뿌려줌
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
							
							// 좌표 담기
							flightPlanCoordinates.push({lat : items.lat, lng : items.lng});
							
							// 작은 Route Content 안에 있는 이미지 배열을 뿌림
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
							
							// 부트스트랩 사진 전환에 쓸 class 생성
							routeContentId.find('.carousel-indicators').children().first().attr('class', 'active');
							routeContentId.find('.carousel-inner').children().first().attr('class', 'carousel-item active');
						});
						console.log(flightPlanCoordinates);
						
						// 해외
						if($('#isdomestic').val() == 0) {
							googleMap(flightPlanCoordinates);	
						} else { // 국내
							kakaoMap(flightPlanCoordinates);
						}
						
						// 에필로그랑 해시태그
						$('<div/>', {
							id: 'routeFooter'
						}).append($('<span>', {
							id: 'routeEpilogue',
							text: 'Epilogue : ' + $('#epilogue').val()
						})).append($('<span/>', {
							id: 'routeHashtag',
							text: 'HashTag : ' + $('#hashtag').val()
						})).appendTo($('#routeContent'));
					},
					error: function(error){
						console.log(error);
					}
				});
			});
		</script>
</body>
</html>