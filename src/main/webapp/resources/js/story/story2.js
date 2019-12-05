$(function() {
  let type, isDomestic;
  let seq = document.querySelector("#seq");

  //클래스
  const { getEl, addEvent } = new travelmaker.utils();
  const modal = new travelmaker.modal("#modal");

  //변수
  const btnWrite = getEl("#btn-write");
  addEvent(btnWrite, "click", e => {
    modal.create("story", initStory);
  });

  function initStory() {
    const btnEssay = getEl("#btn-essay");
    const btnRoute = getEl("#btn-route");
    addEvent(btnEssay, "click", setTypeHandler);
    addEvent(btnRoute, "click", getRouteTempAjax(seq.value));
    addEvent(btnRoute, "click", setTypeHandler);
  }

  function initDomestic() {
    const btnKorea = getEl("#btn-korea");
    const btnGlobal = getEl("#btn-global");
    addEvent(btnKorea, "click", moveHandler);
    addEvent(btnGlobal, "click", moveHandler);
  }

  function setTypeHandler(e) {
    e.stopPropagation();
    type = e.target.dataset.sel;
    modal.setModal(new travelmaker.template().domestic(), initDomestic);
  }

  function moveHandler(e) {
    e.stopPropagation();
    isDomestic = e.target.dataset.domestic;
    location.href = `/${type}/write?isDomestic=${isDomestic}`;
    // console.log(`/${type}/write?isDomestic=${isDomestic}`);
  }

  // 임시저장글 불러오기
  function getRouteTempAjax(seq) {
    return $.ajax({
      type: "GET",
      url: `/api/route/temp/${seq}`,
      beforeSend: setRequestHeader,
      success: function(rno) {
        if (rno > 0) {
          if (
            confirm(
              `이전에 작성하던 ${rno}번 게시글이 있습니다. 불러오시겠습니까?(취소시 삭제됩니다.)`
            )
          ) {
            location.href = `${window.location.protocol}//${window.location.host}/route/write/${rno}`;
          } else {
            $.ajax({
              type: "DELETE",
              url: `/api/route/${rno}`,
              beforeSend: setRequestHeader,
              success: function() {
                alert("삭제 완료");
              }
            });
          }
        }
      },
      error: console.error
    });
  }
});
