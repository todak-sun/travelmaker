<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/friend/view2.css"/>
    <title>동행계시글</title>
</head>
<body>
<<<<<<< Updated upstream
<%@include file="../common/navbar2.jsp" %>
<div class="container-wrap">
    ${friendDTO}
    <div class="info-wrap">
        <h1>${friendDTO.title}</h1>
        <p class="date">
            <span class="from">${friendDTO.dateStart}</span>
            <span class="to">${friendDTO.dateEnd}</span>
        </p>
    </div>
    <div class="map-wrap">
        <img src="${pageContext.request.contextPath}/resources/img/front-map.png" alt=""/>
    </div>
    <div class="content-wrap">
        <ul class="content-group">
            <!-- 상세계획 한개 -->
            <li>
                <div class="content-item">
                    <p class="place">서울특별시 강남대로</p>
                    <p class="date">
                        <span class="from">2018.01.01</span>
                        <span class="to">2018.01.02</span>
                    </p>
                    <div class="content-detail">
                        <p>저는 이번여행에서 정말 대단한 발견을 하고 올것임.</p>
                        <div class="button-wrap">
                            <!-- 자신의 글과 비교하여 한 개만 렌더링 -->
                            <button class="btn-try">신청</button>
                            <!-- <button>신청확인</button> -->
                            <!-- 자신의 글과 비교하여 한 개만 렌더링 -->
                        </div>
                    </div>
                    <ul class="request-group"></ul>
                </div>
            </li>
            <!-- 상세계획 한개 -->
            <!-- 상세계획 한개 -->
            <li>
                <div class="content-item">
                    <p class="place">서울특별시 강남대로</p>
                    <p class="date">
                        <span class="from">2018.01.01</span>
                        <span class="to">2018.01.02</span>
                    </p>
                    <div class="content-detail">
                        <p>저는 이번여행에서 정말 대단한 발견을 하고 올것임.</p>
                        <div class="button-wrap">
                            <!-- 자신의 글과 비교하여 한 개만 렌더링 -->
                            <button>신청확인</button>
                            <!-- 자신의 글과 비교하여 한 개만 렌더링 -->
                        </div>
                    </div>
                    <ul class="request-group">
                        <!-- 신청그룹 한 개 -->
                        <li>
                            <div class="request-item">
                                <div class="user-area">
                                    <div class="image-wrap">
                                        <img src="https://source.unsplash.com/collection/190727/80x80" alt=""/>
                                    </div>
                                    <p class="author">닉네임</p>
                                </div>
                                <div class="content-area">
                                    <p class="date">
                                        <span class="from">2018.01.01</span>
                                        <span class="to">2018.01.02</span>
                                    </p>
                                    <div class="content-detail">
                                        <p>저도 그 발견을 함께하고 싶네요.</p>
                                        <div class="button-wrap">
                                            <button class="btn btn-tsave">수락</button>
                                            <button class="btn btn-tdanger">거절</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- 신청그룹 한 개 -->
                        <!-- 신청그룹 한 개 -->
                        <li>
                            <div class="request-item">
                                <div class="user-area">
                                    <div class="image-wrap">
                                        <img src="https://source.unsplash.com/collection/190727/80x80" alt=""/>
                                    </div>
                                    <p class="author">닉네임</p>
                                </div>
                                <div class="content-area">
                                    <p class="date">
                                        <span class="from">2018.01.01</span>
                                        <span class="to">2018.01.02</span>
                                    </p>
                                    <div class="content-detail">
                                        <p>저도 그 발견을 함께하고 싶네요.</p>
                                        <div class="button-wrap">
                                            <button class="btn btn-tsave">수락</button>
                                            <button class="btn btn-tdanger">거절</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- 신청그룹 한 개 -->
                    </ul>
                </div>
            </li>
            <!-- 상세계획 한개 -->
        </ul>
    </div>
</div>
<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/friend/view2-1.js"></script>
=======
	<sec:authentication var="userDetail" property="principal" />
	<input type="hidden" id="friendFno" value="${friendDTO.fno }">
	<input type="hidden" id="friendSeq" value="${friendDTO.seq }">
	<input type="hidden" id="friendId" value="${friendDTO.id }">
	<input type="hidden" id="friendIs_domestic"
		value="${friendDTO.is_domestic }">
	<input type="hidden" id="friendDate_start"
		value="${friendDTO.dateStart }">
	<input type="hidden" id="friendDate_end" value="${friendDTO.dateEnd }">
	<input type="hidden" id="friendDate_of_issue"
		value="${friendDTO.date_of_issue }">
	<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
		<input type="hidden" id="username" value="${userDetail.username }">
	</sec:authorize>
	<h2>동행 뷰</h2>

	<div id="routeContent"
		style="width: 1400px; height: 100%; text-align: center; background-color: white; margin: 100px;">
		<div id="routeTitle" style="display: inline-block;">
			<h1 style="margin: 0;">${friendDTO.title }</h1>
			<br /> <strong>${friendDTO.id }</strong> <br /> <span>${friendDTO.dateStart }
				~ ${friendDTO.dateEnd }</span>
		</div>
		<hr style="width: 100%;">
		<div id="mapContent"
			style="width: 100%; height: 400px; text-align: center;">
			<div id="map"></div>
		</div>
	</div>
	<div id="applyContent"></div>

	<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
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
									<td><input type="date" name="dateStart"></td>
								</tr>
								<tr>
									<td>동행 종료일</td>
									<td><input type="date" name="dateEnd"></td>
								</tr>
								<tr>
									<td>신청 내용</td>
									<td><textarea rows="10" cols="70" name="content"></textarea></td>
								</tr>
								<tr>
									<td colspan="2" align="center">
										<button type="button" class="btn btn-success"
											id="requestSaveBtn">신청하기</button>
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
	</sec:authorize>
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
	<!-- 웹 소켓 -->
	<script src="http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/friend/view.js"></script>
>>>>>>> Stashed changes
</body>
</html>