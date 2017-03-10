(function () {
  var termTemplate = "<span class='ui-autocomplete-term'>$1</span>";


  function initalizeAutoComplete($inputField, sourceCall) {
    $inputField.autocomplete({
      source: sourceCall,
      minLength: 2,
      open: function(e,ui) {
            var acData = $(this).data('autocomplete');
            acData
                .menu
                .element
                .find('a')
                .each(function() {
                    var me = $(this);
                    var regex = new RegExp( '(' + acData.term + ')', 'gi' );
                    me.html( me.text().replace(regex, termTemplate) );
                });
        }
    });
  }
  $(document).ready(function() {
    var $pkgInput = $("#inp_package"),
        $weblabInp = $("#inp_weblab"),
        $loader = $(".loader"),
        $crInfo = $(".cr_info"),
        $crData = $crInfo.find("span.text_info");
    initalizeAutoComplete($pkgInput, "/packages");
    initalizeAutoComplete($weblabInp, "/weblabs");

    // Post CR click
    $(".btn_container>#cr_submit").click(function() {
        var self = $(this);
        if(self.hasClass("btn_disable")){
          return;
        }
        if($pkgInput.val() && $weblabInp.val()){
          self.addClass("btn_disable");
          $loader.removeClass("hide");
          $.post("http://localhost:60000/", {
            package : $pkgInput.val(),
            weblab : $weblabInp.val()
          }, function successHandler(data){
                $loader.addClass("hide");
                console.log("Output data : ");
                if(data && data.crURL) {
                  $crInfo.removeClass("hide");
                  $pkgInput.attr('disabled','disabled');
                  $weblabInp.attr('disabled','disabled');
                  $crData.html(data.crURL);
                  window.setTimeout(function(){
                    window.open(data.crURL,'_blank');
                  }, 2000);
                }
          }, "json");
        } else {
          alert("Kindly provide the details");
        }
     });

    // Clear CR data
    $crInfo.find("span.cr_remove").click(function() {
      $crData.html("");
      $crInfo.addClass("hide");
      $pkgInput.removeAttr('disabled');
      $pkgInput.val("");
      $weblabInp.removeAttr('disabled');
      $weblabInp.val("");
      $(".btn_container>#cr_submit").removeClass("btn_disable");
    });
  });
})();