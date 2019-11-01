<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>routeWriteForm</title>
  </head>
  <body>
    <div>routeWriteForm 입니다.</div>
    <div>
      제목입력
      <input
        type="text"
        name="routeTitle"
        id="routeTitle"
        placeholder="제목을 입력해 주세요"
      />
    </div>
    <input type="button" id="domesticWriteBtn" value="국내작성버튼" />
    <input type="button" id="overseaWriteBtn" value="해외작성버튼" />
    <form id="routeWriteForm" name="routeWriteForm">
      <div class="routePoint"></div>
      <div class="routeLocation"></div>
      <div class="routeContent"></div>
      <div class="routeImage"></div>
      <div class="routeDate"></div>

      <div class="routeWriteCommand">
        이전, 코스저장, 다음 버튼 들어갈 div
      </div>
    </form>
  </body>
  <script
    type="text/javascript"
    src="https://code.jquery.com/jquery-3.4.1.min.js"
  ></script>
  <script type="text/javascript" src="/resources/js/route.js"></script>
</html>
