<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<meta charset="UTF-8">
<title>스토어 호텔 뷰</title>
</head>
<body>
	<input type="hidden" id="hnb" value="${hnb }">
	
	<table border="3">
		<tr id="imgTr"></tr>
	</table>
	<table border="3" id="viewTable">

	</table>
	
	<a id="reservationBtn"><button type="button">예약하러가기</button></a>

	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/common/jquery-3.4.1.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/store/view.js"></script>
</body>
</html>