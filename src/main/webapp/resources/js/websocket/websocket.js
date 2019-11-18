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
/*<c:url value="/echo"/>*/
let sock = new SockJS("/echo");
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