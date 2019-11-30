$(function () {
    // 클래스
    const {getEl, addEvent} = new travelmaker.utils();
    const v = new travelmaker.validation();

    // 변수
    const title = getEl('#title');
    const productname = getEl('#productname');
    const price = getEl('#price');
    const quantity = getEl('#quantity');
    const location = getEl('#location');
    const dateStart = getEl('#date-start');
    const dateEnd = getEl('#date-end');
    const content = getEl('#content');
    
    const btnNext = getEl('#next-btn');
    const cancel = getEl('#cancel');
    
    addEvent(title, 'blur', (e) => {
        const value = e.target.value;
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) return v.setInvalid(e.target, ivFeed, '제목을 입력해주세요.');
        return v.changeValid(e.target);
    });

    if(productname!=null){
	    addEvent(productname, 'blur', (e) => {
	        const value = e.target.value;
	        const [vFeed, ivFeed] = v.getFeedBox(e.target);
	        if (!value) return v.setInvalid(e.target, ivFeed, '상품을 입력해주세요.');
	        return v.changeValid(e.target);
	    });
    }
    if(price!=null){
	    addEvent(price, 'blur', (e) => {
	        const value = e.target.value;
	        const [vFeed, ivFeed] = v.getFeedBox(e.target);
	        if (!value) return v.setInvalid(e.target, ivFeed, '가격을 입력해주세요.');
	        return v.changeValid(e.target);
	    });
    }
    
    if(quantity!=null){
	    addEvent(quantity, 'blur', (e) => {
	        const value = e.target.value;
	        const [vFeed, ivFeed] = v.getFeedBox(e.target);
	        if (!value) return v.setInvalid(e.target, ivFeed, '수량을 입력해주세요.');
	        return v.changeValid(e.target);
	    });
    }
    addEvent(location, 'blur', (e) => {
        const value = e.target.value;
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) return v.setInvalid(e.target, ivFeed, '지역을 입력해주세요.');
        return v.changeValid(e.target);
    });
    if(dateStart!=null){
	    addEvent(dateStart, 'blur', (e) => {
	        const value = e.target.value;
	        console.log(value);
	        const [vFeed, ivFeed] = v.getFeedBox(e.target);
	        if (!value) return v.setInvalid(e.target, ivFeed, '시작일을 입력해주세요.');
	        return v.changeValid(e.target);
	    });
    }
    addEvent(dateEnd, 'blur', (e) => {
        const value = e.target.value;
        console.log(value);
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) return v.setInvalid(e.target, ivFeed, '종료일을 입력해주세요.');
        return v.changeValid(e.target);
    });
    
    addEvent(content, 'blur', (e) => {
        const value = e.target.value;
        const [vFeed, ivFeed] = v.getFeedBox(e.target);
        if (!value) return v.setInvalid(e.target, ivFeed, '상세내용을 입력해주세요.');
        return v.changeValid(e.target);
    });
    
    

    addEvent(btnNext, 'click', () => {
        if (!v.isValid(title)) {
            v.setInvalid(title, v.getFeedBox(title)[1], '제목을 입력해주세요');
            return title.focus();
        }
        if(productname!=null){
	        if (!v.isValid(productname)) {
	            v.setInvalid(productname, v.getFeedBox(title)[1], '상품명을 입력해주세요');
	            return productname.focus();
	        }
        }
        if(price!=null){
	        if (!v.isValid(price)) {
	            v.setInvalid(price, v.getFeedBox(price)[1], '가격을 입력해주세요');
	            return price.focus();
	        }
        }
        if(quantity!=null){
	        if (!v.isValid(quantity)) {
	            v.setInvalid(quantity, v.getFeedBox(quantity)[1], '수량을 입력해주세요');
	            return quantity.focus();
	        }
        }
        if (!v.isValid(location)) {
            v.setInvalid(location, v.getFeedBox(location)[1], '지역을 입력해주세요');
            return location.focus();
        }
        if (!v.isValid(content)) {
            v.setInvalid(content, v.getFeedBox(content)[1], '상세내용을 입력해주세요');
            return content.focus();
        }
        
        
        getEl('#writeForm').submit();
    });

    addEvent(cancel, 'click', () => {
        if (confirm('정말로 취소하시겠습니까?')) {
            alert('취소 하였습니다.');
            location.href = '/pur/list/1';
        }
    });

});