<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <%@include file="../common/head-meta.jsp" %>
    <%@include file="../common/head-css.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/purchase/write.css">
    <title>사다주세요</title>
</head>
<body>
<%@include file="../common/navbar2.jsp" %>
<sec:authentication var="userDetail" property="principal"/>
<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
    <div class="hidden">
        <div class="hidden">
            <input type="hidden" id="request-user-seq" value="${purchaseDTO.requestUserSeq}">
            <input type="hidden" id="bno" value="${purchaseDTO.bno}">
            <input type="hidden" id="nickname" value="${userDetail.nickname}">
            <input type="hidden" id="seq" value="${userDetail.seq}">
            <input type="hidden" id="id" value="${userDetail.id}">
            <input type="hidden" id="username" value="${userDetail.nickname}"/>
        </div>
    </div>
</sec:authorize>

<div class="container-wrap">
    <div class="write-form">
        <div class="input-wrap">
            <label for="title">제목</label>
            <input type="text" id="title" value="${purchaseDTO.title}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="author">요청자</label>
            <input type="text" id="author" value="${purchaseDTO.nickname}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="productname">상품명</label>
            <input type="text" id="productname" value="${purchaseDTO.productname}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="image-file">상품사진</label>
            <div class="image-area">
                <img src="${purchaseDTO.img}" alt="">
            </div>
        </div>

        <div class="input-wrap">
            <label for="price">예상가격</label>
            <input type="text" id="price" value="${purchaseDTO.price}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="quantity">수량</label>
            <input type="text" id="quantity" value="${purchaseDTO.quantity}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="location">구매가능지역</label>
            <input type="text" id="location" value="${purchaseDTO.location}" disabled/>
        </div>

        <div class="input-wrap">
            <label for="date-end">배송기한</label>
            <input type="text" id="date-end" value="${purchaseDTO.dateEnd}" disabled/>
        </div>

        <div class="input-wrap textarea">
            <label for="content">상세내용</label>
            <textarea id="content" name="content" readonly>${purchaseDTO.content}</textarea>
        </div>

        <div class="button-wrap">
            <sec:authorize access="isAuthenticated()">
                <c:if test="${userDetail.seq ne purchaseDTO.writeUserSeq}">
                    <button id="btn-try" type="button" class="btn btn-tsave">신청하기</button>
                </c:if>
                <c:if test="${userDetail.seq eq purchaseDTO.writeUserSeq}">
                    <button id="btn-check" type="button" class="btn btn-tsave">신청확인</button>
                    <button id="btn-modify" type="button" class="btn btn-tsave">수정</button>
                    <button id="btn-delete" type="button" class="btn btn-tsave">삭제</button>
                </c:if>
            </sec:authorize>
        </div>

        <div class="content-wrap">
            <ul class="content-group"></ul>
        </div>
    </div>
</div>

<%--<sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">--%>
<%--    <!-- 사다주세요 신청서 Modal -->--%>
<%--    <div id="requestWriteModal" style="display: none;">--%>
<%--        <div class="tmodal">--%>
<%--            <div class="tmodal-bar">--%>
<%--                <h4 class="modal-title">신청 글쓰기</h4>--%>
<%--                <button type="button" class="close" data-dismiss="modal">&times;</button>--%>
<%--            </div>--%>

<%--            <div class="tmodal-body">--%>
<%--<form id="requestForm" class="write-form">--%>
<%--    <input type="hidden" name="bno" id="bno" value="">--%>
<%--    <input type="hidden" name="nickname" id="nickname" value="">--%>
<%--    <input type="hidden" name="requestUserSeq" id="requestUserSeq" value="">--%>
<%--    &lt;%&ndash; <input type="hidden" name="id" id="id" value="${userDetail.id }"> &ndash;%&gt;--%>
<%--    <table class="table">--%>
<%--        <tr>--%>
<%--            <td>신청 내용</td>--%>
<%--            <td><textarea rows="10" cols="70" name="content" id="req-content"></textarea></td>--%>
<%--        </tr>--%>
<%--        <tr>--%>
<%--            <td colspan="2" align="center">--%>
<%--                <button type="button" class="btn btn-success" id="req-btn-try">신청하기</button>--%>
<%--            </td>--%>
<%--        </tr>--%>
<%--    </table>--%>
<%--</form>--%>
<%--            </div>--%>

<%--            <!-- <div class="modal-footer">--%>
<%--                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>--%>
<%--                </div> -->--%>
<%--        </div>--%>
<%--        <!-- </div> -->--%>

<%--    </div>--%>
<%--</sec:authorize>--%>

<%@include file="../common/footer.jsp" %>
<%@include file="../common/foot-js.jsp" %>
<script src="${pageContext.request.contextPath}/resources/js/purchase/view.js"></script>
</body>
</html>
