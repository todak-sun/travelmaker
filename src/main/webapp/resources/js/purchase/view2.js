$(function() {
	let sock = new SockJS("/echo");
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	if($('#loginNickname').val()!=undefined){
		if($('#loginNickname').val()!=$('#nickname').val()){ // 신청하기 /자신이 아닐때
			$('.button-wrap').append('<input id="next-btn" type="button" class="btn btn-travel" data-target="#requestWriteModal" value="신청">');
			$('.content-wrap').remove();
		}else{
			$('.button-wrap').append('<input id="modify-btn" type="button" class="btn btn-travel" value="수정">');
			$('.button-wrap').append('<input id="delete-btn" type="button" class="btn btn-travel" value="삭제">');
			$('.button-wrap').append('<input id="list-btn" type="button" class="btn btn-travel" value="신청확인">');
			
			$.ajax({
				type : 'get',
				url : '/pur/getOrderView',
				data : {
					'bno' : $('#bno').val()
				},
				dataType : 'json',
				beforeSend : function(xhr) {
					xhr.setRequestHeader(header, token);
				},
				success : function(data) {
					// 맵쪽에 뿌려줄 좌표를 담을 배열
					console.log(JSON.stringify(data));
					// 작은 Route Content를 동적으로 뿌려줌
					$.each(data, function(index, items) {
						console.log(items.dateStart);
						$('.content-group').append(viewTemplate(items));
						// 수락되어있거나 거절되었을때는 수락된것을 보여줌
					});
					
					// 각 버튼 클릭
					$('.agreeBtn').click(function(){
						changeIspermit($(this).data('seq'),1);
						$(this).text("수락됨[OK]");
					});
					
					$('.disagreeBtn').click(function(){
						changeIspermit($(this).data('seq'),2);
						$(this).text("거절됨[OK]");
					});
				},
				error : function(error) {
					console.log(error);
				}
			});
	
		}
	}
	
	function changeIspermit(seq,con){
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		var tjson = {prno : seq, isPermit : con};
			$.ajax({
				type : 'put',
				url : '/pur/setOrderPermit',
				contentType: 'application/json',
				data : JSON.stringify(tjson),
				dataType : 'json',
				beforeSend : function(xhr) {
					xhr.setRequestHeader(header, token);
				},
				success : function(data) {
					alert('수락거부 변경')
				},
				error : function(error) {
					console.log(error);
				}
			});
			
	}
	
	
	$('#next-btn').click(function(){
		$('#requestWriteModal').modal('show');
	});


	// 작은 게시물에 버튼 클릭하면 동행 신청 모달이동
	// 동행신청 폼 저장
	$('#req-btn-try').click(function() {

		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");

		$.ajax({
			type : 'post',
			url : '/pur/setOrderWrite',
			data : $('#requestForm').serialize(),
			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success : function() {
				console.log('success');
				alert('신청 완료 하였습니다.');
				purAlarm($('#bno').val(), $('#username').val());
				location.href = '/pur/list/1';
			},
			error : function(error) {
				console.log(error);
			}
		});
	});

	
  function purAlarm(bno, username) { 
	  let json =
	  '{"header":"pur","data":{"bno":"' + bno + '","username":"' + username +'"}}';
	  sock.send(json);
  }

	function viewTemplate(items){
		
		let innerTemp = null;
		
		if(items.isPermit==1){
			innerTemp = `
											<div class="button-wrap">
												<button class="agreeBtn" data-seq="${items.prno}">수락됨[OK]</button>
												<button class="disagreeBtn" data-seq="${items.prno}">거절</button>
											</div>
			`;
		}else if(items.isPermit==2){
			innerTemp = `
				<div class="button-wrap">
					<button class="agreeBtn" data-seq="${items.prno}">수락</button>
					<button class="disagreeBtn" data-seq="${items.prno}">거절됨[OK]</button>
				</div>
				`;
		}else{
			innerTemp = `
				<div class="button-wrap">
					<button class="agreeBtn" data-seq="${items.prno}">수락</button>
					<button class="disagreeBtn" data-seq="${items.prno}">거절</button>
				</div>
				`;
		}
		
		let temp=
			`
					<li>
					<div class="request-item">
									<div class="user-area">

										<p class="author">아이디 : ${items.nickname}</p>
										<p class="author">상품명 : ${items.productname}</p>
										<p class="author">가격    : ${items.price}</p>
										<p class="author">수량    : ${items.quantity}</p>
									</div>
									<div class="content-area">
										<div class="content-detail">
											<p>내용 : ${items.content}</p>`
										+innerTemp+	
										`</div>
									</div>
								</div>
					</li>
			`;
		return temp;
	}
	

	// 수정하기
	$('#modify-btn').click(function(){
		location.href = '/pur/modify/'+$('#bno').val();
	});
	
	// 삭제하기
	$('#delete-btn').click(function(){
		var con = confirm("정말로 삭제하시겠습니까?");
		if(con == true){
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			$.ajax({
				type : 'delete',
				url : '/pur/deletePurchaseO/'+$('#bno').val(),
				beforeSend : function(xhr) {
					xhr.setRequestHeader(header, token);
				},
				success : function() {
					console.log('success');
					alert('삭제 하였습니다.');
					location.href = '/pur/list/1';
				},
				error : function(error) {
					console.log(error);
				}
			});
		}
	});
	
	// List 보이기 감추기
	$('#list-btn').click(function(){
		 if($(".content-wrap").css("display") == "none"){
			 $('.content-wrap').css("display","block");
		 }else{
			 $('.content-wrap').css("display","none");
		 }
	});
	
	
});
