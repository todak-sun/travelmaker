<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css"/>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/essay/write2.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/summernote/summernote-bs4.css"/>
    <title>에세이 작성</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="container-wrap">
<<<<<<< Updated upstream
    <div class="hidden">
        <input type="hidden" id="rno">
    </div>
=======
>>>>>>> Stashed changes
    <div class="editor-wrap">
        <div class="editor-zone">
            <div class="editor-title">
                <div class="hidden">
                    <input type="file" id="input-file" accept="image/jpeg, image/png">
                </div>
                <button class="btn-main-image">대표이미지 설정</button>
                <input type="text" id="title" placeholder="제목을 입력하세요..."/>
            </div>
            <div class="editor">
                <div id="editor"></div>
            </div>
        </div>

        <div class="tool-zone">
            <div class="tool-wrap">
                <div class="tool-box">
<<<<<<< Updated upstream
                    <div class="tool-btn-wrap">
                        <button type="button" id="btn-save-temp">임시저장</button>
                        <button type="button" id="btn-save">발행하기</button>
                    </div>
=======
>>>>>>> Stashed changes
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
                <div class="temp-box">
                    <h3>임시저장목록</h3>
                    <div>
<<<<<<< Updated upstream
                        <ul class="temp-group"></ul>
=======
                        <ul class="temp-group">
<%--                            <!-- 임시저장 목록 하나 -->--%>
<%--                            <li>--%>
<%--                                <div class="temp-item">--%>
<%--                                    <span class="delete">&times;</span>--%>
<%--                                    <span class="get">불러오기</span>--%>
<%--                                    <div class="image-wrap">--%>
<%--                                        <img src="https://source.unsplash.com/collection/190727/100x100" alt=""/>--%>
<%--                                    </div>--%>
<%--                                    <div class="temp-info">--%>
<%--                                        <span class="mini-badge">국내</span>--%>
<%--                                        <p>임시저장한 글의 제목</p>--%>
<%--                                        <span class="date">2019.11.11</span>--%>
<%--                                    </div>--%>
<%--                                </div>--%>
<%--                            </li>--%>
                            <!-- 임시저장 목록 하나 -->
                        </ul>
>>>>>>> Stashed changes
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 메인 컨텐츠 영역 -->
<<<<<<< Updated upstream
<div id="map-container"
     style="width:750px;height:350px;visibility: hidden;position:absolute;top:-9999px;left:-9999px;"></div>
<%@include file="../common/footer.jsp" %>
=======
<%--<%@include file="../common/foot-js.jsp" %>--%>
>>>>>>> Stashed changes
<%@ include file="../common/editor-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/summernote/summernote-bs4.js"></script>
<script src="${pageContext.request.contextPath}/resources/summernote/lang/summernote-ko-KR.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/essay/write2.js"></script>
</body>
</html>
