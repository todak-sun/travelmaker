$(function () {
    // 클래스
    const {getEl, getElList, addEvent, addAllSameEvent, useState, getObjFromDataSet} = new travelmaker.utils();
    const ajax = new travelmaker.ajax();
    const t = new travelmaker.template();
    const modal = new travelmaker.modal('#modal');
    const alarm = new travelmaker.alarm(new SockJS("/echo"));

    //상수
    let bno, nickname, id, seq, username;
    if (getEl('#bno')) {
        bno = +getEl('#bno').value;
        nickname = getEl('#nickname').value;
        id = getEl('#id').value;
        seq = getEl('#seq').value;
        username = getEl('#username').value;
    }

    const author = getEl('#author').value;
    const productname = getEl('#productname').value;
    const price = getEl('#price').value;
    const quantity = getEl('#quantity').value;

    //엘리먼트
    const contentGroup = getEl('.content-group');
    const btnTry = getEl('#btn-try');
    const btnCheck = getEl('#btn-check');
    const btnModify = getEl('#btn-modify');
    const btnDelete = getEl('#btn-delete');

    //데이터
    //물건이 필요한사람
    const [setPaymentData, getPaymentData] = useState({
        type: 1,
        productName: productname,
        price: price,
        requestUser: author,
        requestUserSeq: seq,
        seller: '',
        sellerSeq: '',
        quantity: quantity
    });


    if (btnTry)
        addEvent(btnTry, 'click', function () {
            modal.createCustom(t.purReqRequest(bno, nickname, seq), function () {
                const btnTryReq = getEl('#btn-try-req');
                const requestForm = getEl('#requestForm');

                addEvent(btnTryReq, 'click', () => {
                    ajax.createPurRequest($(requestForm).serialize())
                        .then(() => {
                            alert('신청 완료되었습니다!');
                            alarm.send('pur', {bno: bno, username: nickname});
                            modal.clear();
                        })
                        .catch(console.error);
                })
            });
        });

    if (btnCheck)
        addEvent(btnCheck, 'click', btnCheckOpenHandler);

    function btnCheckOpenHandler(e) {
        ajax.getRequestView(bno)
            .then(ret => {
                const $frag = $(document.createDocumentFragment());
                ret.forEach(request => $frag.append(t.purOrderView(request)));
                contentGroup.append($frag[0]);

                let btnAgreeList = getElList('.request-item .btn-agree');
                let btnDisagreeList = getElList('.request-item .btn-disagree');

                addAllSameEvent(btnAgreeList, 'click', btnAgreeHandler);
                addAllSameEvent(btnDisagreeList, 'click', btnDisagreeHandler);

                function btnAgreeHandler() {
                    let dataset = this.parentElement.querySelector('[type="hidden"]').dataset;
                    dataset = getObjFromDataSet(dataset);
                    setPaymentData({
                        seller: dataset.nickname,
                        sellerSeq: dataset.sellerseq,
                        prno: this.dataset.seq
                    });

                    ajax.updatePermitStatusReq({prno: this.dataset.seq, isPermit: 1})
                        .catch(console.error);

                    ajax.createPayment(getPaymentData())
                        .then(ret => {
                            btnCheck.click();
                            btnCheck.click();
                        })
                        .catch(console.error);
                }


                function btnDisagreeHandler() {
                    ajax.updatePermitStatusReq({prno: this.dataset.seq, isPermit: 2})
                        .then(ret => {
                            if (ret === 'FAIL') {
                                alert('이미 진행중인 거래입니다. 마이페이지에서 확인해주세요!');
                            } else {
                                btnCheck.click();
                                btnCheck.click();
                            }
                        });
                }

                e.target.innerText = '닫기';
                e.target.removeEventListener('click', btnCheckOpenHandler);
                addEvent(e.target, 'click', btnCheckCloseHandler);
            })
            .catch(console.error)
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
            if (confirm("정말로 삭제하시겠습니까?")) {
                ajax.deletePur1(bno).then(() => {
                    alert('성공적으로 삭제하였습니다.');
                    location.href = '/pur/list/1';
                }).catch(console.error);
            }
        });
});
