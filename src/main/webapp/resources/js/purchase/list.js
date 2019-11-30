$(function () {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({
		type : 'get',
		url : '/pur/getList',
		data : {
			'pg' : $('#pg').val()
		},
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success : function(data) {
			console.log(JSON.stringify(data));
			$.each(data.list, function(index, items) {
				$('.content-group').append(listTemplate(items));
			});
			$('.pagination').html(data.purchasePaging.pagingHTML);
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
    const btnPurchaseWrite = getEl('#btn-purchase-write');
    addEvent(btnPurchaseWrite, 'click', () => {
        modal.create('purchase', initPurchase);
    });

    function initPurchase() {
        const btnRequest = getEl('#btn-Request');
        const btnOrder = getEl('#btn-Order');
        addEvent(btnRequest, 'click', moveHandler);
        addEvent(btnOrder, 'click', moveHandler);
    };

    function moveHandler(e) {
        const isPurchase = this.dataset.purchase;
        location.href = `/pur/write/${isPurchase}`;
    }
    
    function listTemplate(items) {
    	console.log("con : "+items.con);
    	let con = items.con;
    	let listTemp;
    	if(con==1){ //사다주실분?
        	listTemp = `
        		<li>
                    <div class="content-item">
                        <div class="user-wrap">
                            <div class="image-wrap">
                                <img src="https://source.unsplash.com/collection/190727/200x150" alt=""/>
                            </div>
                            <h5 class="author">${items.nickname}</h5>
                        </div>
                        <div class="title-wrap">
                            <h5>[사다주실분]</h5>
                            <h4>${items.title}</h4>
                        </div>
                        <div class="info-wrap">
                            <p class="date">
        						구매지역 : ${items.location}
                            </p>
                            <div class="city-wrap">
                                [상품명 ] ${items.productname}
                            </div>
                            <button onclick="location.href='/pur/view/1/${items.bno}'">
                                상세보기예시
                            </button>
                        </div>
                    </div>
                </li>
                `;
    	}else{//사다줄까요?
    		listTemp = `
        		<li>
                    <div class="content-item">
                        <div class="user-wrap">
                            <div class="image-wrap">
                                <img src="https://source.unsplash.com/collection/190727/200x150" alt=""/>
                            </div>
                            <h5 class="author">${items.nickname}</h5>
                        </div>
                        <div class="title-wrap">
                        <h5>[사다줄꼐요]</h5>
                            <h4>${items.title}</h4>
                        </div>
                        <div class="info-wrap">
                            <p class="date">
        						구매지역 : ${items.location}
                            </p>
                            <div class="city-wrap">
                            </div>
                            <button onclick="location.href='/pur/view/2/${items.bno}'">
                                상세보기예시
                            </button>
                        </div>
                    </div>
                </li>
                `;
    	}
    	
    	
    	return listTemp;
    }
});