<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@include file="../common/head-meta.jsp" %> <%@include
    file="../common/head-css.jsp" %>
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css"
    />
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css"
    />
    <title>에세이 작성</title>
  </head>
  <body>
    <jsp:include page="../common/navbar.jsp" />
    <input
      id="input-file-upload"
      type="file"
      accept="image/jpg, image/jpeg image/png"
      style="display:none"
    />
    <div class="container">
      <div class="row">
        <div class="editor-zone col col-sm-9">
          <div id="img-background" class="main-image">
            <h3>클릭하시면, 대표이미지를 설정할 수 있어요!</h3>
          </div>
          <input
            id="title"
            type="text"
            class="content-title"
            placeholder="제목"
          />
          <div id="editor"></div>
        </div>
        <div class="tool-zone col col-sm-3">
          <div class="tool-box">
            <div class="tool-box-tmp">
              <button>임시저장목록</button>
              <ul id="tmp-content-group"></ul>
            </div>
            <div class="tool-box-save">
              <button id="btn-save-tmp" class="btn btn-outline-secondary">
                임시저장
              </button>
              <button id="btn-save" class="btn btn-outline-secondary">
                발행하기
              </button>
            </div>
            <div class="tool-box-btn">
              <button id="btn-image" class="btn btn-outline-success">
                이미지
              </button>
              <button id="btn-map" class="btn btn-outline-success">
                지도
              </button>
              <button id="btn-video" class="btn btn-outline-success">
                동영상
              </button>
              <button id="btn-breakline" class="btn btn-outline-success">
                구분선
              </button>
            </div>
            <div class="tool-box-hash">
              <h4>해쉬태그</h4>
              <div id="box-hashtag" class="form-control"></div>
            </div>
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
      style="width:750px;height:350px;visibility: hidden;position:absolute;top:-9999px;left:-9999px;"
    ></div>
    <%@ include file="../common/editor-js.jsp" %>
    <script src="${pageContext.request.contextPath}/resources/summernote/summernote-bs4.js"></script>
    <script src="${pageContext.request.contextPath}/resources/summernote/lang/summernote-ko-KR.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/essay/write2.js"></script>
  </body>
</html>
