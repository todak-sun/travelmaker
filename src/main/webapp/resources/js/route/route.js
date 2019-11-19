$(function() {
  const { useState, setRequestHeader } = new travelmaker.utils();
  // 전역변수들
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

  setRoute({
    isDomestic: +getJSONfromQueryString().isDomestic,
    seq: +getEl("#seq").value,
    nickname: getEl("#nickname").value
  });

  getEl("#isDomestic").value = getRoute().isDomestic;

  // 별점수 매기기
  const $starRatings = $(".star_rating a");
  $starRatings.on("click", starRatingHandler);

  // 버튼 변수 선언 & 클릭 이벤트 부여
  const previousBtn = getEl("#previous-btn");
  const saveBtn = getEl("#save-btn");
  const nextBtn = getEl("#next-btn");
  previousBtn.addEventListener("click", selectCommand);
  saveBtn.addEventListener("click", selectCommand);
  nextBtn.addEventListener("click", selectCommand);

  //사용자 입력값 & 이벤트
  const title = getEl("#route-title");
  const hashtag = getEl("#hashtag");
  const epilogue = getEl("#route-epilogue");
  const nation = getEl("input[name=nation]");
  const city = getEl("input[name=city]");
  const place = getEl("input[name=place]");
  const content = getEl("#route-content-content");
  const location = getEl("input[name=location]");
  const dateStart = getEl("input[name=dateStart]");
  const dateEnd = getEl("input[name=dateEnd]");
  const score = getEl("input[name=score]");

  addSameEvent("change", routeDataBindHandler, title, epilogue, hashtag);
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

  hashtag.addEventListener;

  function selectCommand(e) {
    return new Promise(function() {
      let command = e.target.name;
      switch (command) {
        case "previous-btn-2":
          return backToLevel(1);
        case "previous-btn-3":
          return backToLevel(2);
        case "next-btn-1":
          return showLevel(2);
        case "next-btn-2":
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
        previousBtn.setAttribute("disabled", "disabled");
        saveBtn.setAttribute("disabled", "disabled");
        nextBtn.name = "next-btn-1";
        break;
      case 2:
        previousBtn.removeAttribute("disabled");
        previousBtn.name = "previous-btn-2";
        saveBtn.removeAttribute("disabled");
        saveBtn.name = "course-save-btn";
        saveBtn.value = "코스저장";
        nextBtn.name = "next-btn-2";
        nextBtn.value = "다음";
        break;
      case 3:
        previousBtn.name = "previous-btn-3";
        saveBtn.name = "route-save-btn";
        saveBtn.value = "저장";
        nextBtn.name = "preview-btn";
        nextBtn.value = "미리보기";
        break;
      default:
        alert("코딩 다시해");
        break;
    }
  }

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

  function starRatingHandler(e) {
    e.preventDefault();
    const $this = $(this);
    $this
      .parent()
      .children("a")
      .removeClass("on");
    $this
      .addClass("on")
      .prevAll("a")
      .addClass("on");
    const score = $(".star_rating a.on").length;
    setRouteContent({ score: score });
  }

  function initCourseForm() {
    // $("#images").replaceWith($("#images").clone(true));
    // other browser 일때 초기화
    // $("#images").val("");
    // let inputFile = document.querySelector("input[name=images]");
    // inputFile.select();
    // document.selection.clear;
    // let tempForm = document.createElement("form");
    // tempForm.appendChild();
    $("#images").val("");
    nation.value = "";
    city.value = "";
    place.value = "";
    location.value = "";
    content.value = "";
  }

  function showLevel(level) {
    switch (level) {
      case 2:
        // 제목, 국내&해외 변수값 선언
        // 제목 작성 여부 체크
        if (!title.value) {
          alert("제목을 입력해주세요");
        } else {
          // 제목이 빈칸이 아니면 DB에 route 틀 저장 및 작성 폼 생성
          // showWriteFormAjax(routeTitle.value, destination)
          let route = getRoute();
          showLevel2Ajax(route)
            .then(function(result) {
              showWriteForm(route.isDomestic);
              showCommand(level);
              $(".route-info-form").show();
              $(".route-destination").hide();
              setRoute({ rno: result.rno });
              setRouteContent({ rno: result.rno, score: 3 });
              title.disabled = true;
            })
            .catch(console.error);
        }
        break;
      case 3:
        // 코스가 1개 이상 저장되어있는지 확인 후
        // 루트 인포 숨기기
        $(".route-info-form").hide();
        $(".route-epilogue-form").show();
        showCommand(level);
        // 에필로그 작성창 열기
        break;

      default:
        break;
    }
  }
  //
  function backToLevel(level) {
    // 뒤로 가기 버튼들
    switch (level) {
      case 1:
        showCommand(level);
        $(".route-info-form").hide();
        $(".route-destination").show();
        setRoute({ rno: null });
        setRouteContent({ rno: null });
        title.disabled = false;
        break;
      case 2:
        showCommand(level);
        $(".route-info-form").show();
        $(".route-epilogue-form").hide();
        break;
      default:
        break;
    }
  }

  function showWriteForm(isDomestic) {
    // <-- 국내 해외 폼 보여주기
    const $searchBtn = $("#searchBtn");
    // 국내 (Kakao Map)
    if (isDomestic === 1) {
      //국가, 도시 입력창을 숨김.
      $(".abroad-info").hide();
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

  // <-- 코스 저장
  function saveCourse() {
    const { isDomestic } = getRoute();
    const {
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

    saveCourseAjax(formData)
      .then(() => {
        saveCourseAjaxSuccess();
      })
      .catch(console.error);
  }

  function saveCourseAjaxSuccess() {
    // < 3.웹페이지에 코스 임시저장
    const $frag = $(document.createDocumentFragment());
    const $li = $(`
                          <li>
                            <h4>${place.value}</h4>
                                <span>날짜 : ${dateStart.value} - ${dateEnd.value}</span>
                            <input type="button" value="위로">
                          </li>
                          `);
    $frag.append($li);
    $(".saved-courses").append($frag);
    initCourseForm();
  }

  function getFormData(data) {
    const formData = new FormData();
    let images = document.querySelector("input[name=images]").files;
    if (images.length > 5) return alert("이미지는 5개까지만 업로드 가능합니다");
    Array.from(images).forEach((image, idx) => {
      console.log(idx + " : " + image);
      formData.append("image" + idx, image);
    });
    // for (let i = 0; i < images.length; i++) {
    //   formData.append("images", images[i]);
    // }
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
      .then((location.href = "http://" + location.host + "/story"))
      .catch(console.error);
  }

  // 미리 보기
  function showPreview() {
    getPreviewAjax2(getRoute().rno)
      .then(function(result) {
        getPreviewAjaxSuccess2(result);
      })
      .catch(console.error);

    getPreviewAjax(getRoute().rno)
      .then(getPreviewAjaxSuccess)
      .catch(console.error);
  }

  function getPreviewAjax(data) {
    // 미리보기 가져오기
    return $.ajax({
      type: "GET",
      url: "/api/route/getRouteView/" + data,
      // contentType: "application/json",
      // data: { rno: data },
      dataType: "json"
      // beforeSend: setRequestHeader
    });
  }

  function getPreviewAjaxSuccess(data) {
    // let wnd = window.open("", "new window", "width=200,height=100");
    console.log(data);
    // 맵쪽에 뿌려줄 좌표를 담을 배열
    var flightPlanCoordinates = [];

    // 작은 Route Content를 동적으로 뿌려줌
    $.each(data, function(index, items) {
      $("<div/>", {
        class: "conts_story",
        style: "border: 1px solid red;"
      })
        .append(
          $("<div/>", {
            class: "story_para"
          })
            .append(
              $("<div/>", {
                class: "day_info"
              })
            )
            .append(
              $("<span/>", {
                class: "day",
                text: "Day " + (index + 1)
              })
            )
            .append($("<br/>"))
            .append(
              $("<span/>", {
                class: "date",
                text: items.dateStart + " / " + items.dateEnd
              })
            )
        )
        .append(
          $("<div/>", {
            class: "course"
          })
            .append(
              $("<div/>", {
                class: "carousel slide",
                "data-ride": "carousel",
                id: "routeImg" + index
              })
                .append(
                  $("<ul/>", {
                    class: "carousel-indicators"
                  })
                )
                .append(
                  $("<div/>", {
                    class: "carousel-inner"
                  })
                )
                .append(
                  $("<a/>", {
                    class: "carousel-control-prev",
                    href: "#routeImg" + index,
                    "data-slide": "prev"
                  }).append(
                    $("<span/>", {
                      class: "carousel-control-prev-icon"
                    })
                  )
                )
                .append(
                  $("<a/>", {
                    class: "carousel-control-next",
                    href: "#routeImg" + index,
                    "data-slide": "next"
                  }).append(
                    $("<span/>", {
                      class: "carousel-control-next-icon"
                    })
                  )
                )
            )
            .append(
              $("<div/>", {
                class: "course_info"
              }).append(
                $("<div/>", {
                  class: "course_info_box"
                })
                  .append(
                    $("<div/>", {
                      class: "loc_info_ico",
                      text: "아이콘 이미지"
                    })
                  )
                  .append(
                    $("<div/>", {
                      class: "loc_info_txt"
                    }).append(
                      $("<span/>", {
                        class: "loc_txt",
                        text: "위치 : " + items.location
                      })
                        .append($("<br/>"))
                        .append(
                          $("<span/>", {
                            class: "loc_addr",
                            text: "위치 : " + items.location
                          })
                        )
                    )
                  )
              )
            )
            .append(
              $("<div/>", {
                class: "course_story",
                text: "코스내용 : " + items.content
              })
            )
            .append(
              $("<div/>", {
                class: "course_rate"
              }).append(
                $("<div/>", {
                  class: "star_rate"
                })
                  .append(
                    $("<span/>", {
                      class: "star",
                      text: "별"
                    })
                  )
                  .append(
                    $("<span/>", {
                      class: "star",
                      text: "별"
                    })
                  )
                  .append(
                    $("<span/>", {
                      class: "star",
                      text: "별"
                    })
                  )
                  .append(
                    $("<span/>", {
                      class: "star",
                      text: "별"
                    })
                  )
                  .append(
                    $("<span/>", {
                      class: "star",
                      text: "별"
                    })
                  )
                  .append($("<br/>"))
                  .append(
                    $("<div/>", {
                      class: "rate_txt",
                      text: items.score + "점"
                    })
                  )
              )
            )
        )
        .appendTo($("#routeContent"));

      var routeContentId = $("#routeContent")
        .children()
        .last();
      /* routeLat.push(items.lat);
                routeLng.push(items.lng); */

      // 좌표 담기
      flightPlanCoordinates.push({ lat: items.lat, lng: items.lng });

      // 작은 Route Content 안에 있는 이미지 배열을 뿌림
      $.each(items.imgs, function(indexImgs, img) {
        console.log(img);
        $("<li/>", {
          "data-target": "#routeImg" + index,
          "data-slide-to": indexImgs
        }).appendTo(routeContentId.find(".carousel-indicators"));

        $("<div/>", {
          class: "carousel-item"
        })
          .append(
            $("<img/>", {
              src: "/resources/storage/route/" + img
            })
          )
          .appendTo(routeContentId.find(".carousel-inner"));
      });
      console.log("-----------------------");

      // 부트스트랩 사진 전환에 쓸 class 생성
      routeContentId
        .find(".carousel-indicators")
        .children()
        .first()
        .attr("class", "active");
      routeContentId
        .find(".carousel-inner")
        .children()
        .first()
        .attr("class", "carousel-item active");
    });
    console.log(flightPlanCoordinates);

    // 해외
    if ($("#isdomestic").val() == 0) {
      googleMap(flightPlanCoordinates);
    } else {
      // 국내
      kakaoMap(flightPlanCoordinates);
    }

    // 에필로그랑 해시태그
    $("<div/>", {
      id: "routeFooter"
    })
      .append(
        $("<span>", {
          id: "routeEpilogue",
          text: "Epilogue : " + $("#epilogue").val()
        })
      )
      .append(
        $("<span/>", {
          id: "routeHashtag",
          text: "HashTag : " + $("#hashtag").val()
        })
      )
      .appendTo($("#routeContent"));

    console.log(result);
  }

  function getPreviewAjax2(data) {
    // 미리보기 가져오기
    return $.ajax({
      type: "GET",
      url: "/route/view/" + data,
      dataType: "html"
    });
  }

  function getPreviewAjaxSuccess2(result) {
    let wnd = window.open("", "new window", "width=200,height=100");
    wnd.document.write(result);
    console.log(result);
  }

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
      alert("컨텐츠를 입력해주세요");
      place.focus();
      return false;
    }

    return true;
  }

  function checkCityValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      alert("컨텐츠를 입력해주세요");
      city.focus();
      return false;
    }

    return true;
  }

  function checkDateValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      alert("컨텐츠를 입력해주세요");
      dateStart.focus();
      return false;
    }

    return true;
  }

  function checkNationValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      alert("컨텐츠를 입력해주세요");
      nation.focus();
      return false;
    }

    return true;
  }

  function checkContentValidation(value) {
    if (!value) {
      //유효성 검사 실패 로직
      content.focus();
      alert("컨텐츠를 입력해주세요");
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

  //ajax 메소드 모음
  function saveRouteAjax(data) {
    return $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/route/saveRoute",
      data: JSON.stringify(data),
      beforeSend: setRequestHeader
    });
  }

  function saveCourseAjax(formData) {
    // < 2.DB에 코스 임시저장
    return $.ajax({
      type: "POST",
      url: "/api/route/saveCourse",
      processData: false,
      contentType: false,
      data: formData,
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

  // Kakao Map
  let markers, mapContainer, mapOption, map, ps, infowindow;

  $("#kakaoMapModal").on("shown.bs.modal", function() {
    $("#keyword").val($("#place").val()); // 검색 키워드 가져오기
    // 마커를 담을 배열
    markers = [];

    mapContainer = document.getElementById("kakaoMapDiv"); // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    // 지도를 생성
    map = new kakao.maps.Map(mapContainer, mapOption);
    // 장소 검색 객체를 생성
    ps = new kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    infowindow = new kakao.maps.InfoWindow({
      zIndex: 1
    });
    // 키워드로 장소를 검색
    searchPlaces();
  });

  // 키워드 검색을 요청하는 함수
  function searchPlaces() {
    var keyword = document.getElementById("keyword").value;
    console.log(keyword);

    // 유효성 검사
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청
    ps.keywordSearch(keyword, placesSearchCB);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출
      displayPlaces(data);
      // 페이지 번호를 표출
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수
  function displayPlaces(places) {
    var listEl = document.getElementById("placesList");
    var menuEl = document.getElementById("menu_wrap");
    var fragment = document.createDocumentFragment();
    var bounds = new kakao.maps.LatLngBounds();
    var listStr = "";

    // 검색 결과 목록에 추가된 항목들을 제거
    removeAllChildNods(listEl);
    // 지도에 표시되고 있는 마커를 제거
    removeMarker();

    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시
      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
      var marker = addMarker(placePosition, i);
      var itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가
      bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우에 장소명을 표시
      // mouseout 했을 때는 인포윈도우를 닫음
      (function(marker, title) {
        kakao.maps.event.addListener(marker, "mouseover", function() {
          displayInfowindow(marker, title);
        });
        kakao.maps.event.addListener(marker, "mouseout", function() {
          infowindow.close();
        });
        itemEl.onmouseover = function() {
          relayout();
          displayInfowindow(marker, title);
        };
        itemEl.onmouseout = function() {
          infowindow.close();
        };
        itemEl.onclick = function() {
          $("#place").val(title);
          setRouteContent({
            lat: +marker.getPosition().getLat(),
            lng: +marker.getPosition().getLng()
          });

          // $('#lat').val(marker.getPosition().getLat());
          // $('#lng').val(marker.getPosition().getLng());
          $("#kakaoMapModal").modal("hide");
        };
      })(marker, places[i].place_name);
      fragment.appendChild(itemEl);
    }
    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    map.setBounds(bounds);
  }

  // 검색결과 항목을 Element로 반환하는 함수
  function getListItem(index, places) {
    var el = document.createElement("li");
    var itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      "   <h5>" +
      places.place_name +
      "</h5>";

    if (places.road_address_name) {
      itemStr +=
        "    <span>" +
        places.road_address_name +
        "</span>" +
        '   <span class="jibun gray">' +
        places.address_name +
        "</span>";
    } else {
      itemStr += "    <span>" + places.address_name + "</span>";
    }
    itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

    el.innerHTML = itemStr;
    el.className = "item";

    return el;
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수
  function addMarker(position, idx, title) {
    // 마커, 이미지, url, 스프라이트 이미지
    var imageSrc =
      "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    // 마커 이미지의 크기
    var imageSize = new kakao.maps.Size(36, 37);
    var imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };
    // 마커 이미지 등록
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    var marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage // 마커 이미지
    });
    marker.setMap(map); // 지도 위에 마커를 표출
    markers.push(marker); // 배열에 생성된 마커를 추가

    return marker;
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = []; // 마커값 초기화
  }

  // 검색결과 목록 하단에 페이지번호를 표시는 함수
  function displayPagination(pagination) {
    var paginationEl = document.getElementById("pagination");
    var fragment = document.createDocumentFragment();
    var i;

    // 기존에 추가된 페이지번호를 삭제
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }
    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = (function(i) {
          return function() {
            pagination.gotoPage(i);
          };
        })(i);
      }
      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
  // 인포윈도우에 장소명을 표시
  function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

    infowindow.setContent(content);
    infowindow.open(map, marker);
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

  function relayout() {
    // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있음
    // 크기를 변경한 이후에는 반드시 map.relayout 함수를 호출해야함
    // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됨
    map.relayout();
  }

  // Google Map
  // 검색 버튼 클릭하면 Google Map 모달창 실행
  $("#searchBtn").on("click", function() {
    $("div#googleMapModal").modal();
  });

  // 모달창 이벤트 등록 -> myMap() 함수 호출, 동적 생성된 엘리먼트 삭제 연계
  $("div#googleMapModal").on("shown.bs.modal", function() {
    myMap();
  });

  // 모달창이 hide 되면 실행
  $("div#googleMapModal").on("hidden.bs.modal", function() {
    $("#googleMapDiv").empty();
    $("<input/>", {
      id: "pac-input",
      class: "controls",
      type: "text",
      placeholder: "Search Box",
      style: "width: 230px;"
    }).appendTo($(".google-modal-body"));
  });

  function myMap() {
    // 검색 키워드 가져오기
    $("#pac-input").val($("#place").val());
    // 구글 맵 생성
    var map = new google.maps.Map(document.getElementById("googleMapDiv"), {
      // 기본 좌표
      center: {
        lat: -33.8688,
        lng: 151.2195
      },
      zoom: 13,
      mapTypeId: "roadmap"
    });
    var input = document.getElementById("pac-input");
    // 입력받은 키워드로 검색하기
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });
    var markers = [];

    // 검색 데이터 맵에 추가
    searchBox.addListener("places_changed", function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        // 마커 아이콘 생성 (없으면 기본 마커)
        /*
         * var icon = { url: place.icon, size: new
         * google.maps.Size(71, 71), origin: new
         * google.maps.Point(0, 0), anchor: new
         * google.maps.Point(17, 34), scaledSize: new
         * google.maps.Size(25, 25) };
         */
        markers.push(
          new google.maps.Marker({
            map: map,
            /* icon: icon, */
            title: place.name,
            position: place.geometry.location
          })
        );
        // 인포윈도우
        var infoWindow = new google.maps.InfoWindow({
          content:
            "<h2>" +
            place.name +
            "</h2><p>" +
            place.geometry.location.lat() +
            '</p><button id="checkBtn">확인</button>'
        });
        console.log(markers);
        // 마커 클릭 이벤트
        markers[0].addListener("click", function() {
          // infoWindow.open(map, this);
          $("#place").val(place.formatted_address);
          $("#lat").val(place.geometry.location.lat());
          $("#lng").val(place.geometry.location.lng());

          setRouteContent({
            place: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });

          $("#googleMapModal").modal("hide");
        });
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      $("#place").val($("#pac-input").val());
      map.fitBounds(bounds);
    });
  }
});

