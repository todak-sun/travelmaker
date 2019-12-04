<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<%@include file="../common/head-meta.jsp" %>
<%@include file="../common/head-css.jsp" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/main/mypage.css">
<head>
    <title>마이페이지</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="hidden">
    <input type="hidden" value="">
</div>
<div class="container-wrap">
    <nav class="lnb-side">
        <ul class="menu-group">
            <li><a href="#" data-page="my-article" class="on">내가 쓴 글</a></li>
            <li><a href="#" data-page="my-alarm">알림 모아보기</a></li>
            <li><a href="#" data-page="my-info">나의 정보보기</a></li>
            <li><a href="#" data-page="my-payment">나의 결제정보</a></li>
        </ul>
    </nav>
    <section class="main-wrap">
    </section>
</div>
<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/main/mypage.js"></script>
</body>
</html>
