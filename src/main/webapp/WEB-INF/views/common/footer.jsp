<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!--푸터 영역-->
<footer>
    <sec:authorize access="isAuthenticated()">
        <div class="remote-controller">
            <ul class="remote-controller-group">
                <li><a href="#" class="scroll-up"></a></li>
                <li><a href="#" class="scroll-down"></a></li>
                <li><a href="#" class="my-page"></a></li>
                <li><a href="#" class="message"></a></li>
            </ul>
        </div>
    </sec:authorize>
</footer>
<!--푸터 영역-->
