// 웹소켓을 지정한 url로 연결한다.
/*<c:url value="/echo"/>*/
let sock = new SockJS("/echo");
sock.onmessage = onMessage;
sock.onclose = onClose;

function onMessage(msg) {
	var data = msg.data;
	var jsondata = JSON.parse(data);
	console.log(jsondata);
<<<<<<< HEAD

=======
	
>>>>>>> 3fb8553d71ee68629160b3597a957197aa8473a1
	/* 대행신청 */
	if (jsondata.header == 'friend') {
		$('#alarmOff').hide();
		$('#alarmOn').show();
		$('#alarmBtnDisplay').empty();
		alarmDataload($('#alarmOn').data('seq'));
	}

	if (jsondata.header == 'purA' || jsondata.header == 'purB') {
		$('#alarmOff').hide();
		$('#alarmOn').show();
		$('#alarmBtnDisplay').empty();
		alarmDataload($('#alarmOn').data('seq'));
	}
	
}

function onClose(evt) {
	// $("#data").append("연결 끊김");
}

$('#closeAlarm').click(function() {
	$('#alarmDisplay').hide();
	$('#alarmOff').show();
	$('#alarmOn').hide();
});

/*알람 데이터 로드*/
function alarmDataload(seq) {

	var token = $("meta[name='_csrf']").attr('content');
	var header = $("meta[name='_csrf_header']").attr('content');

	$.ajax({
		type : 'get',
		url : '/alarm/load',
		data : 'seq=' + seq,
		dataType : 'json',
		beforeSend : function(xhr) {
			// here it is
			xhr.setRequestHeader(header, token);
		},
		success : function(data) {
			console.log(data);
			$.each(data, function(index, items) {
<<<<<<< Updated upstream
				$('#alarmDisplay').append(
						'<button type="button" class="alarmBtn" data-ano ="'
=======
<<<<<<< HEAD
				$('#alarmBtnDisplay').append(
						'<button type="button" id="alarmBtn" data-ano ="'
>>>>>>> Stashed changes
								+ items.ano + '" data-header="' + items.header
								+ '">' + items.content + '</button><br>');
			});
			
			if(data.length>0){
=======
				$('#alarmDisplay').append(
						'<button type="button" class="alarmBtn" data-ano ="'
								+ items.ano + '" data-header="' + items.header
								+ '">' + items.content + '</button><br>');
			});
			console.log(data.length);
			if (data.length < 1) {
				$('#alarmOff').show();
				$('#alarmOn').hide();
				$('#alarmDisplay').hide();
			} else {
>>>>>>> 3fb8553d71ee68629160b3597a957197aa8473a1
				$('#alarmOff').hide();
				$('#alarmOn').show();
			}

			/*
			 * $('#alarmOn').click(function(){ $('#alarmDisplay').show(); });
			 */
			
<<<<<<< Updated upstream
			$('.alarmBtn').click(function() {
				console.log('음..아주 좆같구먼');
				var ano = $(this).data('ano');
				var header = $(this).data('header');

=======
<<<<<<< HEAD
			$('#alarmBtn').click(function() {
=======
			$('.alarmBtn').click(function() {
				
>>>>>>> 3fb8553d71ee68629160b3597a957197aa8473a1
				var ano = $(this).data('ano');
				var header = $(this).data('header');
				console.log(header);
>>>>>>> Stashed changes
				$.ajax({
					type : 'get',
					url : '/alarm/' + header + '/' + ano,
					dataType : 'json',
					success : function(data) {
<<<<<<< Updated upstream
						console.log(data.fno);
						location.href = '/' + header + '/view/' + data.fno;
=======
						if(header=='friend'){
							location.href = '/' + header + '/view/' + data.fno;
						}else if(header=='purA'){
							location.href = '/pur/view/1/' + data.fno;
						}else if(header=='purB'){
							location.href = '/pur/view/2/' + data.fno;
						}
>>>>>>> Stashed changes
					},
					error : function(error) {
						console.log(error);
					}
				});
			});
		},
		error : function(err) {
			console.log(err);
			alert('실패');
		}
	});
<<<<<<< HEAD
}
=======
}

>>>>>>> 3fb8553d71ee68629160b3597a957197aa8473a1
