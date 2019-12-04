$(function () {
    //클래스
    const {getEl, getElList, addEvent, addAllSameEvent, useState, getObjFromDataSet} = new travelmaker.utils();
    const ajax = new travelmaker.ajax();
    const t = new travelmaker.template();
    const modal = new travelmaker.modal('#modal');
    const alarm = new travelmaker.alarm(new SockJS("/echo"));

    //상수
    let bno, nickname, id, seq, username, requestUserSeq;
    if (getEl('#bno')) {
        bno = +getEl('#bno').value;
        nickname = getEl('#nickname').value;
        id = getEl('#id').value;
        seq = getEl('#seq').value;
        username = getEl('#username').value;
        requestUserSeq = getEl('#request-user-seq').value;
    }

    const author = getEl('#author').value;

    //엘리먼트
    const contentGroup = getEl('.content-group');
    const btnTry = getEl('#btn-try');
    const btnCheck = getEl('#btn-check');
    const btnModify = getEl('#btn-modify');
    const btnDelete = getEl('#btn-delete');

    //데이터
    //여행을 갈사람
    const [setPaymentData, getPaymentData] = useState({
        type: 2,
        productName: '',
        price: 0,
        requestUser: '',
        requestUserSeq: '',
        seller: author,
        sellerSeq: requestUserSeq,
        quantity: ''
    });

    if (btnTry)
        addEvent(btnTry, 'click', function () {
            modal.createCustom(t.purOrderRequest(bno, nickname, seq, id), function () {
                const btnTryReq = getEl('#btn-try-req');
                const requestForm = getEl('#requestForm');

                addEvent(btnTryReq, 'click', () => {
                    ajax.createPurOrder($(requestForm).serialize())
                        .then(() => {
                            alert('신청 완료되었습니다!');
                            alarm.send('pur', {bno: bno, username: username});
                            modal.clear();
                        })
                        .catch(console.error);
                });
            });
        });

    if (btnCheck)
        addEvent(btnCheck, 'click', btnCheckOpenHandler);

    function btnCheckOpenHandler(e) {
        ajax.getOrderView(bno)
            .then(ret => {
                const $frag = $(document.createDocumentFragment());
                ret.forEach(order => $frag.append(t.purOrderView(order)));
                contentGroup.appendChild($frag[0]);

                const btnAgreeList = getElList('.request-item .btn-agree');
                const btnDisagreeList = getElList('.request-item .btn-disagree');
                addAllSameEvent(btnAgreeList, 'click', function () {
                    ajax.updatePermitStatusOrder({prno: this.dataset.seq, isPermit: 1});
                    let dataset = this.parentElement.querySelector('[type="hidden"]').dataset;
                    dataset = getObjFromDataSet(dataset);
                    setPaymentData({
                        price: dataset.price,
                        requestUser: dataset.nickname,
                        requestUserSeq: dataset.sellerseq,
                        quantity: dataset.quantity,
                        productName: dataset.productname
                    });

                    ajax.createPayment(getPaymentData());
                    this.innerText = '수락됨[OK]';
                });
                addAllSameEvent(btnDisagreeList, 'click', function () {
                    ajax.updatePermitStatusOrder({prno: this.dataset.seq, isPermit: 2});
                    this.innerText = '거절됨[OK]';
                });

                e.target.innerText = '닫기';
                e.target.removeEventListener('click', btnCheckOpenHandler);
                addEvent(e.target, 'click', btnCheckCloseHandler);
            })
            .catch(console.error);
    }

    function btnCheckCloseHandler(e) {
        contentGroup.innerHTML = '';
        e.target.innerText = '신청확인';
        e.target.removeEventListener('click', btnCheckCloseHandler);
        addEvent(e.target, 'click', btnCheckOpenHandler);
    }

    if (btnModify)
        addEvent(btnModify, 'click', () => location.href = '/pur/modify/' + bno);

    if (btnDelete)
        addEvent(btnDelete, 'click', function () {
            if (confirm('정말로 삭제하시겠습니까?')) {
                ajax.deletePur0(bno).then(() => {
                    alert('성공적으로 삭제하였습니다.');
                    location.href = '/pur/list/1';
                })
                    .catch(console.error);
            }
        });

});
