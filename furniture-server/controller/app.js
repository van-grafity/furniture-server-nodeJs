var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var path = require('path');

// var async = require('async')
// var fs = require("fs");

var cors = require("cors")
var cor = cors();
app.use(cor);
app.use(express.static(path.join(__dirname, "../public")));

var furniture = require('../model/furniture.js');
var user = require('../model/user');

var handleError = (err, res) => {
    res.status(500)
        .contentType("text/plain")
        .end(err.code + "\nOops! Something went wrong!");
};

app.get('/api/furniture', function (req, res) {
    furniture.getFurniture(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
            res.status(500).send(err);
        }
    })
})

app.get('/api/category/:catid/furniture', function (req, res) {
    var catid = req.params.catid;
    furniture.getFurnitureByCat(catid, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});

app.get('/api/user/favorite', function (req, res) {
    user.getFavorite(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
            res.status(500).send(err);
        }
    })
})

app.get('/api/user', function (req, res) {
    user.getUsers(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
            res.status(500).send(err);
        }
    })
})

app.post('/api/user', urlencodedParser, jsonParser, function (req, res) {
    var useremail = req.body.useremail;
    var userpassword = req.body.userpassword;
    var name = req.body.name;

    user.addUser(useremail, userpassword, name, function (err, result) {
        if (!err) {
            res.send(result.affectedRows + ' record ditambahkan');
        } else {
            console.log(err);
            res.status(500).send(err.code)
        }
    })
})

app.delete('/api/user/:userid', function (req, res) {
    const userid = req.params.userid;

    user.deleteUser(userid, function (err, result) {
        if (!err) {
            if (result.affectedRows === 0) {
                res.status(200).json({
                    'res': 'Data kosong'
                });
            } else {
                console.log(result);
                res.json({
                    'code': 200,
                    'status': 'OK',
                    'messages': 'Personal Info Created',
                    'data': result.affectedRows + ' record dihapus'
                })
            }
            // res.send(result.affectedRows + ' record dihapus');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    })
})

app.post('/api/user/:userid', urlencodedParser, jsonParser, function (req, res) {
    var userid = req.params.userid;
    var useremail = req.body.useremail;
    var userpassword = req.body.userpassword;
    var name = req.body.name;

    user.updateUser(useremail, userpassword, name, userid, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' record diubah');
        } else {
            handleError(err, res);
            console.log(err);
        }
    })
})
module.exports = app