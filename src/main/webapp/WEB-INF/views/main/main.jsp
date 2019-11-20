<%@ page contentType="text/html;charset=UTF-8" language="java" %> <%@ taglib
prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib prefix="form"
uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@include file="../common/head-meta.jsp"%> <%@include
    file="../common/head-css.jsp"%>
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/main/main.css"
    />
    <title>메인페이지</title>
  </head>
  <body>
    <jsp:include page="../common/navbar.jsp" />
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
      <input type="text" id="message" />
      <input type="button" id="sendBtn" value="전송" />
      <div id="data"></div>
    </div>
    <div id="modal-area" class="modal" tabindex="-1" role="dialog"></div>
    <%@include file="../common/foot-js.jsp"%>
    <script src="http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"></script>
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
  </body>
</html>
