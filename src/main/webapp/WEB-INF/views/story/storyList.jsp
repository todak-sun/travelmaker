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
    <div id="div-search" class="search">
      <input
        type="text"
        id="input-search"
        placeholder="제목, 장소, 작성자명을 검색하세요"
        title="검색"
      />
      <h3><span></span></h3>
    </div>
    <div id="div-list" class="list"></div>
    <button type="button" id="btn-list" value="${listNum}">더 보기</button>

    <script src="../../../resources/js/common/jquery-3.4.1.js"></script>
    <script src="../../../resources/js/common/bootstrap.js"></script>
    <script src="../../../resources/js/story/story.js"></script>
  </body>
</html>
