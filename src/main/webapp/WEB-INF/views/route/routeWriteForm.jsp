<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>route-write-form</title>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous" />
<style>
.star_rating {
	font-size: 0;
	letter-spacing: -4px;
}

.star_rating a {
	font-size: 22px;
	letter-spacing: 0;
	display: inline-block;
	margin-left: 5px;
	color: #ccc;
	text-decoration: none;
}

.star_rating a:first-child {
	margin-left: 0;
}

.star_rating a.on {
	color: #777;
}

/* kakao map */
.map_wrap, .map_wrap * {
	margin: 0;
	padding: 0;
	font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
	font-size: 12px;
}

.map_wrap a, .map_wrap a:hover, .map_wrap a:active {
	color: #000;
	text-decoration: none;
}

.map_wrap {
	position: relative;
	width: 100%;
	height: 500px;
}

#menu_wrap {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 250px;
	margin: 10px 0 30px 10px;
	padding: 5px;
	overflow-y: auto;
	background: rgba(255, 255, 255, 0.7);
	z-index: 1;
	font-size: 12px;
	border-radius: 10px;
}

.bg_white {
	background: #fff;
}

#menu_wrap hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 2px solid #5f5f5f;
	margin: 3px 0;
}

#menu_wrap .option {
	text-align: center;
}

#menu_wrap .option p {
	margin: 10px 0;
}

#menu_wrap .option button {
	margin-left: 5px;
}

#placesList li {
	list-style: none;
}

#placesList .item {
	position: relative;
	border-bottom: 1px solid #888;
	overflow: hidden;
	cursor: pointer;
	min-height: 65px;
}

#placesList .item span {
	display: block;
	margin-top: 4px;
}

#placesList .item h5, #placesList .item .info {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

#placesList .item .info {
	padding: 10px 0 10px 55px;
}

#placesList .info .gray {
	color: #8a8a8a;
}

#placesList .info .jibun {
	padding-left: 26px;
	background:
		url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
		no-repeat;
}

#placesList .info .tel {
	color: #009900;
}

#placesList .item .markerbg {
	float: left;
	position: absolute;
	width: 36px;
	height: 37px;
	margin: 10px 0 0 10px;
	background:
		url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
		no-repeat;
}

#placesList .item .marker_1 {
	background-position: 0 -10px;
}

#placesList .item .marker_2 {
	background-position: 0 -56px;
}

#placesList .item .marker_3 {
	background-position: 0 -102px;
}

#placesList .item .marker_4 {
	background-position: 0 -148px;
}

#placesList .item .marker_5 {
	background-position: 0 -194px;
}

#placesList .item .marker_6 {
	background-position: 0 -240px;
}

#placesList .item .marker_7 {
	background-position: 0 -286px;
}

#placesList .item .marker_8 {
	background-position: 0 -332px;
}

#placesList .item .marker_9 {
	background-position: 0 -378px;
}

#placesList .item .marker_10 {
	background-position: 0 -423px;
}

#placesList .item .marker_11 {
	background-position: 0 -470px;
}

#placesList .item .marker_12 {
	background-position: 0 -516px;
}

#placesList .item .marker_13 {
	background-position: 0 -562px;
}

#placesList .item .marker_14 {
	background-position: 0 -608px;
}

#placesList .item .marker_15 {
	background-position: 0 -654px;
}

#pagination {
	margin: 10px auto;
	text-align: center;
}

#pagination a {
	display: inline-block;
	margin-right: 10px;
}

#pagination .on {
	font-weight: bold;
	cursor: default;
	color: #777;
}

.modal-dialog {
	min-width: 800px;
	padding: 0;
}

/* Google Map */
/* Always set the map height explicitly to define the size of the div
				       * element that contains the map. */
#googleMapDiv {
	height: 100%;
}
/* Optional: Makes the sample page fill the window. */
html, body {
	height: 100%;
	margin: 0;
	padding: 0;
}

#description {
	font-family: Roboto;
	font-size: 15px;
	font-weight: 300;
}

#infowindow-content .title {
	font-weight: bold;
}

#infowindow-content {
	display: none;
}

#googleMapDiv #infowindow-content {
	display: inline;
}

.pac-card {
	margin: 10px 10px 0 0;
	border-radius: 2px 0 0 2px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	outline: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	background-color: #fff;
	font-family: Roboto;
}

#pac-container {
	padding-bottom: 12px;
	margin-right: 12px;
}

.pac-controls {
	display: inline-block;
	padding: 5px 11px;
}

.pac-controls label {
	font-family: Roboto;
	font-size: 13px;
	font-weight: 300;
}

#pac-input {
	background-color: #fff;
	font-family: Roboto;
	font-size: 15px;
	font-weight: 300;
	margin-left: 12px;
	padding: 0 11px 0 13px;
	text-overflow: ellipsis;
	width: 400px;
}

#pac-input:focus {
	border-color: #4d90fe;
}

