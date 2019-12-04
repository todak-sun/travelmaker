<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/purchase/list.css">
    <title>대리구매 리스트</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<!-- 메인 컨텐츠 영역 -->
<input type="hidden" id="pg" value="${pg}">
<div class="container-wrap">

    <div class="header-back">
        <div class="header">
            <div class="description"></div>
            <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
                <div class="button-wrap">
                    <button id="btn-purchase-write" type="button">글쓰기</button>
                </div>
            </sec:authorize>
        </div>
    </div>

    <ul class="pur-group"></ul>

    <ul class="page-group"></ul>
</div>
<!-- 메인 컨텐츠 영역 -->
<%@include file="../common/footer.jsp"%>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/purchase/list.js"></script>
</body>
</html>