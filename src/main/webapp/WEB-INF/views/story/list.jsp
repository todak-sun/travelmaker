<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@include file="../common/head-meta.jsp" %> <%@include
    file="../common/head-css.jsp" %>
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/story/story.css"
    />
    <title>스토리페이지</title>
  </head>
  <body>
    <%@include file="../common/navbar2.jsp"%>
    <div class="btn-wrap">
      <button id="btn-write">+ 글 작성하러 가기</button>
	  <input type="hidden" class="currPage" value />
    </div>
    <div class="container-wrap">
      <section class="sec-story">
        <c:forEach var="story" items="${storyList }"> 
	        <article class="story">
	          <div class="story-img-wrap">
	            <img
	              src="https://picsum.photos/300/200?random=1"
	              alt=""
	              class="story-img"
	            />
	          </div>
	          <div class="story-content-wrap">
	            <h5 class="story-title">
	              <a href="
		              <c:if test="${story.fileName eq null}">
		              	<c:out value="/route/view/${story.rno}"/>
		              </c:if>
	    	          <c:if test="${story.fileName ne null}">
		              	<c:out value="/essay/view/${story.rno}"/>
		              </c:if>
	              ">
	              <c:out value="${story.title}"/></a>
	            </h5>
	            <div class="story-info">
	              <span class="info-icon likes"><c:out value="${story.likes}" /></span>
	              <span class="info-icon views"><c:out value="${story.views}" /></span>
	              <span class="info-icon comments"><c:out value="${story.cmt}" /></span>
	            </div>
	          </div>
	          <div class="story-user-wrap">
	            <img
	              src="https://picsum.photos/300/200?random=2"
	              alt=""
	              class="profile-img"
	            />
	            <div class="user-info">
	              <h6><c:out value="${story.nickname}" /></h6>
	              <p><c:out value="${story.dateUpdate}" /></p>
	            </div>
	          </div>
	        </article>
    	</c:forEach>
      </section>
    </div>
    <!-- 메인 컨텐츠 영역 -->

    <%@include file="../common/foot-js.jsp" %>
    <script src="${pageContext.request.contextPath}/resources/js/story/story2.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/story/story.js"></script>
  </body>
</html>