'use strict';

module.exports = `
<!DOCTYPE html>
<html>
<head>
  <title>Signup</title>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">

  <script src="https://code.jquery.com/jquery-3.1.1.min.js"
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
          crossorigin="anonymous"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-growl/1.0.0/jquery.bootstrap-growl.min.js"
          type="text/javascript"></script>

<body>
<div class="container">
  <h4>Signup</h4>
  <br/>
  <form id="request-change-password" name="request-change-password" method="post" action="requestCode">
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-4">
        <input type="email" class="form-control" name="email" placeholder="Email">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Username</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" name="username" placeholder="Username">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" name="password" placeholder="Password">
      </div>
    </div>
    <button type="button" id="submitButton" class="btn btn-primary">Continue</button>
  </form>
</div>
<script>

  function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  }

  $(function() {

    $("#submitButton").click(function () {
      console.log("Submitting form..");
      $("#request-change-password").submit();
    });

    var errorParam = qs("error");
    if (errorParam) {
      $.bootstrapGrowl(errorParam, {
        ele: "body",
        type: "danger", // info, danger, success
        offset: {from: "top", amount: 20},
        align: "right",
        width: 250,
        delay: 4000,
        allow_dismiss: true,
        stackup_spacing: 10
      });
    }
  });

</script>
</body>
</html>
`;
