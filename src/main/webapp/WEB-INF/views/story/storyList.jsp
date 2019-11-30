<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/story/story.css">
    <title>스토리페이지</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="btn-wrap">
    <sec:authorize access="isAuthenticated()">
        <button id="btn-write">+ 글 작성하러 가기</button>
    </sec:authorize>
</div>
<div class="container-wrap">
    <section class="sec-story">
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">
                    <a href="">에세이예시</a>
                </h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">
                    <a href="">루트 예시</a>
                </h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
        <!-- 컨텐츠 하나 -->
        <article class="story">
            <div class="story-img-wrap">
                <img
                        src="https://picsum.photos/300/200?random=1"
                        alt=""
                        class="story-img"
                />
            </div>
            <div class="story-content-wrap">
                <h5 class="story-title">컨텐츠제목</h5>
                <div class="story-info">
                    <span class="info-icon likes">12</span>
                    <span class="info-icon views">11</span>
                    <span class="info-icon comments">20</span>
                </div>
            </div>
            <div class="story-user-wrap">
                <img
                        src="https://picsum.photos/300/200?random=2"
                        alt=""
                        class="profile-img"
                />
                <div class="user-info">
                    <h6>닉네임</h6>
                    <p>2019.11.11</p>
                </div>
            </div>
        </article>
        <!-- 컨텐츠 하나 -->
    </section>
</div>
<!-- 메인 컨텐츠 영역 -->
<%@include file="../common/footer.jsp"%>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/story/story2.js"></script>
</body>
</html>
