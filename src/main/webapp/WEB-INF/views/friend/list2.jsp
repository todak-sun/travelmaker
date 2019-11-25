<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/friend/list2.css">
    <title>동행 리스트</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<!-- 메인 컨텐츠 영역 -->
<div class="container-wrap">
    <div class="header-back">
        <div class="header">
            <div class="description"></div>
            <button id="btn-friend-write" type="button">동행 구하기</button>
        </div>
    </div>

    <div class="content-area">
        <ul class="content-group">
            <!-- 동행 게시글 하나 -->
            <li>
                <div class="content-item">
                    <div class="user-wrap">
                        <div class="image-wrap">
                            <img src="https://source.unsplash.com/collection/190727/200x150" alt=""/>
                        </div>
                        <h5 class="author">밥만먹고여행</h5>
                    </div>
                    <div class="title-wrap">
                        <span class="tbadge tbadge-danger">D-7</span>
                        <h4>유럽일주 함께 하실 분 구해봅니다^^</h4>
                    </div>
                    <div class="info-wrap">
                        <p class="date">
                  <span class="from">2019.08.01</span
                  ><span class="to">2019.10.12</span>
                        </p>
                        <div class="city-wrap">
                            <!-- 동행게시글 내부 계획 하나에 걸리는 도시들 목록 -->
                            <span class="city">파리</span>
                            <span class="city">런던</span>
                            <span class="city">룩셈부르크</span>
                            <span class="city">바르셀로나</span>
                            <!-- 동행게시글 내부 계획 하나에 걸리는 도시들 목록 -->
                        </div>
                        <button onclick="location.href='/friend/view/1'">
                            상세보기예시
                        </button>
                    </div>
                </div>
            </li>
            <!-- 동행 게시글 하나 -->
            <!-- 동행 게시글 하나 -->
            <li>
                <div class="content-item">
                    <div class="user-wrap">
                        <div class="image-wrap">
                            <img src="https://source.unsplash.com/collection/190727/200x150" alt=""/>
                        </div>
                        <h5 class="author">밥만먹고여행</h5>
                    </div>
                    <div class="title-wrap">
                        <span class="tbadge tbadge-danger">D-7</span>
                        <h4>유럽일주 함께 하실 분 구해봅니다^^</h4>
                    </div>
                    <div class="info-wrap">
                        <p class="date">
                  <span class="from">2019.08.01</span
                  ><span class="to">2019.10.12</span>
                        </p>
                        <div class="city-wrap">
                            <span class="city">파리</span>
                            <span class="city">런던</span>
                            <span class="city">룩셈부르크</span>
                            <span class="city">바르셀로나</span>
                        </div>
                        <button>상세보기</button>
                    </div>
                </div>
            </li>
            <!-- 동행 게시글 하나 -->
            <!-- 동행 게시글 하나 -->
            <li>
                <div class="content-item">
                    <div class="user-wrap">
                        <div class="image-wrap">
                            <img
                                    src="https://source.unsplash.com/collection/190727/200x150"
                                    alt=""
                            />
                        </div>
                        <h5 class="author">밥만먹고여행</h5>
                    </div>
                    <div class="title-wrap">
                        <span class="tbadge tbadge-danger">D-7</span>
                        <h4>유럽일주 함께 하실 분 구해봅니다^^</h4>
                    </div>
                    <div class="info-wrap">
                        <p class="date">
                  <span class="from">2019.08.01</span
                  ><span class="to">2019.10.12</span>
                        </p>
                        <div class="city-wrap">
                            <span class="city">파리</span>
                            <span class="city">런던</span>
                            <span class="city">룩셈부르크</span>
                            <span class="city">바르셀로나</span>
                        </div>
                        <button>상세보기</button>
                    </div>
                </div>
            </li>
            <!-- 동행 게시글 하나 -->
            <!-- 동행 게시글 하나 -->
            <li>
                <div class="content-item">
                    <div class="user-wrap">
                        <div class="image-wrap">
                            <img src="https://source.unsplash.com/collection/190727/200x150" alt=""/>
                        </div>
                        <h5 class="author">밥만먹고여행</h5>
                    </div>
                    <div class="title-wrap">
                        <span class="tbadge tbadge-danger">D-7</span>
                        <h4>유럽일주 함께 하실 분 구해봅니다^^</h4>
                    </div>
                    <div class="info-wrap">
                        <p class="date">
                  <span class="from">2019.08.01</span
                  ><span class="to">2019.10.12</span>
                        </p>
                        <div class="city-wrap">
                            <span class="city">파리</span>
                            <span class="city">런던</span>
                            <span class="city">룩셈부르크</span>
                            <span class="city">바르셀로나</span>
                        </div>
                        <button>상세보기</button>
                    </div>
                </div>
            </li>
            <!-- 동행 게시글 하나 -->
        </ul>
    </div>
</div>
<!-- 메인 컨텐츠 영역 -->
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/friend/list2.js"></script>
</body>
</html>