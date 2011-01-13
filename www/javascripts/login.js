(function( $ ) {

  var Core = window.Core || Core || {};

  Core.login = {

    init: function (){
      Core.auth.requireNoSession();
      Core.ui.showView();
      Core.login.bindEvents();
    },

    bindEvents: function() {
      $('#login').bind('submit',function(){
        Core.login.authenticate.onSubmit($(this));
        return false;
      });

      $('#user_session_submit').bind('click',function(){
        var form_obj = $(this).closest('form');
        Core.login.authenticate.onSubmit( form_obj );
        return false;
      });

    },

    authenticate: {
      onSubmit: function(form_obj) {
        var ajax_url = form_obj.attr('action'),
            ajax_data = form_obj.serialize();
        Core.api.submit( ajax_url, ajax_data,
          {
            onSuccess: Core.login.authenticate.onSuccess,
            onError: Core.login.authenticate.onError,
            onDenied: Core.login.authenticate.onDenied,
            onComplete: Core.login.authenticate.onComplete
          }
        );
      },

      onSuccess: function(data) {
        Core.auth.authToken.set(data.access_token, 30);
        window.location = 'index.html';
      },

      onError: function(data) {
      },

      onDenied: function(data) {
      },

      onComplete: function(data) {
      }
    }

  };

  $( Core.login.init );

  window.Core = Core;

})(jQuery);
