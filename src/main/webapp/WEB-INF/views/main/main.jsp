<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/main/main.css"/>
    <title>메인페이지</title>
</head>
<body>
<<<<<<< Updated upstream
<%@include file="../common/navbar2.jsp" %>

<div class="container-wrap">
    <section class="sec-main">
        <div class="sec-main-content">
            <h2>여행을 더 즐겁게!</h2>
            <p>Travel Maker와 함께하세요</p>
        </div>
    <sec:authorize access="!isAuthenticated()">
        <button class="btn-login">시작하기</button>
    </sec:authorize>
    </section>
    <section class="sec-story"></section>
    <section></section>
</div>
<%@include file="../common/footer.jsp"%>
<%@include file="../common/foot-js.jsp" %>
=======
<<<<<<< HEAD
	<input type="hidden" id="csrfTokenName" value="${_csrf.parameterName}" />
	<input type="hidden" id="csrfTokenValue" value="${_csrf.token}" />
	
	<!-- 네비게이션 영역 시작 -->
	<nav id="main-nav"
		class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
		<a id="main-logo" href="#" class="navbar-brand">로고</a>
		<button class="btn btn-outline-light navbar-toggler" type="button"
			data-toggle="collapse" data-target="#inner-main-nav"
			aria-controls="inner-main-nav" aria-expanded="false"
			aria-label="Toggle navigation">메뉴</button>
		<div id="inner-main-nav" class="collapse navbar-collapse">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item"><a id="link-review" class="nav-link"
					href="/story/list">글목록</a></li>
				<li class="nav-item"><a class="nav-link" href="#">스토어</a></li>
				<li class="nav-item"><a id="link-list" class="dropdown-toggle"
					data-toggle="dropdown" href="#">커뮤니티<span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="#">대리구매</a></li>
						<li><a href="/friend/list/1">동행 구하기</a></li>
					</ul></li>
				<sec:authentication var="userDetail" property="principal" />
				<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
					<%-- <p>어서와 방갑다 ${fn:substringBefore(user.username,"%")} 쉬볼세끼야</p> --%>
					<p>${userDetail.id}</p>
				</sec:authorize>
			</ul>
			<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
			<img src="../../../resources/img/alarm/alarmOff.png" id="alarmOff" data-seq="${userDetail.seq}" height="30" width="30">
			<img src="../../../resources/img/alarm/alarmON.jpg" id="alarmOn" data-seq="${userDetail.seq}" height="30" width="30" style="display: none;">
			</sec:authorize>
			<button id="btn-write" class="btn btn-outline-light">글쓰기</button>
			<div class="btn-group" role="group">
				<button id="btn-user" class="dropdown-toggle btn btn-outline-light"
					type="button" data-toggle="dropdown" aria-expanded="false">
					사용자</button>
				<div class="dropdown-menu dropdown-menu-lg-right"
					aria-labelledby="btn-user">
					<sec:authentication var="user" property="principal" />
					<sec:authorize access="!isAuthenticated()">
						<button id="btn-login" class="dropdown-item">로그인</button>
						<button id="btn-regist" class="dropdown-item">회원가입</button>
					</sec:authorize>
					<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
						<div id="logoutDiv">
							<form action="/logout" method="post" id="logoutForm">
								<input type="hidden" name="${_csrf.parameterName}"
									value="${_csrf.token}" />
							</form>
						</div>
						<button id="btn-logout" class="dropdown-item"
							onclick="javascript:logoutSubmit()">로그아웃</button>
						<button id="btn-myinfo" class="dropdown-item"
							onclick="javascript:mypageGo('${user.username}')">내 정보</button>
					</sec:authorize>
				</div>
			</div>
		</div>
	</nav>
	<!-- 네비게이션 영역 끝 -->

	<div id="modal-area" class="modal" tabindex="-1" role="dialog"></div>
=======
<%@include file="../common/navbar2.jsp" %>
>>>>>>> 3fb8553d71ee68629160b3597a957197aa8473a1

<div class="container-wrap">
    <section class="sec-main">
        <div class="sec-main-content">
            <h2>여행을 더 즐겁게!</h2>
            <p>Travel Maker와 함께하세요</p>
        </div>
    <sec:authorize access="!isAuthenticated()">
        <button class="btn-login">시작하기</button>
    </sec:authorize>
    </section>
    <section class="sec-story"></section>
    <section></section>
</div>

<<<<<<< HEAD
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<div id="alarmDisplay"  style="display: none;">
		<div id="alarmBtnDisplay"></div>
		<input type="button" value="닫기" id="closeAlarm"><br>
	</div>


</body>
<script src="../../../resources/js/common/jquery-3.4.1.js"></script>
<script src="../../../resources/js/common/bootstrap.js"></script>
<script src="http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"></script>
<script src="../../../resources/js/websocket/websocket.js"></script>
<script src="../../../resources/js/main/main.js"></script>
<script type="text/javascript" src="../../../resources/js/user/user.js"></script>
=======
<!-- 푸터 영역 -->
<footer></footer>
<!-- 푸터 영역 -->
<%@include file="../common/foot-js.jsp" %>
>>>>>>> 3fb8553d71ee68629160b3597a957197aa8473a1
>>>>>>> Stashed changes
</body>
</html>
