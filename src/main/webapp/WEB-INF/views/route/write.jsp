<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<<<<<<< Updated upstream
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/route/write.css"/>
    <title>여행경로 추천글 쓰기</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<!-- 메인 컨텐츠 영역 -->
<div class="hide">
    <input type="hidden" name="isDomestic" id="isDomestic"/>
    <input type="hidden" name="location" id="location"/>
    <input type="hidden" name="lat" id="lat" value="0"/>
    <input type="hidden" name="lng" id="lng" value="0"/>
    <input type="hidden" name="seq" id="seq" value=${userDetail.seq}/>
    <input type="hidden" name="nickname" id="nickname" value=${userDetail.nickname}/>
    <input type="file" name="images" id="images" multiple="multiple"/>
</div>

<div class="container-wrap">
    <div class="editor-wrap">
        <div class="editor-zone">
            <!-- 레벨 표시 영역 -->
            <div class="level-bar">
                <div class="level level-1">1단계</div>
                <div class="level">2단계</div>
                <div class="level">3단계</div>
            </div>
            <!-- 레벨 표시 영역 -->

            <!-- 첫번쨰 에디터 -->
            <div class="editor-first">
                <div class="title-expression">
                    <h3>지금부터 작성할 여행 가이드!</h3>
                    <p>멋진 제목을 붙여주세요</p>
                </div>

                <div class="input-wrap">
                    <input type="text" name="title" id="route-title"/>
                </div>
            </div>
            <!-- 첫번쨰 에디터 -->

            <!-- 두번째 에디터 -->
            <div class="editor-second hide">
                <div class="title">
                    <h4>이곳에 제목이 들어갑니다</h4>
                </div>

                <div class="input-wrap country">
                    <label for="nation">국가</label>
                    <input type="text" name="nation" id="nation" value="나라나라"/>
                </div>

                <div class="input-wrap city">
                    <label for="city">도시</label>
                    <input type="text" name="city" id="city" value="도시도시"/>
                </div>

                <div class="input-wrap place">
                    <label for="place">장소</label>
                    <input type="text" name="place" id="place" value="장소장소"/>
                    <button class="place-finder" id="searchBtn" data-toggle="modal" data-target="#kakaoMapModal">찾기</button>
                </div>

                <div class="input-wrap from">
                    <label for="">From</label>
                    <input type="date" name="dateStart"/>
                </div>

                <div class="input-wrap to">
                    <label for="">To</label>
                    <input type="date" name="dateEnd"/>
                </div>

                <div class="score-wrap">
                    <label for="">점수</label>
                    <ul class="score-group">
                        <li><a href="" class="score on"></a></li>
                        <li><a href="" class="score on"></a></li>
                        <li><a href="" class="score on"></a></li>
                        <li><a href="" class="score"></a></li>
                        <li><a href="" class="score"></a></li>
                    </ul>
                </div>

                <div class="input-wrap content">
              <textarea
                      id="route-content-content"
                      name="content"
                      placeholder="내용을 입력해주세요"></textarea>
                </div>

                <div class="image-wrap">
                    <button id="image-add">+ 이미지 추가</button>
                    <ul class="image-group empty">
                    </ul>
                </div>
            </div>
            <!-- 두번째 에디터 -->

            <!-- 세번째 에디터 -->
            <div class="editor-third hide">
                <div class="title-expression">
                    <h2>정말 멋진 여행을 다녀오셨네요!</h2>
                    <p>마지막으로, 이번 이야기를 마무리하는 에필로그를 남겨주세요.</p>
                </div>

                <div class="content">
                    <textarea id="route-epilogue" name="content" placeholder="내용을 입력해주세요"></textarea>
                </div>

                <div class="hash-area">
                    <div class="input-wrap">
                        <input type="text" id="hash-input"/>
                        <button id="hash-add">추가</button>
                    </div>
                    <div class="hash-view" id="hash-view"></div>
                </div>
            </div>
        </div>

        <div class="nav-zone">
            <div class="button-wrap">
                <button id="btn-previous">이전</button>
                <button id="btn-next">다음</button>
                <button id="btn-route-save" class="btn-wide-style hide">저장</button>
                <button id="btn-preview" class="btn-wide hide">미리보기</button>
                <button id="btn-course-save" class="btn-wide">코스저장</button>
            </div>

            <div class="route-wrap">
                <ul class="route-group saved-courses">
                </ul>
            </div>

            <div class="page-wrap">
                <ul>
                    <li><a href="#" class="page-number on">1</a></li>
                    <li><a href="#" class="page-number">2</a></li>
                    <li><a href="#" class="page-number">3</a></li>
                    <li><a href="#" class="page-number">4</a></li>
                    <li><a href="#" class="page-number">5</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- 메인 컨텐츠 영역 -->
