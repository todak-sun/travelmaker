<!doctype html>
<html lang="ko">
<head>
<script type="text/javascript"
	src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js"
	charset="utf-8"></script>
<script type="text/javascript"
	src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
</head>
<body>
	<script type="text/javascript">
		var naver_id_login = new naver_id_login("tq8xdJqWevoI0Tbj3WgL",
				"http://localhost:8080/user/naverLogin");
		naver_id_login.get_naver_userprofile("naverSignInCallback()");
		function naverSignInCallback() {
			console.log(naver_id_login.getProfileData('email'));
			console.log(naver_id_login.getProfileData('name'));

			let name = naver_id_login.getProfileData('name');
			let email = naver_id_login.getProfileData('email');

			window.opener.document.getElementById("naverId").value = name;
			window.opener.document.getElementById("naverEmail").value = email;
			
			window.close();
 			opener.location.href = "javascript:naverLogin();";
		}
	</script>
</body>
</html>