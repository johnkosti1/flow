
$(document).ready(function(){

//            Left Sidebar Menu JS
//============================================

    $(".btn-lg-sidebar").click(function(){
        //$(this).hide();
        $("body").toggleClass("sidebar-open");
        $(".fixed-sidebar").toggleClass("open");
    });

    $(".btn-sm-sidebar").click(function(){
        $("body").toggleClass("sidebar-open");
        $(".fixed-sidebar").toggleClass("open");
    });
    $( "#showtable" ).click(function() {
       $( "#hidetable" ).toggle( "fade");
    });
    
      // $(".upper-main-test-table").click(function(){
      //   $(".test-tab-screen").show(1000);
      // });
      // $("#show").click(function(){
      //   $("p").show(1000);
      // });


//        Menu Toggle in Mobile         
//============================================

	$(".menu-tgl").click(function(){
	  $(".header-menu").slideToggle();
	});

});
