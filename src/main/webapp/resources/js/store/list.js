/**
 * 
 */

$(function(){
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	$.ajax({
		type: 'post',
		url: '/store/getHotelList',
		data: 'pg=' + $('#pg').val(),
		dataType: 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(data){
			console.log(JSON.stringify(data));

			$.each(data.list, function(index, items){
				$('#result').append(listTemplate(items));
			});
			$('#paging').html(data.friendPaging.pagingHTML);
		},
		error: function(error) {
			console.log(error);
		}
	});
});

function listTemplate(items) {
	var listTemp = `
		<table border="3">
			<tr>
				<td colspan="2">
					<a href="/store/view/${items.hnb}" style="curser: 'pointer';"><img src="${items.mainImageUrl}"></a>
				</td>
			</tr>
			<tr>
				<td>글 순서</td>
				<td>${items.hnb}</td>
			</tr>
			<tr>
				<td>이름</td>
				<td>
					${items.korName}
					<br/>
					${items.engName}
				</td>
			</tr>
			<tr>
				<td>등급</td>
				<td>${items.star}</td>
			</tr>
			<tr>
				<td>주소</td>
				<td>${items.address}</td>
			</tr>
			<tr>
				<td>가격</td>
				<td>${items.price} ~</td>
			</tr>
		</table>
	`;
	
	return listTemp;
}
