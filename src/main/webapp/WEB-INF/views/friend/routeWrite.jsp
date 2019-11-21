<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>동행 글쓰기 (작은 틀)</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/friend/routeWrite.css" />
</head>
<body>
	<h2>동행 글쓰기 (작은틀)</h2>
	<br />
	<form name="routeWriteForm" id="routeWriteForm" method="post" action="">
		<input type="hidden" name="is_domestic" id="is_domestic" value="${is_domestic }">
		<input type="hidden" name="fno" id="fno" value="${fno }"> <input
			type="hidden" name="lat" id="lat"> <input type="hidden"
			name="lng" id="lng"> <input type="hidden" name="city"
			id="city" value="시드니">

		<table class="table">
			<thead>
				<tr>
					<th>방문시작날짜</th>
					<td><input type="date" name="date_start" id="date_start">
						<div id="date_startDiv"></div></td>
				</tr>
				<tr>
					<th>방문종료날짜</th>
					<td><input type="date" name="date_end" id="date_end">
						<div id="date_endDiv"></div></td>
				</tr>
				<tr>
					<th>도시 검색</th>
					<td><input type="text" id="searchPlace" placeholder="검색키워드 입력">
						<button type="button" class="btn btn-success" id="searchPlaceBtn"
							data-toggle="modal" data-target="#kakaoMapModal">검색</button>
						<div id="searchPlaceDiv"></div></td>
				</tr>
				<tr>
					<th style="padding-bottom: 220px;">내용</th>
					<td><textarea rows="10" cols="100" name="content" id="content"></textarea>
						<div id="contentDiv"></div></td>
				</tr>
			</thead>
		</table>
		<button type="button" id="nextBtn" class="btn btn-info">다음</button>
		<button type="button" id="checkBtn" class="btn btn-success">저장</button>
		<button type="button" id="cancelBtn" class="btn btn-danger">취소</button>
	</form>
	<br />
	<br />
	<div id="resultDiv"></div>

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

	<!-- Google Modal -->
	<div id="googleMapModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						&times;</button>
					<h4 class="modal-title">Google Map</h4>
				</div>
				<div class="google-modal-body">
					<input id="pac-input" class="controls" type="text"
						placeholder="Search Box" style="width: 230px;" />
					<!-- 맵 출력 -->
					<div id="googleMapDiv" style="width: 100%; height: 500px;"></div>
				</div>
			</div>
		</div>
	</div>

	<script
		src="${pageContext.request.contextPath}/resources/js/common/jquery-3.4.1.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/common/popper.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/common/bootstrap.js"></script>
	<!-- kakao map -->
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=58d9a72c9db8da0b849a32734093767e&libraries=services"></script>
	<!-- Google Map -->
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY&libraries=places"
		async defer></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/friend/routeWrite.js"></script>
</body>
</html>