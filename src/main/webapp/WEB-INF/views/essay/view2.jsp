<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<sec:authentication var="userDetail" property="principal"/>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/essay/view2.css">
    <title>에세이 글</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="hidden">
    <input id="rno" type="hidden" value="${essayDTO.rno}">
    <input id="bno" type="hidden" value="${essayDTO.bno}"/>
    <input id="essay-seq" type="hidden" value="${essayDTO.seq}"/>
    <sec:authorize access="isAuthenticated()">
        <input type="hidden" id="my-seq" value="${userDetail.seq}">
    </sec:authorize>
</div>
<!-- 메인 컨텐츠 영역 -->
<div class="container-wrap">
    <div class="header-back">
        <div class="header-title">
            <div class="title-area">
                <h2 class="title">${essayDTO.title}</h2>
                <p class="author">[${essayDTO.userDTO.realname}] 님의 이야기.</p>
            </div>
            <div class="date-area">
                <p>작성일: ${essayDTO.dateWrite}</p>
                <p>수정일: ${essayDTO.dateUpdate}</p>
            </div>
            <div class="info-area">
                <div class="info-view">${essayDTO.views}</div>
                <div class="info-likes">${essayDTO.likes}</div>
            </div>
            <div class="button-wrap">
                <sec:authorize access="isAuthenticated()">
                    <c:if test="${userDetail.seq eq essayDTO.seq}">
                        <button id="btn-modify">수정</button>
                        <button id="btn-delete">삭제</button>
                    </c:if>
                </sec:authorize>
            </div>
        </div>
    </div>
    <div class="content">
        <p>${essayDTO.content}</p>
    </div>
    <div class="comment-wrap">
        <div class="comment-write-area">
            <span class="content-length"><span>000</span> / 500</span>
            <sec:authorize access="!isAuthenticated()">
                <textarea name="" placeholder="댓글은 로그인 후 남기실 수 있습니다." disabled></textarea>
                <button disabled>작성</button>
            </sec:authorize>
            <sec:authorize access="isAuthenticated()">
                <textarea name="" id="comment-content" placeholder="바르고 고운말은 여행자에게 큰 힘이됩니다."></textarea>
                <button id="btn-add-comment">작성</button>
            </sec:authorize>
        </div>
        <div class="comment-view-area">
            <ul class="comment-group"></ul>
        </div>
    </div>
</div>
<!-- 메인 컨텐츠 영역 -->
<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/essay/view2.js"></script>
</body>
</html>

<%--                <li>--%>
<%--                    <div class="comment-item">--%>
<%--                        <div class="comment-author">--%>
<%--                            <div class="img-wrap">--%>
<%--                                <img--%>
<%--                                        src="https://source.unsplash.com/collection/190727/80x80"--%>
<%--                                        alt=""--%>
<%--                                />--%>
<%--                            </div>--%>
<%--                            <p class="author-nickname">밥만먹고여행</p>--%>
<%--                        </div>--%>
<%--                        <div class="content-area">--%>
<%--                  <textarea class="comment-content" disabled>--%>
<%--와 정말 좋은 곳에 다녀오셨네요!!</textarea--%>
<%--                  >--%>
<%--                            <div class="comment-operation">--%>
<%--                                <button class="like likes">10</button>--%>
<%--                                <button class="like unlikes">10</button>--%>
<%--                                <button class="oper update">수정</button>--%>
<%--                                <button class="oper delete">삭제</button>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                </li>--%>
