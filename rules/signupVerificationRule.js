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
