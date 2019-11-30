<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<%@include file="../common/head-meta.jsp"%>
<%@include file="../common/head-css.jsp"%>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/friend/view2.css">
<title>동행 게시글</title>
</head>
<body>
	<%@include file="../common/navbar2.jsp"%>

	<!-- 메인 컨텐츠 영역 -->
	<div class="container-wrap">
		<sec:authentication var="userDetail" property="principal" />
		<div class="hidden">
			<input type="hidden" id="friendFno" value="${friendDTO.fno}">
			<input type="hidden" id="friendSeq" value="${friendDTO.seq}">
			<input type="hidden" id="friendId" value="${friendDTO.id}"> <input
				type="hidden" id="friendIs_domestic"
				value="${friendDTO.is_domestic}"> <input type="hidden"
				id="friendDate_start" value="${friendDTO.dateStart}"> <input
				type="hidden" id="friendDate_end" value="${friendDTO.dateEnd}">
			<input type="hidden" id="friendDate_of_issue"
				value="${friendDTO.date_of_issue}"> <input type="hidden"
				id="username" value="${userDetail.username}">
		</div>

		<!-- 용주형 이거 큰틀 없어서 예시로 박아놨어요 ㅎㅎ -->
		<div id="routeTitle" style="display: inline-block;">
			<h1 style="margin: 0;">${friendDTO.title }</h1>
			<br /> <strong>${friendDTO.id }</strong> <br /> <span>${friendDTO.dateStart }
				~ ${friendDTO.dateEnd }</span>
		</div>

		<div class="map-wrap">
			<div id="map"></div>
		</div>
		
		<c:if test="${userDetail.seq eq friendDTO.seq}">
			<button type="button" id="btn-modify" onclick="goModify(${friendDTO.fno})">수정</button>
			<button type="button" id="btn-delete">삭제</button>
		</c:if>

		<div class="content-wrap">
			<ul class="content-group">
				<c:forEach var="friendRouteDTO"
					items="${friendDTO.friendRouteDTOs }" varStatus="status">
					<li>
						<div class="content-item" data-lat="${friendRouteDTO.lat }"
							data-lng="${friendRouteDTO.lng } ">
							<p class="place">${friendRouteDTO.city}</p>
							<p class="date">
								<span class="from"> ${friendRouteDTO.dateStart} </span> <span
									class="to"> ${friendRouteDTO.dateEnd} </span>
							</p>
							<div class="content-detail">
								<p>${friendRouteDTO.content}</p>
								<div class="button-wrap">
									<!-- 자신의 글과 비교하여 한 개만 렌더링 -->
									<c:if test="${userDetail.seq ne friendDTO.seq}">
										<button type="button" class="btn-try"
											id="${friendRouteDTO.fcno}">신청</button>
									</c:if>
									<c:if test="${userDetail.seq eq friendDTO.seq }">
										<button type="button" class="btn-apply-check"
											id="${friendRouteDTO.fcno }">신청확인</button>
									</c:if>
									<!-- <button>신청확인</button> -->
									<!-- 자신의 글과 비교하여 한 개만 렌더링 -->
								</div>
							</div>
							<ul class="request-group"></ul>
						</div>
					</li>
				</c:forEach>
			</ul>
		</div>
	</div>
	<!-- 메인 컨텐츠 영역 -->

	<%-- <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
		<!-- 동행 신청서 Modal -->
		<div id="requestWriteModal" style="display: none;">
			<!-- 형 여기 모달 해석 불가능해서 일단 디스플레이 논 때려놨어용 -->
			<!-- <div class="tmodal-back"> -->
			<div class="tmodal">
				<div class="tmodal-bar">
					<h4 class="modal-title">신청 글쓰기</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="tmodal-body">
					<form id="requestForm" action="">
						<input type="hidden" name="fcno" id="fcno"> <input
							type="hidden" name="seq" id="seq" value="${userDetail.seq }">
						<input type="hidden" name="id" id="id" value="${userDetail.id }">
						<table class="table">
							<tr>
								<td>동행 시작일</td>
								<td><input type="date" name="dateStart" id="req-start-date"></td>
							</tr>
							<tr>
								<td>동행 종료일</td>
								<td><input type="date" name="dateEnd" id="req-end-date"></td>
							</tr>
							<tr>
								<td>신청 내용</td>
								<td><textarea rows="10" cols="70" name="content" id="req-content"></textarea></td>
							</tr>
							<tr>
								<td colspan="2" align="center">
									<button type="button" class="btn btn-success"
										id="req-btn-try">신청하기</button>
								</td>
							</tr>
						</table>
					</form>
				</div>

				<!-- <div class="modal-footer">
						<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
					</div> -->
			</div>
			<!-- </div> -->

		</div>
	</sec:authorize> --%>
	<%@include file="../common/footer.jsp"%>
	<%@include file="../common/foot-js.jsp"%>
	<!-- Google Map -->
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY"
		async defer></script>
	<!-- &callback=initMap -->
	<!-- Kakao Map -->
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=58d9a72c9db8da0b849a32734093767e"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/friend/view2.js"></script>
</body>
</html>
