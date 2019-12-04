<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/purchase/view2.css">
    <title>사다주세요</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>

<sec:authentication var="userDetail" property="principal"/>
<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
    <div class="hidden">
        <input type="hidden" id="bno" value="${purchaseDTO.bno}">
        <input type="hidden" id="request-user-seq" value="${purchaseDTO.writeUserSeq}">
        <input type="hidden" id="nickname" value="${userDetail.nickname}">
        <input type="hidden" id="seq" value="${userDetail.seq}">
        <input type="hidden" id="id" value="${userDetail.id}">
        <input type="hidden" id="username" value="${userDetail.username}"/>
    </div>
</sec:authorize>

<div class="container-wrap">
    <div class="write-form">
        <div class="input-wrap">
            <label for="title">제목</label>
            <input type="text" id="title" value="${purchaseDTO.title}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="author">여행자</label>
            <input type="text" id="author" value="${purchaseDTO.nickname}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="location">여행지</label>
            <input type="text" id="location" value="${purchaseDTO.location}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="date">여행기간</label>
            <p id="date" class="date">
                <span class="from">${purchaseDTO.dateStart}</span>
                <span class="to">${purchaseDTO.dateEnd}</span>
            </p>
        </div>

        <div class="input-wrap textarea">
            <label for="content">상세내용</label>
            <textarea id="content" name="content" readonly>${purchaseDTO.content}</textarea>
        </div>

        <div class="button-wrap">
            <sec:authorize access="isAuthenticated()">
                <c:if test="${userDetail.seq ne purchaseDTO.writeUserSeq}">
                    <button id="btn-try" type="button" class="btn btn-tsave">신청하기</button>
                </c:if>
                <c:if test="${userDetail.seq eq purchaseDTO.writeUserSeq}">
                    <button id="btn-check" type="button" class="btn btn-tsave">신청확인</button>
                    <button id="btn-modify" type="button" class="btn btn-tsave">수정</button>
                    <button id="btn-delete" type="button" class="btn btn-tsave">삭제</button>
                </c:if>
            </sec:authorize>
        </div>
    </div>

    <div class="content-wrap">
        <ul class="content-group"></ul>
    </div>
</div>
<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/purchase/view2.js"></script>
</body>
</html>
