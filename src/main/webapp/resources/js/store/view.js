$(function () {
    const {getEl, getElList, addEvent, addAllSameEvent} = new travelmaker.utils();

    const mainImg = getEl('#main-img');
    const thumbnailList = getElList('.s-image-group .image-item');

    thumbnailList[0].classList.add('on');

    addAllSameEvent(thumbnailList, 'click', (e) => {
        let src = e.target.src;
        src = src.substring(0, src.indexOf('&type'));
        src += '&type=ofullfill692_336_2A2B2C';
        mainImg.src = src;

        thumbnailList.forEach(thumbnail => thumbnail.classList.remove('on'));
        e.target.classList.add('on');
    });
});
