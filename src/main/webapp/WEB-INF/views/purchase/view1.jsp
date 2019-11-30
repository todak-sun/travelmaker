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

			<sec:authentication var="userDetail" property="principal" />
			<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
				<div class="hidden">
					<input type="hidden" id="loginNickname"
						value="${userDetail.nickname }"> <input type="hidden"
						id="nickname" value="${purchaseDTO.nickname }"> <input
						type="hidden" id="bno" value="${purchaseDTO.bno }">
						<input type="hidden" id="username"
						value="${userDetail.username }">
				</div>
			</sec:authorize>

			<!-- 용주형 이거 큰틀 없어서 예시로 박아놨어요 ㅎㅎ -->
			<div class="input-wrap">
				<label for="title">제목 : ${purchaseDTO.title }</label>
			</div>
			<div class="input-wrap">
				<label for="title">요청자 : ${purchaseDTO.nickname }</label>
			</div>
			<div class="input-wrap">
				<label for="productname">상품명 : ${purchaseDTO.productname }</label>
			</div>
			<div class="input-wrap">
				<label for="price">예상가격 : ${purchaseDTO.price }</label>
			</div>

			<div class="input-wrap">
				<label for="quantity">수량 : ${purchaseDTO.quantity }</label>
			</div>
			<div class="input-wrap">
				<label for="location">구매지역 : ${purchaseDTO.location }</label>
			</div>

			<div class="input-wrap">
				<label for="date-end">배송기한 : ${purchaseDTO.dateEnd }</label>
			</div>

			<div class="input-wrap">
				<label for="content">상세내용</label><br>
				<textarea cols="50" rows="10" id="content" name="content" readonly>${purchaseDTO.content }</textarea>
			</div>



			<div class="button-wrap"></div>


			<div class="content-wrap" style="display:none;">
				<ul class="content-group">

				</ul>
			</div>

		</div>
	</div>

	<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
		<!-- 사다주세요 신청서 Modal -->
		<div id="requestWriteModal" style="display: none;">
			<div class="tmodal">
				<div class="tmodal-bar">
					<h4 class="modal-title">신청 글쓰기</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="tmodal-body">
					<form id="requestForm" action="">
						<input type="hidden" name="bno" id="bno"
							value="${purchaseDTO.bno }"> <input type="hidden"
							name="nickname" id="nickname" value=" ${userDetail.nickname }">
						<input type="hidden" name="requestUserSeq" id="requestUserSeq"
							value="${userDetail.seq }">
						<%-- <input type="hidden" name="id" id="id" value="${userDetail.id }"> --%>
						<table class="table">
							<tr>
								<td>신청 내용</td>
								<td><textarea rows="10" cols="70" name="content"
										id="req-content"></textarea></td>
							</tr>
							<tr>
								<td colspan="2" align="center">
									<button type="button" class="btn btn-success" id="req-btn-try">신청하기</button>
								</td>
							</tr>
						</table>
					</form>
				</div>

				<!-- <div class="modal-footer">
						<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
					</div> -->
			</div>
			<!-- </div> -->

		</div>
	</sec:authorize>

	<%@include file="../common/foot-js.jsp"%>
	<script
		src="${pageContext.request.contextPath}/resources/js/purchase/view.js"></script>
</body>
</html>
