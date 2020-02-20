function S_GET(id) {
    var a = new RegExp(id + "=([^&#=]*)");
    return decodeURIComponent(a.exec(window.location.search)[1]);
}

function randomMake() {
    let param = S_GET('id');
    $.ajax({
        url: "/makeRandom", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
        data: {id: param}, // HTTP 요청과 함께 서버로 보낼 데이터
        method: "GET", // HTTP 요청 메소드(GET, POST 등)
        // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
    })
        .done(function (result) {
            let html = '';
            for (var i = 0; i < result.length; i++) {
                html += "<br>" + result[i].num + "<br>";
            }
            document.getElementById('result').innerHTML = html;
        })
}

function initPageC() {
    let param = S_GET('id');
    $.ajax({
        url: "/checkInfoC", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
        data: {
            id: param
        }, // HTTP 요청과 함께 서버로 보낼 데이터
        method: "GET", // HTTP 요청 메소드(GET, POST 등)
        // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
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
        url: "/checkInfoR", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
        data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
        method: "GET", // HTTP 요청 메소드(GET, POST 등)
        // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
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
        url: "/checkInfoRR", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
        data: {answer_idx: A}, // HTTP 요청과 함께 서버로 보낼 데이터
        method: "GET", // HTTP 요청 메소드(GET, POST 등)
        // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
    })
        .done(function (results) {
            document.getElementById('b').innerHTML = results[0].num;

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
        if (num[5 - k] > 50) {
            alert('1~50사이의 숫자를 골라주세요');
            return false;
        } else if (num[5 - k] < 1) {
            alert('1~50사이의 숫자를 골라주세요');
            return false;
        }

    }


    return num;
}

function orderMake() {
    let param = S_GET('id');
    let num = [];
    if (userInput() === false)
        return false
    else
        num = userInput();
    $.ajax({
        url: "/makeOrder", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
        data: {
            id: param,
            num: num
        }, // HTTP 요청과 함께 서버로 보낼 데이터
        method: "GET", // HTTP 요청 메소드(GET, POST 등)
        // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
    })
        .done(function (result) {
            let html = '';
            for (var i = 0; i < result.length; i++) {
                html += "<br>" + result[i].num + "<br>";
            }
            document.getElementById('result').innerHTML = html;
        })


}
$.ajax({
    url: "/answer", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
    data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
    method: "GET", // HTTP 요청 메소드(GET, POST 등)
    // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
})
    .done(function (results) {
        let html = '';
        html = results[0].answer_idx + '회차 당첨번호:' + results[0].num;
        document.getElementById('jk').innerHTML = html;
        let html2 = '';
        html2 = (results[0].answer_idx + 1) + '회차';
        document.getElementById('CLB').innerHTML = html2;
    })


function timer() {
    $.ajax({
        url: "/timer", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
        data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
        method: "GET", // HTTP 요청 메소드(GET, POST 등)
        // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
    })
        .done(function (results) {
            if (results <= 10) {
                document.getElementById('CL').innerHTML = '(종료) break time:' + (10 - results) + '초';
            } else if (results > 10) {
                document.getElementById('CL').innerHTML = '(진행중):' + (40 - results) + '초';
            }
        })
        .done(function(results){
        if (results == 0) {


                $.ajax({
                    url: "/answer2", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
                    data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
                    method: "GET", // HTTP 요청 메소드(GET, POST 등)
                    // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
                })
                    .done(function (results) {
                        let html = '';
                        for (var i = 0; i < results.length; i++) {
                            html += "<br>" + results[i].answer_idx + '회차:' + results[i].num + "<br>";
                        }
                        document.getElementById('resultA').innerHTML = html;
                    })

                $.ajax({
                    url: "/answer", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
                    data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
                    method: "GET", // HTTP 요청 메소드(GET, POST 등)
                    // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
                })
                    .done(function (results) {
                        let html = '';
                        html = results[0].answer_idx + '회차 당첨번호:' + results[0].num;
                        document.getElementById('jk').innerHTML = html;
                        let html2 = '';
                        html2 = results[0].answer_idx + '회차';
                        document.getElementById('CLB').innerHTML = html2;
                    })

                $.ajax({
                    url: "/happy", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
                    data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
                    method: "GET", // HTTP 요청 메소드(GET, POST 등)
                    // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
                })


            }
        })
        .done(function (results) {
            if(results == 10){
                $.ajax({
                    url: "/resettransaction", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
                    data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
                    method: "GET", // HTTP 요청 메소드(GET, POST 등)
                    // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
                })
                document.getElementById('result').innerHTML = '';
            }

        })
}

function initTime() {
    setInterval(timer, 1000);
}

timer();
initTime();
// createAnswer();
// createAnswer2();
// checkRanking();
//
// function createAnswer() {
//     $.ajax({
//         url: "/answer", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
//         data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
//         method: "GET", // HTTP 요청 메소드(GET, POST 등)
//         // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
//     })
//         .done(function (results) {
//             let html = '';
//             html = results[0].answer_idx + '회차 당첨번호:' + results[0].num;
//             document.getElementById('jk').innerHTML = html;
//         })
// }
//
// function a() {
//     if (Math.floor(+new Date() / 1000) % 40 === 0) {
//         createAnswer();
//         setInterval(createAnswer, 40000);
//     }
// }
//
// myVar = setInterval(a, 1000);
// if (Math.floor(+new Date() / 1000) % 40 === 0) {
//     clearInterval(myVar);
// }
//
// function createAnswer2() {
//     $.ajax({
//         url: "/answer2", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
//         data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
//         method: "GET", // HTTP 요청 메소드(GET, POST 등)
//         // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
//     })
//         .done(function (results) {
//             let html = '';
//             for (var i = 0; i < results.length; i++) {
//                 html += "<br>" + results[i].answer_idx + '회차:' + results[i].num + "<br>";
//             }
//             document.getElementById('resultA').innerHTML = html;
//         })
//
//
// }
//
// function b() {
//     if (Math.floor(+new Date() / 1000) % 40 === 0) {
//         createAnswer2();
//         setInterval(createAnswer2, 40000);
//     }
// }
//
// myVar2 = setInterval(b, 1000);
//
// if (Math.floor(+new Date() / 1000) % 40 === 0) {
//
//     clearInterval(myVar2);
//     checkRanking();
//     setInterval(checkRanking, 40000);
// }
//
//
// function checkRanking() {
//     $.ajax({
//         url: "/happy", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
//         data: {}, // HTTP 요청과 함께 서버로 보낼 데이터
//         method: "GET", // HTTP 요청 메소드(GET, POST 등)
//         // dataType: "json" // 서버에서 보내줄 데이터의 타입 })
//     })
// }










