$(function () {
    let type, isDomestic;

    //클래스
    const {getEl, addEvent} = new travelmaker.utils();
    const modal = new travelmaker.modal('#modal');

    //변수
    const btnWrite = getEl('#btn-write');
    addEvent(btnWrite, 'click', (e) => {
        modal.create('story', initStory);
    });

    function initStory() {
        const btnEssay = getEl('#btn-essay');
        const btnRoute = getEl('#btn-route');
        addEvent(btnEssay, 'click', setTypeHandler);
        addEvent(btnRoute, 'click', setTypeHandler);
    }

    function initDomestic() {
        const btnKorea = getEl('#btn-korea');
        const btnGlobal = getEl('#btn-global');
        addEvent(btnKorea, 'click', moveHandler);
        addEvent(btnGlobal, 'click', moveHandler);
    }

    function setTypeHandler(e) {
        e.stopPropagation();
        type = e.target.dataset.sel;
        modal.setModal(new travelmaker.template().domestic(), initDomestic);
    }

    function moveHandler(e) {
        e.stopPropagation();
        isDomestic = e.target.dataset.domestic;
        location.href = `/${type}/write?isDomestic=${isDomestic}`;
        // console.log(`/${type}/write?isDomestic=${isDomestic}`);
    }

});