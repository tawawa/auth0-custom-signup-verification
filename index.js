'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var metadata = require('./webtask.json');

const assert = require('assert');

var config = require('./config');
var init = false;
var handleCode, verifyCode, sendMail;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
  config.setVars(req);
  if (!init) {
    handleCode = require('./scripts/handleCode')(config);
    verifyCode = require('./scripts/verifyCode')(config);
    sendMail = require('./scripts/sendMail')(config);
    init = true;
  }
  next();
});

var errorPage = require('./resources/errorPage');
var signupPage = require('./resources/signupPage');
var codePage = require('./resources/codePage');
var successPage = require('./resources/successPage');

app.get('/signup', function (req, res) {
  res.header("Content-Type", 'text/html');
  res.status(200).send(signupPage);
});


app.post('/requestCode', function (req, res) {

  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  try {
    assert(email);
    assert(username);
    assert(password);
  } catch (e) {
    res.header("Content-Type", 'text/html');
    res.status(200);
    res.redirect('/forgot?error=All fields are mandatory');
    return;
  }
  console.log('email: ' + email);
  console.log('username: ' + username);
  console.log('password: ' + password);

  var newUser = {
    email: email,
    username: username,
    password: password
  };

  handleCode(newUser).then(function (newCode) {
    assert(newCode);
    console.log('code: ' + newCode);
    sendMail(email, newCode).then(function () {
      // console.log('email sent...');
      res.header("Content-Type", 'text/html');
      res.status(200).send(codePage);
    }, function (err) {
      console.error(err);
      res.header("Content-Type", 'text/html');
      res.status(200).send(errorPage);
    });
  }, function (err) {
    console.error(err);
    res.header("Content-Type", 'text/html');
    res.status(200).send(errorPage);
  });

});

app.post('/sendCode', function (req, res) {
  var code = req.body.code;
  assert(code);
  // console.log(code);
  verifyCode(code).then(function (user) {
    // console.log(user);
    res.header("Content-Type", 'text/html');
    res.status(200).send(successPage);
  }, function (err) {
    console.error(err);
    res.header("Content-Type", 'text/html');
    res.status(200).send(errorPage);
  });

});


// This endpoint would be called by webtask-gallery to dicover your metadata
app.get('/meta', function (req, res) {
  res.status(200).send(metadata);
});

module.exports = app;
