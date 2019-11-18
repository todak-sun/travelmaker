const utils = new travelmaker2.utils();

let requestData = {
    rno: '',
    seq: 1,
    title: '',
    content: '',
    hashcode: '',
    fixed: 0,
    isDomestic: +utils.getJSONfromQueryString().isDomestic
};

const essay = new travelmaker2.essay(requestData, $('#editor'));
// essay.init();