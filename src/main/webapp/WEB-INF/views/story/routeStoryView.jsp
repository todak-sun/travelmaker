<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>루트 게시물</title>
    <!-- BootStrap -->
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />
    <style type="text/css">
      #map {
        height: 100%;
        width: 800px;
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
    <div
      id="routeContent"
      style="width: 1400px; height: 100%; text-align: center; background-color: white; margin: 100px;"
    >
      <div id="routeTitle" style="display: inline-block;">
        <h1 style="margin: 0;">${routeDTO.title }</h1>
        <br />
        <strong>${routeDTO.nickname }</strong>
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
    <!-- JQuery -->
    <script
      type="text/javascript"
      src="https://code.jquery.com/jquery-3.4.1.min.js"
    ></script>
    <!-- BootStrap -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script
      type="text/javascript"
      src="../../../resources/js/route/routeView.js"
    ></script>
  </body>
</html>
