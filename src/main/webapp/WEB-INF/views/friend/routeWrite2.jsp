<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/friend/write2.css">
    <title>동행 게시글 작성</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>

<!-- 메인 컨텐츠 영역 -->
<div class="container-wrap">
    <div class="editor-zone">
        <form action="" class="editor-second">
            <div class="hidden">
                <input type="hidden" name="is_domestic" id="is_domestic" value="${is_domestic}">
                <input type="hidden" name="fno" value="${fno}">
                <input type="hidden" name="lat" id="lat">
                <input type="hidden" name="lng" id="lng">
                <input type="hidden" name="city" id="city">
            </div>

            <div class="input-wrap">
                <label for="date-start">방문 시작일</label>
                <input type="date" id="date-start" name="date_start" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
            </div>

            <div class="input-wrap">
                <label for="date-end">방문 종료일</label>
                <input type="date" id="date-end" name="date_end" class="v"/>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
            </div>

            <div class="input-wrap place">
                <label for="input-search-place">장소</label>
                <input type="text" id="input-search-place"/>
                <button id="btn-search-place" type="button">검색</button>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
            </div>

            <div class="input-wrap textarea">
                <label for="content">상세계획</label>
                <textarea id="content" name="content"></textarea>
                <div class="v-feed"></div>
                <div class="iv-feed"></div>
            </div>

            <div class="button-wrap">
                <button type="button" id="btn-next" class="btn btn-travel">다음</button>
                <button type="button" id="btn-check" class="btn btn-tsave">저장</button>
                <button type="button" id="btn-cancel" class="btn btn-tdanger">취소</button>
            </div>
        </form>
    </div>
</div>
<%@include file="../common/footer.jsp"%>
<%@include file="../common/editor-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/friend/routeWrite2.js"></script>
</body>
</html>
