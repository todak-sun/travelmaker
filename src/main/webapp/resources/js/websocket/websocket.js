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
		$('#alarmBtnDisplay').empty();
		//DB에서 안읽은 알람만 가지고 옴.
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
		url : '/alarm/load',
		data : 'seq=' + seq,
		dataType : 'json',
		beforeSend : function(xhr) {
			// here it is
			xhr.setRequestHeader(header, token);
		},
		success : function(data) {
			console.log(data);
			//알람을 그려주는 곳.
			$.each(data, function(index, items) {
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
				$('#alarmOff').hide();
				$('#alarmOn').show();
				$('#alarmDisplay').hide();
			}

			/*
			 * $('#alarmOn').click(function(){ $('#alarmDisplay').show(); });
			 */
			
			$('.alarmBtn').click(function() {
				
				var ano = $(this).data('ano');
				var header = $(this).data('header');
				console.log(header);
				$.ajax({
					type : 'get',
					url : '/alarm/' + header + '/' + ano,
					dataType : 'json',
					success : function(data) {
						if(header=='friend'){
							location.href = '/' + header + '/view/' + data.fno;
						}else if(header=='purA'){ //사달라
							location.href = '/pur/view/1/' + data.fno;
						}else if(header=='purB'){ //사다달라
							location.href = '/pur/view/2/' + data.fno;
						}
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
}

