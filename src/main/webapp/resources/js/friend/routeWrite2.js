$(function () {
	// 새로고침 막기
	document.onkeydown = noEvent;
    // 클래스
    const {getEl, addEvent} = new travelmaker.utils();
    const v = new travelmaker.validation();
    const modal = new travelmaker.modal('#modal');
    const t = new travelmaker.template();
    const ajax = new travelmaker.ajax();

    // 상수
    const fno = +getEl('#fno').value;
    const isDomestic = +getEl('#is_domestic').value;

    // 엘리먼트
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
    const routeGroup = getEl('.list-zone .list-group');

    // 다음 지도의 정보를 가지고 있는 함수.
    // 지도에서 특정 위치를 선택하면 값이 할당 됨.
    let getMapData;

    addEvent(dateStart, 'blur', (e) => {
        const value = e.target.value;
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
        if(dateStart.value && dateEnd.value && content.value && inputSearchPlace.value) {
        	$('#division').val('check');
        	var result = confirm('정말로 저장하시겠습니까?');
        	
        	if(result) {
	            ajax.setRouteWrite($('#routeWriteForm').serialize())
	                .then(() => {
	                    alert('저장완료!');
	                    location.href = '/friend/list/1';
	                }).catch(console.error);
        	}
        } else if(!dateStart.value && !dateEnd.value && !content.value && !inputSearchPlace.value){
        	$('#division').val('check');
        	// 임의의 값
        	$('#lat').val('35.353');
        	$('#lng').val('35.353');
        	var result = confirm('정말로 저장하시겠습니까?');
        	
        	if(result) {
        		ajax.updateDivision($('#routeWriteForm').serialize())
        			.then(() => {
        				alert('저장완료!');
                		location.href = '/friend/list/1';
        			}).catch(console.error);
        	}
        } else {
            alert('내용을 입력 후 저장버튼을 눌러주세요.');
        }
    });

    addEvent(btnCancel, 'click', () => {
        if (confirm('정말로 취소하시겠습니까?')) {
            ajax.deleteRouteWrite(fno).then(() => {
                alert('취소하였습니다.');
                location.href = '/friend/list/1';
            })
                .catch(console.error);

        }
    });


    addEvent(btnNext, 'click', () => {
        if (!v.isValid(dateStart)) {
            v.setInvalid(dateStart, v.getFeedBox(dateStart)[1], '시작일을 입력해주세요.');
            return dateStart.focus();
        } else if (!v.isValid(dateEnd)) {
            v.setInvalid(dateEnd, v.getFeedBox(dateEnd)[1], '종료일을 입력해주세요.');
            return dateEnd.focus();
        } else if (!v.isValid(content)) {
            v.setInvalid(content, v.getFeedBox(content)[1], '내용을 입력해주세요.');
            return content.focus();
        } else if (!dateStart.value && !dateEnd.value && !content.value && !inputSearchPlace.value) {
        	alert('내용을 입력해주세요.');
        }
        else {
        	$('#division').val('next');
            ajax.setRouteWrite($('#routeWriteForm').serialize())
                .then(() => {
                    const $frag = $(document.createDocumentFragment());
                    $frag.append(t.routeItem(inputCity.value, dateStart.value, dateEnd.value, content.value));
                    routeGroup.appendChild($frag[0]);

                    resetInputArea();
                })
                .catch(console.error);
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

    function resetInputArea() {
        dateStart.value = '';
        dateEnd.value = '';
        inputSearchPlace.value = '';
        content.value = '';
        inputLat.value = '';
        inputLng.value = '';
        inputCity.value = '';
    }
});

function noEvent() {
	if (event.keyCode == 116) {
		event.keyCode= 2;
		return false;
		}
	else if(event.ctrlKey && (event.keyCode==78 || event.keyCode == 82)) {
		return false;
	}
}
