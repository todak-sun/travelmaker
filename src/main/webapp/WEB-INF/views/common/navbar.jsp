<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<nav
        id="main-nav"
        class="navbar navbar-expand-sm fixed-top bg-white"
>
    <input type="hidden" id="csrfTokenName" value="${_csrf.parameterName}" />
    <input type="hidden" id="csrfTokenValue" value="${_csrf.token}" />
    <a id="main-logo" href="/" class="navbar-brand">로고</a>
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
                <a id="link-review" class="nav-link" href="/story">글목록</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="#">스토어</a></li>
            <li class="nav-item">
                <a id="link-list" class="nav-link" href="#">커뮤니티</a>
            </li>
            <sec:authentication var="user" property="principal"/>
            <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
                ${fn:substringBefore(user.username,"%")}
            </sec:authorize>
        </ul>
        <div class="btn-group" role="group">
            <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
                <button id="btn-write" class="btn btn-outline-primary">글쓰기</button>
            </sec:authorize>
            <button
                    id="btn-user"
                    class="dropdown-toggle btn btn-outline-primary"
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
                <sec:authentication var="user" property="principal"/>
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
                    >로그아웃
                    </button
                    >
                    <button
                            id="btn-myinfo"
                            class="dropdown-item"
                            onclick="javascript:mypageGo('${user.username}')"
                    >내 정보
                    </button
                    >
                </sec:authorize>
            </div>
        </div>
    </div>
</nav>