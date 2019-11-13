const utils = new travelmaker.utils();

let requestData = {
    rno: '',
    seq: 1,
    title: '',
    content: '',
    hashcode: '',
    fixed: 0,
    isDomestic: +utils.getJSONfromQueryString().isDomestic
};

const essay = new travelmaker.essay(requestData, $('#editor'));
// essay.init();