/**
 * 
 */

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
    const btnCancel = getEl('#btn-cancel');
    const friendDateStart = getEl('#friendDateStart');
    const friendDateEnd = getEl('#friendDateEnd');
    const isDomestic = +getEl('#is_domestic').value;
    const routeGroup = getEl('.list-zone .list-group');

    // 다음 지도의 정보를 가지고 있는 함수.
    // 지도에서 특정 위치를 선택하면 값이 할당 됨.
    let getMapData;
    
    var token = $("meta[name='_csrf']").attr('content');
    var header = $("meta[name='_csrf_header']").attr('content');
    
    let dataList = {};
    let count = 0;
    let current = null;
	
	$.ajax({
    	type: 'post',
    	url: '/friend/getRouteModify',
    	data: {'fno' : $('#fno').val()},
    	dataType: 'json',
    	beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data){
        	console.log(data.responseText);

        	dataList = routeDataList(data);
        	
        	$('#fcno').val(dataList.fcno[0]);
        	$('#date-start').val(dataList.dateStart[0].substring(0, 10));
        	$('#date-end').val(dataList.dateEnd[0].substring(0, 10));
        	$('#input-search-place').val(dataList.city[0]);
        	$('#content').val(dataList.content[0]);
        	$('#lat').val(dataList.lat[0]);
        	$('#lng').val(dataList.lng[0]);
        	$('#city').val(dataList.city[0]);
        	
        	for(var i = 0; i < dataList.fcno.length; i++) {
        		const $frag = $(document.createDocumentFragment());
        		$frag.append(t.routeItem(inputCity.value, dateStart.value, dateEnd.value, content.value));
        		routeGroup.appendChild($frag[0]);
        	}
        	current = $('.list-group li:first').children();
        	current.addClass('current');
        },
        error: function(error) {
        	console.log(error);
        }
    });

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

            if (fsDate > sDate || feDate < sDate) {
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
        } else {
            var fsDate = new Date(friendDateStart.value).getTime();
            var feDate = new Date(friendDateEnd.value).getTime();
            var eDate = new Date(value).getTime();

            if (fsDate > eDate || feDate < eDate) {
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
        if (!value)
            return v.setInvalid(e.target, ivFeed, '상세 계획을 입력해주세요.');
        return v.changeValid(e.target);
    });

    addEvent(inputSearchPlace, 'focus', () => btnSearchPlace.click());

    addEvent(btnSearchPlace, 'click', () => {
        modal.createCustom(t.kmap(), () => {
            const kmap = new travelmaker.kakaoMap(getEl('#map'));
            getMapData = kmap.create(modal);
        });
    });

    addEvent(btnCheck, 'click', () => {
    	alert('수정 완료!');
        location.href = '/friend/view/' + $('#fno').val();
    });

    addEvent(btnCancel, 'click', () => {
        var result = confirm('정말로 취소하시겠습니까?');

        if (result) {
        	alert('취소하였습니다.');
            location.href = '/friend/view/' + $('#fno').val();
        }
    });
    
    addEvent(btnNext, 'click', () => {
        if (!v.isValid(dateStart)) {
        	v.setInvalid(dateStart, v.getFeedBox(dateStart)[1], '시작일을 입력해주세요.');
        	return dateStart.focus();
        } 
        if (!v.isValid(dateEnd)) {
        	v.setInvalid(dateEnd, v.getFeedBox(dateEnd)[1], '종료일을 입력해주세요.');
        	return dateEnd.focus();
        } 
        if(!v.isValid(content)) {
        	v.setInvalid(content, v.getFeedBox(content)[1], '내용을 입력해주세요.');
        	return content.focus();
        }

        if(dataList.fcno.length >= count + 1) {
	        $.ajax({
	            type: 'put',
	            url: '/friend/setRouteModify',
	            contentType: 'application/json',
	            data: JSON.stringify(parseObjectFromForm(document.querySelector('#routeWriteForm'))),
	            beforeSend: function (xhr) {
	                xhr.setRequestHeader(header, token);
	            },
	            success: function () {
	                count++;
	                if(dataList.fcno.length >= count + 1) {
	                	current.attr('class', 'list-item');
	                	current = current.parent().next().children();
	                	current.addClass('current');
			            
	                	$('#fcno').val(dataList.fcno[count]);
			            $('#date-start').val(dataList.dateStart[count].substring(0, 10));
			            $('#date-end').val(dataList.dateEnd[count].substring(0, 10));
			            $('#input-search-place').val(dataList.city[count]);
			            $('#content').val(dataList.content[count]);
			            $('#lat').val(dataList.lat[count]);
			            $('#lng').val(dataList.lng[count]);
			            $('#city').val(dataList.city[count]);
	                }
	            },
	            error: function (error) {
	                console.log(error);
	            }
	        });
        } else {
        	alert('수정할 글이 없습니다.');
        	
        	current.attr('class', 'list-item');
            $('#date-start').val(null);
            $('#date-end').val(null);
            $('#input-search-place').val(null);
            $('#content').val(null);
            $('#lat').val(null);
            $('#lng').val(null);
            $('#city').val(null);
        }
    });


    addEvent(btnSearchPlace, 'click', () => {
        if (isDomestic) {
            modal.createCustom(t.kmap(), () => {
                const kmap = new travelmaker.kakaoMap(getEl('#map'));
                getMapData = kmap.create(modal, setValueAtHiddenElement);
            });
        } else {
            modal.createCustom(t.gmap(), () => {
                const gmap = new travelmaker.googleMap(getEl('#map'));
                getMapData = gmap.create(modal, setValueAtHiddenElement);
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
    }
});

function routeDataList(data) {
	let dataList = {};
	let keys = Object.keys(data[0]);
	
	keys.forEach((key) => {
		dataList[key] = [];
	});
	data.forEach((d) => {
		dataList.fno.push(d.fno);
		dataList.fcno.push(d.fcno);
		dataList.dateStart.push(d.dateStart);
		dataList.dateEnd.push(d.dateEnd);
		dataList.content.push(d.content);
		dataList.city.push(d.city);
		dataList.lat.push(d.lat);
		dataList.lng.push(d.lng);
	});
	return dataList;
}

function parseObjectFromForm(formEl){
	let obj = {};
	const valueList = formEl.querySelectorAll('[name]');
	valueList.forEach(value =>{
		obj[value.name] = value.value;
	})
	return obj;
}
