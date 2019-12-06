$(function(){
  const {getEl, addEvent} = new travelmaker.utils();
  const ajax = new travelmaker.ajax();

  //엘리먼트
  const storyGroup = getEl('.story-group');
  const friendGroup = getEl('.friend-group');
  const purchaseGroup = getEl('.purchase-group');

  ajax.getMainList("")
      .then(ret => {
          const {purchase, friends, story} = ret;

          console.log('story', story);
          console.log('friends', friends);
          console.log('purchase', purchase);

          const $storyFrag = $(document.createDocumentFragment());
          const $friendsFrag = $(document.createDocumentFragment());
          const $purchaseFrag = $(document.createDocumentFragment());

          story.forEach(st => {
              const {title, imageName, } = st;
              $storyFrag.append(`
                  <li>
                      <img src="${imageName}" alt="">
                      <h2>${title}</h2>
                  </li>
              `);
          });
          storyGroup.appendChild($storyFrag[0]);

          friends.forEach(fr => {
              $friendsFrag.append()
          });

          purchase.forEach(pur => {
              $purchaseFrag.append()
          });



      })
      .catch(console.error);
});