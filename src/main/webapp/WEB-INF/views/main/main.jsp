<%@ page contentType="text/html;charset=UTF-8" language="java" %> <%@ taglib
prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib prefix="form"
uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@include file="../common/head-meta.jsp" %> <%@include
    file="../common/head-css.jsp" %>
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/main/main.css"
    />
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
        <button class="btn-login">시작하기</button>
      </section>
      <section class="sec-story"></section>
      <section></section>
    </div>

    <!-- 푸터 영역 -->
    <footer></footer>
    <!-- 푸터 영역 -->

    <div id="modal-area" class="modal" tabindex="-1" role="dialog"></div>
    <%@include file="../common/foot-js.jsp" %>
  </body>
</html>
