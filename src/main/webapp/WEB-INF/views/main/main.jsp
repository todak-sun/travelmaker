<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> <%@ taglib prefix="form"
uri="http://www.springframework.org/tags/form"%> <%@ taglib prefix="sec"
uri="http://www.springframework.org/security/tags"%> <%@ taglib prefix="fn"
uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta
      name="viewport"
      content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width"
    />
    <meta
      name="google-signin-client_id"
      content="458418492765-2b6lnhcg8g4io9au7uu1c1cb96cuhllo.apps.googleusercontent.com"
    />
    <meta name="_csrf" content="${_csrf.token}" />
    <meta name="_csrf_header" content="${_csrf.headerName}" />

    <link
      rel="stylesheet"
      href="../../../resources/css/common/bootstrap-reboot.css"
    />
    <link rel="stylesheet" href="../../../resources/css/common/bootstrap.css" />
    <title>메인페이지</title>
  </head>
  <body>
    <input type="hidden" id="csrfTokenName" value="${_csrf.parameterName}" />
    <input type="hidden" id="csrfTokenValue" value="${_csrf.token}" />
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
          <li class="nav-item"><a class="nav-link" href="#">스토어</a></li>
          <li class="nav-item">
            <a id="link-list" class="nav-link" href="#">커뮤니티</a>
          </li>
          <sec:authentication var="user" property="principal" />
          <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
            <p
              >어서와 방갑다 ${fn:substringBefore(user.username,"%")}
              쉬볼세끼야</p
            >
          </sec:authorize>
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
            <sec:authentication var="user" property="principal" />
            <sec:authorize access="!isAuthenticated()">
              <button id="btn-login" class="dropdown-item">로그인</button>
              <button id="btn-regist" class="dropdown-item">회원가입</button>
            </sec:authorize>
            <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
              <div id="logoutDiv">
                <form action="/logout" method="post" id="logoutForm">
                  <input
                    type="hidden"
                    name="${_csrf.parameterName}"
                    value="${_csrf.token}"
                  />
                </form>
              </div>
              <button
                id="btn-logout"
                class="dropdown-item"
                onclick="javascript:logoutSubmit()"
                >로그아웃</button
              >
              <button
                id="btn-myinfo"
                class="dropdown-item"
                onclick="javascript:mypageGo('${user.username}')"
                >내 정보</button
              >
            </sec:authorize>
          </div>
        </div>
      </div>
    </nav>
    <!-- 네비게이션 영역 끝 -->

    <div id="modal-area" class="modal" tabindex="-1" role="dialog"></div>

    <script src="../../../resources/js/common/jquery-3.4.1.js"></script>
    <script src="../../../resources/js/common/bootstrap.js"></script>
    <script src="../../../resources/js/main/main.js"></script>
    <script
      type="text/javascript"
      src="../../../resources/js/user/user.js"
    ></script>
  </body>
</html>
