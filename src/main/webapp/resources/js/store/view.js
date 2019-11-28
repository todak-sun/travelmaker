/**
 * 
 */

$(function(){
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	$.ajax({
		type: 'post',
		url: '/store/getHotelView',
		data: {'hnb' : $('#hnb').val()},
		dataType: 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(data){
			console.log(JSON.stringify(data));
			console.log(data.responseText);
			
			// 맨 위에 image 모음
			$.each(data.imgList, function(i, items){
				$('#imgTr').append(imgTemplate(items));
			});
			// 호텔 content
			$('#viewTable').append(contentTemplate(data));
			
			// 예약하러가기 버튼 url 걸기
			$('#reservationBtn').attr('target', '_blank');
			$('#reservationBtn').attr('href', data.mainUrl);
			
			$('#reservationBtn').click(function(){
				window.open(this.href);
				return false;
			});
			// 가격 형변환
			var aa = data.price.split(',');
			var price = aa[0] + aa[1];
			price *= 1;
			var temp = 15000;

			// 방 정보
			$.each(data.roomList, function(j, item){
				var temp_tal = 0;
				// 가격 갯수대로 15000원씩 증가돼서 방 가격 매김.
				temp_tal = temp * j + price;
				$('body').append(roomTemplate(item, temp_tal));
			});
		},
		error: function(error){
			console.log(error);
		}
	});
});

// 호텔 content
function contentTemplate(data) {
	var contentTemp = `
		<tr>
			<th>글 번호</th>
			<th>${data.hnb }</th>
		</tr>
		<tr>
			<th>이름</th>
			<th>${data.korName } <br /> ${data.engName }
			</th>
		</tr>
		<tr>
			<th>등급</th>
			<th>${data.star }</th>
		</tr>
		<tr>
			<th>주소</th>
			<th>${data.address }</th>
		</tr>
		<tr>
			<th>가격</th>
			<th>${data.price }원 ~</th>
		</tr>
		<tr>
			<th>내용</th>
			<th>${data.content }</th>
		</tr>
	`;
	return contentTemp;
}

// 이미지 모음
function imgTemplate(items) {
	var imgTemp = `
		<td><img src="${items.imgUrls}"></td>
	`;
	return imgTemp;
}

// 방 정보
function roomTemplate(item, temp_tal) {
	var roomTemp = `
		<table border="3" style="float: left; margin-right:10px;">
			<tr>
				<td><img src="${item.imgUrl}"></td>
			</tr>
			<tr>
				<th>방 이름</th>
				<td>${item.name }</td>
			</tr>
			<tr>
				<th>갯수</th>
				<td>${item.qty }</td>
			</tr>
			<tr>
				<th>가격</th>
				<td>\\${temp_tal}</td>
			</tr>
		</table>
	`;
	return roomTemp;
}