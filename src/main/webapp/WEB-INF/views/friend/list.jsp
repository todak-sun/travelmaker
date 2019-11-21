<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<title>동행 리스트</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/friend/list.css" />
</head>
<body>
	<div id="container">
		<br />
		<h2>동행 리스트</h2>
		<br />
		<table class="table">
			<thead>
				<tr>
					<th>번호</th>
					<th>이름</th>
					<th>제목</th>
					<th>여행기간</th>
					<th>마감유무</th>
				</tr>
			</thead>
			<tbody id="dataTable">

			</tbody>
		</table>
		<br />
		<button type="button" id="writeBtn" class="btn btn-dark"
			data-toggle="modal" data-target="#friendModal">글 쓰기</button>
	</div>

	<div class="modal" id="friendModal">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header" id="modal-header">
					<h4 class="modal-title">동행 글쓰기</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					<div class="imgContainer">
						<div class="row">
							<content1 class="col-md-8 col-lg-8 col-sm-8">
							<figure>
								<a href="/friend/write/1"> <img alt="국내"
									src="${pageContext.request.contextPath}/resources/img/friend/list/domesticBtn.jpg"
									class="rounded img-responsive" width="304" height="236"
									valign="absmiddle">
									<div class="overlay">
										<div class="description">국 내</div>
									</div>
								</a>
							</figure>
							</content1>

							<content2 class="col-md-8 col-lg-8 col-sm-8">
							<figure>
								<a href="/friend/write/0"> <img alt="해외"
									src="${pageContext.request.contextPath}/resources/img/friend/list/overseasBtn.jpg"
									class="rounded" width="304" height="236" valign="absmiddle">
									<div class="overlay">
										<div class="description">해 외</div>
									</div>
								</a>
							</figure>
							</content2>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
			</div> -->

		</div>
	</div>

	<script
		src="${pageContext.request.contextPath}/resources/js/common/jquery-3.4.1.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/common/popper.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/common/bootstrap.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/friend/list.js"></script>
</body>
</html>