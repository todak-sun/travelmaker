$(function () {
    const modal = new travelmaker.modal('#modal');
    const {getElList, addAllSameEvent} = new travelmaker.utils();

    const btnTryList = getElList('.btn-try');
    addAllSameEvent(btnTryList, 'click', function (e) {
        modal.create('request', function () {
            console.log('뭔데');
        })
    })

});