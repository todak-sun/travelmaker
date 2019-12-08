$(function () {
    const {getEl, getElList, addEvent, addAllSameEvent, showLoading, closeLoading, useState, getFormData} = new travelmaker.utils();
    const ajax = new travelmaker.ajax();
    const t = new travelmaker.template();
    const v = new travelmaker.validation();
    const h = new travelmaker.handler();
    const cash = new travelmaker.Cash();
    const alarm = new travelmaker.alarm(new SockJS('/echo'));

    const modal = new travelmaker.modal('#modal');

    const seq = +getEl('#seq').value;
    const nickname = getEl('#nickname').value;
    const mainWrap = getEl('.main-wrap');
    const menuList = getElList('.menu-group li a');

    const [setUserData, getUserData] = useState({});

    addAllSameEvent(menuList, 'click', function (e) {
        console.log(e.target.dataset.page);
        menuList.forEach(menu => menu.classList.remove('on'));
        this.classList.add('on');

        switch (this.dataset.page) {
            case 'my-article' :
                return initMyArticle();
            case 'my-info' :
                return initMyInfo();
            case 'my-alarm' :
                return initInfoAlarm();
            case 'my-payment' :
                return initPayment();
            default :
                throw new Error('뭔데');
        }
    });

    initOnLoad();

    function initOnLoad() {
        initMyArticle();
    }

    function initPayment() {
        mainWrap.innerHTML = '';
        $(mainWrap).append(t.myPayment());
        const tableHead = getEl('.table-head');
        const tableContent = getEl('.table-content');
        const lnbList = getElList('.lnb-my-article ul li a');

        addAllSameEvent(lnbList, 'click', function (e) {
            lnbList.forEach(menu => menu.classList.remove('on'));
            this.classList.add('on');

            switch (this.dataset.page) {
                case  'payment-wait' :
                    return initWait();
                case  'payment-ing' :
                    return initIng();
                case 'payment-finish' :
                    return initFinish();
            }
        });

        initWait();

        function initWait() {
            resetTable();
            showLoading();
            $(tableHead).append(t.paymentWaitHead());

            ajax.getListPayment(seq, 0, 0).then(ret => {
                closeLoading();
                const $frag = $(document.createDocumentFragment());
                ret.forEach(payment => $frag.append(t.paymentWaitBody(seq, payment)));
                tableContent.appendChild($frag[0]);

                const btnPayList = getElList('.btn-pay');
                const btnPurCancleList = getElList('.btn-pur-cancel');
                addAllSameEvent(btnPurCancleList, 'click', function () {
                    if (confirm('해당 거래를 취소하시겠습니까?')) {
                        ajax.deletePayment(this.dataset.cno)
                            .then(ret => {
                                if (ret === 'ok') {
                                    alert('해당 거래를 취소하였습니다.');
                                    initWait();
                                }
                            }).catch(console.error);
                    }

                });
                addAllSameEvent(btnPayList, 'click', function () {
                    const dataset = this.parentElement.dataset;
                    cash.requestPay('kakaopay', dataset.productname, dataset.total, dataset.buyer_name)
                        .then(ret => {
                            if (ret.success)
                                return ajax.updatePayment({cno: dataset.cno, requestUserCheck: 1, sellerCheck: 0});
                        })
                        .then(ret => {
                            if (ret === 'ok') {
                                alarm.send('cash', {username: nickname, cno: dataset.cno, seq: seq, status: "pay"});
                                return initWait();
                            }
                        })
                        .catch(console.error);
                });


            })
        }

        function initIng() {
            resetTable();
            showLoading();
            $(tableHead).append(t.paymentWaitHead());

            ajax.getListPayment(seq, 1, 1)
                .then(ret => {
                    closeLoading();
                    const $frag = $(document.createDocumentFragment());
                    ret.forEach(payment => $frag.append(t.paymentWaitBody(seq, payment)));
                    tableContent.appendChild($frag[0]);

                    const btnCheckPayList = getElList('.btn-check-pay');
                    const btnDeliverList = getElList('.btn-deliver');
                    const btnCheckDeliverList = getElList('.btn-check-deliver');
                    const btnPurCancleList = getElList('.btn-pur-cancel');
                    addAllSameEvent(btnPurCancleList, 'click', function () {
                        if (confirm('해당 거래를 취소하시겠습니까?')) {
                            ajax.deletePayment(this.dataset.cno)
                                .then(ret => {
                                    if (ret === 'ok') {
                                        alert('해당 거래를 취소하였습니다.');
                                        initWait();
                                    }
                                }).catch(console.error);
                        }

                    });
                    addAllSameEvent(btnCheckPayList, 'click', function () {
                        const dataset = this.parentElement.dataset;
                        ajax.updatePayment({cno: dataset.cno, requestUserCheck: 1, sellerCheck: 1})
                            .then(ret => {
                                if (ret === 'ok') {
                                    alarm.send('cash', {
                                        username: nickname,
                                        cno: dataset.cno,
                                        seq: seq,
                                        status: "start"
                                    });
                                    return initIng();
                                }
                            })
                            .catch(console.error);
                    });

                    addAllSameEvent(btnDeliverList, 'click', function () {
                        const dataset = this.parentElement.dataset;
                        ajax.updatePayment({cno: dataset.cno, requestUserCheck: 2, sellerCheck: 1})
                            .then(ret => {
                                if (ret === 'ok') {
                                    alarm.send('cash', {username: nickname, cno: dataset.cno, seq: seq, status: "end"});
                                    return initIng();
                                }
                            })
                            .catch(console.error);
                    });

                    addAllSameEvent(btnCheckDeliverList, 'click', function () {
                        const dataset = this.parentElement.dataset;
                        ajax.updatePayment({cno: dataset.cno, requestUserCheck: 2, sellerCheck: 2})
                            .then(ret => {
                                if (ret === 'ok') {
                                    alarm.send('cash', {
                                        username: nickname,
                                        cno: dataset.cno,
                                        seq: seq,
                                        status: "done"
                                    });
                                    return lnbList[2].click();
                                }
                            })
                            .catch(console.error);
                    });
                })
        }

        function initFinish() {
            resetTable();
            showLoading();
            $(tableHead).append(t.paymentWaitHead());

            ajax.getListPayment(seq, 2, 2)
                .then(ret => {
                    closeLoading();
                    const $frag = $(document.createDocumentFragment());
                    ret.forEach(payment => $frag.append(t.paymentWaitBody(seq, payment)));
                    tableContent.appendChild($frag[0]);

                    const btnPurCancleList = getElList('.btn-pur-cancel');
                    addAllSameEvent(btnPurCancleList, 'click', function () {
                        if (confirm('해당 거래를 취소하시겠습니까?')) {
                            ajax.deletePayment(this.dataset.cno)
                                .then(ret => {
                                    if (ret === 'ok') {
                                        alert('해당 거래를 취소하였습니다.');
                                        initWait();
                                    }
                                }).catch(console.error);
                        }

                    });
                }).catch(console.error);
        }

        function resetTable() {
            tableHead.innerHTML = '';
            tableContent.innerHTML = '';
        }
    }

    function initMyInfo() {
        mainWrap.innerHTML = '';
        $(mainWrap).append(t.register1());
        const miniModal = new travelmaker.modal('#mini-modal');

        const registerMethod = getEl('#registerMethod');
        const realname = getEl('#realname');
        const nickname = getEl('#my-nickname');
        const id = getEl('#id');
        const cpwd = getEl('#cpwd');
        const email1 = getEl('#email1');
        const email2 = getEl('#email2');
        const btnEmailChange = getEl('#btn-email-change');
        const phone1 = getEl('#phone1');
        const phone2 = getEl('#phone2');
        const phone3 = getEl('#phone3');
        const birthdate = getEl('#birthdate');
        const postcode = getEl('#postcode');
        const addr1 = getEl('#addr1');
        const addr2 = getEl('#addr2');
        const customRadios = getElList('.radio-wrap label');
        const imgArea = getEl('.img-area');
        const imgProfile = getEl('#img-profile');
        const contentProfile = getEl('#content-profile');
        const btnChangePwd = getEl('#btn-change-pwd');
        const btnUpdate = getEl('.btn-update');
        const btnWithdraw = getEl('.btn-withdraw');

        addEvent(btnEmailChange, 'click', btnEmailChangeHandler);
        addEvent(email1, 'blur', h.emailHandler);
        addEvent(email2, 'blur', h.emailHandler);
        addEvent(phone1, 'blur', h.phoneHandler);
        addEvent(phone2, 'blur', h.phoneHandler);
        addEvent(phone3, 'blur', h.phoneHandler);
        addEvent(postcode, 'click', () => checkPostCode(postcode, addr1, addr2));
        addEvent(imgArea, 'click', () => imgProfile.click());
        addEvent(imgProfile, 'change', imageChangeHandler);
        addEvent(btnUpdate, 'click', btnUpdateHandler);
        addEvent(nickname, 'blur', nicknameHandler);
        addEvent(btnChangePwd, 'click', btnChangePwdHandler);
        addAllSameEvent(customRadios, 'click', h.customRadioHandler.bind(null, customRadios));

        function btnEmailChangeHandler(e) {
            email1.disabled = false;
            email2.disabled = false;
            this.classList.remove('off');
            this.classList.add('ing');
            this.innerText = '인증';
            email1.focus();

            this.removeEventListener(this, btnEmailChangeHandler);
            addEvent(this, 'click', emailSendHandler);
        }

        function emailSendHandler(e) {
            let changedBtn = this;
            if (!v.isValid(email1)) return email1.focus();
            if (!v.isValid(email2)) return email2.focus();
            showLoading();

            ajax.sendEmailCode(email1.value, email2.value)
                .then(ret => {
                    closeLoading();
                    miniModal.createMini(t.emailConfirm(), h.initEmailConfirmModal.bind(null, changedBtn, ret.emailCode, email1, email2));
                });
        }


        function nicknameHandler(e) {
            let regex = new travelmaker.regex().nickname;
            const [vFeed, ivFeed] = v.getFeedBox(this);
            if (this.value === getUserData().nickname) return v.changeValid(this);
            if (!this.value) return v.setInvalid(this, ivFeed, '닉네임을 입력해주세요.');
            if (!regex.test(this.value)) return v.setInvalid(this, ivFeed, '한글 최대 10자, 영문 20자로 한글, 영문, 숫자만 사용 가능합니다.');
            ajax.checkNickname(this.value)
                .then(ret => {
                    if (ret === 'exist') return v.setInvalid(e.target, ivFeed, '이미 존재하는 닉네임입니다. 다시 입력해주세요.');
                    if (ret === 'not_exist') return v.setValid(e.target, vFeed, '사용 가능한 닉네임입니다.');
                })
                .catch(console.error);
        }

        function btnChangePwdHandler(e) {
            if (!v.isValid(cpwd)) return cpwd.focus();

            modal.createCustom(t.newPassword(), () => {
                const npwd = getEl('#npwd');
                const renpwd = getEl('#renpwd');
                const btnChangeNpwd = getEl('#btn-change-npwd');

                addEvent(npwd, 'blur', v.registerPasswordHandler);
                addEvent(renpwd, 'blur', v.registerRepasswordHandler.bind(null, npwd, renpwd));
                addEvent(btnChangeNpwd, 'click', (e) => {
                    if (!v.isValid(npwd)) return npwd.focus();
                    if (!v.isValid(renpwd)) return renpwd.focus();
                    ajax.changePassword(seq, npwd.value)
                        .then(ret => {
                            if (ret === 'OK') {
                                alert('비밀번호가 성공적으로 변경되었습니다. 변경된 비밀번호로 다시 로그인해주세요.');
                                logoutSubmit();
                            } else {
                                alert('알 수 없는 오류가 발생하였습니다.');
                            }
                        }).catch(console.error)
                })
            })
        }

        addEvent(cpwd, 'blur', (e) => {
            const value = e.target.value;
            const [vFeed, ivFeed] = v.getFeedBox(cpwd);
            ajax.checkPassword({id: id.value, registerMethod: registerMethod.value, pwd: value})
                .then(ret => {
                    if (ret === 'exist') return v.setValid(cpwd, vFeed, '비밀번호가 일치합니다.');
                    if (ret === 'not_exist') return v.setInvalid(cpwd, ivFeed, '비밀번호가 일치하지 않습니다.');
                })
                .catch(console.error);
        });


        function imageChangeHandler(e) {
            const imageFile = this.files[0];
            console.log(imageFile);
            if (!imageFile) return;
            const fr = new FileReader();
            fr.readAsDataURL(imageFile);
            fr.onload = function () {
                imgArea.classList.add('on');
                imgArea.style.backgroundImage = `url(${fr.result})`;
                setUserData({imageFile: imageFile, imgProfile: imageFile.name});
            }
            setUserData({imageFile: imageFile, imgProfile: imageFile.name});
        }


        function btnUpdateHandler(e) {
            if (!v.isValid(cpwd)) return cpwd.focus();
            if (!v.isValid(nickname)) return nickname.focus();
            if (btnEmailChange.classList.contains('ing')) return alert('이메일 인증을 완료해주세요!');
            showLoading();
            setUserData({
                seq: seq,
                id: id.value,
                password: cpwd.value,
                email1: email1.value,
                email2: email2.value,
                phone1: phone1.value,
                phone2: phone2.value,
                phone3: phone3.value,
                gender: +getEl('input[name="gender"]:checked').value,
                postcode: postcode.value,
                addr1: addr1.value,
                addr2: addr2.value,
                contentProfile: contentProfile.value,
                birthdate: birthdate.value,
                realname: realname.value,
                nickname: nickname.value,
                registerMethod: registerMethod.value
            });

            ajax.updateUser(getFormData(getUserData()), seq)
                .then(ret => {
                    closeLoading();
                    alert('정상적으로 수정되었습니다.');
                    initMyInfo();
                }).catch(console.error);
        }


        showLoading();
        ajax.getUser(seq)
            .then(ret => {
                let image = ret.imgProfile === null ? '/resources/img/default-profile-img.jpeg' : ret.imgProfile;
                setUserData({...ret, dateRegist: '1991-11-01'});
                console.log(ret.nickname);
                console.log(nickname);
                registerMethod.value = ret.registerMethod;
                realname.value = ret.realname;
                nickname.value = ret.nickname;
                id.value = ret.id;
                email1.value = ret.email1;
                email2.value = ret.email2;
                phone1.value = ret.phone1;
                phone2.value = ret.phone2;
                phone3.value = ret.phone3;
                let date = new Date(ret.birthdate);
                let month = date.getMonth() + 1;
                birthdate.value = `${date.getFullYear()}-${month >= 10 ? month : '0' + month}-${date.getDate()}`;
                postcode.value = ret.postcode;
                addr1.value = ret.addr1;
                addr2.value = ret.addr2;
                contentProfile.value = ret.contentProfile;
                if (ret.gender) customRadios[1].click();
                else customRadios[0].click();
                // if (ret.imgProfile) {
                imgArea.style.backgroundImage = `url(${image})`;
                imgArea.classList.add('on');
                // }

                closeLoading();
            })
            .catch(console.error);
    }

    function initInfoAlarm() {
        mainWrap.innerHTML = '';
        $(mainWrap).append(t.alarmlist());

        const tableHead = getEl('.table-head');
        const tableContent = getEl('.table-content');
        const lnbList = getElList('.lnb-my-alarm ul li a');

        addAllSameEvent(lnbList, 'click', function (e) {
            lnbList.forEach(menu => menu.classList.remove('on2'));
            lnbList.forEach(menu => menu.classList.remove('on'));
            this.classList.add('on');
            this.classList.add('on2');
            switch (this.dataset.page) {
                case 'allAlarm' :
                    return initAllalarm();
                case 'friend' :
                    return initFriendAlarm();
                case 'purchase' :
                    return initPurchaseAlarm();
                case 'comment':
                    return initCommentAlarm();
                default :
                    throw new Error('뭔데?');
            }
        });
        initAllalarm();

        function initAllalarm() {
            resetTable();
            $(tableHead).append(t.alarmTableHead());

            // 용주형 이거 에이작스 형코드로 리펙토링해도되요 일단해놓은거[기능우선]
            alarmAjax(seq, 1);

        }

        function initFriendAlarm() {
            resetTable();
            $(tableHead).append(t.alarmTableHead());
            alarmAjax(seq, 2);

        }

        function initPurchaseAlarm() {
            resetTable();
            $(tableHead).append(t.alarmTableHead());
            alarmAjax(seq, 3);
        }

        function initCommentAlarm() {
            resetTable();
            $(tableHead).append(t.alarmTableHead());
            alarmAjax(seq, 4);
        }

        function resetTable() {
            tableHead.innerHTML = '';
            tableContent.innerHTML = '';
        }

        function alarmAjax(seq, con) {
            /* con : 1.전체알람,2.동행,3.대리구매,4.좋아요,5.댓글 */
            let token = $("meta[name='_csrf']").attr("content");
            let header = $("meta[name='_csrf_header']").attr("content");

            $.ajax({
                type: 'get',
                url: '/alarm/myalarmload',
                data: {
                    'seq': seq,
                    'con': con
                },
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(header, token);
                },
                success: function (data) {
                    let template = '';
                    $.each(data, function (index, items) {
                        template += t.mypageAlarmviewTemplate(items);
                    });
                    tableContent.innerHTML = template;
                    const deleteList = getElList('.btn-alarm-delete');
                    addAllSameEvent(deleteList, 'click', (e) => {
                        ajax.deleteAlarmByAno(e.target.dataset.ano)
                            .then(ret => {
                                if (ret === 'OK') {
                                    $(e.target).closest('tr')[0].remove();
                                }
                            })
                    })
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

        $('.deleteAlarm').click(function () {
            let token = $("meta[name='_csrf']").attr("content");
            let header = $("meta[name='_csrf_header']").attr("content");

            let con = $(this).data('con');
            let alarmtype = $('.on2').data('page');
            let convertAlarmtype = '';

            if (alarmtype == 'allAlarm') {
                convertAlarmtype = '1';
            } else if (alarmtype == 'friend') {
                convertAlarmtype = '2';
            } else if (alarmtype == 'purchase') {
                convertAlarmtype = '3';
            } else if (alarmtype == 'comment') {
                convertAlarmtype = '4';
            } else {
                console.log('ERROR');
            }

            $.ajax({
                type: 'delete',
                url: '/alarm/deleteAlarm/' + con + '/' + seq + '/' + convertAlarmtype,
                dataType: 'text',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(header, token);
                },
                success: function (data) {
                    if (data == '1') {
                        initAllalarm();
                    } else if (data == '2') {
                        initFriendAlarm();
                    } else if (data == '3') {
                        initPurchaseAlarm();
                    } else if (data == '4') {
                        initCommentAlarm();
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }

    function initMyArticle() {
        mainWrap.innerHTML = '';
        $(mainWrap).append(t.myArticle());
        const tableHead = getEl('.table-head');
        const tableContent = getEl('.table-content');
        const lnbList = getElList('.lnb-my-article ul li a');

        addAllSameEvent(lnbList, 'click', function (e) {
            lnbList.forEach(menu => menu.classList.remove('on'));
            this.classList.add('on');
            switch (this.dataset.page) {
                case 'my-essay' :
                    return initMyEssay();
                case 'my-route' :
                    return initMyRoute();
                case 'my-friend' :
                    return initMyFriend();
                case 'my-comment' :
                    return initMyComment();
                default :
                    throw new Error('뭔데?');
            }
        });

        initMyEssay();

        function initMyEssay() {
            showLoading();
            resetTable();
            $(tableHead).append(t.storyTableHead());
            ajax.getEssayList(seq, 1, 'rno')
                .then(ret => {
                    const $frag = $(document.createDocumentFragment());
                    ret.data.forEach(essay => {
                        $frag.append(t.storyTableBody(essay));
                    });
                    tableContent.appendChild($frag[0]);
                    closeLoading();
                })
                .catch(console.error);
        }

        function initMyFriend() {
            showLoading();
            resetTable();
            $(tableHead).append(t.friendTableHead());
            ajax.readFriendBySeq(seq)
                .then(ret => {
                    const $frag = $(document.createDocumentFragment());
                    ret.forEach(friend => $frag.append(t.friendTableBody(friend)));
                    tableContent.appendChild($frag[0]);
                    closeLoading();
                })
                .catch(console.error);
        }

        function initMyComment() {
            showLoading();
            resetTable();
            $(tableHead).append(t.commentTableHead());
            ajax.getCommentListBySearchFilter(seq, 'cno')
                .then(ret => {
                    const $frag = $(document.createDocumentFragment());
                    ret.data.forEach(comment => {
                        $frag.append(t.commentTableBody(comment));
                    });
                    tableContent.appendChild($frag[0]);
                    closeLoading();
                })
                .catch(console.error);
        }

        function initMyRoute() {
            resetTable();
            $(tableHead).append(t.storyTableHead());
            ajax.getRouteList(seq)
                .then(ret => {
                    const $frag = $(document.createDocumentFragment());
                    ret.forEach(route => {
                        $frag.append(t.storyTableBody(route));
                    });
                    tableContent.appendChild($frag[0]);
                })
                .catch(console.error);
        }

        function resetTable() {
            tableHead.innerHTML = '';
            tableContent.innerHTML = '';
        }
    }
});

function checkPostCode(postcode, addr1, addr2) {
    new daum.Postcode({
        oncomplete: function (data) {
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
                // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else {
                // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr +=
                        extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                // document.getElementById("sample6_extraAddress").value =
                // extraAddr;
            } else {
                // document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            postcode.value = data.zonecode;
            addr1.value = addr;
            // 커서를 상세주소 필드로 이동한다.
            addr2.focus();
        }
    }).open();
}