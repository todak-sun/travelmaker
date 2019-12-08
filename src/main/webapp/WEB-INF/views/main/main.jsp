<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/main/main.css"/>
    <title>메인페이지</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>

<div class="container-wrap">
    <section class="sec-main">
        <div class="sec-main-content">
            <h2>여행을 더 즐겁게!</h2>
            <p>Travel Maker와 함께하세요</p>
        </div>
        <sec:authorize access="!isAuthenticated()">
            <button class="btn-login">시작하기</button>
        </sec:authorize>
    </section>

    <article class="content-area">
        <div class="banner-wrap">
            <h2>멋진 이야기를 읽어보세요!</h2>
        </div>
        <section class="sec-story">
            <ul class="story-group"></ul>
        </section>
        <div class="banner-wrap">
            <h2>여행, 함께가는 건 어떠세요?</h2>
        </div>
        <section class="sec-friend">
            <ul class="friend-group"></ul>
        </section>
        <div class="banner-wrap">
            <h2>올 때 빈손으로 오시게? 뭐좀 들고와요~</h2>
        </div>
        <section class="sec-purchase">
            <ul class="pur-group"></ul>
        </section>
    </article>
</div>
<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/main/main.js"></script>
</body>
</html>
