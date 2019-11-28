$(function() {
  // 데이타세팅
  const { useState, setRequestHeader } = new travelmaker.utils();
  let routeData = {
    rno: null,
    seq: null,
    nickname: null,
    title: null,
    content: null,
    hashtag: null,
    fixed: null,
    isDomestic: null
  };
  let routeContentData = {
    crno: 0,
    rno: null,
    content: null,
    lat: 0,
    lng: 0,
    location: null,
    dateStart: null,
    dateEnd: null,
    score: null,
    fixed: 0
  };
  const [setRoute, getRoute] = useState(routeData);
  const [setRouteContent, getRouteContent] = useState(routeContentData);
  let fileList = [];

  // ******* 페이지 첫 로딩 시 필요한 처리들 *******

  // 국내외, 유저정보 입력
  setRoute({
    isDomestic: +getJSONfromQueryString().isDomestic,
    seq: +getEl("#seq").value,
    nickname: getEl("#nickname").value
  });

  // 지도를 위한 국내외 정보 히든값에 입력
  getEl("#isDomestic").value = getRoute().isDomestic;

  // ************** 전역변수들 선언
  // 영역 변수 선언
  const $savedCourses = $(".saved-courses");
  const $starRatings = $(".score-group a");
  const $imageGroup = $(".image-group");
  const leverBar = getEl(".level-bar");
  const editorFirst = getEl(".editor-first");
  const editorSecond = getEl(".editor-second");
  const editorThird = getEl(".editor-third");

  // 버튼 변수 선언
  const btnPrevious = getEl("#btn-previous"); // 이전(2(왼) 3(왼))
  const btnNext = getEl("#btn-next"); // 다음(1(가) 2(가))
  const btnRouteSave = getEl("#btn-route-save"); // 저장(3(가))
  const btnPreview = getEl("#btn-preview"); // 미리보기(3(오))
  const btnCourseSave = getEl("#btn-course-save"); // 코스저장(2(오))

  const btnAddImage = getEl("#image-add"); // 이미지 추가 버튼
  const btnAddHash = getEl("#hash-add"); // 해쉬태그 추가 버튼

  // 사용자 입력값 변수 선언
  const title = getEl("#route-title");
  const epilogue = getEl("#route-epilogue");
  const nation = getEl("input[name=nation]");
  const city = getEl("input[name=city]");
  const place = getEl("input[name=place]");
  const content = getEl("#route-content-content");
  const location = getEl("input[name=location]");
  const dateStart = getEl("input[name=dateStart]");
  const dateEnd = getEl("input[name=dateEnd]");
  const score = getEl("input[name=score]");
  const hashInput = getEl("#hash-input");

  const $hashView = $("#hash-view");
  const $images = $("#images");

  // ************** 함수들 선언
  // 데이터 바인드 관련 함수들
  function routeDataBindHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setRoute({ [name]: value });
  }

  function routeContentBindHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setRouteContent({ [name]: value });
  }

  // 별점수 함수
  function starRatingHandler(e) {
    e.preventDefault();
    const $this = $(this);
    $this
      .parent()
      .parent()
      .find("a")
      .removeClass("on");
    $this
      .addClass("on")
      .parent()
      .prevAll("li")
      .children()
      .addClass("on");
    const score = $(".score-group a.on").length;
    setRouteContent({ score: score });
  }

  // 코스 입력칸 초기화 함수
  function initCourseForm() {
    // 입력칸 초기화
    $imageGroup.empty();
    $images.val("");
    nation.value = "";
    city.value = "";
    place.value = "";
    location.value = "";
    content.value = "";
    // 자바스크립트에 저장된 데이터셋 초기화
    fileList.splice(0);
    setRouteContent({
      crno: 0,
      content: null,
      lat: 0,
      lng: 0,
      location: null,
      fixed: 0
    });
  }

  // ************** 이벤트 부여
  $starRatings.on("click", starRatingHandler);
  $images.on("change", CourseImg);
  btnAddImage.addEventListener("click", function(e) {
    e.preventDefault();
    $images.click();
  });
  btnAddHash.addEventListener("click", function(e) {
    if ($hashView.children("span").length >= 5)
      return alert("해쉬태그는 5개까지만 등록 가능합니다");
    let hashtag = "";
    const $span = $(
      `<span class="hash">${hashInput.value.replace(/\s/gi, "")}</span>`
    );
    hashInput.value = "";
    $hashView.append($span);
    $hashView.children("span").each(function(index, span) {
      span.addEventListener("click", deleteHash);
      hashtag += span.innerText;
      hashtag += " ";
    });

    setRoute({ hashtag: hashtag });
    // hashView.appendChild;
    // hashInput.value;
  });

  function deleteHash(e) {
    let hashtag = "";
    // hashList = e.target.parentElement;
    let index = getElementIndex(e.target);
    $hashView[0].removeChild($hashView[0].children[index]);
    $hashView.children("span").each(function(index, span) {
      hashtag += span.innerText;
      hashtag += " ";
    });
    setRoute({ hashtag: hashtag });
  }

  addSameEvent("change", routeDataBindHandler, title, epilogue);
  addSameEvent(
    "click",
    selectCommand,
    btnPrevious,
    btnNext,
    btnRouteSave,
    btnPreview,
    btnCourseSave
  );
  addSameEvent(
    "change",
    routeContentBindHandler,
    nation,
    city,
    place,
    content,
    location,
    dateStart,
    dateEnd
  );

  // 처음 필요한 작업들 실행
  showCommand(1);

  // *******페이지 첫 로딩 시 필요한 처리들 끝*******
  //
  //
  //
  //
  //
  // 클릭 선택으로부터 페이지 시작!!!!!!!!!!!!!! 분기점 모음!!!!!!!!!!!!!!!!!!!!!

  function selectCommand(e) {
    return new Promise(function() {
      let command = e.target.name;
      switch (command) {
        case "previous-btn-2": // 1단계로 빽
          return backToLevel(1);
        case "previous-btn-3": // 2단계로 빽
          return backToLevel(2);
        case "next-btn-1": // 2단계로 전진
          return showLevel(2);
        case "next-btn-2": // 3단계로 전진
          return showLevel(3);
        case "course-save-btn": // 코스 저장 버튼
          return saveCourse();
        case "preview-btn": // 미리보기 버튼
          return showPreview();
        case "route-save-btn": // 최종 저장 버튼
          return saveRoute();
        default:
          return alert("없는 명령어 입니다.");
      }
    });
  }

  // 단계별 버튼 내용 변경
  function showCommand(commandLevel) {
    switch (commandLevel) {
      case 1:
        leverBar.children[1].classList.remove("level-2");

        editorFirst.classList.remove("hide");
        editorSecond.classList.add("hide");

        btnPrevious.setAttribute("disabled", "disabled"); //
        btnPrevious.name = "previous-btn-1";

        btnNext.removeAttribute("disabled"); //
        btnNext.name = "next-btn-1";

        btnCourseSave.setAttribute("disabled", "disabled"); //
        btnCourseSave.name = "course-save-btn";
        break;
      case 2:
        leverBar.children[1].classList.add("level-2");
        leverBar.children[2].classList.remove("level-3");

        editorFirst.classList.add("hide");
        editorSecond.classList.remove("hide");
        editorThird.classList.add("hide");

        btnPrevious.removeAttribute("disabled"); //
        btnPrevious.name = "previous-btn-2";

        btnNext.removeAttribute("disabled"); //
        btnNext.name = "next-btn-2";
        btnNext.classList.remove("hide");

        btnRouteSave.setAttribute("disabled", "disabled");
        btnRouteSave.name = "route-save-btn";
        btnRouteSave.classList.add("hide");

        btnPreview.setAttribute("disabled", "disabled");
        btnPreview.name = "preview-btn";
        btnPreview.classList.add("hide");

        btnCourseSave.removeAttribute("disabled"); //
        btnCourseSave.name = "course-save-btn";
        btnCourseSave.classList.remove("hide");

        break;
      case 3:
        leverBar.children[2].classList.add("level-3");

        editorSecond.classList.add("hide");
        editorThird.classList.remove("hide");

        btnPrevious.removeAttribute("disabled"); //
        btnPrevious.name = "previous-btn-3";

        btnNext.setAttribute("disabled", "disabled");
        btnNext.name = "next-btn-3";
        btnNext.classList.add("hide");

        btnRouteSave.removeAttribute("disabled"); //
        btnRouteSave.name = "route-save-btn";
        btnRouteSave.classList.remove("hide");

        btnPreview.removeAttribute("disabled"); //
        btnPreview.name = "preview-btn";
        btnPreview.classList.remove("hide");

        btnCourseSave.setAttribute("disabled", "disabled");
        btnCourseSave.name = "course-save-btn";
        btnCourseSave.classList.add("hide");
        break;
      default:
        alert("코딩 다시해");
        break;
    }
  }

  // 단계별 실행 내용
  function showLevel(level) {
    switch (level) {
      case 2:
        let route = getRoute();
        // 제목 작성 여부 체크
        if (!title.value) alert("제목을 입력해주세요");
        // 제목이 빈칸이 아니면 DB에 route 틀 저장 및 작성 폼 생성
        else
          return showLevel2Ajax(route)
            .then(function(result) {
              showWriteForm(route.isDomestic);
              showCommand(level);
              // $(".route-info-form").show();
              setRoute({ rno: result.rno });
              setRouteContent({ rno: result.rno, score: 3 });
              title.disabled = true;
            })
            .catch(console.error);
        break;

      case 3:
        // 코스가 1개 이상 저장되어있는지 확인 후
        // DB에 저장된 순서 반영 & 루트 인포 숨기기 & 에필로그 작성창 열기
        if ($savedCourses.length > 0)
          return saveOrderAjax(getOrder())
            .then(function() {
              // $(".route-info-form").hide();
              // $(".route-epilogue-form").show();
              showCommand(level);
            })
            .catch(console.error);
        break;

      default:
        break;
    }
  }

  // 단계별 뒤로 가기 실행 내용
  function backToLevel(level) {
    switch (level) {
      case 1:
        showCommand(level);
        $(".route-info-form").hide();
        setRoute({ rno: null });
        setRouteContent({ rno: null });
        title.disabled = false;
        break;
      case 2:
        showCommand(level);
        // $(".route-info-form").show();
        // $(".route-epilogue-form").hide();
        break;
      default:
        break;
    }
  }
  //
  //
  //
  //
  // 분기점 모음 끝!!!!!!!!!!!!!!!!
  //
  //
  //
  //
  //
  //
  //
  //

  function showWriteForm(isDomestic) {
    // <-- 국내 해외 폼 보여주기
    const $searchBtn = $("#searchBtn");
    // 국내 (Kakao Map)
    if (isDomestic === 1) {
      // //국가, 도시 입력창을 숨김.
      // $(".abroad-info").hide();
      // 구글 지도 모달창 없애기
      $("#googleMapModal").remove();
      // 해외 (Google Map)
    } else if (isDomestic === 0) {
      // 카카오 지도 모달 연결 속성 없애기
      $searchBtn.removeAttr("data-toggle");
      $searchBtn.removeAttr("data-target");
    }

    //기본값으로 오늘 날짜 입력되게 하기
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let today = `${year}-${month}-${day}`;
    setRouteContent({ dateStart: today, dateEnd: today });
    getEl("input[name=dateStart]").value = today;
    getEl("input[name=dateEnd]").value = today;
  }

  // <-- 코스 저장 관련
  function saveCourse() {
    const { isDomestic } = getRoute();
    const {
      crno,
      content,
      place,
      city,
      nation,
      dateStart,
      dateEnd
    } = getRouteContent();

    if (!isDomestic) {
      //해외일 때
      if (!checkValidation(getRouteContent(), isDomestic)) return; //유효성 검사
      setRouteContent({ location: `${nation}_${city}_${place}` });
    } else {
      //국내일 때
      if (!checkValidation(getRouteContent(), isDomestic)) return; //유효성 검사
      setRouteContent({ location: place });
    }

    // <- DB에 코스 임시저장 프로미스
    const formData = getFormData(getRouteContent());

    if (crno == 0) {
      // 처음 저장할 때
      saveCourseAjax(formData)
        .then(result => {
          courseAjaxSuccess(result.crno);
        })
        .catch(console.error);
    } else {
      // 수정 저장할 때
      alert("수정할때 들어오는 곳");
      modifyCourseAjax(formData)
        .then(result => {
          courseAjaxSuccess(result.crno);
        })
        .catch(console.error);
    }
  }

  function courseAjaxSuccess(crno) {
    // < 3.웹페이지에 코스 임시저장
    // 수정된 임시저장코스 삭제(삭제할 게 있을 경우만)
    let patchedCourse = document.querySelector(
      `.route-info input[value='${crno}']`
    );
    if (patchedCourse)
      $savedCourses[0].removeChild(
        patchedCourse.parentElement.parentElement.parentElement
      );

    // <h4>${place.value}</h4>
    // <span>날짜 : ${dateStart.value} - ${dateEnd.value}</span>
    // <button name="modify-course">수정</button><button name="delete-course">삭제</button>
    // <input type="hidden" name="crno" value=${crno}>

    // 임시저장코스 추가
    const $frag = $(document.createDocumentFragment());
    const $li = $(`
                    <li draggable="true" droppable="true" style="[draggable='true'] {
                      -khtml-user-drag: element; }" >
                      <div class="route-item" name="item">
                        <span class="delete" name="delete-course">&times;</span>
                        <h5>${place.value}</h5>
                        <div class="route-info" name="info">
                          <p><span>${dateStart.value}</span> ~ <span>${dateEnd.value}</span></p>
                          <button name="modify-course">수정</button>
                          <input type="hidden" name="crno" value=${crno}>
                        </div>
                      </div>
                    </li>
                `);
    $frag.append($li);
    $savedCourses.append($frag);

    Array.from($savedCourses[0].children).forEach(li => {
      // addEvent(li, "dragstart", function(event) {
      //   event.dataTransfer.setData("Text", this.id);
      // });
      li.addEventListener("dragstart", dragstart, false);
      li.addEventListener("dragover", dragover, false);
      // li.addEventListener("dragenter", dragenter, false);
      // li.addEventListener("dragleave", dragleave, false);
      li.addEventListener("drop", drop, false);
      li.children[0].children[2].children[1].addEventListener(
        "click",
        modifyCourse
      );
      li.children[0].children[0].addEventListener("click", deleteCourse);
    });

    initCourseForm();
  }

  function modifyCourse(e) {
    const crno = e.target.nextElementSibling.value;
    // parentElement.children.namedItem("crno").value;
    alert(crno + "에이작스로 수정할 게시글 불러오기 추가");

    getCourseAjax(crno).then(result => {
      console.log(result);
      // 불러 온 후에 불러온 내용 루트컨텐트에 저장
      // 에이작스 석세스시 추가할 내용
      let arrLocation = result.location.split("_");
      location.value = result.location;
      if (arrLocation.length == 1) {
        place.value = arrLocation[0];
        console.log("국내");
      } else {
        nation.value = arrLocation[0];
        city.value = arrLocation[1];
        place.value = arrLocation[2];
        console.log("해외");
      }
      content.value = result.content;

      // 데이터셋 로드
      setRouteContent({
        crno: result.crno,
        rno: result.rno,
        content: result.content,
        lat: result.lat,
        lng: result.lng,
        place: result.place,
        location: result.location,
        dateStart: result.dateStart,
        dateEnd: result.dateEnd,
        score: result.score,
        fixed: 0
      });
      // if (arrLocation.length == 1) {
      //   setRouteContent({
      //     nation: nation,
      //     city: city
      //   });
      // }
    });
  }

  function deleteCourse(e) {
    const crno =
      e.target.nextElementSibling.nextElementSibling.children["crno"].value;
    alert(crno + "에이작스로 삭제하기");
    deleteCourseAjax(crno).then(result => {
      let patchedCourse = document.querySelector(
        `.route-info input[value='${crno}']`
      );
      if (patchedCourse)
        $savedCourses[0].removeChild(
          patchedCourse.parentElement.parentElement.parentElement
        );

      console.log(result);
      alert(crno + "코스를 삭제했습니다");
    });
  }

  function dragstart(ev) {
    // 선택한 코스에 이동할 대상이라는 클래스 추가
    ev.dataTransfer.setData("Text", this.id);
    ev.target.classList.add("moving");
  }
  function dragover(ev) {
    ev.preventDefault();
  }
  // function dragenter(ev) {
  // }
  // function dragleave(ev) {
  // }
  function drop(ev) {
    const moving = document.querySelector(".moving");
    const dropped = ev.currentTarget;

    if (moving.offsetTop > dropped.offsetTop) {
      // 위로 이동시킬 경우
      $savedCourses[0].insertBefore(moving, dropped);
    } else if (moving.offsetTop < dropped.offsetTop) {
      // 아래로 이동시킬 경우
      // 맨아래일 경우 append 아닐경우 껴넣기
      if (dropped.nextElementSibling === null) {
        $savedCourses[0].appendChild(moving);
      } else {
        $savedCourses[0].insertBefore(moving, dropped.nextElementSibling);
      }
    }
    // 이동 완료 후 이동클래스 제거
    moving.classList.remove("moving");
  }
  // function test() {
  //   // let images = document.querySelector("input[name=images]").files;
  //   // console.log(images.length);
  //   // getImages(images);
  //   testImage();
  // }
  // document.getElementById("files").addEventListener("change", testImage);
  // function testImage() {
  //   let reader = new FileReader();

  //   reader.onload = function(e) {
  //     document.getElementById("image").src = e.target.result;
  //   };

  //   reader.readAsDataURL(this.files[0]);
  // }

  // function getImages(images) {
  //   if (!preloadImages.list) {
  //     preloadImages.list = [];
  //   }
  //   let list = preloadImages.list;
  //   for (let i = 0; i < images.length; i++) {
  //     let img = new Image();
  //     img.onload = function() {
  //       let index = list.indexOf(this);
  //       if (index !== -1) {
  //         // remove image from the array once it's loaded
  //         // for memory consumption reasons
  //         list.splice(index, 1);
  //       }
  //     };
  //     list.push(img);
  //     img.src = images[i];
  //     console.log("img.src : " + img.src);
  //   }
  //   console.log("list : " + list);
  // }

  function getFormData(data) {
    const formData = new FormData();
    // let imageFiles = images.files;
    // if (imageFiles.length > 5)
    //   return alert("이미지는 5개까지만 업로드 가능합니다");
    // Array.from(imageFiles).forEach((image, idx) => {

    fileList.forEach((image, idx) => {
      // console.log(idx + " : " + image);
      formData.append("images", image);
    });
    const keys = Object.keys(data);
    const values = Object.values(data);
    for (let i = 0; i < keys.length; i++) {
      console.log(keys[i] + " : " + values[i]);
      formData.append(keys[i], values[i]);
    }
    return formData;
  }

  function saveRoute() {
    // 유효성 검사
    checkRouteValidation(epilogue.value);
    // <-- 루트 저장
    let route = getRoute();
    saveRouteAjax(route)
      .then(function() {
        window.location.href = `http://${window.location.host}/story/`;
      })
      .catch(console.error);
  }

  // 미리 보기
  function showPreview() {
    const url = `http://${window.location.host}/route/preview/${
      getRoute().rno
    }`;
    // 지도 넓이에 맞춤
    window.open(url, "", "width=815,height=600,left=300");
  }

  function getOrder() {
    let orderJson = new Array();
    Array.from($savedCourses[0].children).forEach(course => {
      let crno = course.children[0].children["info"].children["crno"].value;
      orderJson.push(crno);
    });
    return orderJson;
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //유효성 검사하는 부분.
  function checkValidation(data, isDomestic) {
    const { content, dateStart, dateEnd, nation, city, place } = data;
    if (!isDomestic) {
      if (!checkNationValidation(nation)) return false;
      if (!checkCityValidation(city)) return false;
    }
    if (!checkPlaceValidation(place)) return false;
    if (!checkContentValidation(content)) return false;
    if (!checkDateValidation(dateStart)) return false;
    if (!checkDateValidation(dateEnd)) return false;
    return true;
  }

  function checkPlaceValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      alert("장소를 입력해주세요");
      place.focus();
      return false;
    }

    return true;
  }

  function checkCityValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      alert("도시를 입력해주세요");
      city.focus();
      return false;
    }

    return true;
  }

  function checkDateValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      alert("날짜를 입력해주세요");
      dateStart.focus();
      return false;
    }

    return true;
  }

  function checkNationValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      alert("나라를 입력해주세요");
      nation.focus();
      return false;
    }

    return true;
  }

  function checkContentValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      content.focus();
      alert("내용을 입력해주세요");
      return false;
    }

    return true;
  }

  function checkRouteValidation(value) {
    if (!value) {
      epilogue.focus();
      alert("에필로그를 입력해주세요");
      return false;
    }
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //ajax 메소드 모음
  // 글 전체 저장
  function saveRouteAjax(data) {
    return $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/route/saveRoute",
      data: JSON.stringify(data),
      beforeSend: setRequestHeader
    });
  }

  // 코스 저장
  function saveCourseAjax(formData) {
    return $.ajax({
      type: "POST",
      url: "/api/route/Course",
      processData: false,
      contentType: false,
      data: formData,
      beforeSend: setRequestHeader
    });
  }

  // 코스 불러오기(수정하기 위해)
  function getCourseAjax(crno) {
    return $.ajax({
      type: "GET",
      url: "/api/route/Course/" + crno,
      beforeSend: setRequestHeader
    });
  }

  // 코스 수정
  function modifyCourseAjax(formData) {
    return $.ajax({
      type: "POST",
      url: "/api/route/Course-Modify",
      processData: false,
      contentType: false,
      data: formData,
      beforeSend: setRequestHeader
    });
  }

  // 코스 삭제
  function deleteCourseAjax(crno) {
    return $.ajax({
      type: "DELETE",
      url: "/api/route/Course/" + crno,
      beforeSend: setRequestHeader
    });
  }

  // 코스 순서 수정
  function saveOrderAjax(order) {
    return $.ajax({
      type: "PATCH",
      contentType: "application/json",
      url: "/api/route/saveOrder",
      data: JSON.stringify(order), //순서 가져옴
      beforeSend: setRequestHeader
    });
  }

  //루트 컨텐츠 전체를 저장(최초)
  function showLevel2Ajax(data) {
    return $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/route/showWriteForm",
      data: JSON.stringify(data),
      dataType: "json",
      beforeSend: setRequestHeader
    });
  }

  function CourseImg() {
    const images = $images[0];
    listLength = fileList.length;
    if (images.files.length + fileList.length > 5)
      return alert("이미지는 5개까지만 업로드 가능합니다");

    Array.from(images.files).forEach(image => {
      let reader = new FileReader();
      reader.onload = function(e) {
        fileList.push(image);
        // 임시저장코스 추가

        const $frag = $(document.createDocumentFragment());
        const $li = $(`
                      <li>
                        <span class="delete">&times;</span>
                        <img
                          src="${e.target.result}"
                          alt="${image.name}"
                        />
                      </li>
                    `);
        $frag.append($li);
        $imageGroup.append($frag);

        if (fileList.length === $imageGroup[0].childElementCount) {
          document.querySelectorAll(".image-group span").forEach(span => {
            span.addEventListener("click", deleteImage);
          });
        }
      };
      reader.readAsDataURL(image);
    });
  }

  function MainImg() {
    const mainImage = document.querySelector("#main-image");
    const imageFile = mainImage.files[0];

    let reader = new FileReader();
    reader.onload = function(e) {
      mainImage.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  }

  function deleteImage(e) {
    // 리스트 index 값 찾아서 이미지 삭제
    // e.stopPropagation();
    let li = e.target.parentElement;
    let parent = li.parentElement;
    let index = getElementIndex(li);
    parent.removeChild(parent.children[index]);
    fileList.splice(index, 1);
  }
  function getElementIndex(element) {
    let _i = 0;
    while ((element = element.previousElementSibling) != null) {
      _i++;
    }
    return _i;
  }
});
//
//
//
//
//
//
// 기능함수들 모음
//
//
//

// 주소에서 값따오는 함수
function getJSONfromQueryString() {
  let qs = location.search.slice(1).split("%");
  const obj = {};
  qs.forEach(q => {
    q = q.split("=");
    obj[q[0]] = decodeURIComponent(q[1] || "");
  });
  return JSON.parse(JSON.stringify(obj));
}

// 이벤트 거는 함수
function addSameEvent(event, handler, ...targets) {
  targets.forEach(target => {
    target.addEventListener(event, handler);
  });
}
