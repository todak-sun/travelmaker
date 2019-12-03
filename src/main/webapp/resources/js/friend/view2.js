$(function () {
    //클래스
    const modal = new travelmaker.modal('#modal');
    const {getElList, addAllSameEvent, getEl, addEvent, showLoading, closeLoading} = new travelmaker.utils();
    const v = new travelmaker.validation();
    const t = new travelmaker.template();
    const ajax = new travelmaker.ajax();
    const alarm = new travelmaker.alarm(new SockJS('/echo'));

    //상수
    const fno = getEl('#friendFno').value;
    const username = getEl('#username').value;
    const isDomestic = getEl('#friendIs_domestic').value;

    //엘리먼트
    const btnTryList = getElList('.btn-try');
    const btnApplyCheckList = getElList('.btn-apply-check');
    const dataSetList = getElList('.data-set');
    const btnModify = getEl('#btn-modify');
    const btnDelete = getEl('#btn-delete');

    addAllSameEvent(btnTryList, 'click', btnTryListHandler);
    addAllSameEvent(btnApplyCheckList, 'click', btnApplyCheckListHandler);

    if(btnModify)
    addEvent(btnModify, 'click', () => {
        if (confirm('수정하시겠습니까?')) return location.href = '/friend/modify/' + fno;
    });

    if(btnDelete)
    addEvent(btnDelete, 'click', () => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            ajax.deleteFriendRequest(fno)
                .then(() => {
                    alert('삭제 완료!');
                    location.href = '/friend/list/1';
                })
                .catch(console.error);
        }
    });

    function btnTryListHandler(e) {
        const dataMap = $(this).closest('li').find('.data-set').data();
        const srDate = new Date(dataMap.from).getTime();
        const erDate = new Date(dataMap.to).getTime();

        modal.create('request', function () {
            const $formRequest = $('.form-request');

            const dateStart = getEl('#req-start-date');
            const dateEnd = getEl('#req-end-date');
            const content = getEl('#req-content');
            const btnTry = getEl('#req-btn-try');

            $formRequest.prepend(`<input type="hidden" name="fcno" value="${dataMap.fcno}"`);

            addEvent(dateStart, 'blur', (e) => {
                const value = e.target.value;
                const [vFeed, ivFeed] = v.getFeedBox(e.target);
                if (!value) return v.setInvalid(e.target, ivFeed, '시작일을 입력해주세요.');
                else {
                    let sDate = new Date(value).getTime();
                    if (srDate > sDate || erDate < sDate) {
                        v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
                        return dateStart.focus();
                    }
                    return v.changeValid(e.target);
                }
            });
            addEvent(dateEnd, 'blur', (e) => {
                const value = e.target.value;
                const [vFeed, ivFeed] = v.getFeedBox(e.target);
                if (!value) return v.setInvalid(e.target, ivFeed, '종료일을 입력해주세요.');
                else {
                    let eDate = new Date(dateEnd.value).getTime();
                    if (srDate > eDate || erDate < eDate) {
                        v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
                        return dateEnd.focus();
                    }
                    return v.changeValid(e.target);
                }
            });
            addEvent(content, 'blur', (e) => {
                const value = e.target.value;
                const [vFeed, ivFeed] = v.getFeedBox(e.target);
                if (!value) return v.setInvalid(e.target, ivFeed, '내용을 입력해주세요.');
                return v.changeValid(e.target);
            });

            // 동행 신청 폼 저장
            addEvent(btnTry, 'click', (e) => {
                if (!v.isValid(dateStart)) {
                    v.setInvalid(dateStart, v.getFeedBox(dateStart)[1], '시작일을 입력해주세요');
                    return dateStart.focus();
                } else if (!v.isValid(dateEnd)) {
                    v.setInvalid(dateEnd, v.getFeedBox(dateEnd)[1], '종료일을 입력해주세요.');
                    return dateEnd.focus();
                } else if (!v.isValid(content)) {
                    v.setInvalid(content, v.getFeedBox(content)[1], '내용을 입력해주세요');
                    return content.focus();
                } else {
                    ajax.createFriendRequest($('.form-request').serialize())
                        .then(ret => {
                            alert('신청 완료 하였습니다.');
                            alarm.send('friend', {fno: fno, username: username});
                            modal.clear();
                        })
                        .catch(console.error);

                }
            });
        });
    }


    function btnApplyCheckListHandler(e) {
        const dataMap = $(this).closest('li').find('.data-set').data();
        const requestGroup = $(this).closest('li').find('.request-group')[0];

        this.innerText = '닫기';
        this.removeEventListener('click', btnApplyCheckListHandler);
        addEvent(this, 'click', btnListCloseHandler.bind(null, requestGroup));

        ajax.getFriendRequestView(dataMap.fcno).then(({list}) => {
            const $frag = $(document.createDocumentFragment());
            list.forEach(request => $frag.append(t.friendRequest(request)));
            requestGroup.appendChild($frag[0]);

            const btnAcceptList = Array.from(requestGroup.querySelectorAll('.btn-tsave'));
            const btnRejectList = Array.from(requestGroup.querySelectorAll('.btn-tdanger'));

            addAllSameEvent(btnAcceptList, 'click', function (e) {
                if (confirm('수락 하시겠습니까?')) {
                    ajax.acceptFrinedRequest(e.target.dataset.fccno)
                        .then(ret => {
                            alert('수락 하셨습니다!');
                            location.reload();
                        })
                        .catch(console.error);
                }
            });

            addAllSameEvent(btnRejectList, 'click', function (e) {
                if (confirm('정말로 거절하시겠습니까?')) {
                    ajax.rejectFriendRequest(e.target.dataset.fccno).then(() => {
                        alert('거절 하셨습니다.');
                        location.reload()
                    }).catch(console.error);
                }
            });
        }).catch(console.error);
    }

    function btnListCloseHandler(requestGroup, e) {
        e.target.innerText = '신청확인';
        e.target.removeEventListener('click', btnListCloseHandler.bind(null, requestGroup));
        addEvent(e.target, 'click', btnApplyCheckListHandler);
        requestGroup.innerHTML = '';
    }

    // 위도/경도를 배열에 담은 후, 알맞은 지도에 경로를 그려줌.
    let flightPlanCoordinates = [];
    dataSetList.forEach(dataSet => flightPlanCoordinates.push({lat: +dataSet.dataset.lat, lng: +dataSet.dataset.lng}));

    //0.01초마다 구글지도 및 카카오지도가 정상적으로 로드되었는지 확인한 후,
    //정상적으로 로드가 되었다면 맵을 그려주는 부분.
    showLoading();
    const mapLoad = setInterval(function () {
        console.log('시도');
        if (window.google && window.kakao) stopMapLoad();
    }, 10);

    function stopMapLoad() {
        closeLoading()
        clearInterval(mapLoad);
        if (!isDomestic) googleMap(flightPlanCoordinates);
        else kakaoMap(flightPlanCoordinates);
    }
});

