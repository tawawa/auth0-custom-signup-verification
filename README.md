# What is it?

It provides a way to ensure signup process is only completed once a email code has been verified. 
Easy to integrate with Lock widget.


## Running locally


To run the sample extension locally:

Rename `.env.sample` as `.env` and add the required values for each key value pair.

```bash
$ npm install
$ npm start
```

Then go to `http://localhost:3000/forgot`

## Deploying as Webtask 

Rename `.env.sample` as `.env` and add the required values for each key value pair.

```bash
$ ./deploy 
```

Then go to your webtask URL endpoint + `/forgot`

## Auth0 Dashboard Rule

Also in the Auth0 Dashboard, define a new Rule as follows, using your own Client ID(s)

```
function signupVerification(user, context, callback) {
  var CLIENTS_WITH_VERIFIED_SIGNUP = ['YOUR CLIENT ID', ...];
  if (CLIENTS_WITH_VERIFIED_SIGNUP.indexOf(context.clientID) !== -1) {
    user.app_metadata = user.app_metadata || {};
    if (user.app_metadata.verified === false) {
      var msg = 'Signup email verification must be completed before signin';
      console.error(msg);
      return callback(new UnauthorizedError(msg));
    }
  }
  callback(null, user, context);
}
```

The rule prevents a user that has signed up but not verified their email from logging in.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
