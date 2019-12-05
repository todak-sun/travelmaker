<%@ page language="java" contentType="text/html;charset=UTF-8" %> <%@ taglib
prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib prefix="fn"
uri="http://java.sun.com/jsp/jstl/functions" %> <%@ taglib prefix="sec"
uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@include file="../common/head-meta.jsp" %> <%@include
    file="../common/head-css.jsp" %>
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/route/route-view.css"
    />
    <title>경로형 읽기</title>
  </head>
  <body>
    <%@include file="../common/navbar2.jsp" %>
    <div class="hidden">
      <input type="hidden" value="${routeDTO.bno}" id="bno" />
      <input type="hidden" value="${routeDTO.rno }" id="rno" />
      <input type="hidden" value="${routeDTO.isDomestic }" id="isDomestic" />
    </div>
    <!-- 메인 컨텐츠 영역 -->

    <div class="container-wrap">
      <div class="header-back">
        <div class="header">
          <div class="header-title">
            <div class="title">
              <h1>${routeDTO.title }</h1>
              <p>
                <span class="author">${routeDTO.nickname }</span>님의 여행코스
              </p>
              <div class="hash-area">
                <c:set
                  var="hashes"
                  value="${fn:split(routeDTO.hashtag, ' ')}"
                />
                <!-- 해시태그는 여기부터 반복 -->
                <c:forEach items="${hashes}" var="hash">
                  <span class="hash">${hash}</span>
                </c:forEach>
                <!-- 해시태그는 여기부터 반복 -->
              </div>
            </div>
            <div class="date">
              <span class="from"><c:out value="${routeDTO.dateFrom }"/></span>
              <span class="to"><c:out value="${routeDTO.dateTo }"/></span>
            </div>
          </div>
          <div class="header-map" id="map">
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
                  <input type="hidden" name="lat" value="${course.lat}">
                  <input type="hidden" name="lng" value="${course.lng}">
                  <input type="hidden" name="location" value="${course.location}">
                  <h4 class="route-title">
                    <span class="number"
                      ><c:out value="${course.cntOrder }"/></span
                    ><c:out value="${course.location }" />
                  </h4>
                  <span class="date">
                    <span class="from"
                      ><c:out value="${course.dateStart }"
                    /></span>
                    <span class="to"><c:out value="${course.dateEnd }"/></span>
                  </span>
                </div>
                <div class="content-wrap">
                  <div class="content-left">
                    <div class="image-wrap slide">
                      <ul class="slide-box" id="slide-box">
                        <c:forEach var="img" items="${course.imgs}">
                          <li>
                            <img src="/resources/storage/route/<c:out
                              value="${img}"
                            />" alt="${img}"/>
                          </li>
                        </c:forEach>
                      </ul>
                      <div
                        alt="left"
                        value="왼쪽"
                        class="slide-left"
                        id="slide-left"
                        style="display: none;"
                      ></div>
                      <div
                        alt="right"
                        value="오른쪽"
                        class="slide-right"
                        id="slide-right"
                      ></div>
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
          <sec:authorize access="isAuthenticated()">
            <div class="">
              <button id="btn-route-modify">수정</button>
              <button id="btn-route-delete">삭제</button>
            </div>
          </sec:authorize>
        </div>
      </div>
      <div class="hr"></div>
      <div class="comment-wrap">
        <div class="comment-write-area">
          <span class="content-length"><span>000</span> / 500</span>
          <sec:authorize access="!isAuthenticated()">
            <textarea
              name=""
              placeholder="댓글은 로그인 후 남기실 수 있습니다."
              disabled
            ></textarea>
            <button disabled>작성</button>
          </sec:authorize>
          <sec:authorize access="isAuthenticated()">
            <textarea
              name=""
              id="comment-content"
              placeholder="바르고 고운말은 여행자에게 큰 힘이됩니다."
            ></textarea>
            <button id="btn-add-comment">작성</button>
          </sec:authorize>
        </div>
        <div class="comment-view-area">
          <ul class="comment-group"></ul>
        </div>
      </div>
    </div>
    <%@include file="../common/footer.jsp" %> <%@include
    file="../common/editor-js.jsp" %>
    <script
      type="text/javascript"
      src="${pageContext.request.contextPath}/resources/js/route/routeView.js"
    ></script>
  </body>
</html>
