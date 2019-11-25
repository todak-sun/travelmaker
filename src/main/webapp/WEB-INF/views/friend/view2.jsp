<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/friend/view2.css">
    <title>동행 게시글</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>

<!-- 메인 컨텐츠 영역 -->
<div class="container-wrap">
    <sec:authentication var="userDetail" property="principal"/>
    <div class="hidden">
        <input type="hidden" id="friendFno" value="${friendDTO.fno}">
        <input type="hidden" id="friendSeq" value="${friendDTO.seq}">
        <input type="hidden" id="friendId" value="${friendDTO.id}">
        <input type="hidden" id="friendIs_domestic" value="${friendDTO.is_domestic}">
        <input type="hidden" id="friendDate_start" value="${friendDTO.date_start}">
        <input type="hidden" id="friendDate_end" value="${friendDTO.date_end}">
        <input type="hidden" id="friendDate_of_issue" value="${friendDTO.date_of_issue}">
        <input type="hidden" id="username" value="${userDetail.username}">
    </div>
    <div class="map-wrap">
        <img src="${pageContext.request.contextPath}/resources/img/front-map.png" alt=""/>
    </div>
    <div class="content-wrap">
        <ul class="content-group">
            <!-- 상세계획 한개 -->
            <li>
                <div class="content-item">
                    <p class="place">서울특별시 강남대로</p>
                    <p class="date">
                        <span class="from">2018.01.01</span>
                        <span class="to">2018.01.02</span>
                    </p>
                    <div class="content-detail">
                        <p>저는 이번여행에서 정말 대단한 발견을 하고 올것임.</p>
                        <div class="button-wrap">
                            <!-- 자신의 글과 비교하여 한 개만 렌더링 -->
                            <button id="btn-test">신청</button>
                            <!-- <button>신청확인</button> -->
                            <!-- 자신의 글과 비교하여 한 개만 렌더링 -->
                        </div>
                    </div>
                    <ul class="request-group"></ul>
                </div>
            </li>
            <!-- 상세계획 한개 -->
            <!-- 상세계획 한개 -->
            <li>
                <div class="content-item">
                    <p class="place">서울특별시 강남대로</p>
                    <p class="date">
                        <span class="from">2018.01.01</span>
                        <span class="to">2018.01.02</span>
                    </p>
                    <div class="content-detail">
                        <p>저는 이번여행에서 정말 대단한 발견을 하고 올것임.</p>
                        <div class="button-wrap">
                            <!-- 자신의 글과 비교하여 한 개만 렌더링 -->
                            <button>신청확인</button>
                            <!-- 자신의 글과 비교하여 한 개만 렌더링 -->
                        </div>
                    </div>
                    <ul class="request-group">
                        <!-- 신청그룹 한 개 -->
                        <li>
                            <div class="request-item">
                                <div class="user-area">
                                    <div class="image-wrap">
                                        <img
                                                src="https://source.unsplash.com/collection/190727/80x80"
                                                alt=""
                                        />
                                    </div>
                                    <p class="author">닉네임</p>
                                </div>
                                <div class="content-area">
                                    <p class="date">
                                        <span class="from">2018.01.01</span>
                                        <span class="to">2018.01.02</span>
                                    </p>
                                    <div class="content-detail">
                                        <p>저도 그 발견을 함께하고 싶네요.</p>
                                        <div class="button-wrap">
                                            <button class="btn btn-tsave">수락</button>
                                            <button class="btn btn-tdanger">거절</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- 신청그룹 한 개 -->
                        <!-- 신청그룹 한 개 -->
                        <li>
                            <div class="request-item">
                                <div class="user-area">
                                    <div class="image-wrap">
                                        <img
                                                src="https://source.unsplash.com/collection/190727/80x80"
                                                alt=""
                                        />
                                    </div>
                                    <p class="author">닉네임</p>
                                </div>
                                <div class="content-area">
                                    <p class="date">
                                        <span class="from">2018.01.01</span>
                                        <span class="to">2018.01.02</span>
                                    </p>
                                    <div class="content-detail">
                                        <p>저도 그 발견을 함께하고 싶네요.</p>
                                        <div class="button-wrap">
                                            <button class="btn btn-tsave">수락</button>
                                            <button class="btn btn-tdanger">거절</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- 신청그룹 한 개 -->
                    </ul>
                </div>
            </li>
            <!-- 상세계획 한개 -->
        </ul>
    </div>
</div>
<!-- 메인 컨텐츠 영역 -->

<%@include file="../common/foot-js.jsp" %>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=58d9a72c9db8da0b849a32734093767e"></script>
</body>
</html>
