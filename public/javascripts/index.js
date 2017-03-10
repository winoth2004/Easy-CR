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
        $weblabInp = $("#inp_weblab");
    initalizeAutoComplete($pkgInput, "/packages");
    initalizeAutoComplete($weblabInp, "/weblabs");

    $(".btn_container>#cr_submit").click(function() {
        if($pkgInput.val() && $weblabInp.val()){
          $.post("http://localhost:60000/", {
            package : $pkgInput.val(),
            weblab : $weblabInp.val()
          }, function successHandler(data){
            console.log("Output data : ");
            if(data.crURL) {
              window.open(data.crURL,'_blank');
            }
          }, "json");
        } else {
          alert("no");
        }
     });
  });
})();