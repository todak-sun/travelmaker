$(function () {
    // 클래스
    const {getEl, addEvent} = new travelmaker.utils();
    const v = new travelmaker.validation();
    const modal = new travelmaker.modal('#modal');
    const t = new travelmaker.template();

    // 변수
    const dateStart = getEl('#date-start');
    const dateEnd = getEl('#date-end');
    const btnSearchPlace = getEl('#btn-search-place');
    const inputSearchPlace = getEl('#input-search-place');
    const content = getEl('#content');
    const inputLat = getEl('#lat');
    const inputLng = getEl('#lng');
    const inputCity = getEl('#city');
    const btnNext = getEl('#btn-next');
    const btnCheck = getEl('#btn-check');
    const btnCancel = getEl('#btn-cancle');
    const friendDateStart = getEl('#friendDateStart');
    const friendDateEnd = getEl('#friendDateEnd');

    // 다음 지도의 정보를 가지고 있는 함수.
    // 지도에서 특정 위치를 선택하면 값이 할당 됨.
    let getMapData;

    addEvent(dateStart, 'blur', (e) => {
        const value = e.target.value;
        console.log(value);
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) {
        	return v.setInvalid(e.target, ivFeed, '시작일을 입력해주세요.');
        } else {
        	var fsDate = new Date(friendDateStart.value).getTime();
        	var feDate = new Date(friendDateEnd.value).getTime();
        	var sDate = new Date(value).getTime();
        	
        	if(fsDate > sDate || feDate < sDate) {
        		return v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
        	} else {
        		return v.changeValid(e.target);
        	}
        }
    });

    addEvent(dateEnd, 'blur', (e) => {
        const value = e.target.value;
        console.log(value);
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) {
        	return v.setInvalid(e.target, ivFeed, '종료일을 입력해주세요.');
        } else  {
        	var fsDate = new Date(friendDateStart.value).getTime();
        	var feDate = new Date(friendDateEnd.value).getTime();
        	var eDate = new Date(value).getTime();
        	
        	if(fsDate > eDate || feDate < eDate) {
        		return v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
        	} else {
        		return v.changeValid(e.target);
        	}
        }
    });

    addEvent(content, 'blur', (e) => {
        const value = e.target.value;
        console.log(value);
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) return v.setInvalid(e.target, ivFeed, '상세 계획을 입력해주세요.');
        return v.changeValid(e.target);
    });

    addEvent(inputSearchPlace, 'focus', () => btnSearchPlace.click());

    addEvent(btnSearchPlace, 'click', () => {
        modal.createCustom(t.kmap(), () => {
            const kmap = new travelmaker.kakaoMap(getEl('#map'));
            getMapData = kmap.create(modal);
        })
    });
    
    addEvent(btnCheck, 'click', () => {
    	if(dateStart.value != '' || dateEnd.value != '' || content.value != '' || inputSearchPlace.value != '') {
    		alert('다음을 눌른 후 저장버튼을 눌러주세요.');
    	} else {
    		alert('저장완료!');
    		location.href='/friend/list/1';
    	}
    });

    addEvent(btnNext, 'click', () => {
        setValueAtHiddenElement();
        
        console.log('씨발집가고싶다');
        
        var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		$.ajax({
			type: 'post',
			url: '/friend/setRouteWrite',
			data: $('#routeWriteForm').serialize(),
			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success: function(){			
				$('<table/>', {
					class: 'table table-dark table-striped'
				}).append($('<tr/>').append($('<th/>', {
					text: '방문시작날짜'
				})).append($('<td/>', {
					text: dateStart.value
				}))).append($('<tr/>').append($('<th/>', {
					text: '방문종료날짜'
				})).append($('<td/>', {
					text: dateEnd.value
				}))).append($('<tr/>').append($('<th/>', {
					text: '방문 도시'
				})).append($('<td/>', {
					text: inputCity.value
				}))).append($('<tr/>').append($('<th/>', {
					text: '내용'
				})).append($('<td/>', {
					text: content.value
				}))).appendTo($('#resultDiv'));
				
				$('<br/>').appendTo($('#resultDiv'));
				
				$('#date-start').val(null);
				$('#date-end').val(null);
				$('#input-search-place').val(null);
				$('#content').val(null);
				$('#lat').val(null);
				$('#lng').val(null);
				$('#city').val(null);
			},
			error: function(error){
				console.log(error);
			}
		});
    });
    
    addEvent(btnCancel, 'click', () => {
    	var result = confirm('정말로 취소하시겠습니까?');
    	var token = $("meta[name='_csrf']").attr("content");
    	var header = $("meta[name='_csrf_header']").attr("content");

    	if(!result) return;
    	if(result) {
    		$.ajax({
    			type: 'post',
    			url: '/friend/cancelWrite',
    			data: {'fno' : $('#fno').val()},
    			beforeSend : function(xhr) {
    				xhr.setRequestHeader(header, token);
    			},
    			success: function(){
    				alert('취소하였습니다.');
    				location.href = '/friend/list/1';
    			},
    			error: function(error){
    				console.log(error);
    			}
    		});
    	}
    });

    // 히든태그에 필요한 지도정보를 다 담아버림.
    function setValueAtHiddenElement() {
        const {lat, lng, address, placeName} = getMapData();
        inputLat.value = lat;
        inputLng.value = lng;
        inputCity.value = placeName;
        inputSearchPlace.value = address + ' ' + placeName;
        
        return
    }
});