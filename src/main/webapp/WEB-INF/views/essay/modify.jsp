<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css"/>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/essay/write2.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/summernote/summernote-bs4.css"/>
    <title>에세이 수정</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="container-wrap">
    <div class="hidden">
        <input type="hidden" id="rno" value="${essayDTO.rno}">
    </div>
    <div class="editor-wrap">
        <div class="editor-zone">
            <div class="editor-title">
                <div class="hidden">
                    <input type="file" id="input-file" accept="image/jpeg, image/png">
                </div>
                <button class="btn-main-image">대표이미지 설정</button>
                <input type="text" id="title"/>
            </div>
            <div class="editor">
                <div id="editor"></div>
            </div>
        </div>

        <div class="tool-zone">
            <div class="tool-wrap">
                <div class="tool-box">
                    <div class="tool-btn-wrap">
                        <button type="button" id="btn-save">수정하기</button>
                    </div>
                    <div class="tool-btn-group">
                        <div class="btn-photo"></div>
                        <div class="btn-map"></div>
                        <div class="btn-hr"></div>
                        <div class="btn-video"></div>
                    </div>
                    <div class="tool-hash-group">
                        <div class="input-wrap">
                            <input id="input-hash" type="text"/>
                            <button id="btn-hash">추가</button>
                        </div>
                        <div class="hash-view">
                            <span class="hash example">해시코드</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 메인 컨텐츠 영역 -->
<div id="map-container"
     style="width:750px;height:350px;visibility: hidden;position:absolute;top:-9999px;left:-9999px;"></div>
<%@include file="../common/footer.jsp" %>
<%@ include file="../common/editor-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/summernote/summernote-bs4.js"></script>
<script src="${pageContext.request.contextPath}/resources/summernote/lang/summernote-ko-KR.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/essay/modify.js"></script>
</body>
</html>