function getJSONfromQueryString() {
  let qs = location.search.slice(1).split("%");
  const obj = {};
  qs.forEach(q => {
    q = q.split("=");
    obj[q[0]] = decodeURIComponent(q[1] || "");
  });
  return JSON.parse(JSON.stringify(obj));
}

function addSameEvent(event, handler, ...targets) {
  targets.forEach(target => {
    target.addEventListener(event, handler);
  });
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
//
//
//
//
//
//
//
//
//

// 카카오맵
function kakaoMap(flightPlanCoordinates) {
  var container = document.getElementById("map");
  var options = {
    center: new kakao.maps.LatLng(
      flightPlanCoordinates[0]["lat"],
      flightPlanCoordinates[0]["lng"]
    ),
    level: 3
  };
  var map = new kakao.maps.Map(container, options);
  var linePath = [];

  // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시
  for (var i = 0; i < flightPlanCoordinates.length; i++) {
    linePath.push(
      new kakao.maps.LatLng(
        flightPlanCoordinates[i]["lat"],
        flightPlanCoordinates[i]["lng"]
      )
    );
  }

  /*
   * // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시 var linePath = [ new
   * kakao.maps.LatLng(33.452344169439975, 126.56878163224233), new
   * kakao.maps.LatLng(33.452739313807456, 126.5709308145358), new
   * kakao.maps.LatLng(33.45178067090639, 126.5726886938753) ];
   */

  // 지도에 표시할 선을 생성
  var polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열
    strokeWeight: 10, // 선의 두께
    strokeColor: "#00FA9A", // 선의 색깔
    strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명
    strokeStyle: "solid" // 선의 스타일
  });

  var positions = [];

  // 마커를 표시할 위치와 title 배열
  for (var i = 0; i < linePath.length; i++) {
    positions.push({ latlng: linePath[i] });
  }

  // 마커를 표시할 위치와 title 배열
  /*
   * var positions = [ { title: '카카오', latlng: new
   * kakao.maps.LatLng(33.452344169439975, 126.56878163224233) }, { title:
   * '생태연못', latlng: new kakao.maps.LatLng(33.452739313807456,
   * 126.5709308145358) }, { title: '텃밭', latlng: new
   * kakao.maps.LatLng(33.45178067090639, 126.5726886938753) } ];
   */

  for (var i = 0; i < positions.length; i++) {
    /*
     * // 마커 이미지의 이미지 크기 var imageSize = new kakao.maps.Size(24, 35);
     *  // 마커 이미지를 생성 var markerImage = new kakao.maps.MarkerImage(imageSrc,
     * imageSize);
     */

    // 마커를 생성
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng // 마커를 표시할 위치
      // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
      /* image : markerImage // 마커 이미지 */
    });
  }

  // 지도에 선을 표시합니다
  polyline.setMap(map);
}

