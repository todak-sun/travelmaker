<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<title>TravelMaker</title>
</head>
<body>
	<sec:authentication var="user" property="principal" />
	<input type="hidden" id="username" value="${user.username }" />
	<input type="hidden" name="${_csrf.parameterName}"
		value="${_csrf.token}" />
	<script>
		var username = document.getElementById('username').value;
		window.onload = function() {
			mypageGo(username);
		}
	</script>
	<script src="../../../resources/js/common/jquery-3.4.1.js"></script>
	<script type="text/javascript" src="../../../resources/js/user/user.js"></script>
</body>
</html>