// 수정버튼 클릭


// 카카오맵
function kakaoMap(flightPlanCoordinates) {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(flightPlanCoordinates[0]['lat'],
            flightPlanCoordinates[0]['lng']),
        level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var linePath = [];

    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시
    for (var i = 0; i < flightPlanCoordinates.length; i++) {
        linePath.push(new kakao.maps.LatLng(flightPlanCoordinates[i]['lat'],
            flightPlanCoordinates[i]['lng']));
    }

    /*
     * // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시 var linePath = [ new
     * kakao.maps.LatLng(33.452344169439975, 126.56878163224233), new
     * kakao.maps.LatLng(33.452739313807456, 126.5709308145358), new
     * kakao.maps.LatLng(33.45178067090639, 126.5726886938753) ];
     */

    // 지도에 표시할 선을 생성
    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 10, // 선의 두께
        strokeColor: '#00FA9A', // 선의 색깔
        strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명
        strokeStyle: 'solid', // 선의 스타일
    });

    var positions = [];

    // 마커를 표시할 위치와 title 배열
    for (var i = 0; i < linePath.length; i++) {
        positions.push({
            latlng: linePath[i]
        });
    }

    // 마커를 표시할 위치와 title 배열
    /*
     * var positions = [ { title: '카카오', latlng: new
     * kakao.maps.LatLng(33.452344169439975, 126.56878163224233) }, { title:
     * '생태연못', latlng: new kakao.maps.LatLng(33.452739313807456,
     * 126.5709308145358) }, { title: '텃밭', latlng: new
     * kakao.maps.LatLng(33.45178067090639, 126.5726886938753) } ];
     */

    for (var i = 0; i < positions.length; i++) {
        /*
         * // 마커 이미지의 이미지 크기 var imageSize = new kakao.maps.Size(24, 35); // 마커
         * 이미지를 생성 var markerImage = new kakao.maps.MarkerImage(imageSrc,
         * imageSize);
         */

        // 마커를 생성
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
            /* image : markerImage // 마커 이미지 */
        });
    }

    // 지도에 선을 표시합니다
    polyline.setMap(map);
}

// RouteView GoogleMap 마커 경로 표시
// callback 함수
function googleMap(flightPlanCoordinates) {
    console.log(flightPlanCoordinates[0]['lat']);
    // 구글 지도 생성
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: flightPlanCoordinates[0]['lat'],
            lng: flightPlanCoordinates[0]['lng'],
        },
        // mapTypeId: 'satellite', // 'roadmap'
    });

    // 장소 위치들 저장
    /*
     * var flightPlanCoordinates = [ {lat: 37.772, lng: -122.214}, {lat: 21.291,
     * lng: -157.821}, {lat: -18.142, lng: 178.431}, {lat: -27.467, lng:
     * 153.027} ];
     */
    var markers = [];

    // 마커 생성
    for (var i = 0; i < flightPlanCoordinates.length; i++) {
        markers.push(new google.maps.Marker({
            position: flightPlanCoordinates[i],
            map: map,
        }));
    }
    // 마커 이미지 커스텀
    /*
     * markers.push(new google.maps.Marker({ map : map, /* icon: icon,
     */
    /*
     * title : place.name, position : place.geometry.location }));
     */

    // 마커들을 선을 경로 표시
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#00FA9A',
        strokeOpacity: 0.5,
        strokeWeight: 10,
    });

    // 맵에 마커 뿌림
    markers.forEach(function (marker) {
        marker.setMap(map);
    });
    // 마커들 경로 표시
    flightPath.setMap(map);
}