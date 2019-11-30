<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
<%@include file="../common/head-meta.jsp"%>
<%@include file="../common/head-css.jsp"%>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/friend/write2.css">
<title>수정</title>
</head>
<body>
	<%@include file="../common/navbar2.jsp"%>
	<input type="hidden" id="ds" value="${friendDTO.dateStart }">
	<input type="hidden" id="de" value="${friendDTO.dateEnd }">
	<div class="container-wrap">
		<div class="editor-zone">
			<form action="/friend/setModify" id="writeForm" class="editor-first">
				<div class="hidden">
					<sec:authentication var="userDetail" property="principal" />
					<input type="hidden" name="${_csrf.parameterName}"
						value="${_csrf.token}" /> <input type="hidden" name="id"
						value="${userDetail.id}"> <input type="hidden" name="seq"
						value="${userDetail.seq}"> <input type="hidden"
						name="is_domestic" value="${is_domestic}">
					<input type="hidden" id="fno" name="fno" value="${friendDTO.fno }">
				</div>

				<div class="input-wrap">
					<label for="title">제목</label> <input type="text" id="title"
						name="title" class="v" value="${friendDTO.title }" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>
				<div class="input-wrap">
					<label for="date-start">여행 시작일</label> <input type="date"
						id="date-start" name="dateStart" class="v"/>
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>
				<div class="input-wrap">
					<label for="date-end">여행 종료일</label> <input type="date"
						id="date-end" name="dateEnd" class="v"/>
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>
				<div class="button-wrap">
					<button id="next-btn" type="button" class="btn btn-travel">다음</button>
					<button id="cancel" class="btn btn-tdanger">취소</button>
				</div>
			</form>
		</div>
	</div>
	<%@include file="../common/footer.jsp"%>
	<%@include file="../common/foot-js.jsp"%>
	<script
		src="${pageContext.request.contextPath}/resources/js/friend/modify.js"></script>
</body>
</html>