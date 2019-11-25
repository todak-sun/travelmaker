/**
 * 모달을 생성할 때는, new travelmaker.modal(CSS 셀렉터);
 * 모달을 없앨 때는 생성한 모달을 담은 변수(여기서는 modal)에 있는 clear() 메소드를 사용하면 됨.
 *
 * */

$(function () {
    const {getElList, addEvent, getEls} = new travelmaker.utils();
    const modal = new travelmaker.modal('#modal');
    const v = new travelmaker.validation();

    const btnTestList = getElList('.btn-test');
    btnTestList.forEach(btnTest => {
        addEvent(btnTest, 'click', () => {
            modal.create('request', (e) => {
                const [startDate, endDate, content, btnTry]
                    = getEls(modal.m, '#req-start-date', '#req-end-date', '#req-content', '#req-btn-try');
                //차례대로 시작일, 종료일, 컨텐츠, 신청버튼
                console.log(startDate, endDate, content, btnTry);
                //위의 노드의 값으로 Validation 검사를 하면 됨.
                //Validation 클래스 넣어놨으니 그걸로 시도해봐~~~
                //frined/write2.js 에 예시로 해둔 것 있으니 보면 금방 이해할 듯!

                addEvent(btnTry, 'click', (e) => {
                    console.log(e.target, '버튼을 눌렀다!');
                    modal.clear();
                })
            })
        });
    })
});