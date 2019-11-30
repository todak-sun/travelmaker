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
				<input type="hidden" id="loginNickname" value="${userDetail.nickname }">
				<input type="hidden" id="nickname" value="${purchaseDTO.nickname }">
				<input type="hidden" id="bno" value="${purchaseDTO.bno }">
			</div>
			</sec:authorize>

			<!-- 용주형 이거 큰틀 없어서 예시로 박아놨어요 ㅎㅎ -->
			<div class="input-wrap">
				<label for="title">제목 : ${purchaseDTO.title }</label>
			</div>
			<div class="input-wrap">
				<label for="title">여행자 : ${purchaseDTO.nickname }</label>
			</div>

			<div class="input-wrap">
				<label for="location">여행지역 : ${purchaseDTO.location }</label>
			</div>

			<div class="input-wrap">
				<label for="date-end">여행기한 : ${purchaseDTO.dateStart } ~
					${purchaseDTO.dateEnd } </label>
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
								<td>상품명</td>
								<td><input type="text" name="productname"></td>
							</tr>
							<tr>
								<td>수량</td>
								<td><input type="number" name="quantity" min="1" max="100" step="1" value="1"></td>
							</tr>
							<tr>
								<td>예상가격</td>
								<td><input type="text" id="price" name ="price"></td>
							</tr>

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
		src="${pageContext.request.contextPath}/resources/js/purchase/view2.js"></script>
</body>
</html>
