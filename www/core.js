(function( $ ) {

  var Core = {


    init: function (){

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

    api: {

      submit: function( ajax_url, ajax_data, ajax_type, callback ){

        $.ajax({

          type: ajax_type,

          dataType: "jsonp",

          url: ajax_url,

          cache: false,

          data: 'auth_token='+ Core.authToken.get(),

          success: function(data) {
            console.log(data);
            if(typeof callback.onSuccess == 'function'){
              callback.onSuccess.call(this, data);
            }
          },

          error: function(data,status){
            console.log(data);
            if(typeof callback.onError == 'function'){
              if(data.status == '403') {
                return callback.onDenied.call(this, data);
              }
              callback.onError.call(this, data);
            }
          },

          complete: function(data){
            console.log(data);
            if(typeof callback.onComplete == 'function'){
              callback.onComplete.call(this, data);
            }
          },

          denied: function(data){
            console.log(data);
            if(typeof callback.onDenied == 'function'){
              callback.onDenied.call(this, data);
            }
          }

        });

      }

    }

  };

  $( Core.init );

  window.Core = Core;

})(jQuery);
