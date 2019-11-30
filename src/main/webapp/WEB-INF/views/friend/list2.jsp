<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<<<<<<< HEAD
<<<<<<< Updated upstream
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

=======
>>>>>>> Stashed changes
<!DOCTYPE html>
<html>
<head>
<%@include file="../common/head-meta.jsp"%>
<%@include file="../common/head-css.jsp"%>
<link rel="stylesheet"
<<<<<<< Updated upstream
	href="${pageContext.request.contextPath}/resources/css/friend/list2.css" />
=======
	href="${pageContext.request.contextPath}/resources/css/friend/list2.css">
>>>>>>> Stashed changes
<title>동행 리스트</title>
</head>
<body>
	<%@include file="../common/navbar2.jsp"%>
<<<<<<< Updated upstream
	<sec:authentication var="userDetail" property="principal" />
	<!-- 메인 컨텐츠 영역 -->
	<input type="hidden" id="pg" value="${pg }" />
	<input type="hidden" id="loginId" value="${userDetail.username }">
	
=======
	<!-- 메인 컨텐츠 영역 -->
	<input type="hidden" id="pg" value="${pg }">
>>>>>>> Stashed changes
	<div class="container-wrap">
		<div class="header-back">
			<div class="header">
				<div class="description"></div>
				<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
					<button id="btn-friend-write" type="button">동행 구하기</button>
				</sec:authorize>
			</div>
		</div>

		<div class="content-area">
<<<<<<< Updated upstream
			<ul class="content-group"></ul>
		</div>
		<br />
		<ul class="pagination justify-content-center"
			style="text-align: center;"></ul>
		<br />
	</div>
	<!-- 메인 컨텐츠 영역 -->
	<%@include file="../common/footer.jsp"%>
=======
			<ul class="content-group">

			</ul>
		</div>
		<br />
		<ul class="pagination justify-content-center" style="text-align: center;"></ul>
		<br />
	</div>
	<!-- 메인 컨텐츠 영역 -->
>>>>>>> Stashed changes
	<%@include file="../common/foot-js.jsp"%>
	<script
		src="${pageContext.request.contextPath}/resources/js/friend/list2.js"></script>
</body>
<<<<<<< Updated upstream
</html>
=======
=======
<!DOCTYPE html>
<html>
  <head>
    <%@include file="../common/head-meta.jsp"%> <%@include
    file="../common/head-css.jsp"%>
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/friend/list2.css"
    />
    <title>동행 리스트</title>
  </head>
  <body>
    <%@include file="../common/navbar2.jsp"%>
    <!-- 메인 컨텐츠 영역 -->
    <input type="hidden" id="pg" value="${pg }" />
    <div class="container-wrap">
      <div class="header-back">
        <div class="header">
          <div class="description"></div>
          <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
            <button id="btn-friend-write" type="button">동행 구하기</button>
          </sec:authorize>
        </div>
      </div>

      <div class="content-area">
        <ul class="content-group"></ul>
      </div>
      <br />
      <ul
        class="pagination justify-content-center"
        style="text-align: center;"
      ></ul>
      <br />
    </div>
    <!-- 메인 컨텐츠 영역 -->
    <%@include file="../common/footer.jsp"%>
    <%@include file="../common/foot-js.jsp"%>
    <script src="${pageContext.request.contextPath}/resources/js/friend/list2.js"></script>
  </body>
>>>>>>> parent of d38164a... 동행 수정
</html>
>>>>>>> Stashed changes
