<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<html>
<head>
<%@include file="../common/head-meta.jsp"%>
<%@include file="../common/head-css.jsp"%>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/friend/write2.css">
<title>대행구매 작성</title>
</head>
<body>
	<%@include file="../common/navbar2.jsp"%>
	<div class="container-wrap">
		<div class="editor-zone">
			<form action="/pur/setWriteRequest" id="writeForm"
				class="editor-first" method="post">
				<div class="hidden">
					<sec:authentication var="userDetail" property="principal" />
					<input type="hidden" name="${_csrf.parameterName}"
						value="${_csrf.token}" /> <input type="hidden" name="nickname"
						value="${userDetail.nickname}"> <input type="hidden"
						name="writeUserSeq" value="${userDetail.seq}">
						<input type="hidden"
						name="username" value="${userDetail.username}"> <input
						type="hidden" name="con" value="1">
				</div>

				<div class="input-wrap">
					<label for="title">제목</label> <input type="text" id="title"
						name="title" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>
				<div class="input-wrap">
					<label for="productname">상품명</label> <input type="text"
						id="productname" name="productname" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>
				<div class="input-wrap">
					<label for="price">예상가격</label> <input type="text" id="price"
						name="price" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>

				<div class="input-wrap">
					<label for="quantity">수량</label> <input type="text" id="quantity"
						name="quantity" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>
				<div class="input-wrap">
					<label for="location">구매지역</label> <input type="text" id="location"
						name="location" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>

				<div class="input-wrap">
					<label for="date-end">배송기한</label> <input type="date" id="date-end"
						name="dateEnd" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>

				<div class="input-wrap">
					<label for="content">상세내용</label>
					<textarea cols="50" rows="10" id="content" name="content"></textarea>
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
	<%@include file="../common/foot-js.jsp"%>
	<script
		src="${pageContext.request.contextPath}/resources/js/purchase/write.js"></script>
</body>
</html>
