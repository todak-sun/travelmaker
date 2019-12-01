/**
 * 
 */

$(function(){	
    // 클래스
    const {getEl, addEvent} = new travelmaker.utils();
    const v = new travelmaker.validation();

    // 변수
    const title = getEl('#title');
    const dateStart = getEl('#date-start');
    const dateEnd = getEl('#date-end');
    const btnNext = getEl('#next-btn');
    const cancel = getEl('#cancel');
    
    const $ds = $('#ds').val();
    const $de = $('#de').val();
    
    dateStart.value = $ds.substring(0, 10);
    dateEnd.value = $de.substring(0, 10);

    addEvent(title, 'blur', (e) => {
        const value = e.target.value;
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) return v.setInvalid(e.target, ivFeed, '제목을 입력해주세요.');
        return v.changeValid(e.target);
    });

    addEvent(dateStart, 'blur', (e) => {
        const value = e.target.value;
        console.log(value);
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) {
        	return v.setInvalid(e.target, ivFeed, '시작일을 입력해주세요.');
        } else { // 날짜 유효성
        	var sDate = new Date(value).getTime();
        	var now = new Date().getTime();
        	
        	if(sDate < now) {
        		return v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
        	} else {
        		return v.changeValid(e.target);
        	}
        }
    });

    addEvent(dateEnd, 'blur', (e) => {
        const value = e.target.value;
        console.log(value);
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) {
        	return v.setInvalid(e.target, ivFeed, '종료일을 입력해주세요.');
        } else {
        	var sDate = new Date(dateStart.value).getTime();
        	var eDate = new Date(value).getTime();
        	
        	if(sDate > eDate) {
        		return v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
        	} else {
        		return v.changeValid(e.target);
        	}
        }
    });
    
    addEvent(btnNext, 'click', () => {
    	var token = $("meta[name='_csrf']").attr("content");
    	var header = $("meta[name='_csrf_header']").attr("content");
    	
    	var sDate = new Date(dateStart.value).getTime();
    	var eDate = new Date().getTime();
    	var now = new Date().getTime();
    	
        if (!v.isValid(title)) {
            v.setInvalid(title, v.getFeedBox(title)[1], '제목을 입력해주세요');
            return title.focus();
        }
        if (!v.isValid(dateStart)) {
            v.setInvalid(dateStart, v.getFeedBox(dateStart)[1], '시작일을 입력해주세요.');
            return dateStart.focus();
        }
        if (!v.isValid(dateEnd)) {
            v.setInvalid(dateStart, v.getFeedBox(dateEnd)[1], '종료일을 입력해주세요.');
            return dateEnd.focus();
        }
        $.ajax({
        	type: 'post',
        	url: '/friend/setModify',
        	data: $('#writeForm').serialize(),
        	beforeSend : function(xhr) {
    			xhr.setRequestHeader(header, token);
    		},
        	success: function(){
        		console.log('success');
        		location.href='/friend/routeModify/' + $('#fno').val();
        	},
        	error: function(error){
        		console.log(error);
        	}
        });
    });

    addEvent(cancel, 'click', () => {
        if (confirm('정말로 취소하시겠습니까?')) {
            alert('취소 하였습니다.');
            location.href = '/friend/view/' + fno;
        }
    });
});