<%@include file="../common/footer.jsp" %>
<%@include file="../common/editor-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/route/route.js"></script>
</body>
=======
  <head>
    <%@include file="../common/head-meta.jsp"%> <%@include
    file="../common/head-css.jsp"%>
    <link
      rel="stylesheet"
      href="${pageContext.request.contextPath}/resources/css/route/write.css"
    />
    <title>route-write-form</title>
  </head>
  <body>
    <%@include file="../common/navbar.jsp" %>
    <div class="container">
      <div class="editor-zone">
        <!-- 제목설정 박스 -->
        <div class="editor-title">
          <h4>여행기 제목</h4>
          <input
            type="text"
            name="title"
            id="route-title"
            class="title form-control"
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <!-- 제목설정 박스 -->

        <!-- 경로저장 박스 -->
        <div class="route-info-form" style="display: none;">
          <div class="route-point"></div>
          <label for="point">지점선택</label>
          <select id="point" name="point">
            <option>새 지점</option>
          </select>
          <div class="route-location">
            <div class="abroad-info input-group">
              <label for="nation" class="input-group-text">국가</label>
              <input
                type="text"
                id="nation"
                name="nation"
                class="form-control"
                placeholder="국가 입력"
              />
              <label for="city" class="input-group-text">도시</label>
              <input
                type="text"
                id="city"
                name="city"
                class="form-control"
                placeholder="도시 입력"
              />
            </div>

            <div class="input-group">
              <label for="place" class="input-group-text">장소</label>
              <input
                type="text"
                name="place"
                id="place"
                class="form-control"
                placeholder="장소 입력"
              />
              <button
                type="button"
                class="btn btn-success input-group-append"
                id="searchBtn"
                data-toggle="modal"
                data-target="#kakaoMapModal"
              >
                검색
              </button>
              <input type="hidden" name="location" id="location" />
              <input type="hidden" name="lat" id="lat" value="0" />
              <input type="hidden" name="lng" id="lng" value="0" />
            </div>
          </div>
          <div class="route-content input-group">
            <textarea
              id="route-content-content"
              name="content"
              class="form-control"
              placeholder="내용 입력"
            ></textarea>
          </div>
          <div class="route-image input-group">
            <label for="images" class="input-group-text">이미지</label>
            <input
              type="file"
              id="images"
              name="images"
              class="form-control form-control-file"
              multiple="multiple"
            />
          </div>
          <div class="route-date input-group">
            <label for="dateStart" class="input-group-text">날짜</label>
            <input
              type="text"
              id="dateStart"
              name="dateStart"
              class="form-control"
              placeholder="시작날짜 입력"
            />
            <input
              type="text"
              name="dateEnd"
              class="form-control"
              placeholder="종료날짜 입력"
            />
          </div>
          <div class="route-score input-group-text">
            <label class="input-group-text">점수</label>
            <p class="star_rating form-control-plaintext">
              <a href="#" class="on">★</a>
              <a href="#" class="on">★</a>
              <a href="#" class="on">★</a>
              <a href="#">★</a>
              <a href="#">★</a>
            </p>
          </div>
        </div>
        <!-- 경로저장 박스 -->

        <!-- 에필로그 박스 -->
        <div class="route-epilogue-form" style="display: none;">
          <h4>에필로그</h4>
          <textarea
            id="route-epilogue"
            name="content"
            class="form-control"
            placeholder="내용 입력"
          ></textarea>
          <div class="input-group">
            <label for="hashtag" class="input-group-text">해쉬태그</label>
            <input
              type="text"
              id="hashtag"
              name="hashtag"
              class="form-control"
              placeholder="#해쉬태그"
            />
          </div>
        </div>
        <!-- 에필로그 박스 -->

        <!-- 커맨드 박스 -->
        <div class="route-write-command">
          <input
            type="button"
            class="btn btn-outline-secondary command-btn"
            id="previous-btn"
            name="previous-btn-2"
            value="이전"
            disabled
          />
          <input
            type="button"
            class="btn btn-outline-secondary command-btn"
            id="save-btn"
            name="course-save-btn"
            value="코스저장"
            disabled
          />
          <input
            type="button"
            class="btn btn-outline-secondary command-btn"
            id="next-btn"
            name="next-btn-1"
            value="다음"
          />

          <ol class="saved-courses">
            <%--
            <li>
              --%> <%--
              <h4>첫번째 제목</h4>
              --%> <%-- <span>날짜 : 2019-11-11 - 2019-12-12</span>--%> <%--
              <input type="button" value="위로" />--%> <%--
            </li>
            --%> <%--
            <li>
              --%> <%--
              <h4>두번째 제목</h4>
              --%> <%-- <span>날짜 : 2019-11-11 - 2019-12-12</span>--%> <%--
              <input type="button" value="위로" />--%> <%--
            </li>
            --%>
          </ol>
        </div>
        <!-- 커맨드 박스 -->
      </div>
      <form id="route-write-form" name="route-write-form" method="post">
        <div class="route-destination">
          <input type="hidden" id="isDomestic" name="isDomestic" value="" />
          <input type="hidden" id="seq" value="1" />
          <input type="hidden" id="nickname" value="testuser" />
        </div>
      </form>

      <!-- Kakao Modal -->
      <div
        class="modal fade"
        id="kakaoMapModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">지도 검색</h5>
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
              <div class="map_wrap">
                <div
                  id="kakaoMapDiv"
                  style="width: 100%; height: 100%; position: relative; overflow: hidden;"
                ></div>
                <div id="menu_wrap" class="bg_white">
                  <div class="option">
                    <div>
                      <form onsubmit="searchPlaces(); return false;">
                        키워드 : <input type="text" id="keyword" size="15" />
                        <button
                          type="submit"
                          class="btn btn-xs btn-success"
                          id="submit"
                        >
                          검색하기
                        </button>
                      </form>
                    </div>
                  </div>
                  <hr />
                  <ul id="placesList"></ul>
                  <div id="pagination"></div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onclick="moveClose()"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Google Modal -->
      <div id="googleMapModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
              <h4 class="modal-title">Google Map</h4>
            </div>
            <div class="google-modal-body">
              <input
                id="pac-input"
                class="controls"
                type="text"
                placeholder="Search Box"
                style="width: 230px;"
              />
              <!-- 맵 출력 -->
              <div id="googleMapDiv" style="width: 100%; height: 500px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- kakao map -->

    <%@include file="../common/editor-js.jsp" %>
    <script
      type="text/javascript"
      src="${pageContext.request.contextPath}/resources/js/route/route.js"
    ></script>
  </body>
>>>>>>> Stashed changes
</html>
