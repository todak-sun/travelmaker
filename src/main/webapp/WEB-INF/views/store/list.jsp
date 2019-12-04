<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<meta charset="UTF-8">
<title>스토어 리스트</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/store/list.css">
</head>
<body>
	<input type="hidden" id="pg" value="${pg }">
	<div id="result"></div>
	<div id="paging" style="text-align: center;"></div>

	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/common/jquery-3.4.1.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/store/list.js"></script>
</body>
</html>