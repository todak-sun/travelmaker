$(function () {
    //클래스
    const {getEl, getEls, useState, getElList, addEvent, addAllSameEvent} = new travelmaker.utils();
    const t = new travelmaker.template();
    const ajax = new travelmaker.ajax();
    const cmt = new travelmaker.comment();

    //상수
    const bno = +getEl('#bno').value;
    const seq = getEl('#seq') ? +getEl('#seq').value : 0;
    const essaySeq = +getEl('#essay-seq').value;

    cmt.init(getEl('.comment-wrap'), bno, seq);


});