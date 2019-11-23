<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<title>동행 뷰</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/friend/view.css" />
</head>
<body>
	<sec:authentication var="userDetail" property="principal" />
	<input type="hidden" id="friendFno" value="${friendDTO.fno }">
	<input type="hidden" id="friendSeq" value="${friendDTO.seq }">
	<input type="hidden" id="friendId" value="${friendDTO.id }">
	<input type="hidden" id="friendIs_domestic"
		value="${friendDTO.is_domestic }">
	<input type="hidden" id="friendDate_start"
		value="${friendDTO.date_start }">
	<input type="hidden" id="friendDate_end" value="${friendDTO.date_end }">
	<input type="hidden" id="friendDate_of_issue"
		value="${friendDTO.date_of_issue }">

	<h2>동행 뷰</h2>

	<div id="routeContent"
		style="width: 1400px; height: 100%; text-align: center; background-color: white; margin: 100px;">
		<div id="routeTitle" style="display: inline-block;">
			<h1 style="margin: 0;">${friendDTO.title }</h1>
			<br /> <strong>${friendDTO.id }</strong> <br /> <span>${friendDTO.date_start }
				~ ${friendDTO.date_end }</span>
		</div>
		<hr style="width: 100%;">
		<div id="mapContent"
			style="width: 100%; height: 400px; text-align: center;">
			<div id="map"></div>
		</div>
	</div>

	<!-- 동행 신청서 Modal -->
	<div class="modal" id="requestWriteModal">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">신청 글쓰기</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
					<form id="requestForm" action="">
						<input type="hidden" name="fcno" id="fcno"> <input
							type="hidden" name="seq" id="seq" value="${userDetail.seq }">
						<table class="table">
							<tr>
								<td>동행 시작일</td>
								<td><input type="date" name="date_start"></td>
							</tr>
							<tr>
								<td>동행 종료일</td>
								<td><input type="date" name="date_end"></td>
							</tr>
							<tr>
								<td>신청 내용</td>
								<td><textarea rows="10" cols="70" name="content"></textarea></td>
							</tr>
							<tr>
								<td colspan="2" align="center">
									<button type="button" class="btn btn-success" id="requestSaveBtn">신청하기</button>
								</td>
							</tr>
						</table>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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
	<!-- Google Map -->
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY"
		async defer></script>
	<!-- &callback=initMap -->
	<!-- Kakao Map -->
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=58d9a72c9db8da0b849a32734093767e"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/friend/view.js"></script>
</body>
</html>