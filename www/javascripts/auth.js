(function( $ ) {

  var Core = window.Core || Core || {};

  Core.auth = {


    init: function (){
      Core.auth.bindEvents();
    },

    authToken: {

      set: function( token, lifetime ) {
        var expires = new Date();
        expires.setDate(expires.getDate() + lifetime);
        document.cookie = 'food_api_key="' + encodeURIComponent(token) + '"; expires=' + expires.toGMTString() + '; path=/;';
      },

      get: function() {
        cookie = document.cookie.match('\\bfood_api_key="([^;]*)\\b');
        if( cookie !== false ) {
          return decodeURIComponent(cookie[1]);
        }

        return null;
      }

    },

    bindEvents: function() {
      $('#login').bind('submit',function(){
        Core.auth.login.onSubmit($(this));
        return false;
      });

      $('#user_session_submit').bind('click',function(){
        var form_obj = $(this).closest('form');
        Core.auth.login.onSubmit( form_obj );
        return false;
      });

    },

    login: {
      onSubmit: function(form_obj) {
        var ajax_url = form_obj.attr('action'),
            ajax_data = form_obj.serialize();
        Core.api.submit( ajax_url, ajax_data,
          {
            onSuccess: Core.auth.login.onSuccess,
            onError: Core.auth.login.onError,
            onDenied: Core.auth.login.onDenied,
            onComplete: Core.auth.login.onComplete
          }
        );
      },

      onSuccess: function(data) {
        console.log("onSuccess");
        console.log(data);
      },

      onError: function(data) {
      },

      onDenied: function(data) {
      },

      onComplete: function(data) {
      }
    }

  };

  $( Core.auth.init );

  window.Core = Core;

})(jQuery);

