$(function () {
    //클래스
    const {getEl, setRequestHeader, getElList, addEvent, addAllSameEvent} = new travelmaker.utils();

    //엘리먼트
    const hotelGroup = getEl('.hotel-group');
    const pageGroup = getEl('.page-group');

    getList()
        .then(({list, friendPaging}) => {
            const $frag = $(document.createDocumentFragment());
            list.forEach(hotel => $frag.append(listTemplate(hotel)));
            hotelGroup.appendChild($frag[0]);
            pageGroup.innerHTML = friendPaging.pagingHTML;

            const btnDetailList = getElList('.btn-detail');
            addAllSameEvent(btnDetailList, 'click', (e) => {
                location.href = '/store/view/' + e.target.dataset.hnb;
            });
        }).catch(console.error);

    function getList() {
        return $.ajax({
            type: 'post',
            url: '/store/getHotelList',
            data: 'pg=' + $('#pg').val(),
            dataType: 'json',
            beforeSend: setRequestHeader
        });
    }
});


function listTemplate(hotel) {
    // /store/view/${items.hnb}
    const {hnb, mainImageUrl, korName, engName, star, address, price} = hotel;
    const grade = star !== 'null' ? `<span class="hotel-grade">${star}</span>` : '';
    return `
		<li>
			<div class="hotel-item">
				<div class="image-wrap">
					<img src="${mainImageUrl}" alt="${korName}의 대표이미지">
				</div>
				<div class="hotel-detail">
                    <h3 class="hotel-title-kor">${korName}</h3>
                    <h4 class="hotel-title-eng">${engName}</h4>
                    <p class="hotel-address">${address}</p>
                    <div class="hotel-info">
                        ${grade}
                        <span class="hotel-price">${price}</span>
                        <button class="btn-detail" data-hnb="${hnb}">상세보기</button>
                    </div>
				</div>
			</div>
		</li>
	`;
}
