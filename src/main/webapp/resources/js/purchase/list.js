$(function () {
    // 클래스
    const {getEl, getElList, addEvent, addAllSameEvent} = new travelmaker.utils();
    const modal = new travelmaker.modal('#modal');
    const ajax = new travelmaker.ajax();
    const t = new travelmaker.template();

    // 엘리먼트
    const btnPurchaseWrite = getEl('#btn-purchase-write');
    const pg = getEl('#pg');
    const purGroup = getEl('.pur-group');
    const pageGroup = getEl('.page-group');

    ajax.getPurchaseList(pg.value).then(({list, purchasePaging}) => {
        console.log(list);
        const $frag = $(document.createDocumentFragment());
        list.forEach(pur => {
            $frag.append(t.purListItem(pur));
        });
        purGroup.appendChild($frag[0]);

        pageGroup.innerHTML = purchasePaging.pagingHTML;

    }).catch(console.error);

    if (btnPurchaseWrite)
        addEvent(btnPurchaseWrite, 'click', () => {
            modal.create('purchase', initPurchase);
        });

    function initPurchase() {
        const btnList = getElList('.select-wrap button');
        addAllSameEvent(btnList, 'click', (e) => location.href = '/pur/write/' + e.target.dataset.purchase);
    }
});