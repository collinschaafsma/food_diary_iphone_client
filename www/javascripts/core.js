(function( $ ) {

  var Core = Core || {};

  Core = {


    init: function (){

    },

    api: {

      submit: function( ajax_url, ajax_data, callback ){

        var auth_token = '';
        if( Core.auth.isAuthenticated() ) {
          auth_token = Core.auth.authToken.get();
        }

        $.ajax({

          type: "GET",

          dataType: "jsonp",

          url: ajax_url,

          cache: false,

          //data: ajax_data,
          data: 'auth_token='+ auth_token + '&' + ajax_data,

          success: function(data) {
            if(typeof callback.onSuccess == 'function'){
              callback.onSuccess.call(this, data);
            }
          },

          error: function(data,status){
            if(typeof callback.onError == 'function'){
              if(data.status == '403') {
                return callback.onDenied.call(this, data);
              }
              callback.onError.call(this, data);
            }
          },

          complete: function(data){
            if(typeof callback.onComplete == 'function'){
              callback.onComplete.call(this, data);
            }
          },

          denied: function(data){
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
