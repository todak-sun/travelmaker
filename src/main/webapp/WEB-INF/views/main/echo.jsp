<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<!-- jQuery CDN-->
<script src="../../../resources/js/common/jquery-3.4.1.js"></script>

<!-- Web socket CDN -->

<script src="http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"></script>

</head>

<body>
	<input type="text" id="message" />
	<input type="button" id="sendBtn" value="전송" />
	<div id="data"></div>
</body>



<script type="text/javascript">
	$(document).ready(function() {
		$("#sendBtn").click(function() {
			sendMessage();
			$('#message').val('')
		});
		$("#message").keydown(function(key) {
			if (key.keyCode == 13) {// 엔터
				sendMessage();
				$('#message').val('')
			}
		});
	});

	// 웹소켓을 지정한 url로 연결한다.
	let sock = new SockJS("<c:url value="/echo"/>");
	sock.onmessage = onMessage;
	sock.onclose = onClose;

	// 메시지 전송
	function sendMessage() {
		sock.send($("#message").val());
	}

	// 서버로부터 메시지를 받았을 때

	function onMessage(msg) {
		var data = msg.data;
		$("#data").append(data + "<br/>");
	}

	// 서버와 연결을 끊었을 때

	function onClose(evt) {
		$("#data").append("연결 끊김");
	}
</script>

</html>