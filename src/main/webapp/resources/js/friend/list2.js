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
				var is_finish = '';

				console.log("date"+items.dateStart);
				
				if (items.is_finish == 0) {
					is_finish = '가능';
				} else {
					is_finish = '마감';
				}

				$('.content-group').append(listTemplate(items));
			});

			$('.pagination').html(data.friendPaging.pagingHTML);
		},
		error : function(error) {
			console.log('fail');
			alert(error.responseText);
		}
	});

	$('#domestic').click(function() {
		location.href = '/friend/write?is_domestic=' + $(this).val();
	});
	$('#overseas').click(function() {
		location.href = '/friend/write?is_domestic=' + $(this).val();
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
    	var listTemp = `
    		<li>
                <div class="content-item">
                    <div class="user-wrap">
                        <div class="image-wrap">
                            <img src="https://source.unsplash.com/collection/190727/200x150" alt=""/>
                        </div>
                        <h5 class="author">${items.id}</h5>
                    </div>
                    <div class="title-wrap">
                        <span class="tbadge tbadge-danger">D-7</span>
                        <h4>${items.title}</h4>
                    </div>
                    <div class="info-wrap">
                        <p class="date">
                  <span class="from">${items.dateStart}</span
                  ><span class="to">${items.dateEnd}</span>
                        </p>
                        <div class="city-wrap">
                            <!-- 동행게시글 내부 계획 하나에 걸리는 도시들 목록 -->
                            <span class="city">파리</span>
                            <span class="city">런던</span>
                            <span class="city">룩셈부르크</span>
                            <span class="city">바르셀로나</span>
                            <!-- 동행게시글 내부 계획 하나에 걸리는 도시들 목록 -->
                        </div>
                        <button onclick="location.href='/friend/view/${items.fno}'">
                            상세보기예시
                        </button>
                    </div>
                </div>
            </li>
            `;
    	
    	return listTemp;
    }
});