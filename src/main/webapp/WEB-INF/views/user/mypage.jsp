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
	<a href="http://localhost:8080/">[홈으로]</a>
	<form name="userModifyForm" method="post" action="/user/userModify">
		<input type="hidden" name="${_csrf.parameterName}"
			value="${_csrf.token}" /> <input type="hidden" id="registerMethod" name="registerMethod"
			value="${userDTO.registerMethod }" />

		<table border="1" cellspacing="0" cellpadding="5">
			<tr>
				<th width="80">아이디</th>
				<td><input type="text" name="id" id="mypageId"
					value="${userDTO.id }" readonly></td>
			</tr>
			<tr>
				<th width="80">이름</th>
				<td><input type="text" name="realname"
					value="${userDTO.realname }" style="width: 200px;"></td>
			</tr>

			<tr>
				<th width="80">별명</th>
				<td><input type="text" name="nickname"
					value="${userDTO.nickname }" style="width: 200px;"></td>
			</tr>




			<tr>
				<th width="80">이메일</th>
				<td><input type="text" name="email1" value="${userDTO.email1 }"
					style="width: 150px;"> @ <input type="text" name="email2"
					id="email22" placeholder="직접입력" list="list"> <datalist
						id="list">
						<option value="naver.com">naver.com</option>
						<option value="daum.net">daum.net</option>
						<option value="google.com">google.com</option>
						<option value="nate.net">nate.net</option>
					</datalist></td>
			</tr>


			<tr>
				<th width="45">현재 비밀번호</th>
				<td><input type="password" name="Password" id="prePassword"
					style="width: 230px;">
					<div id="prePasswordDiv"></div></td>
			</tr>
			<tr>
				<th width="45">새 비밀번호</th>
				<td><input type="password" name="nextPassword"
					id="nextPassword" style="width: 230px;">
					<div id="nextPasswordDiv"></div></td>
				</td>
			</tr>
			<tr>
				<th width="45">새 비밀번호 확인</th>
				<td><input type="password" name="nextPasswordConfirm"
					id="nextPasswordConfirm" style="width: 230px;">
					<div id="nextPasswordConfirmDiv"></div></td>
				</td>
			</tr>

			<tr>
				<th width="80">성별</th>
				<td><input type="radio" name="gender" value="0">남 <input
					type="radio" name="gender" value="1">여</td>
			</tr>

			<tr>
				<th width="80">핸드폰</th>
				<td><select name="phone1" id="phone11" style="width: 50px;">
						<option value="010">010</option>
						<option value="011">011</option>
						<option value="012">019</option>
				</select> - <input type="text" name="phone2" value="${userDTO.phone2}"
					style="width: 50px;" maxlength="4"> - <input type="text"
					name="phone3" value="${userDTO.phone3}" style="width: 50px;"
					maxlength="4"></td>
			</tr>
			<tr>
				<th width="80">주소</th>
				<td><input type="text" name="postcode" id="daum_postcode"
					style="width: 350px;" placeholder="우편번호" value="${userDTO.postcode}" readonly> <input
				type="button" name="zipbutton" value="우편번호검색" onclick="checkFirst()"><br> <input
					type="text" name="addr1" id="daum_addr1" style="width: 350px;"
					placeholder="주소" value="${userDTO.addr1}" readonly> <br> <input type="text" name="addr2"
					id="daum_addr2" style="width: 350px;" placeholder="상세 주소" value="${userDTO.addr2}"></td>
			</tr>

			<tr>
				<th width="80">프로필이미지</th>
				<td>
					<div class="select_img">
						<img src="" />
					</div> <input type="file" id="imgProfile" name="imgProfile"
					accept=".jpg, .png" />
				</td>
			</tr>

			<tr>
				<th>프로필 내용</th>
				<td><textarea name="contentProfile" id="contentProfile"
						rows="20" cols="40">${userDTO.contentProfile}</textarea>
			</tr>

			<tr>
				<th width="80">계좌 번호</th>
				<td><input type="text" name="account" style="width: 230px;" value="${userDTO.account}"></td>
			</tr>


			<tr>
				<td colspan="2" align="center"><input type="button"
					value="회원정보수정" onclick="modifyUser()"> <input type="button"
					value="회원탈퇴" onclick="WithdrawalUser()"></td>
			</tr>

		</table>
	</form>
</body>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="../../../resources/js/user/user.js"></script>

<script type="text/javascript">
	window.onload = function() {
		document.userModifyForm.gender['${userDTO.gender}'].checked = true;
		document.getElementById("email22").value = '${userDTO.email2}';
		document.getElementById("phone11").value = '${userDTO.phone1}';
	}
</script>

</html>