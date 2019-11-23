// 웹소켓을 지정한 url로 연결한다.
/*<c:url value="/echo"/>*/
let sock = new SockJS("/echo");
sock.onmessage = onMessage;
sock.onclose = onClose;

function onMessage(msg) {
	var data = msg.data;
	var jsondata =JSON.parse(data);

	console.log(jsondata);
	/*대행신청*/
	if(jsondata.header =='friendApply'){
		//$("#alarmDisplay").append('<a href="/friend/'+jsondata.no+'">'+jsondata.data+'</a>');
		$('#alarmOff').hide();
		$('#alarmOn').show();
	}
	
}


function onClose(evt) {
	// $("#data").append("연결 끊김");
}

function friendAlarm(fno, username) {
	let json = '{"header":"friend","data":{"fno":"' + fno
			+ '","username":"rtr456@naver.com%kakao"}}'
	sock.send(json);
}


$('#closeAlarm').click(function(){
	$('#alarmDisplay').hide();
	$('#alarmOff').show();
	$('#alarmOn').hide();
});

function alarmDataload(seq){
	
    var token = $("meta[name='_csrf']").attr('content');
    var header = $("meta[name='_csrf_header']").attr('content');
    
	 $.ajax({
         type: 'get',
         url: './alarm/load',
         data:'seq=' +seq,
         dataType: 'json',
         beforeSend: function(xhr) {
           // here it is
           xhr.setRequestHeader(header, token);
         },
         success: function(data) {
        	 $.each(data, function(index, items) {
 				$('#alarmDisplay').append('<a href="/'+items.header+'/view/'+items.dataSeq+'">'+items.content+'</a><br>');
 			});
        	 
        	 $('#alarmDisplay').show();
         },
         error: function(err) {
           console.log(err);
           alert('실패');
         }
       });
}

