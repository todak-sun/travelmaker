<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include
            file="../common/head-css.jsp" %>
    <link
            rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/route/write.css"
    />
    <title>여행경로 추천글 쓰기</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<!-- 메인 컨텐츠 영역 -->
<div class="hide">
    <input type="hidden" name="rno" id="rno" value="${routeDTO.rno}"/>
    <input
            type="hidden"
            name="imageName"
            id="imageName"
            value="${routeDTO.imageName}"
    />
    <input
            type="hidden"
            name="isDomestic"
            id="isDomestic"
            value="${routeDTO.isDomestic}"
    />
    <input type="hidden" name="location" id="location"/>
    <input type="hidden" name="lat" id="lat" value="0"/>
    <input type="hidden" name="lng" id="lng" value="0"/>
    <input type="hidden" name="seq" id="seq" value="${userDetail.seq}"/>
    <input
            type="hidden"
            name="nickname"
            id="nickname"
            value="${userDetail.nickname}"
    />
    <input type="file" name="images" id="images" multiple="multiple"/>
    <input type="file" name="image-main" id="image-main"/>
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
                    <input
                            type="text"
                            name="title"
                            id="route-title"
                            value="${routeDTO.title }"
                    />
                </div>
                <div class="image-wrap" id="image-main-display">
                    <div>
                        <img
                                id="img-main"
                                alt=""
                                src="${routeDTO.imageName}"
                        />
                        <span class="image-change"
                        >여행이야기의 대표 이미지를 설정해주세요!!</span
                        >
                    </div>
                </div>
            </div>
            <!-- 첫번쨰 에디터 -->

            <!-- 두번째 에디터 -->
            <div class="editor-second hide">
                <div class="title">
                    <h4>이곳에 제목이 들어갑니다</h4>
                </div>

                <!-- <div class="input-wrap country">
                  <label for="nation">국가</label>
                  <input type="text" name="nation" id="nation" value="" />
                </div>

                <div class="input-wrap city">
                  <label for="city">도시</label>
                  <input type="text" name="city" id="city" value="" />
                </div> -->

                <div class="input-wrap place">
                    <label for="place">장소</label>
                    <input type="text" name="place" id="place" value=""/>
                    <button
                            class="place-finder"
                            id="searchBtn"
                            data-toggle="modal"
                            data-target="#kakaoMapModal"
                    >
                        찾기
                    </button>
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
                      placeholder="내용을 입력해주세요"
              ></textarea>
                </div>

                <div class="image-wrap">
                    <button id="image-add">+ 이미지 추가</button>
                    <ul class="image-group empty"></ul>
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
              <textarea
                      id="route-epilogue"
                      name="content"
                      placeholder="내용을 입력해주세요"
              >${routeDTO.content}</textarea>
                </div>

                <div class="hash-area">
                    <div class="input-wrap">
                        <input type="text" id="hash-input"/>
                        <button id="hash-add">추가</button>
                    </div>
                    <c:set
                            var="hashes"
                            value="${fn:split(routeDTO.hashtag, ' ')}"
                    />
                    <div class="hash-view" id="hash-view">
                        <c:if test="${routeDTO.hashtag ne null}">
                            <c:set var="hashes" value="${fn:split(routeDTO.hashtag, ' ')}"/>
                            <c:forEach items="${hashes}" var="hash">
                                <span class="hash">${hash}</span>
                            </c:forEach>
                        </c:if>
                    </div>
                </div>
            </div>
        </div>

        <div class="nav-zone">
            <div class="button-wrap">
                <button id="btn-previous">이전</button>
                <button id="btn-next">다음</button>
                <button id="btn-route-save" class="btn-wide-style hide">
                    저장
                </button>
                <button id="btn-preview" class="btn-wide hide">미리보기</button>
                <button id="btn-course-save" class="btn-wide">코스저장</button>
            </div>

            <div class="route-wrap">
                <ul class="route-group saved-courses">
                    <!-- 수정시 네비존 채우기 -->
                    <c:forEach var="course" items="${contentList }">
                        <li draggable="true" droppable="true" style="[draggable='true'] {
                    -khtml-user-drag: element; }">
                            <div class="route-item" name="item">
                                <span class="delete" name="delete-course">&times;</span>
                                <h5>${course.location}</h5>
                                <div class="route-info" name="info">
                                    <p><span>${course.dateStart}</span> ~ <span>${course.dateEnd}</span></p>
                                    <button name="modify-course">수정</button>
                                    <input type="hidden" name="crno" value=${course.crno}>
                                </div>
                            </div>
                        </li>
                    </c:forEach>
                </ul>
            </div>
        </div>
    </div>
</div>
<!— 메인 컨텐츠 영역 —>
<%@include file="../common/footer.jsp" %>
<%@include
        file="../common/editor-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/route/route.js"></script>
</body>
</html>
