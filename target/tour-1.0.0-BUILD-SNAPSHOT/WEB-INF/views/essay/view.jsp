<%@ page contentType="text/html;charset=UTF-8" language="java"
pageEncoding="UTF-8"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css"
    />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css" />
    <script src="${pageContext.request.contextPath}/resources/js/common/jquery-3.4.1.js"></script>
    <title>에세이 글 확인</title>
  </head>
  <body>
    <input id="bno" type="hidden" value="${essayDTO.bno}" />
    <input id="seq" type="hidden" value="${essayDTO.seq}" />
    <div class="container-fluid">
      <header>
        <h1>${essayDTO.title}</h1>
        <span>홍길동</span>
        <span>${essayDTO.dateUpdate}</span>
        <span>조회수 : ${essayDTO.views}</span>
      </header>
      <section>
        <div id="contents-area" class="bg-white">
          ${essayDTO.content}
        </div>
        <div>
          <button>좋아요 : ${essayDTO.likes}</button>
        </div>
      </section>
      <div id="comment-zone">
        <div class="input-group">
          <textarea
            id="comment-content"
            type="text"
            class="form-control"
          ></textarea>
          <button id="btn-add-comment" class="input-group-append">작성</button>
        </div>
        <div>
          <ul id="comment-group" style="list-style:none;">
            <li>
              <div class="media text-muted pt-3">
                <svg
                  class="bd-placeholder-img mr-2 rounded"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  role="img"
                  aria-label="Placeholder: 32x32"
                >
                  <rect width="100%" height="100%" fill="#6f42c1" />
                  <text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text>
                </svg>
                <p
                  class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
                >
                  <strong class="d-block text-gray-dark">@아이디</strong>
                  내용을 적는곳
                </p>
                <div class="btn-group btn-group-sm">
                  <button class="btn-primary">좋아요</button>
                  <button class="btn-danger">싫어요</button>
                  <button class="btn-outline-secondary">답글</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <script src="${pageContext.request.contextPath}/resources/js/essay/view.js"></script>
  </body>
</html>
