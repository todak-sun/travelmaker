$(function () {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({
		type : 'post',
		url : '/friend/getList',
		data : {
			'pg' : $('#pg').val()
		},
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success : function(data) {
			console.log('success');
			// alert(data.responseText);
			console.log(JSON.stringify(data));

			$.each(data.list, function(index, items) {
<<<<<<< Updated upstream
=======
				console.log("date" + items.dateStart);
>>>>>>> Stashed changes
				$('.content-group').append(listTemplate(items));
				
				$.each(items.citys, function(index, item) {
					$('<span/>', {
						class: 'city',
						text: item
<<<<<<< Updated upstream
					}).appendTo($('.city-wrap:last'));
					console.log(index + " : " + item);
=======
					}).appendTo($('.city-wrap'));
>>>>>>> Stashed changes
				});
			});
			$('.pagination').html(data.friendPaging.pagingHTML);
		},
		error : function(error) {
			console.log('fail');
			alert(error.responseText);
		}
	});
	
    // 클래스
    const {getEl, addEvent} = new travelmaker.utils();
    const modal = new travelmaker.modal('#modal');

    // 변수
    const btnFriendWrite = getEl('#btn-friend-write');
    addEvent(btnFriendWrite, 'click', () => {
        modal.create('domestic', initDomestic);
    });

    function initDomestic() {
        const btnKorea = getEl('#btn-korea');
        const btnGlobal = getEl('#btn-global');
        addEvent(btnKorea, 'click', moveHandler);
        addEvent(btnGlobal, 'click', moveHandler);
    };

    function moveHandler(e) {
        const isDomestic = this.dataset.domestic;
        location.href = `/friend/write/${isDomestic}`;
    }
    
    function listTemplate(items) {
<<<<<<< Updated upstream
    	var sDate = new Date(items.dateStart).getTime();
    	var now = new Date().getTime();
    	
    	console.log(Math.floor((sDate - now) / (1000 * 60 * 60 * 24)));
    	var result = Math.floor((sDate - now) / (1000 * 60 * 60 * 24) * -1);
    	
=======
>>>>>>> Stashed changes
    	var listTemp = `
    		<li>
                <div class="content-item">
                    <div class="user-wrap">
                        <div class="image-wrap">
                            <img src="https://source.unsplash.com/collection/190727/200x150" alt=""/>
                        </div>
                        <h5 class="author">${items.nickname}</h5>
                    </div>
                    <div class="title-wrap">
<<<<<<< Updated upstream
                        <span class="tbadge tbadge-danger">D${result}</span>
=======
                        <span class="tbadge tbadge-danger">D-7</span>
>>>>>>> Stashed changes
                        <h4>${items.title}</h4>
                    </div>
                    <div class="info-wrap">
                        <p class="date">
                  <span class="from">${items.dateStart}</span
                  ><span class="to">${items.dateEnd}</span>
                        </p>
                        <div class="city-wrap">
                            
                        </div>
<<<<<<< Updated upstream
                        <button type="button" onClick="loginCheck(${items.fno})">
                            상세보기
=======
                        <button onclick="location.href='/friend/view/${items.fno}'">
                            상세보기예시
>>>>>>> Stashed changes
                        </button>
                    </div>
                </div>
            </li>
            `;
    	
    	return listTemp;
    }
<<<<<<< Updated upstream
});

function loginCheck(fno) {
	if(!$('#loginId').val()) {
		alert('ee');
		// 로그인이 안돼어 있으면 로그인 모달 띄우기
	} else {
		location.href='/friend/view/' + fno;
	}
}
=======
});
>>>>>>> Stashed changes