// RouteView GoogleMap 마커 경로 표시
// callback 함수
function googleMap(flightPlanCoordinates) {
  console.log(flightPlanCoordinates[0]["lat"]);
  // 구글 지도 생성
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {
      lat: flightPlanCoordinates[0]["lat"],
      lng: flightPlanCoordinates[0]["lng"]
    },
    mapTypeId: "satellite" // 'roadmap'
  });

  // 장소 위치들 저장
  /*
   * var flightPlanCoordinates = [ {lat: 37.772, lng: -122.214}, {lat: 21.291,
   * lng: -157.821}, {lat: -18.142, lng: 178.431}, {lat: -27.467, lng:
   * 153.027} ];
   */
  var markers = [];

  // 마커 생성
  for (var i = 0; i < flightPlanCoordinates.length; i++) {
    markers.push(
      new google.maps.Marker({
        position: flightPlanCoordinates[i],
        map: map
      })
    );
  }
  // 마커 이미지 커스텀
  /*
   * markers.push(new google.maps.Marker({ map : map, /* icon: icon,
   */
  /*
   * title : place.name, position : place.geometry.location }));
   */

  // 마커들을 선을 경로 표시
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#00FA9A",
    strokeOpacity: 0.5,
    strokeWeight: 10
  });

  // 맵에 마커 뿌림
  markers.forEach(function(marker) {
    marker.setMap(map);
  });
  // 마커들 경로 표시
  flightPath.setMap(map);
}
