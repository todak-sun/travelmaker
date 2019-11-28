<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/store/list.css">
    <title>스토어 리스트</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<input type="hidden" id="pg" value="${pg }">
<div id="result"></div>
<div id="paging" style="text-align: center;"></div>

<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/store/list.js"></script>
</body>
</html>