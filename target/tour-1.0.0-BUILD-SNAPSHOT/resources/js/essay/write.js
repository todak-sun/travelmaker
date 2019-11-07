const setting = {
  summernote: {
    placeholder: '내용',
    airMode: true,
    lang: 'ko-KR',
    popover: {
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
      link: [['link', ['linkDialogShow', 'unlink']]],
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
      ],
      air: [
        ['color', ['color']],
        ['font', ['bold', 'underline', 'clear']],
        ['para', ['ul', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'map']]
      ]
    },
    map: {
      apiKey: 'AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY',
      center: {
        lat: -33.8688,
        lng: 151.2195
      },
      zoom: 13
    }
  },
  G_KEY: 'AIzaSyCeKdfxBMTEBPFzc4QjjrIJJv25EuWL4gY',
  G_MAP: {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: 'roadmap',
    fullscreenControl: false,
    mapTypeControl: false
  }
};

$(function() {
  let hashes = [];
  let rno;

  const $editor = $('#editor');
  const $modal = $('.modal');

  const [
    title,
    btnImage,
    btnMap,
    btnVideo,
    btnHashtag,
    btnBreakLine,
    btnSaveTmp,
    boxHashTag,
    btnUploadMainImg,
    imgBackground,
    inputFileUpload,
    btnSave
  ] = getEls(
    document,
    '#title',
    '#btn-image',
    '#btn-map',
    '#btn-video',
    '#btn-hashtag',
    '#btn-breakline',
    '#btn-save-tmp',
    '#box-hashtag',
    '#btn-upload-mainimg',
    '#img-background',
    '#input-file-upload',
    '#btn-save'
  );

  btnUploadMainImg.addEventListener('click', btnUploadMainImgHandler);
  inputFileUpload.addEventListener('change', inputFileUploadHandler);
  btnImage.addEventListener('click', btnImageHandler);
  btnMap.addEventListener('click', btnMapHandler);
  btnVideo.addEventListener('click', btnVideoHandler);
  btnHashtag.addEventListener('click', btnHahstagHandler);
  btnBreakLine.addEventListener('click', btnBreakLineHandler);
  btnSave.addEventListener('click', btnSaveHandler);
  btnSaveTmp.addEventListener('click', btnSaveTmpHandler);

  function btnSaveTmpHandler(e) {
    if (!rno) {
      save(getData())
        .then((ret) => {
          rno = +ret;
          console.log('임시저장');
        })
        .catch(console.error);
    } else {
      saveTmp(getData())
        .then((ret) => console.log('임시저장'))
        .catch(console.error);
    }
  }

  function btnSaveHandler(e) {
    if (!rno) {
      save(getData())
        .then((ret) => {
          rno = +ret;
          return saveFixed(getData());
        })
        .then((ret) => console.log('저장완료'))
        .catch(console.error);
    } else {
      saveFixed(getData())
        .then((ret) => console.log('저장완료'))
        .catch(console.error);
    }
  }

  //   {
  //     "bno": 1,
  //     "rno": 1,
  //     "seq": 1,
  //     "title": null,
  //     "likes": 0,
  //     "views": 0,
  //     "hashtag": null,
  //     "dateWrite": "2019-11-07 03:14:03.0",
  //     "dateUpdate": "2019-11-07 03:14:03.0",
  //     "cmt": 0,
  //     "content": "<p><br></p>",
  //     "fixed": 0,
  //     "isDomestic": 1
  // },

  getTmpEssay(1).then((essayTmps) => {
    essayTmps.forEach((essay) => {
      const { title, dateUpdate } = essay;
      console.log('제목', title || '제목없음');
      console.log('최근 수정일', dateUpdate);
    });
  });

  function btnVideoHandler(e) {
    $editor.summernote('videoDialog.show');
  }

  function btnHahstagHandler(e) {
    const titleContent = '해쉬태그';
    const bodyContent = getTemplateHashModal();
    setModal($modal, titleContent, bodyContent);
    $modal.modal('show');
    initHashtag();
  }

  function btnBreakLineHandler(e) {
    const hr = document.createElement('hr');
    $editor.summernote('insertNode', hr);
  }

  function btnMapHandler(e) {
    $editor.summernote('saveRange');
    const titleContent = '지도검색';
    const bodyContent = getTemplateMapModal();
    setModal($modal, titleContent, bodyContent);
    $modal.modal('show');

    if (confirm('다음은 O, 구글은 X')) initMap();
    else initGoogleMap();
  }

  function btnUploadMainImgHandler(e) {
    inputFileUpload.click();
  }

  function inputFileUploadHandler(e) {
    if (!rno) {
      save(getData())
        .then((ret) => {
          rno = +ret;
          console.log(rno);
          return deleteMainImage(rno);
        })
        .then(() => {
          let formData = new FormData();
          formData.append('file', this.files[0]);
          formData.append('rno', rno);
          return saveMainImage(formData);
        })
        .then((ret) => {
          console.log(ret);
          imgBackground.style.setProperty(
            'background-image',
            'url(../../../resources/storage/essay/' + ret + ')'
          );
        })
        .catch(console.error);
    } else {
      deleteMainImage(rno)
        .then(() => {
          let formData = new FormData();
          formData.append('file', this.files[0]);
          formData.append('rno', rno);
          return saveMainImage(formData);
        })
        .then((ret) => {
          console.log(ret);
          imgBackground.style.setProperty(
            'background-image',
            'url(../../../resources/storage/essay/' + ret + ')'
          );
        });
    }
  }

  function btnImageHandler(e) {
    $editor.summernote('imageDialog.show');
  }

  function initHashtag() {
    const [contentHashtag, inputHashtag, btnAddHashtag, btnAddAtModal] = getEls(
      document,
      '#content-hashtag',
      '#hashtag',
      '#btn-add-hashtag',
      '#add-at-modal'
    );

    if (hashes.length) {
      hashes.forEach(setHashContent);
    }

    btnAddHashtag.addEventListener('click', function(e) {
      if (!inputHashtag.value) return;
      hashes.push(inputHashtag.value);

      if (hashes.length) {
        contentHashtag.innerHTML = '';
        hashes.forEach(setHashContent);
      }
      inputHashtag.value = '';
      inputHashtag.focus();
    });

    btnAddAtModal.addEventListener('click', function(e) {
      $modal.modal('hide');
      let hashText = '';
      hashes.forEach((hash) => {
        hashText += '#' + hash + ' ';
      });
      boxHashTag.innerText = hashText;
    });

    function setHashContent(hash) {
      const btn = createHashButton(hash);
      btn.addEventListener('click', function(e) {
        hashes = hashes.filter((hash) => hash !== this.innerText.slice(1));
        this.remove();
      });
      contentHashtag.appendChild(btn);
    }

    function createHashButton(hashValue) {
      const btn = document.createElement('button');
      btn.classList.add('btn');
      btn.classList.add('btn-outline-primary');
      btn.appendChild(document.createTextNode('#' + hashValue));
      return btn;
    }
  }

  //에디터 세팅
  $editor.summernote({
    ...setting.summernote,
    callbacks: {
      onInit: function() {
        title.focus();
      }
    }
  });

  function initMap() {
    let markers = [];
    const mapContainer = document.querySelector('#map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    const [keyword, btnSearchByKeyword] = getEls(
      document,
      '#keyword',
      '#btn-keyword-search'
    );

    btnSearchByKeyword.addEventListener('click', searchPlaces);

    const map = new kakao.maps.Map(mapContainer, mapOption); //지도생성
    const ps = new kakao.maps.services.Places(); //장소검색
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); //인포윈도우

    function searchPlaces() {
      if (!keyword.value.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
      }
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword.value, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);
        // 페이지 번호를 표출합니다
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      var listEl = document.getElementById('placesList'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(
            placePosition,
            i,
            places[i].road_address_name
              ? places[i].road_address_name
              : places[i].address_name
          ),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        (function(marker, title) {
          const btnAddMap = itemEl.querySelector('.btn-add-map');

          kakao.maps.event.addListener(marker, 'mouseover', function() {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });

          kakao.maps.event.addListener(marker, 'click', function() {});

          itemEl.onmouseover = function() {
            displayInfowindow(marker, title);
            btnAddMap.classList.remove('hide');
          };

          itemEl.onmouseout = function() {
            infowindow.close();
            btnAddMap.classList.add('hide');
          };

          //버튼에 이벤트 추가.
          btnAddMap.addEventListener('click', function(e) {
            let lat = marker.getPosition().getLat();
            let lng = marker.getPosition().getLng();
            let description = marker.getTitle();

            let staticMapContainer = document.querySelector('#map-container');
            //정적마커의 옵션
            let markerPosition = new kakao.maps.LatLng(lat, lng);
            let staticMarker = { position: markerPosition, text: title };
            let staticMapOption = {
              center: new kakao.maps.LatLng(lat, lng),
              level: 3,
              marker: staticMarker
            };
            new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

            let link = staticMapContainer.querySelector('a').href;
            let imgUrl = staticMapContainer.querySelector('img').src;

            $modal.modal('hide');
            $editor.summernote('restoreRange');
            $editor.summernote(
              'insertNode',
              createStaticMap(link, imgUrl, description)
            );
            staticMapContainer.innerHTML = '';
          });
        })(marker, places[i].place_name);
        fragment.appendChild(itemEl);
      }
      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      listEl.appendChild(fragment);

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      let el = document.createElement('li'),
        itemStr = `
                    <div class="box-place">
                      <h6 class="place-name">
                      ${places.place_name}
                      </h6>
                   `;
      if (places.road_address_name) {
        itemStr += `
                    <span class="place-addr">
                    ${places.road_address_name}
                    </span>
                   `;
      } else {
        itemStr += `
                    <span class="place-addr">
                    ${places.address_name}
                    </span>
                   `;
      }
      itemStr += `<button class="btn-add-map hide">추가</button></div>`;

      el.innerHTML = itemStr;
      el.classList.add('list-group-item');

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      let marker = new kakao.maps.Marker({
        position: position // 마커의 위치
      });
      marker.setTitle(title);
      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다
      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var li = document.createElement('li');
        li.className = 'page-item';

        var el = document.createElement('a');
        el.className = 'page-link';
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          li.classList.add('active');
        } else {
          el.onclick = (function(i) {
            return function() {
              pagination.gotoPage(i);
            };
          })(i);
        }
        li.appendChild(el);
        fragment.appendChild(li);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  }

  //구글맵 초기화 담당
  function initGoogleMap() {
    //마커를 보관하는 변수
    let markers = [];
    let infowindows = [];
    let infowindow;
    let searchBox;

    let map = new google.maps.Map(
      document.getElementById('map'),
      setting.G_MAP
    );

    // input태그를 잡아와서 search box로 만드는 부분.
    let input = document.getElementById('keyword');
    searchBox = new google.maps.places.SearchBox(input);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    //검색결과 중 하나 또는 그 이상을 선택 할 경우 아래의 이벤트를 실행.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      //기존 마커를 모두 날림.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      var bounds = new google.maps.LatLngBounds();

      places.forEach(function(place) {
        if (!place.geometry) {
          return;
        }

        //마커 생성
        let marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        });

        //마커 이벤트
        marker.addListener('click', function() {
          //기존 infowindow를 모두 닫음
          infowindows.forEach((info) => {
            info.close();
          });
          //infowindow를 빈 배열로 초기화.
          infowindows = [];

          infowindow = new google.maps.InfoWindow({
            content: getTemplateInfowindow(place.name, place.formatted_address)
          });

          google.maps.event.addListener(infowindow, 'domready', function() {
            document
              .querySelector('#btn-add-map')
              .addEventListener('click', function(e) {
                let lat = place.geometry.location.lat();
                let lng = place.geometry.location.lng();
                let width = 750;
                let height = 350;
                let link = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                let imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=${width}x${height}&markers=color:red%7C${lat},${lng}&key=${setting.G_KEY}`;

                $modal.modal('hide');
                $editor.summernote('restoreRange');
                $editor.summernote(
                  'insertNode',
                  createStaticMap(link, imgUrl, place.formatted_address)
                );
              });
          });
          infowindow.open(map, marker);
          infowindows.push(infowindow);
        });

        markers.push(marker);

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  //유틸메소드 모음
  function getTemplateStaticMap(link, imgUrl, description) {
    return `
    <a href="${link}">
      <img src="${imgUrl}"/>
    </a>
    <p>${description}</p>`;
  }

  function getTemplateMapModal() {
    return `
    <div class="row">
      <div class="col col-sm-3 bg-light" style="padding:0">
          <div class="input-group">
              <input type="text" id="keyword" class="form-control"/>
              <button id="btn-keyword-search">검색</button>
          </div>
          <ul id="placesList" class="list-group list-group-flush" style="height:350px;overflow-y:auto;padding:0;">
          </ul>
          <ul id="pagination" class="pagination"></ul>
      </div>
      <div id="map" class="col col-sm-9"></div>
    </div>
    `;
  }

  function getTemplateHashModal() {
    return `
    <div>
        <div class="input-group">
          <input id="hashtag" type="text" class="form-control"/>
          <button id="btn-add-hashtag">추가</button>
        </div>
        <div id="content-hashtag" class="form-control"></div>
    </div>
    `;
  }

  function getTemplateInfowindow(place, address) {
    return `<div>
              지명 : ${place}
              주소 : ${address}
              <button id="btn-add-map">추가</button>
            </div>`;
  }

  function createStaticMap(link, imgUrl, description) {
    let frag = document.createDocumentFragment();
    let div = document.createElement('div');
    div.innerHTML = getTemplateStaticMap(link, imgUrl, description);
    frag.appendChild(div);
    return frag;
  }

  function getEls(parent, ...targets) {
    let els = [];
    targets.forEach((target) => els.push(parent.querySelector(target)));
    return els;
  }

  function setModal($modal, titleContent, bodyContent) {
    const modal = $modal[0];
    const [title, body] = getEls(modal, '.modal-title', '.modal-body');
    title.innerHTML = titleContent;
    body.innerHTML = bodyContent;
  }

  function getJSONfromQueryString() {
    let qs = location.search.slice(1);
    qs = qs.split('&');

    const obj = {};
    qs.forEach((q) => {
      q = q.split('=');
      obj[q[0]] = decodeURIComponent(q[1] || '');
    });
    return JSON.parse(JSON.stringify(obj));
  }

  function getData() {
    return {
      seq: 1,
      title: title.value,
      hashtag: hashes.join(','),
      content: $editor.summernote('code'),
      fixed: 0,
      isDomestic: +getJSONfromQueryString().isDomestic
    };
  }

  //ajax호출 모음
  function save(data) {
    return $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      url: 'http://localhost:8080/api/essay'
    });
  }

  function saveFixed(data) {
    data = {
      ...data,
      rno,
      fixed: 1
    };
    return $.ajax({
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'text',
      url: 'http://localhost:8080/api/essay'
    });
  }

  function saveTmp(data) {
    return $.ajax({
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ ...data, rno, fixed: 0 }),
      dataType: 'text',
      url: 'http://localhost:8080/api/essay'
    });
  }

  function getTmpEssay(seq) {
    return $.ajax({
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: 'http://localhost:8080/api/essaytmp/' + seq
    });
  }

  function deleteEssay(rno) {
    return $.ajax({
      type: 'DELETE',
      contentType: 'application/json',
      dataType: 'json',
      url: 'http://localhost:8080/api/essay/' + rno
    });
  }

  function deleteMainImage(rno) {
    return $.ajax({
      url: 'http://localhost:8080/upload/img/' + rno,
      type: 'DELETE'
    });
  }

  function saveMainImage(formData) {
    return $.ajax({
      url: 'http://localhost:8080/upload/img',
      type: 'POST',
      processData: false,
      contentType: false,
      data: formData
    });
  }
});
