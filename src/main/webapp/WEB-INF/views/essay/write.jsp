<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
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
    <link
      rel="stylesheet"
      href="../../../resources/summernote/summernote-bs4.css"
    />
    <link rel="stylesheet" href="../../../resources/css/essay/write.css" />
    <script src="../../../resources/js/common/popper.min.js"></script>
    <script src="../../../resources/js/common/jquery-3.4.1.js"></script>
    <script src="../../../resources/js/common/bootstrap.js"></script>
    <script src="../../../resources/summernote/summernote-bs4.js"></script>
    <script src="../../../resources/summernote/lang/summernote-ko-KR.js"></script>
    <title>에세이 작성</title>
  </head>
  <body>
    <input
      id="input-file-upload"
      type="file"
      accept="image/jpg, image/jpeg image/png"
      style="display:none"
    />
    <div class="container-fluid text-center">
      <h1>글쓰기</h1>
      <div class="row">
        <div class="editor-zone border-dark bg-light col col-sm-9">
          <div id="img-background"></div>
          <input id="title" type="text" placeholder="제목" />
          <button id="btn-upload-mainimg" class="btn btn-outline-info">
            대표이미지 설정
          </button>
          <div id="editor"></div>
        </div>
        <div class="tool-zone bg-primary col col-sm-3">
          <div>
            <button id="btn-save-tmp">임시저장</button>
            <button id="btn-save">발행하기</button>
          </div>
          <div class="row">
            <div class="col">
              <button id="btn-image">이미지</button>
            </div>
            <div class="col">
              <button id="btn-map">지도</button>
            </div>
            <div class="w-100"></div>
            <div class="col">
              <button id="btn-video">동영상</button>
            </div>
            <div class="col">
              <button id="btn-hashtag">해시태그</button>
            </div>
            <div class="w-100"></div>
            <div class="col">
              <button id="btn-breakline">구분선</button>
            </div>
          </div>
          <div class="jumbotron">
            <h2>해쉬태그</h2>
            <div id="box-hashtag" class="form-control"></div>
          </div>
          <div class="jumbotron">
            <h2>임시저장 리스트</h2>
            <ul id="tmp-content-list-group"></ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달 영역 시작 -->
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p></p>
          </div>
          <div class="modal-footer">
            <button type="button" id="add-at-modal" class="btn btn-primary">
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달 영역 끝 -->
    <div
      id="map-container"
      style="width:750px;height:350px;visibility: hidden;position:absolute;top:0;left:0;"
    ></div>
    <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=16307053f83634ad7b4af335a5094194&libraries=services"></script>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY&libraries=places"
      async
      defer
    ></script>
    <script src="../../../resources/js/essay/write.js"></script>
  </body>
</html>
