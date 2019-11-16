<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <meta
            name="viewport"
            content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width"
    />
    <meta
            name="google-signin-client_id"
            content="458418492765-2b6lnhcg8g4io9au7uu1c1cb96cuhllo.apps.googleusercontent.com"
    />
    <meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    <jsp:include page="../common/head-css.jsp"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/main/main.css">
    <title>메인페이지</title>
</head>
<body>
<jsp:include page="../common/navbar.jsp"/>
<div class="container">
    <div class="wrap-images">
        시원한 이미지를 뿌려주자
    </div>
    <div class="wrap-story">
        스토리 컨텐츠 뿌려줄 영역
    </div>
    <div class="wrap-community">
        커뮤니티 컨텐츠 뿌려줄 영역
    </div>
</div>
<div id="modal-area" class="modal" tabindex="-1" role="dialog"></div>
<jsp:include page="../common/foot-js.jsp"/>
</body>
</html>
