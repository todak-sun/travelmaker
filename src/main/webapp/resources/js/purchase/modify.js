$('#updateBtn').click(function(){
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	$.ajax({
		type : 'post',
		url : '/pur/setmodify',
		data : $('#purchaseModify').serialize(),
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success : function() {
			console.log('success');
			alert('수정 하였습니다.');
			location.href = '/pur/list/1';
		},
		error : function(error) {
			console.log(error);
		}
	});
});