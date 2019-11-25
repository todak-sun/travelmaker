$(function () {
    //클래스
    const {getEl, addEvent} = new travelmaker.utils();
    const modal = new travelmaker.modal('#modal');

    //변수
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
});