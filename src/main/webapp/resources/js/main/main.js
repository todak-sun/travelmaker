$(function () {
    const {getEl, addEvent, getElList, addAllSameEvent} = new travelmaker.utils();
    const ajax = new travelmaker.ajax();

    //엘리먼트
    const storyGroup = getEl('.story-group');
    const friendGroup = getEl('.friend-group');
    const purchaseGroup = getEl('.pur-group');
    const seq = getEl('#seq');

    ajax.getMainList("")
        .then(ret => {
            const {purchase, friends, story} = ret;

            console.log('story', story);
            console.log('friends', friends);
            console.log('purchase', purchase);

            const $storyFrag = $(document.createDocumentFragment());
            const $friendsFrag = $(document.createDocumentFragment());
            const $purchaseFrag = $(document.createDocumentFragment());

            // bno: 10
            // cmt: 1
            // dateUpdate: "2019-12-06 08:19:06.0"
            // dateWrite: "2019-12-06 08:18:46.0"
            // fileName: "2c9cda80-f6df-46aa-b097-8faee293ffcc.txt"
            // fixed: 1
            // hashtag: "푸켓,방콕,너무좋아"
            // imageName: "https://travelmaker-bucket.s3.ap-northeast-2.amazonaws.com/essay/2019-12-06T17:18:46.160_eb56f1c2-4d85-4071-9d1c-e3a4410942ec.jpg"
            // imgProfile: "https://travelmaker-bucket.s3.ap-northeast-2.amazonaws.com/profile/2019-12-06T14:35:21.197_24d65046-1dcc-4596-a342-4cd2657a8197.png"
            // isDomestic: 0
            // likes: 0
            // nickname: "용주카카오"
            // rno: 10
            // seq: 3
            // title: "좋은 곳에 다녀왔습니다. "
            // views: 0

            story.forEach(st => {
                const {title, imageName, fileName, rno} = st;
                const link = fileName ? '/essay/view/' + rno : '/route/view/' + rno;
                $storyFrag.append(`
                  <li>
                     <div class="story-item">
                         <div class="img-wrap">
                            <img src="${imageName}" alt="${title}의 대표이미지">
                         </div>
                          <div class="story-title">
                            <a href="${link}">${title}</a>
                          </div>
                     </div>
                  </li>
              `);
            });
            storyGroup.appendChild($storyFrag[0]);

            // CITY: "북한산둘레길 구름정원길8구간"
            // DATEEND: "2019-12-20"
            // DATESTART: "2019-12-13"
            // DATE_OF_ISSUE: "2019-12-06"
            // FCNO: 7
            // FNO: 11
            // GRADE: 0
            // ID: "tjsdydwn2@nate.com"
            // IMGPROFILE: "https://travelmaker-bucket.s3.ap-northeast-2.amazonaws.com/profile/2019-12-06T14:35:21.197_24d65046-1dcc-4596-a342-4cd2657a8197.png"
            // IS_DOMESTIC: "1"
            // IS_FINISH: 0
            // IS_NORMAL: 0
            // KAKAO_CHAT: "sdfsdf"
            // NICKNAME: "용주카카오"
            // REQUEST_COUNT: 0
            // RN: 1
            // SEQ: 3
            // TITLE: "hf"
            // WARN: 0

            friends.forEach(fr => {
                const {TITLE, CITY, DATESTART, DATEEND, FNO} = fr;
                const link = '/friend/view/' + FNO;
                $friendsFrag.append(`
                    <li>
                        <div class="friend-item">
                          <div class="banner">
                            <div class="location">${CITY}</div>
                          </div>
                
                          <div class="body">
                            <div class="date">
                              <span class="from">${DATESTART}</span>
                              ~
                              <span class="to">${DATEEND}</span>
                            </div>
                            <div class="title">
                              <h3>${TITLE}</h3>
                            </div>
                            <div class="button-wrap">
                              <a class="friend-link" href="${link}">상세보기</a>
                            </div>
                          </div>
                        </div>
                    </li>
                `);
            });
            friendGroup.appendChild($friendsFrag[0]);

        // <li>
        //     <div class="friend-item">
        //         <div class="friend-title">
        //         <div class="friend-info">
        //         <p class="location">${CITY}</p>
        //         <p class="date">${DATESTART} ~ ${DATEEND}</p>
        //         </div>
        //         <h3>${TITLE}</h3>
        //         </div>
        //         <div class="friend-bottom">
        //         <a class="friend-link" href="${link}">상세보기</a>
        //         </div>
        //         </div>
        //         </li>

            const friendLinkList = getElList('a.friend-link');
            addAllSameEvent(friendLinkList, 'click', (e) => {
                e.preventDefault();
                if (!seq) return getEl('.btn.btn-login').click();
                return location.href = e.target.href;
            });
            // BNO: 6
            // CON: 1
            // CONTENT: "ㅎㅇ"
            // DATEEND: "2019-12-22"
            // DATESTART: "2019-12-22"
            // DATEWRITE: "2019-12-06"
            // IMG: "https://travelmaker-bucket.s3.ap-northeast-2.amazonaws.com/purchase/2019-12-06T17:37:21.292_e4a379f2-368b-4400-8a91-6719eabf0511."
            // LOCATION: "제주도"
            // NICKNAME: "용주그냥회원가입"
            // PRICE: 18000
            // PRODUCTNAME: "귤"/*/
            // QUANTITY: 1
            // REQUESTUSERSEQ: 0
            // RN: 1
            // TITLE: "제주도 귤 먹고싶어요"
            // WRITEUSERSEQ: 13
            purchase.forEach(pur => {
                const {CON, LOCATION, TITLE, BNO, IMG, PRODUCTNAME} = pur;
                $purchaseFrag.append(`
                    <li>
                      <div class="pur-item ${CON === 1 ? 'to-request' : 'to-buy'}">
                        <span class="badge">${CON === 1 ? '사 주세요!' : '사 줄게요!'}</span>
                        <div class="item-top">
                          <h3>${TITLE}</h3>
                        </div>
                        <div class="item-bottom">
                          <p class="location">${LOCATION}</p>
                          ${CON === 1 ? `<p class="product">${PRODUCTNAME}</p>` : ''}
                          <a href="/pur/view/${CON}/${BNO}">보러가기</a>
                        </div>
                      </div>
                    </li>
                `);
            });
            purchaseGroup.appendChild($purchaseFrag[0]);


        })
        .catch(console.error);
});