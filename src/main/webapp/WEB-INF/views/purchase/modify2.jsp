<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/purchase/write.css">
    <title>사다주세요</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="container-wrap">
    <form action="" id="purchaseModify" method="post" class="write-form">
        <div class="hidden">
            <input type="hidden" id="con" name="con" value="${purchaseDTO.con }">
            <input type="hidden" id="bno" name="bno" value="${purchaseDTO.bno }">
        </div>

        <div class="input-wrap">
            <label for="title">제목</label>
            <input type="text" id="title" name="title" class="v" value="${purchaseDTO.title }"/>
            <div class="v-feed"></div>
            <div class="iv-feed"></div>
        </div>

        <div class="input-wrap">
            <label for="location">여행지역</label>
            <input type="text" id="location" name="location" class="v" value="${purchaseDTO.location }"/>
            <div class="v-feed"></div>
            <div class="iv-feed"></div>
        </div>

        <div class="input-wrap">
            <label for="date-start">여행 시작일</label>
            <input type="date" id="date-start" name="dateStart" class="v" value="${purchaseDTO.dateStart}"/>
            <div class="v-feed"></div>
            <div class="iv-feed"></div>
        </div>

        <div class="input-wrap">
            <label for="date-end">여행 종료일</label>
            <input type="date" id="date-end" name="dateEnd" class="v" value="${purchaseDTO.dateEnd}"/>
            <div class="v-feed"></div>
            <div class="iv-feed"></div>
        </div>

        <div class="input-wrap">
            <label for="content">상세내용</label>
            <textarea id="content" name="content">${purchaseDTO.content }</textarea>
            <div class="v-feed"></div>
            <div class="iv-feed"></div>
        </div>

        <div class="button-wrap">
            <button id="updateBtn" type="button" class="btn btn-tsave">저장</button>
        </div>
    </form>
</div>


<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/purchase/modify.js"></script>
</body>
</html>
