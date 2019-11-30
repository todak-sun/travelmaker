<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/friend/view2.css"/>
    <title>동행계시글</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="container-wrap">
    ${friendDTO}
    <div class="info-wrap">
        <h1>${friendDTO.title}</h1>
        <p class="date">
            <span class="from">${friendDTO.dateStart}</span>
            <span class="to">${friendDTO.dateEnd}</span>
        </p>
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
                            <button class="btn-try">신청</button>
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
                                        <img src="https://source.unsplash.com/collection/190727/80x80" alt=""/>
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
                                        <img src="https://source.unsplash.com/collection/190727/80x80" alt=""/>
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
<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/friend/view2-1.js"></script>
</body>
</html>