<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@include file="../common/head-meta.jsp" %> <%@include
    file="../common/head-css.jsp" %>
    <title>스토리페이지</title>
  </head>
  <body>
    <%@include file="../common/navbar.jsp" %>
    <div style="height: 70px;"></div>
    <div id="div-search" class="search">
      <input
        type="text"
        id="input-search"
        placeholder="제목, 장소, 작성자명을 검색하세요"
        title="검색"
      />
      <h3><span></span></h3>
    </div>
    <div id="div-list" class="list"></div>
    <button type="button" id="btn-list" value="${listNum}">더 보기</button>
    <%@include file="../common/foot-js.jsp" %>
    <script src="../../../resources/js/story/story.js"></script>
  </body>
</html>
