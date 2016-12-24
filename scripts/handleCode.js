'use strict';

var request = require("request");
var Q = require("q");
var createCode = require('./createCode');


var handleCode = function (config) {

  return function (newUser) {

    var deferred = Q.defer();
    var newCode = createCode();

    var options = {
      method: 'POST',
      url: 'https://' + config.TENANT_DOMAIN + '/api/v2/users',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        authorization: 'Bearer ' + config.USER_CREATE_MGMT_TOKEN
      },
      body: {
        connection: config.CONNECTION_NAME,
        email: newUser.email,
        // TODO - ENABLE USERNAME only if you have requires username enabled on DB Connection
        // username: newUser.username,
        password: newUser.password,
        user_metadata: {},
        email_verified: true,
        app_metadata: {
          code: newCode,
          verified: false
        }
      },
      json: true
    };

    request(options, function (err /*, response, body */) {
      if (err) {
        console.error(err);
        return deferred.reject(new Error(err));
      }
      return deferred.resolve(newCode);
    });

    return deferred.promise;
  };

};

module.exports = handleCode;
