<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="../../../resources/css/common/bootstrap-reboot.css"
    />
    <link rel="stylesheet" href="../../../resources/css/common/bootstrap.css" />
    <title>스토리페이지</title>
  </head>
  <body>

    <button type="button" onclick="location.href='/story/routeStoryView?bno=25'">전송 테스트</button>
    
    <div class="list">
      페이지 로딩중
    </div>
    <button type="button" id="loadList">더 보기</button>

    <script src="../../../resources/js/common/jquery-3.4.1.js"></script>
    <script src="../../../resources/js/common/bootstrap.js"></script>
    <script src="../../../resources/js/story/story.js"></script>
  </body>
</html>
