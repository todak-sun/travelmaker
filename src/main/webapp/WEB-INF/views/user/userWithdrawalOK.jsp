<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<title>TravelMaker</title>
</head>
<body>
	<form action="/logout" method="post" id="logoutForm">
		<input type="hidden" name="${_csrf.parameterName}"
			value="${_csrf.token}" />
	</form>
	
	<script src="../../../resources/js/common/jquery-3.4.1.js"></script>
	<script type="text/javascript" src="../../../resources/js/user/user.js"></script>
	<script type="text/javascript">
		alert('다음에 또 봐요');
		logoutSubmit();
	</script>
</body>
</html>