/**
 * 
 */
	
$('#title').focusout(function(){
	var title = $('#title').val();
	var titleDiv = $('#titleDiv');
	
	if(title == '') {
		titleDiv.css('font-size', '12px').css('font-style', 'bold').css('color', 'red').text('제목을 입력해주세요.');
	} else {
		titleDiv.removeAttr('style');
		titleDiv.empty();
	}
});
$('#date_start').focusout(function(){
	var date_start = $('#date_start').val();
	var date_startDiv = $('#date_startDiv');
	
	if(date_start == '') {
		date_startDiv.css('font-size', '12px').css('font-style', 'bold').css('color', 'red').text('시작일을 입력해주세요.');
	} else {
		date_startDiv.removeAttr('style');
		date_startDiv.empty();
	}
});
$('#date_end').focusout(function(){
	var date_end = $('#date_end').val();
	var date_endDiv = $('#date_endDiv');
	
	if(date_end == '') {
		date_endDiv.css('font-size', '12px').css('font-style', 'bold').css('color', 'red').text('종료일을 입력해주세요.');
	} else {
		date_endDiv.removeAttr('style');
		date_endDiv.empty();
	}
});

$('#nextBtn').click(function() {
	var title = $('#title').val();
	var date_start = $('#date_start').val();
	var date_end = $('#date_end').val();
	
	var titleDiv = $('#titleDiv');
	var date_startDiv = $('#date_startDiv');
	var date_endDiv = $('#date_endDiv');
	
	if(title == '') {
		titleDiv.css('font-size', '12px').css('font-style', 'bold').css('color', 'red').text('제목을 입력해주세요.');
	} else if(date_start == '') {
		date_startDiv.css('font-size', '12px').css('font-style', 'bold').css('color', 'red').text('시작일을 입력해주세요.');
	} else if(date_end == '') {
		date_endDiv.css('font-size', '12px').css('font-style', 'bold').css('color', 'red').text('종료일을 입력해주세요.');
	} else {
		$('#writeForm').submit();
	}
});
$('#cancel').click(function() {
	var result = confirm('정말로 취소하시겠습니까?');

	if (result) {
		alert('취소하였습니다.');
		location.href = '/friend/list';
	}
});