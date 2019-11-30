<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<html>
<head>
<%@include file="../common/head-meta.jsp"%>
<%@include file="../common/head-css.jsp"%>
<title>사다주세요</title>
</head>
<body>
	<%@include file="../common/navbar2.jsp"%>
	<div class="container-wrap">
		<div class="editor-zone">
			<form action="" id="purchaseModify" method="post"
				class="editor-first">
				<input type="hidden" id="con" name="con"value="${purchaseDTO.con }">
				<input type="hidden" id="bno" name="bno" value="${purchaseDTO.bno }">
				
				<div class="input-wrap">
					<label for="title">제목</label> <input type="text" id="title"
						name="title" class="v" value="${purchaseDTO.title }" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>

				<div class="input-wrap">
					<label for="location">여행지역</label> <input type="text" id="location"
						name="location" class="v" value="${purchaseDTO.location }" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>

				<div class="input-wrap">
					<label for="date-start">여행 시작일</label> <input type="date"
						id="date-start" name="dateStart" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>
				<div class="input-wrap">
					<label for="date-end">여행 종료일</label> <input type="date"
						id="date-end" name="dateEnd" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>

				<div class="input-wrap">
					<label for="content">상세내용</label>
					<textarea cols="50" rows="10" id="content" name="content">${purchaseDTO.content }</textarea>
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>

			</form>
			<input type="button" id="updateBtn" value="저장">
		</div>
	</div>



	<%@include file="../common/foot-js.jsp"%>
	<script
		src="${pageContext.request.contextPath}/resources/js/purchase/modify.js"></script>
</body>
</html>
