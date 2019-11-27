<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!-- 헤더, 네비게이션 영역 -->
<div class="header-wrap">
	<header>
		<div class="hidden">
			<sec:authentication var="userDetail" property="principal" />
			<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
				<input type="hidden" id="seq" value="${userDetail.seq}" />
				<form action="/logout" method="post" id="logoutForm">
					<input type="hidden" name="${_csrf.parameterName}"
						value="${_csrf.token}">
				</form>
			</sec:authorize>
			<input type="hidden" id="csrfTokenName"
				value="${_csrf.parameterName}" /> <input type="hidden"
				id="csrfTokenValue" value="${_csrf.token}" />
		</div>
		<a href="${pageContext.request.contextPath}/">
			<div class="logo"></div>
		</a>
		<nav class="gnb-wrap">
			<ul class="gnb-group">
				<li class="gnb-item"><a href="/story/list">여행 이야기</a></li>
				<li class="gnb-item"><a href="">스토어</a></li>
				<li class="gnb-item"><a href="/friend/list/1">동행</a></li>
				<li class="gnb-item"><a href="">대리구매</a></li>
			</ul>
		</nav>
		<div class="header-group">
			<div class="search-bar">
				<div class="search-wrap">
					<input type="text" class="input-search" placeholder="검색..." />
				</div>
				<button type="button" class="search-btn">
					<img
						src="${pageContext.request.contextPath}/resources/img/search.svg"
						alt="검색" />
				</button>
			</div>
			<sec:authentication var="userDetail" property="principal" />
			<sec:authorize access="!isAuthenticated()">
				<button type="button" class="btn btn-header btn-login">로그인
				</button>
			</sec:authorize>
			<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
				<button type="button" class="btn btn-header"
					onclick="logoutSubmit()">로그아웃</button>
				<img src="../../../resources/img/alarm/alarmOff.png" id="alarmOff"
					data-seq="${userDetail.seq}" height="30" width="30">
				<img src="../../../resources/img/alarm/alarmON.jpg" id="alarmOn"
					data-seq="${userDetail.seq}" height="30" width="30"
					style="display: none;">
			</sec:authorize>
		</div>

		<div id="alarmDisplay" style="display: none;">
			<div id="alarmBtnDisplay"></div>
			<input type="button" value="닫기" id="closeAlarm"><br>
		</div>
	</header>
</div>
<div id="modal"></div>
<!-- 헤더, 네비게이션 영역 -->