var mysql = require('mysql');
var axios = require('axios');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ta1208',
    database: 'gameproject'
});
db.connect();
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('main.html');
    });
    app.get('/signup', function (req, res) {
        res.render('sign_up.html');
    });
    app.get('/login', function (req, res) {
        res.render('login.html');
    })
    app.post('/signup_success', function (req, res) {
        // console.log(req.body);

        var users = {
            "name": req.body.name,
            "login_id": req.body.login_id,
            "password": req.body.password,
            "birth_date": req.body.birth_date,
            "phone_number": req.body.phone_number,
            "email": req.body.email
        }


        var sql = `insert into users(name,login_id,password,birth_date,phone_number,email) values('${users.name}','${users.login_id}','${users.password}','${users.birth_date}','${users.phone_number}','${users.email}')`;
        db.query(sql, users, function (error) {
            if (error) {
                res.send('회원가입 실패 다시 시도주세요');
            } else
                res.render('main.html');
        });
    });

    app.post('/login_success', function (req, res) {
        var users = {
            "login_id": req.body.login_id,
            "password": req.body.password
        }
        var sql = `select idx,password from users where login_id='${users.login_id}'`;
        db.query(sql, users, function (error, results, field) {
            if (error)
                throw error;
            // console.log(results[0].password);
            if (users.password == results[0].password) {
                var id = results[0].idx;//로그인한 아이디의 인덱스 어떻게 전해줄것인가?
                res.redirect(`http://192.168.0.34:5000/game?id=${id}`);

            }
        });
    });
    app.get('/checkoverlap', function (req, res) {

        var users = {
            "login_id": req.query.login_id,
        }
        console.log(users.login_id);

        var sql = `select idx from users where login_id='${users.login_id}'`;
        db.query(sql, users, function (error, results) {
            if (results >= 0)
                res.send('0');
            else
                res.send('1');


        })

    })

    app.get('/game', function (req, res) {
        res.render('game.html');
    });

    app.get('/answer', function (req, res) {

        var sqlR = `select * from answer order by answer_idx DESC LIMIT 1`
        db.query(sqlR, function (error, results) {
            if (error) {
                throw error;
            }
            res.send(results);
        })
    })

    app.get('/answer2', function (req, res) {

        var sqlR = `select * from answer order by answer_idx DESC LIMIT 5`

        db.query(sqlR, function (error, results) {
            if (error) {
                throw error;
            }
            res.send(results);
        })

    })

    app.get('/happy', async function (req, res) {


        function compareArray(a, b) {
            count = 0;
            for (let k = 0; k < 6; k++) {
                for (let u = 0; u < 6; u++) {
                    if (a[k] == b[u])
                        count++;

                }
            }
            return count;
        }

        function returnResult(sql) {
            return new Promise(function (resolve, reject) {
                db.query(sql, function (error, results) {
                    if (error) reject(error);
                    resolve(results);
                })
            });
        }

        let sql1 = `select * from answer order by answer_idx DESC LIMIT 1`;
        let sql2 = `select contracts_idx from contracts order by contracts_idx DESC LIMIT 1`;
        let sql3 = 'select * from contracts';
        // let answer_idx = returnResult(sql1);
        // let contracts_idx = returnResult(sql2);
        // let contracts=returnResult(sql3);
        let data1 = null;
        let data2 = null;
        let data3 = null;
        await returnResult(sql1)
            .then(function (data) {
                data1 = data;
            })
            .catch((err) => console.log(err));

        await returnResult(sql2)
            .then(function (data) {
                data2 = data;
            })
            .catch((err) => console.log(err));

        await returnResult(sql3)
            .then(function (data) {
                data3 = data;
            })
            .catch((err) => console.log(err));

        let s = 0;
        let _1th = [];
        let _2th = [];
        let _3th = [];
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count = 0;


        for (s = 0; s < data2[0].contracts_idx; s++) {
            count = compareArray(data1[0].num.split(','), data3[s].num.split(','));
            console.log(count);
            if (count === 6) {
                _1th[count1++] = data3[s].id;
            } else if (count === 5) {
                _2th[count2++] = data3[s].id;
            } else if (count === 4) {
                _3th[count3++] = data3[s].id;
            }
        }
        console.log('here');
        _1th = _1th.toString();
        _2th = _2th.toString();
        _3th = _3th.toString();
        let data4 = null;
        let data5 = null;
        let sql4 = `insert into ranking_results(answer_idx,1th,2th,3th) values('${data1[0].answer_idx}','${_1th}','${_2th}','${_3th}')`
        await returnResult(sql4)
            .then(function (data) {
                data4 = data;
            })
            .catch((err) => console.log(err));

        // let sql5 = `truncate table contracts`
        // await returnResult(sql5)
        //     .then(function(data){
        //         data5 = data;
        //
        //     })
        //     .catch((err) =>console.log(err));




    });
    app.get('/resettransaction',function (req,res){
        let sql5 = `truncate table contracts`;
        db.query(sql5, function (error, result) {
            if (error) {
                throw error;
            }
        })
    })


    app.get('/timer', function (req, res) {
        res.send((Math.floor(+new Date() / 1000) % 40).toString());
        if (Math.floor(+new Date() / 1000) % 40 === 0) {
            function sameNum(n) {
                for (var i = 0; i < lotto.length; i++) {
                    if (n === lotto[i]) {
                        return true;
                    }
                }
                return false;
            }

            let lotto = [];
            let i = 0;
            while (i < 6) {
                let n = Math.floor(Math.random() * 50) + 1;
                if (!sameNum(n)) {
                    lotto.push(n);
                    i++;
                }
            }
            lotto.sort(function (a, b) {
                return a - b;
            });
            let answer = {
                "num": lotto
            }


            var sql = `insert into answer(num) values('${answer.num}')`;
            // var sql = `insert into answer(num) values('1,2,3,4,5,6')`
            db.query(sql, answer, function (error) {
                if (error) {
                    throw error;
                }
            });
        }
    })


    app.get('/makeRandom', function (req, res) {
        function sameNum(n) {
            for (var i = 0; i < lotto.length; i++) {
                if (n === lotto[i]) {
                    return true;
                }
            }
            return false;
        }

        let lotto = [];
        let i = 0;
        while (i < 6) {
            let n = Math.floor(Math.random() * 50) + 1;
            if (!sameNum(n)) {
                lotto.push(n);
                i++;
            }
        }
        lotto.sort(function (a, b) {
            return a - b;
        });

        let id = req.query.id;
        let rnum = lotto;
        // console.log('id : ' + id);
        // console.log(lotto);
        let contracts = {
            "id": id,
            "num": rnum
        }

        var sql = `insert into contracts(id,num) values('${contracts.id}','${contracts.num}')`;
        db.query(sql, contracts, function (error) {
            if (error) {
                throw error;
            }
        });
        var sqlR = `select * from contracts where id=${contracts.id} order by contracts_idx DESC`
        db.query(sqlR, contracts, function (error, result) {
            if (error) {
                throw error;
            }
            res.send(result);
        })


    });
    app.get('/checkInfoC', function (req, res) {

        let id = req.query.id;
        let contracts = {
            "id": id
        }
        var sqlC = `select * from contracts where id=${contracts.id} order by contracts_idx DESC`
        db.query(sqlC, contracts, function (error, result) {
            if (error) {
                throw error;
            }
            res.send(result);
        })


    })
    app.get('/checkInfoR', function (req, res) {
        let answers = {};
        var sqlR = `select * from answer order by answer_idx DESC LIMIT 5`
        db.query(sqlR, answers, function (error, results) {
            if (error) {
                throw error;
            }
            res.send(results);
        })
    })
    app.get('/checkInfoRR', function (req, res) {
        let answer_idx = req.query.answer_idx;
        var sqlR = `select num from answer where answer_idx=${answer_idx}`
        db.query(sqlR, function (error, results) {
            if (error) {
                throw error;
            }
            res.send(results);
        })
    })
    app.get('/makeOrder', function (req, res) {
        let id = req.query.id;
        let num = req.query.num;
        let contracts = {
            "id": id,
            "num": num
        }

        var sql = `insert into contracts(id,num) values('${contracts.id}','${contracts.num}')`;
        db.query(sql, contracts, function (error) {
            if (error) {
                throw error;
            }
        });
        var sqlR = `select * from contracts where id=${contracts.id} order by contracts_idx DESC`
        db.query(sqlR, contracts, function (error, result) {
            if (error) {
                throw error;
            }
            res.send(result);
        })
    })

};




