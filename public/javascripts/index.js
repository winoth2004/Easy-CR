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
        $loader = $(".loader");
    initalizeAutoComplete($pkgInput, "/packages");
    initalizeAutoComplete($weblabInp, "/weblabs");

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
            self.removeClass("btn_disable");
            $loader.addClass("hide");
            console.log("Output data : ");
            if(data && data.crURL) {
              window.setTimeout(function(){
                window.open(data.crURL,'_blank');
              }, 2000);
            }
          }, "json");
        } else {
          alert("no");
        }
     });
  });
})();