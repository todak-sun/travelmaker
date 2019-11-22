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
      <!-- <input type="file" id="files" />
          <img id="image" /> -->
      <button id="test1" name="test1">테스트 버튼</button>
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
          type="date"
          id="dateStart"
          name="dateStart"
          class="form-control"
          placeholder="시작날짜 입력"
        />
        <input
          type="date"
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

      <ol class="saved-courses"></ol>
    </div>
    <!-- 커맨드 박스 -->
  </div>
  <form id="route-write-form" name="route-write-form" method="post">
    <div class="route-destination">
      <input type="hidden" id="isDomestic" name="isDomestic" value="" />
      <input type="hidden" id="seq" value="${userDetail.seq}" />
      <input type="hidden" id="nickname" value="${userDetail.nickname}" />
    </div>
  </form>
</div>
