<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<title>동행 글쓰기</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/friend/write.css" />
</head>
<body>
	<input type="hidden" id="csrfTokenName" value="${_csrf.parameterName}" />
	<input type="hidden" id="csrfTokenValue" value="${_csrf.token}" />
	
	<sec:authentication var="userDetail" property="principal" />
	
	<h2>동행 글쓰기(큰틀)</h2>
	<br />
	<form name="writeForm" id="writeForm" action="/friend/setWrite"
		method="post">
		<input type="hidden" name="is_domestic" value="${is_domestic }">
		<input type="hidden" name="seq" value="${userDetail.seq }">

		<table class="table">
			<thead>
				<tr>
					<th>제목</th>
					<td><input type="text" name="title" id="title"
						placeholder="제목을 입력하세요." style="width: 400px;">
						<div id="titleDiv"></div></td>
				</tr>
				<tr>
					<th>아이디</th>
					<td>
						<input type="text" name="id" readonly="readonly"
						value="${userDetail.id }"></td>
				</tr>
				<tr>
					<th>여행 시작일</th>
					<td><input type="date" name="date_start" id="date_start">
						<div id="date_startDiv"></div></td>
				</tr>
				<tr>
					<th>여행 종료일</th>
					<td><input type="date" name="date_end" id="date_end">
						<div id="date_endDiv"></div></td>
				</tr>
			</thead>
		</table>
		<button type="button" class="btn btn-success" id="nextBtn">다음</button>
		<button type="button" class="btn btn-danger" id="cancel">취소</button>
	</form>

	<script
		src="${pageContext.request.contextPath}/resources/js/common/jquery-3.4.1.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/common/popper.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/common/bootstrap.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/friend/write.js"></script>
</body>
</html>