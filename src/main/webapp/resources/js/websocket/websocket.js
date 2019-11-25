// 웹소켓을 지정한 url로 연결한다.
/*<c:url value="/echo"/>*/
let sock = new SockJS("/echo");
sock.onmessage = onMessage;
sock.onclose = onClose;

function onMessage(msg) {
	var data = msg.data;
	var jsondata = JSON.parse(data);

	console.log(jsondata);
	/* 대행신청 */
	if (jsondata.header == 'friend') {
		$('#alarmOff').hide();
		$('#alarmOn').show();
	}

}

function onClose(evt) {
	// $("#data").append("연결 끊김");
}

/*
 * function friendAlarm(fno, username) { let json =
 * '{"header":"friend","data":{"fno":"' + fno + '","username":"'+username+'"}}'
 * sock.send(json); }
 */

$('#closeAlarm').click(function() {
	$('#alarmDisplay').hide();
	$('#alarmOff').show();
	$('#alarmOn').hide();
});

function alarmDataload(seq) {

	var token = $("meta[name='_csrf']").attr('content');
	var header = $("meta[name='_csrf_header']").attr('content');

	$.ajax({
		type : 'get',
		url : './alarm/load',
		data : 'seq=' + seq,
		dataType : 'json',
		beforeSend : function(xhr) {
			// here it is
			xhr.setRequestHeader(header, token);
		},
		success : function(data) {
			$.each(data, function(index, items) {
				$('#alarmDisplay').append(
						'<button type="button" id="alarmBtn" data-ano ="'
								+ items.ano + '" data-header="' + items.header
								+ '">' + items.content + '</button><br>');
				$('#alarmDisplay').append('<input type="hidden" ');
			});
			console.log(data.length);
			if(data.length < 1) {
				$('#alarmOff').show();
				$('#alarmOn').hide();
				$('#alarmDisplay').hide();
			} else {
				$('#alarmOff').hide();
				$('#alarmOn').show();
				$('#alarmDisplay').hide();
			}
			
			/*$('#alarmOn').click(function(){
				$('#alarmDisplay').show();
			});*/
			
			$('#alarmBtn').click(function() {
				console.log('음..아주 좆같구먼');
				var ano = $(this).data('ano');
				var header = $(this).data('header');

				$.ajax({ 
					type: 'get',
					url: '/alarm/' + header + '/' + ano,
					dataType: 'json',
					success: function(data){
						console.log(data.fno);
						location.href='/' + header + '/view/' + data.fno;
					},
					error: function(error){
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
}

// href="/alarm/'+items.header+'/'+items.ano+'">'+items.content+

/*
 * document.getElementById('alarmBtn').onclick = function(){ console.log('음..아주
 * 좆같구먼1111'); }
 */