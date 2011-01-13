(function( $ ) {

  var Core = window.Core || Core || {};

  Core.upload = {

    init: function (){
      Core.auth.requireSession();
      Core.ui.showView();
    },

    bindEvents: function() {
      $('#upload_photo').bind('click',function(){
        Core.upload.photo.get(0);
        return false;
      });

      $('#upload_camera').bind('click',function(){
        Core.upload.photo.get();
        return false;
      });
    },

    photo: {

      get: function(source) {
        var options = { quality: 10 };
        if (sourceType !== undefined) {
          options["sourceType"] = sourceType;
        }
        // if no sourceType specified, the default is CAMERA
        navigator.camera.getPicture(Core.upload.photo.onSuccess, Core.upload.photo.onFail,
          {
            quality: 50,
            sourceType: source
          }
        );
      },

      onSuccess: function(imageData) {

        image = $("<img>", {
          'src': "data:image/jpeg;base64," + imageData
        });

        image.appendTo('#photo_wrap');
      },

      onFail: function(message) {
        alert(message);
      }
    }

  };

  $( Core.upload.init );

  window.Core = Core;

})(jQuery);
