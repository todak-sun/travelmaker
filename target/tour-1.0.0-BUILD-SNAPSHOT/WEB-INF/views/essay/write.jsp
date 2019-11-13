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
      href="${pageContext.request.contextPath}/resources/css/common/bootstrap-reboot.css"
    />
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/common/bootstrap.css"
    />
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/summernote/summernote-bs4.css"
    />
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/essay/write.css"
    />
    <script src="${pageContext.request.contextPath}/resources/js/common/popper.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/common/jquery-3.4.1.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/common/bootstrap.js"></script>
    <script src="${pageContext.request.contextPath}/resources/summernote/summernote-bs4.js"></script>
    <script src="${pageContext.request.contextPath}/resources/summernote/lang/summernote-ko-KR.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/common/travelmaker.js"></script>
    <title>에세이 작성</title>
  </head>
  <body>
    <input
      id="input-file-upload"
      type="file"
      accept="image/jpg, image/jpeg image/png"
      style="display:none"
    />
    <div class="container">
      <h1>글쓰기</h1>
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
              <ul id="tmp-content-group">
                <li class="tmp-content-item">
                  <img
                    src="http://placehold.it/50X50"
                    class="img-thumbnail"
                    alt="제목"
                  />
                  <div class="tmp-content-box">
                    <span class="location badge badge-info">국내</span>
                    <p class="tmp-content-title">
                      제목없asdfasdfsdfsdfsfsdfasdfasfasfdaf음
                    </p>
                    <span class="date text-muted small">2019.10.10</span>
                  </div>
                </li>
              </ul>
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
      style="width:750px;height:350px;visibility: hidden;position:absolute;top:0;left:0;"
    ></div>
    <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=16307053f83634ad7b4af335a5094194&libraries=services"></script>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY&libraries=places"
      async
      defer
    ></script>
    <script src="${pageContext.request.contextPath}/resources/js/essay/write2.js"></script>
<%--    <script src="${pageContext.request.contextPath}/resources/js/essay/write.js"></script>--%>
  </body>
</html>
