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
			<!-- 메인 컨텐츠 영역 -->
			<form action="" id="purchaseModify" method="post"
				class="editor-first">
				<input type="hidden" id="con" name="con"value="${purchaseDTO.con }">
				<input type="hidden" id="bno" name="bno" value="${purchaseDTO.bno }">


				<div class="input-wrap">
					<label for="title">제목 : </label> <input type="text" id="title"
						name="title" class="v" value="${purchaseDTO.title }" />
				</div>
				<div class="input-wrap">
					<label for="productname">상품명 :</label> <input type="text"
						id="productname" name="productname" class="v"
						value="${purchaseDTO.productname }" />
				</div>
				<div class="input-wrap">
					<label for="price">예상가격 :</label> <input type="text" id="price"
						name="price" class="v" value="${purchaseDTO.price }" />
				</div>

				<div class="input-wrap">
					<label for="quantity">수량 : </label> <input type="text"
						id="quantity" name="quantity" class="v"
						value="${purchaseDTO.quantity }" />
				</div>
				<div class="input-wrap">
					<label for="location">구매지역 : </label> <input type="text"
						id="location" name="location" class="v"
						value="${purchaseDTO.location }" />
				</div>

				<div class="input-wrap">
					<label for="date-end">배송기한 : </label> <input type="date"
						id="date-end" name="dateEnd" class="v" />
					<div class="v-feed"></div>
					<div class="iv-feed"></div>
				</div>

				<div class="input-wrap">
					<label for="content">상세내용</label><br>
					<textarea cols="50" rows="10" id="content" name="content">${purchaseDTO.content }</textarea>
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
