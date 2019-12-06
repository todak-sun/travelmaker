$(function () {
    //클래스
    const {getEl, getEls, useState, getElList, addEvent, addAllSameEvent} = new travelmaker.utils();
    const t = new travelmaker.template();
    const ajax = new travelmaker.ajax();
    const cmt = new travelmaker.comment();

    //상수
    const bno = +getEl('#bno').value;
    const seq = getEl('#seq') ? +getEl('#seq').value : 0;
    const rno = +getEl('#rno').value;
    const category = getEl('#category').value;
    const essaySeq = +getEl('#essay-seq').value;
    let nickname;
    if (getEl('#nickname')) {
        nickname = getEl('#nickname').value;
    }

    //엘리먼트
    const btnModify = getEl('#btn-modify');
    const btnDelete = getEl('#btn-delete');
    const headerBack = getEl('.header-back');
    const essayBackground = getEl('#essay-background');
    if (btnModify)
        addEvent(btnModify, 'click', () => {
            location.href = '/essay/modify/' + rno;
        });

    if (btnDelete)
        addEvent(btnDelete, 'click', () => {
            if (confirm('정말 삭제하시겠습니까?')) ajax.essayDelete(rno).then(ret => {
                alert('성공적으로 삭제하였습니다.');
                location.href = '/story';
            });
        });

    headerBack.style.backgroundImage = `url(${essayBackground.value})`;

    cmt.init(getEl('.comment-wrap'), bno, seq, rno, category, nickname);


});