$(function () {
    //클래스
    const {getEl, addEvent} = new travelmaker.utils();
    const v = new travelmaker.validation();

    //변수
    const title = getEl('#title');
    const dateStart = getEl('#date-start');
    const dateEnd = getEl('#date-end');
    const btnNext = getEl('#next-btn');
    const cancel = getEl('#cancel');

    dateStart.value = getCurrentDateString();
    dateEnd.value = getCurrentDateString();

    function getCurrentDateString() {
        const cal = new Date();
        let year = cal.getFullYear();
        let month = cal.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let date = cal.getDate() + 1;
        date = date < 10 ? '0' + date : date;
        return `${year}-${month}-${date}`
    }

    addEvent(title, 'blur', (e) => {
        const value = e.target.value;
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) return v.setInvalid(e.target, ivFeed, '제목을 입력해주세요.');
        return v.changeValid(e.target);
    });

    addEvent(dateStart, 'blur', (e) => {
        const value = e.target.value;
        console.log(value);
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) {
            return v.setInvalid(e.target, ivFeed, '시작일을 입력해주세요.');
        } else { // 날짜 유효성
            var sDate = new Date(value).getTime();
            var now = new Date().getTime();

            if (sDate < now) {
                return v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
            } else {
                return v.changeValid(e.target);
            }
        }
    });

    addEvent(dateEnd, 'blur', (e) => {
        const value = e.target.value;
        console.log(value);
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) {
            return v.setInvalid(e.target, ivFeed, '종료일을 입력해주세요.');
        } else {
            var sDate = new Date(dateStart.value).getTime();
            var eDate = new Date(value).getTime();

            if (sDate > eDate) {
                return v.setInvalid(e.target, ivFeed, '날짜를 다시 입력해주세요.');
            } else {
                return v.changeValid(e.target);
            }
        }
    });

    addEvent(btnNext, 'click', () => {
        var sDate = new Date(dateStart.value).getTime();
        var eDate = new Date().getTime();
        var now = new Date().getTime();

        if (!v.isValid(title)) {
            v.setInvalid(title, v.getFeedBox(title)[1], '제목을 입력해주세요');
            return title.focus();
        }
        if (!v.isValid(dateStart)) {
            v.setInvalid(dateStart, v.getFeedBox(dateStart)[1], '시작일을 입력해주세요.');
            return dateStart.focus();
        }
        if (!v.isValid(dateEnd)) {
            v.setInvalid(dateStart, v.getFeedBox(dateEnd)[1], '종료일을 입력해주세요.');
            return dateEnd.focus();
        }
        getEl('#writeForm').submit();
    });

    addEvent(cancel, 'click', () => {
        if (confirm('정말로 취소하시겠습니까?')) {
            alert('취소 하였습니다.');
            location.href = '/friend/list/1';
        }
    });

});