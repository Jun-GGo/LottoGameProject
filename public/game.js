function S_GET(id) {
    var a = new RegExp(id + "=([^&#=]*)");
    return decodeURIComponent(a.exec(window.location.search)[1]);
}

function getBalance() {
    let param = S_GET('id');
    $.ajax({
        url: "/getBalance",
        data: {id: param},
        method: "GET",

    })
        .done(function (result) {
            document.getElementById('mycoin').innerHTML = '내 코인1:' + result[0].money
        })


}

getBalance();

function getAccumulated() {
    $.ajax({
        url: "/getAccumulated",
        data: {},
        method: "GET",

    })
        .done(function (result) {
            document.getElementById('accumulated').innerHTML = '모인 돈:' + result[0].money

        })

}

getAccumulated();

function orderMake() {
    let param = S_GET('id');
    let num = [];
    if (userInput() === false)
        return false
    else
        num = userInput();
    $.ajax({
        url: "/getBalance",
        data: {id: param},
        method: "GET",

    })
        .done(function (result) {
            if (result[0].money > 0) {
                $.ajax({
                    url: "/makeOrder",
                    data: {
                        id: param,
                        num: num
                    },
                    method: "GET",

                })
                    .done(function (result) {
                        let html = '';
                        for (var i = 0; i < result.length; i++) {
                            html += "<br>" + result[i].num + "<br>";
                        }
                        document.getElementById('result').innerHTML = html;
                        getBalance();
                        getAccumulated();
                    })
            } else {
                alert('돈이 부족합니다ㅜㅜ 돈을 충전해주세요!');
            }
        })


}

function randomMake() {
    let param = S_GET('id');
    $.ajax({
        url: "/getBalance",
        data: {id: param},
        method: "GET",

    })
        .done(function (result) {
            if (result[0].money > 0) {

                $.ajax({
                    url: "/makeRandom",
                    data: {id: param},
                    method: "GET",

                })
                    .done(function (result) {
                        let html = '';
                        for (var i = 0; i < result.length; i++) {
                            html += "<br>" + result[i].num + "<br>";
                        }
                        document.getElementById('result').innerHTML = html;
                        getBalance();
                        getAccumulated();

                    })

            } else {
                alert('돈이 부족합니다ㅜㅜ 돈을 충전해주세요!');
            }
        })


}

function initPageC() {
    let param = S_GET('id');
    $.ajax({
        url: "/checkInfoC",
        data: {
            id: param
        },
        method: "GET",

    })
        .done(function (result) {
            let html = '';
            for (var i = 0; i < result.length; i++) {
                html += "<br>" + result[i].num + "<br>";
            }
            document.getElementById('result').innerHTML = html;

        })


}

function initPageR() {
    $.ajax({
        url: "/checkInfoR",
        data: {},
        method: "GET",

    })
        .done(function (results) {
            let html = '';
            for (var i = 0; i < results.length; i++) {
                html += "<br>" + results[i].answer_idx + '회차:' + results[i].num + "<br>";
            }
            document.getElementById('resultA').innerHTML = html;
        })
}

initPageC();
initPageR();

function searchR() {
    let A = document.getElementById('a').value;

    $.ajax({
        url: "/checkInfoRR",
        data: {answer_idx: A},
        method: "GET",

    })
        .done(function (results) {
            document.getElementById('b').innerHTML = results[0].num;

        })
}

function checkRanking() {
    let param = S_GET('id');
    let C = document.getElementById('c').value;
    $.ajax({
        url: "/checkRanking",
        data: {answer_idx: C},
        method: "GET",

    })
        .done(function (results) {
            let count1 = 0;
            let count2 = 0;
            let count3 = 0;
            let _1th = results[0]['1th'].split(',');
            let _2th = results[0]['2th'].split(',');
            let _3th = results[0]['3th'].split(',');
            for (let i = 0; i < _1th.length; i++) {
                if (param == _1th[i])
                    count1++;
            }
            for (let i = 0; i < _2th.length; i++) {
                if (param == _2th[i])
                    count2++;
            }
            for (let i = 0; i < _3th.length; i++) {
                if (param == _3th[i])
                    count3++;
            }


            let html2 = '1등: ' + count1 + '개 2등: ' + count2 + '개 3등 ' + count3 + '개';
            document.getElementById('d').innerHTML = html2;

        })

}

function inNumber() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
}

function userInput() {
    var num = [];
    for (var i = 0; i < 6; i++) {
        num[i] = document.getElementById(i + 1).value;
    }
    num.sort(function (a, b) {
        return a - b;
    })


    for (var j = 0; j < 5; j++) {
        if (num[j] === num[j + 1]) {
            alert('중복되지 않는 숫자 6개를 골라주세요');
            return false;
        }
    }
    for (var k = 0; k < 6; k++) {
        if (num[5 - k] > 20) {
            alert('1~20사이의 숫자를 골라주세요');
            return false;
        } else if (num[5 - k] < 1) {
            alert('1~20사이의 숫자를 골라주세요');
            return false;
        }

    }
    return num;
}


