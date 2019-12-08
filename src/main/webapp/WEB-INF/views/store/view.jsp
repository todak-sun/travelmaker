<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/store/list2.css">
    <title>호텔 - ${hotel.korName} </title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<div class="hidden">
    <input type="hidden" id="hnb" value="${hnb}">
</div>

<div class="container-wrap">
    <div class="hotel-wrap">

        <div class="hotel-header">
            <div class="hotel-title">
                <h2 class="title-kor">${hotel.korName}</h2>
                <h3 class="title-eng">${hotel.engName}</h3>
                <a href="${hotel.mainUrl}">예약하기</a>
            </div>
        </div>

        <div class="hotel-image-wrap">
            <div class="main-image-wrap">
                <img id="main-img" src="${hotel.mainImageUrl}" alt="${hotel.korName}의 대표이미지">
            </div>

            <ul class="s-image-group">
                <c:forEach var="img" items="${hotel.imgList}">
                    <li class="image-list">
                        <img src="${img.imgUrls}" alt="" class="image-item">
                    </li>
                </c:forEach>
            </ul>

            <div class="room-banner">룸정보</div>
            <div class="room-box">
                <ul class="room-image-group">
                    <c:forEach var="room" items="${hotel.roomList}">
                        <li class="room-list">
                            <div class="room-item">
                                <div class="image-wrap">
                                    <img src="${room.imgUrl}" alt="">
                                </div>
                                <p>${room.name}</p>
                            </div>
                        </li>
                    </c:forEach>
                </ul>
            </div>
        </div>

        <div class="info-banner">상세내용</div>
        <div class="hotel-info-wrap">
            <div class="title-wrap">
                <h4 class="title">${hotel.korName}</h4>
                <p class="grade">${hotel.star}</p>
            </div>
            <p class="address">${hotel.address}</p>
            <p class="price">${hotel.price} 원 ~</p>
            <p class="hotel-detail">${hotel.content}</p>
        </div>
    </div>
</div>

<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/jquery-3.4.1.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/store/view.js"></script>
</body>
</html>