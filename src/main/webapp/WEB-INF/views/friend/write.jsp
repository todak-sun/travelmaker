<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>동행 글쓰기</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/friend/write.css" />
</head>
<body>
	<h2>동행 글쓰기(큰틀)</h2>
	<br />
	<form name="writeForm" id="writeForm" action="/friend/setWrite" method="post">
		<input type="hidden" name="is_domestic" value="${is_domestic }">

		<table class="table">
			<thead>
				<tr>
					<th>제목</th>
					<td>
						<input type="text" name="title" id="title" placeholder="제목을 입력하세요." style="width: 400px;">
						<div id="titleDiv"></div>
					</td>
				</tr>
				<tr>
					<th>작성자</th>
					<td>
						<input type="text" name="nickname" readonly="readonly" value="갓수1">
					</td>
				</tr>
				<tr>
					<th>여행 시작일</th>
					<td>
						<input type="date" name="date_start" id="date_start">
						<div id="date_startDiv"></div>
					</td>
				</tr>
				<tr>
					<th>여행 종료일</th>
					<td>
						<input type="date" name="date_end" id="date_end">
						<div id="date_endDiv"></div>
					</td>
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