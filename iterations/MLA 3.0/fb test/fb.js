window.fbAsyncInit = function() {
    FB.init({
        appId      : '1614696858799001',
        xfbml      : true,
        version    : 'v2.3'
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var share = function () {
    var shareWindow = window.open(  "    https://www.facebook.com/dialog/feed?app_id=1614696858799001&display=popup&caption=caption&link=http://testsite1234596848646.yolasite.com/", 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
};

share();
/*
function onLogin(response) {
  if (response.status == 'connected') {
    FB.api('/me?fields=first_name', function(data) {
      var welcomeBlock = document.getElementById('fb-welcome');
      welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
    });
  }
}

FB.getLoginStatus(function(response) {
  // Check login status on load, and if the user is
  // already logged in, go directly to the welcome message.
  if (response.status == 'connected') {
    onLogin(response);
  } else {
    // Otherwise, show Login dialog first.
    FB.login(function(response) {
      onLogin(response);
    }, {scope: 'user_friends, email'});
  }
});*/