$.ajax({
    url: "/answer",
    data: {},
    method: "GET",

})
    .done(function (results) {
        let html = '';
        html = results[0].answer_idx + '회차 당첨번호:' + results[0].num;
        document.getElementById('jk').innerHTML = html;
        let html2 = '';
        html2 = (results[0].answer_idx + 1) + '회차';
        document.getElementById('CLB').innerHTML = html2;
    })

function sendCoin(to, money) {
    let param = S_GET('id');
    $.ajax({
        url: "/sendcoin",
        data: {
            from: param,
            to: to,
            money: money
        },
        method: "GET",

    })
        .done(function () {
            getBalance();
            getAccumulated();
        })
}

function func1() {
    $.ajax({
        url: "/answer2",
        data: {},
        method: "GET",

    })
        .done(function (results) {
            let html = '';
            for (var i = 0; i < results.length; i++) {
                html += "<br>" + results[i].answer_idx + '회차:' + results[i].num + "<br>";
            }
            document.getElementById('resultA').innerHTML = html;
        })

    $.ajax({
        url: "/answer",
        data: {},
        method: "GET",

    })
        .done(function (results) {
            let html = '';
            html = (results[0].answer_idx) + '회차 당첨번호:' + results[0].num;
            document.getElementById('jk').innerHTML = html;
            let html2 = '';
            html2 = (results[0].answer_idx + 1) + '회차';
            document.getElementById('CLB').innerHTML = html2;
        })
    let param = S_GET('id');
    $.ajax({
        url: "/happy",
        data: {id: param},
        method: "GET",

    })
        .done(function (results) {
            let array = results;
            let count4 = 0;
            let count5 = 0;
            let count6 = 0;
            let _count4 = 0;
            let _count5 = 0;
            let _count6 = 0;

            let html = '';
            for (var i = 0; i < array[0].length; i++) {
                if (array[1][i] == 4) {
                    _count4++
                    //3등 배
                } else if (array[1][i] == 5) {
                    _count5++;
                } else if (array[1][i] == 6) {
                    _count6++;
                }

                if (param == array[0][i]) {
                    html += "<br>" + array[1][i] + "<br>";
                    if (array[1][i] == 4) {
                        count4++
                        //3등 배
                    } else if (array[1][i] == 5) {
                        count5++;
                    } else if (array[1][i] == 6) {
                        count6++;
                    }

                }
            }
            document.getElementById('cr').innerHTML = '👆전체(1등: ' + _count6 + '명 2등: ' + count5 + '명 3등: ' + _count4 + '명)';

            if (count6 != 0) {


                $.ajax({
                    url: "/distribute",
                    data: {
                        id: param,
                        score: 1,
                        count: count6,
                        _count: _count6
                    },
                    method: "GET",

                })




                //돈가저오기
                //돈계산하기
                //돈보내기
                //count6=0;

            }
            if (count5 != 0) {

                $.ajax({
                    url: "/distribute",
                    data: {
                        id: param,
                        score: 2,
                        count: count5,
                        _count: _count5
                    },
                    method: "GET",

                })




            }
            if (count4 != 0) {

                $.ajax({
                    url: "/distribute",
                    data: {
                        id: param,
                        score: 3,
                        count: count4,
                        _count: _count4
                    },
                    method: "GET",

                })



            }


            let html2 = '';
            html2 = '내 등수(1등: ' + count6 + ' 개 2등: ' + count5 + '개 3등 ' + count4 + ')';
            document.getElementById('resultN').innerHTML = html;
            // console.log('html:'+html);
            document.getElementById('resultRanking').innerHTML = html2;
            // console.log(html2);
        })
}

function distribute() {
    let param = S_GET('id');
    $.ajax({
        url: "/distribute",
        data: {id: param},
        method: "GET",

    })


}

function timer() {

    $.ajax({
        url: "/timer",
        data: {},
        method: "GET",

    })
        .done(function (results) {
            if (results <= 10) {
                document.getElementById('CL').innerHTML = '(준비) break time:' + (10 - results) + '초';
                document.querySelector('#change').style.visibility = 'hidden';
                document.querySelector('#resultRanking').style.visibility = 'visible'

            } else if (results > 10) {
                document.getElementById('CL').innerHTML = '(진행중):' + (40 - results) + '초';
                document.querySelector('#change').style.visibility = 'visible';
                document.querySelector('#resultRanking').style.visibility = 'hidden'
            }
        })
        .done(function (results) {
            if (results == 0) {
                func1();
            }
        })
        .done(function (results) {
            if (results == 10) {
                $.ajax({
                    url: "/truncate",
                    data: {},
                    method: "GET",

                })
                    .done(function(){

                    })
            }
        })

        .done(function (results) {
            if (results == 11) {
                document.getElementById('result').innerHTML = '';
                document.getElementById('resultN').innerHTML = '';
            }

        })
}


function initTime() {
    setInterval(timer, 1000);
}

timer();
initTime();