#title {
	color: #fff;
	background-color: #4d90fe;
	font-size: 25px;
	font-weight: 500;
	padding: 6px 12px;
}

#target {
	width: 345px;
}

.modal, #pac-input {
	z-index: 20;
}

.modal-backdrop {
	z-index: 10;
}

.pac-container {
	background-color: #FFF;
	z-index: 20;
	position: fixed;
	display: inline-block;
	float: left;
}

​
		div#input:hover, div#output:hover {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0
		rgba(0, 0, 0, 0.19);
}
</style>
</head>
<body>
	<div>route-write-form 입니다.</div>
	<div>
		제목입력 <input type="text" name="title" id="route-title"
			placeholder="제목을 입력해 주세요" />
	</div>
	<form id="route-write-form" name="route-write-form" method="post">
		<div class="route-destination">
			<input type="hidden" id="isDomestic" name="isDomestic" value="" />
		</div>
		<div class="route-info-form" style="display: none;">
			<div class="route-point"></div>
			<label>지점선택</label> <select name="point">
				<option>새 지점</option>
			</select>
			<div class="route-location">
				<div class="abroad-info">
					<label>국가</label> <input type="text" name="nation"
						placeholder="국가 입력" /> <label>도시</label> <input type="text"
						name="city" placeholder="도시 입력" />
				</div>
				<label>장소</label> <input type="text" name="place" id="place"
					placeholder="장소 입력" />
				<button type="button" class="btn btn-xs btn-success" id="searchBtn"
					data-toggle="modal" data-target="#kakaoMapModal">검색</button>
				<input type="hidden" name="location" id="location" /> <input
					type="hidden" name="lat" id="lat" value="0" /> <input
					type="hidden" name="lng" id="lng" value="0" />
			</div>
			<div class="route-content">
				<label>내용입력</label>
				<textarea name="content" placeholder="내용 입력"></textarea>
			</div>
			<div class="route-image">
				<label>사진</label> <input type="file" name="images"
					multiple="multiple" />
			</div>
			<div class="route-date">
				<label>날짜</label> <input type="text" name="dateStart"
					placeholder="시작날짜 입력" /> <input type="text" name="dateEnd"
					placeholder="종료날짜 입력" />
			</div>
			<div class="route-score">
				<label>점수</label>
				<p class="star_rating">
					<a href="#" class="on">★</a> <a href="#" class="on">★</a> <a
						href="#" class="on">★</a> <a href="#">★</a> <a href="#">★</a>
				</p>
				<input type="hidden" name="score" />
			</div>
		</div>
		<!--       <input type="hidden" id="rno" name="rno" /> -->

		<div class="route-epilogue-form" style="display: none;">
			<label>에필로그</label> <br />
			<textarea id="route-epilogue" name="epilogue" placeholder="내용 입력"></textarea>
			<input type="text" id="hashtag" name="hashtag" placeholder="#해쉬태그" />
		</div>
	</form>
	<div class="route-write-command">
		<input type="button" class="command-btn" id="previous-btn"
			name="previous-btn-2" value="이전" disabled /> <input type="button"
			class="command-btn" id="save-btn" name="course-save-btn" value="코스저장"
			disabled /> <input type="button" class="command-btn" id="next-btn"
			name="next-btn-1" value="다음" />
	</div>
	<ol class="saved-courses"></ol>

	<!-- Kakao Modal -->
	<div class="modal fade" id="kakaoMapModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">지도 검색</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="map_wrap">
						<div id="kakaoMapDiv"
							style="width: 100%; height: 100%; position: relative; overflow: hidden;"></div>
						<div id="menu_wrap" class="bg_white">
							<div class="option">
								<div>
									<form onsubmit="searchPlaces(); return false;">
										키워드 : <input type="text" id="keyword" size="15" />
										<button type="submit" class="btn btn-xs btn-success"
											id="submit">검색하기</button>
									</form>
								</div>
							</div>
							<hr />
							<ul id="placesList"></ul>
							<div id="pagination"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" onclick="moveClose()">
						Save</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Google Map -->
	<div id="googleMapModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Google Map</h4>
				</div>
				<div class="google-modal-body">
					<input id="pac-input" class="controls" type="text"
						placeholder="Search Box" style="width: 230px;">
					<!-- 맵 출력 -->
					<div id="googleMapDiv" style="width: 100%; height: 500px;"></div>
				</div>
			</div>
			<!-- <div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div> -->
		</div>
	</div>
</body>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"
	integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
	crossorigin="anonymous"></script>

<!-- BootStrap -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
	integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
	crossorigin="anonymous"></script>
<script
	src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
	integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
	crossorigin="anonymous"></script>
<!-- kakao map -->
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=58d9a72c9db8da0b849a32734093767e&libraries=services"></script>
<!-- Google Map -->
<script
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY&libraries=places"
	async defer></script>

<script type="text/javascript" src="/resources/js/route/route.js"></script>
<script type="text/javascript" src="/resources/js/route/routeMap.js"></script>
</html>
