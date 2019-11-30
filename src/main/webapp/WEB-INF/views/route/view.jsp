<<<<<<< Updated upstream
<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include
            file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/route/route-view.css"/>
    <title>경로형 읽기</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="hidden">
    <input type="hidden" value="${routeDTO.bno}" id="bno">
    <input type="hidden" value="${routeDTO.rno }" id="rno"/>
    <input type="hidden" value="${routeDTO.isDomestic }" id="isdomestic"/>
</div>
<!-- 메인 컨텐츠 영역 -->

<div class="container-wrap">
    <div class="header-back">
        <div class="header">
            <div class="header-title">
                <div class="title">
                    <h1>${routeDTO.title }</h1>
                    <p><span class="author"> ${routeDTO.nickname }</span>님의 여행코스 </p>
                    <div class="hash-area">
                        <c:set var="hashes" value="${fn:split(routeDTO.hashtag, ' ')}"/>
                        <!-- 해시태그는 여기부터 반복 -->
                        <c:forEach items="${hashes}" var="hash">
                            <span class="hash">${hash}</span>
                        </c:forEach>
                        <!-- 해시태그는 여기부터 반복 -->
                    </div>
                </div>
                <div class="date">
                    <span class="from"><c:out value="${course.dateWrite }"/></span>
                    <span class="to"><c:out value="${course.dateEnd }"/></span>
                </div>
            </div>
            <div class="header-map">
                <img src="./images/front-map.png" alt=""/>
            </div>
        </div>
    </div>
    <div class="route-view">
        <ul class="route-group">
            <c:forEach var="course" items="${contentList }">
                <!-- 작은 route게시물 한 개 -->
                <li>
                    <div class="route-item">
                        <div class="route-info">
                            <h4 class="route-title">
                                <span class="number"><c:out value="${course.rno }"/></span><c:out
                                    value="${course.location }"/>
                            </h4>
                            <span class="date">
                                <span class="from"><c:out value="${course.dateStart }"/></span>
                                <span class="to"><c:out value="${course.dateEnd }"/></span>
                            </span>
                        </div>
                        <div class="content-wrap">
                            <div class="content-left">
                                <div class="image-wrap">
                                    <c:forEach var="imgs" items="${course.imgs }">
                                        <c:forEach var="img" items="${imgs }">
                                            <img src="/resources/storage/route/<c:out value="${img}"/>" alt="${img}"/>
                                        </c:forEach>
                                    </c:forEach>
                                </div>
                                <div class="score-wrap">
                                    <ul class="score-group">
                                        <c:forEach begin="1" end="${course.score }">
                                            <li><span href="" class="score on"></span></li>
                                        </c:forEach>
                                        <c:forEach begin="1" end="${5 - course.score }">
                                            <li><span href="" class="score"></span></li>
                                        </c:forEach>
                                    </ul>
                                </div>
                            </div>
                            <div class="content-right">
                                <p><c:out value="${course.content }"/></p>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- 작은 route게시물 한 개 -->
            </c:forEach>
        </ul>
    </div>
    <div class="hr"></div>
    <div class="epilogue-view">
        <div class="epli-logo"></div>
        <div class="content-area">
            <p class="content">
                ${routeDTO.content }
            </p>
            <div class="operation">
                <button id="likes">${routeDTO.likes }</button>
            </div>
        </div>
    </div>
    <div class="hr"></div>
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
<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/route/routeView.js"></script>
</body>
=======
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
    <%@include file="../common/navbar.jsp" %>
    <input type="hidden" value="${routeDTO.rno }" id="rno" />
    <input type="hidden" value="${routeDTO.isDomestic }" id="isdomestic" />
    <input type="hidden" value="${routeDTO.content }" id="epilogue" />
    <input type="hidden" value="${routeDTO.hashtag }" id="hashtag" />
    <div
      id="routeContent"
      style="width: 1400px; height: 100%; text-align: center; background-color: white; margin: 100px;"
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
>>>>>>> Stashed changes
</html>
