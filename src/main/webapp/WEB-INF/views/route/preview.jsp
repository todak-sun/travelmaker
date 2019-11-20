<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@include file="../common/head-meta.jsp" %> <%@include
    file="../common/head-css.jsp" %>
    <title>루트 View</title>
    <style type="text/css">
      #map {
        height: 100%;
        width: 800px; /* 지도 넓이 */
        display: inline-block;
      }

      .carousel-inner img {
        width: 50%;
        height: 50%;
      }
    </style>
  </head>
  <body style="background-color: gray;">
    <input type="hidden" value="${routeDTO.rno }" id="rno" />
    <input type="hidden" value="${routeDTO.isDomestic }" id="isdomestic" />
    <input type="hidden" value="${routeDTO.content }" id="epilogue" />
    <input type="hidden" value="${routeDTO.hashtag }" id="hashtag" />
    <!-- 지도 넓이에 맞춤 -->
    <div
      id="routeContent"
      style="width: 800px; height: 100%; text-align: center; background-color: white;"
    >
      <div id="routeTitle" style="display: inline-block;">
        <h1 style="margin: 0;">제목 : ${routeDTO.title }</h1>
        <br />
        <strong>유저별명 : ${routeDTO.nickname }</strong>
      </div>
      <hr style="width: 100%;" />
      <div
        id="mapContent"
        style="width: 100%; height: 400px; text-align: center; background-color: yellow;"
      >
        <div id="map"></div>
      </div>
    </div>

    <!-- Google Map -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY"
      async
      defer
    ></script>
    <!-- &callback=initMap -->
    <!-- Kakao Map -->
    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=58d9a72c9db8da0b849a32734093767e"
    ></script>
    <%@include file="../common/foot-js.jsp" %>
    <script
      type="text/javascript"
      src="${pageContext.request.contextPath}/resources/js/route/routeView.js"
    ></script>
  </body>
</html>
