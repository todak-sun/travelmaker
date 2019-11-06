<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="../../../resources/css/common/bootstrap-reboot.css"
    />
    <link
      rel="stylesheet"
      href="../../../resources/css/common/bootstrap.min.css"
    />
    <title>메인페이지</title>
  </head>
  <body>
    <!-- 네비게이션 영역 시작 -->
    <nav
      id="main-nav"
      class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top"
    >
      <a id="main-logo" href="#" class="navbar-brand">로고</a>
      <button
        class="btn btn-outline-light navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#inner-main-nav"
        aria-controls="inner-main-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        메뉴
      </button>
      <div id="inner-main-nav" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a id="link-review" class="nav-link" href="#">글목록</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">스토어</a>
          </li>
          <li class="nav-item">
            <a id="link-list" class="nav-link" href="#">커뮤니티</a>
          </li>
        </ul>
        <button id="btn-write" class="btn btn-outline-light">글쓰기</button>
        <div class="btn-group" role="group">
          <button
            id="btn-user"
            class="dropdown-toggle btn btn-outline-light"
            type="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            사용자
          </button>
          <div
            class="dropdown-menu dropdown-menu-lg-right"
            aria-labelledby="btn-user"
          >
            <button id="btn-login" class="dropdown-item">
              로그인
            </button>
            <button id="btn-regist" class="dropdown-item">
              회원가입
            </button>
            <button id="btn-logout" class="dropdown-item">
              로그아웃
            </button>
            <button id="btn-myinfo" class="dropdown-item">
              내 정보
            </button>
          </div>
        </div>
      </div>
    </nav>
    <!-- 네비게이션 영역 끝 -->
    ​
    <div id="modal-area" class="modal" tabindex="-1" role="dialog"></div>
    <script
      src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
      crossorigin="anonymous"
    ></script>
    <script src="../../../resources/js/common/bootstrap.js"></script>
    <script src="../../../resources/js/main/main.js"></script>
  </body>
</html>
