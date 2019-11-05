<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>route-write-form</title>
    <style>
      .star_rating {
        font-size: 0;
        letter-spacing: -4px;
      }
      .star_rating a {
        font-size: 22px;
        letter-spacing: 0;
        display: inline-block;
        margin-left: 5px;
        color: #ccc;
        text-decoration: none;
      }
      .star_rating a:first-child {
        margin-left: 0;
      }
      .star_rating a.on {
        color: #777;
      }
    </style>
  </head>
  <body>
    <div>route-write-form 입니다.</div>
    <div>
      제목입력
      <input
        type="text"
        name="title"
        id="route-title"
        placeholder="제목을 입력해 주세요"
      />
    </div>
    <form id="route-write-form" name="route-write-form">
      <div class="route-destination">
        <input
          type="radio"
          id="domestic-radio"
          name="destination"
          value="domestic"
          checked
        />국내
        <input
          type="radio"
          id="abroad-radio"
          name="destination"
          value="abroad"
        />해외
      </div>
      <div class="route-info-form" style="display: none;">
        <div class="route-point"></div>
        <label>지점선택</label>
        <select name="point">
          <option>새 지점</option>
        </select>
        <div class="route-location">
          <div class="abroad-info">
            <label>국가</label>
            <input type="text" name="nation" placeholder="국가 입력" />
            <label>도시</label>
            <input type="text" name="city" placeholder="도시 입력" />
          </div>
          <label>장소</label>
          <input type="text" name="place" placeholder="장소 입력" />
          <input type="hidden" name="location" />
        </div>
        <div class="route-content">
          <label>내용입력</label>
          <textarea name="content" placeholder="내용 입력"></textarea>
        </div>
        <div class="route-image">
          <label>사진</label>
          <input type="file" name="image" />
        </div>
        <div class="route-date">
          <label>날짜</label>
          <input type="text" name="dateStart" placeholder="시작날짜 입력" />
          <input type="text" name="dateEnd" placeholder="종료날짜 입력" />
        </div>
        <div class="route-score">
          <label>점수</label>
          <p class="star_rating">
            <a href="#" class="on">★</a>
            <a href="#" class="on">★</a>
            <a href="#" class="on">★</a>
            <a href="#">★</a>
            <a href="#">★</a>
          </p>
          <input type="hidden" name="score" />
        </div>
      </div>
      <input type="hidden" id="rno" name="rno" />

      <div class="route-epilogue-form" style="display: none;">
        <label>에필로그</label>
        <textarea name="epilogue" placeholder="내용 입력"></textarea>
      </div>
    </form>
    <div class="route-write-command">
      <input
        type="button"
        class="command-btn"
        id="previous-btn"
        name="previous-btn-2"
        value="이전"
        disabled
      />
      <input
        type="button"
        class="command-btn"
        id="save-btn"
        name="course-save-btn"
        value="코스저장"
        disabled
      />
      <input
        type="button"
        class="command-btn"
        id="next-btn"
        name="next-btn-1"
        value="다음"
      />
    </div>
    <ol class="saved-courses"></ol>
  </body>
  <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"
  ></script>
  <script type="text/javascript" src="/resources/js/route.js"></script>
</html>
