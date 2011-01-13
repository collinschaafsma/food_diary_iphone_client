(function( $ ) {

  var Core = window.Core || Core || {};

  Core.ui = {

    showView: function (){
      $("#content").show();
    },

    hideView: function (){
      $("#content").hide();
    }

  };

  window.Core = Core;

})(jQuery);
