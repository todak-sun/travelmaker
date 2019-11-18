<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp"%>
    <%@include file="../common/head-css.jsp"%>
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
<%@include file="../common/foot-js.jsp"%>
</body>
</html>
