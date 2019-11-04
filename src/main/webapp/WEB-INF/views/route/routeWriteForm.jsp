<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>route-write-form</title>
  </head>
  <body>
    <div>route-write-form 입니다.</div>
    <form id="route-write-form" name="route-write-form">
      <div>
        제목입력
        <input
          type="text"
          name="routeTitle"
          id="route-title"
          placeholder="제목을 입력해 주세요"
        />
      </div>
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
          id="overseas-radio"
          name="destination"
          value="overseas"
        />해외
      </div>
      <div class="route-info" style="display: none;">
        <div class="route-point"></div>
        <label>지점선택</label>
        <select name="point">
          <option>새 지점</option>
        </select>
        <div class="route-location"></div>
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
      </div>
      <input type="hidden" id="rno" name="rno" />
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
  </body>
  <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"
  ></script>
  <script type="text/javascript" src="/resources/js/route.js"></script>
</html>
