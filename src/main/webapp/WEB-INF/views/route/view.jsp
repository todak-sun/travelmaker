<%@ page language="java" contentType="text/html;charset=UTF-8"%> <%@ taglib
prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@include file="../common/head-meta.jsp" %> <%@include
    file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="/resources/css/route/route-view.css" />
    <title>경로형 읽기</title>
  </head>
  <body>
    <%@include file="../common/navbar2.jsp"%>
    <input type="hidden" value="${userDetail.seq}" id="seq" />
    <input type="hidden" value="${routeDTO.rno }" id="rno" />
    <input type="hidden" value="${routeDTO.isDomestic }" id="isdomestic" />
    <input type="hidden" value="${routeDTO.hashtag }" id="hashtag" />
    <input type="hidden" value="${routeDTO.hashtag }" id="hashtag" />
    <input type="hidden" value="${routeDTO.hashtag }" id="hashtag" />
    <input type="hidden" value="${routeDTO.hashtag }" id="hashtag" />
    <input type="hidden" value="${routeDTO.hashtag }" id="hashtag" />
    <!-- 메인 컨텐츠 영역 -->

    <div class="container-wrap">
      <div class="header-back">
        <div class="header">
          <div class="header-title">
            <div class="title">
              <h1>${routeDTO.title }</h1>
              <p>
                <span class="author"> ${routeDTO.nickname }</span>님의 여행코스
              </p>
              <div class="hash-area">
                <!-- 해시태그는 여기부터 반복 -->
                <span class="hash">${routeDTO.hashtag }</span>
                <!-- 해시태그는 여기부터 반복 -->
              </div>
            </div>
            <div class="date">
              <span class="from"><c:out value="${course.dateWrite }"/></span>
              <span class="to"><c:out value="${course.dateEnd }"/></span>
            </div>
          </div>
          <div class="header-map">
            <img src="./images/front-map.png" alt="" />
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
                    <span class="number">
                      <c:out value="${course.rno }" />
                    </span>
                    <c:out value="${course.location }" />
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
                    <div class="image-wrap">
                      <c:forEach var="imgs" items="${course.imgs }">
                        <c:forEach var="img" items="${imgs }">
                          <img src="/resources/storage/route/<c:out
                            value="${img}"
                          />" alt="${img}" />
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
            ${routeDTO.content } Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Suscipit vitae impedit dolorem animi non quis
            cumque labore, harum quos iure sit, praesentium consectetur fugit
            unde nostrum a, eveniet aliquam dolore! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Hic tenetur maiores accusantium nisi?
            Ipsam excepturi quidem sed, exercitationem harum eligendi adipisci
            omnis alias tempore, ea dolores, doloremque placeat sunt aperiam!
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
          <textarea
            name=""
            id=""
            placeholder="바르고 고운말은 여행자에게 큰 힘이됩니다."
          ></textarea>
          <button>작성</button>
        </div>
        <div class="comment-view-area">
          <ul class="comment-group">
            <li>
              <div class="comment-item">
                <div class="comment-author">
                  <div class="img-wrap">
                    <img
                      src="https://source.unsplash.com/collection/190727/80x80"
                      alt=""
                    />
                  </div>
                  <p class="author-nickname">밥만먹고여행</p>
                </div>
                <div class="content-area">
                  <textarea class="comment-content" disabled>
  와 정말 좋은 곳에 다녀오셨네요!!</textarea
                  >
                  <div class="comment-operation">
                    <!-- 내가 쓴 글이 아닐 때 -->
                    <button class="like likes">10</button>
                    <button class="like unlikes">10</button>
                    <!-- 내가 쓴 글이 아닐 때 -->
                    <!-- 내가 쓴 글일 떄 -->
                    <button class="oper update">수정</button>
                    <button class="oper delete">삭제</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!— 메인 컨텐츠 영역 —>

    <%@include file="../common/foot-js.jsp" %>
    <script
      type="text/javascript"
      src="${pageContext.request.contextPath}/resources/js/route/routeView.js"
    ></script>
  </body>
</html>
