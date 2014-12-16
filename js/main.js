function init() {
	// start up after 2sec no matter what
	$('#cover').addClass("loading");
     window.setTimeout(function(){
        start();
    }, 4000);  
}

// fade in experience
function start() {
	
	$('#cover').removeClass("loading").addClass('loaded');
	console.log("Document ready");
	eventHandler();
	$(".container").scrollingevent({
		sectionContainer: "section", 
		animationTime: 900
	});
	
}
var lastX;
var timer;
function eventHandler(){
   console.log("eventHandler: create");
   $(document).on('coverShow',function(){
   //  console.log("event : coverShow");
	 $("#navbar #about").removeClass('active');
   }); 
   $(document).on('fashionShow',function(){
     //console.log("event : fashionShow");
	  $("#navbar #about").addClass('active');
   });
    $(document).on('fashionHide',function(){
    // console.log("event : fashionHide");
   });
    $(document).on('weddingShow',function(){
     //console.log("event : weddingShow");
	 $('#wedding #bg div').show().css("opacity","0");
	 timer=setTimeout('nextDis()',3000);
   });
    $(document).on('weddingHide',function(){
    // console.log("event : weddingHide");
	 clearTimeout(timer);
	 var index=$('#wedding #que #right').data('index');
	 $('#wedding #bg div').hide().css("opacity","0");
	 $('#wedding #que #right').data('index',0);
	 $('#wedding #que #right').removeAttr("style");
   });
   
   $("#navbar #con").on('click',function(){
	//console.log('Click -- Contact');
	$.fn.goTo(5);
   });
   $("#navbar #about").on('click',function(){
	//console.log('Click -- about');
	$.fn.goTo(1);
   });
   
   $(document).on('portraitShow',function(){
    // console.log("event : contactShow");
	 $("#navbar #con").removeClass('active');
	 $("#navbar #about").addClass('active');
   });
   $(document).on('contactShow',function(){
    // console.log("event : contactShow");
	 $("#navbar #about").removeClass('active');
	 $("#navbar #con").addClass('active');
   });
   $(document).on('contactHide',function(){
    // console.log("event : contactHide");
	 $("#navbar #con").removeClass('active');
   });
}
function nextDis(){
	var index = $('#wedding #que #right').data('index');
	if(index<($('#wedding #que #right div').length-1)){
		$('#wedding #que #right').data('index',++index);
	}else{
		$('#wedding #que #right').data('index',0);
		index=0;
		$('#wedding '+"#bg-2").css('opacity','0');
		$('#wedding '+"#bg-3").css('opacity','0');
	}
	$('#wedding '+"#bg-"+(index+1)).css('opacity','1');
	var top=-1*index*60;
	//console.log(top);
	//$('#wedding #que #right').css('margin-top',top+'px');
	$('#wedding #que #right').css('transform','translate3d(0, '+top+'px'+',0)');
	timer=setTimeout('nextDis()',3000);
}
//***** Constant *******
var browser_mode="destop";//{"destop","mobile"}
var narbar_pos="top";
var contact_active=false;
//***********************
var winHeight=$(window).height();
var winWidth=$(window).width();

window.onresize = function(event) {
    winHeight=$(window).height();
	winWidth=$(window).width();
	rePosNarbar(narbar_pos);
	detectBrowserMode( winWidth );
};
function detectBrowserMode( winWidth ){
	if(winWidth>=768){
		browser_mode="destop";
		console.log("Destop Mode");
		$(document).trigger("startScroll");
	}else{
		browser_mode="mobile";
		console.log("Mobile Mode");
		$(document).trigger("disableScroll");
		rePosNarbar("top");
	}
}
//menu height is 50px fixed
function rePosNarbar(curPos){
	if(curPos==="bottom"){
		$("#menu").css({"top":(winHeight-50),"bottom":"0"});
	}else if(curPos==="top"){
		//console.log(curPos);
		$("#menu").css({"top":"0","bottom":(winHeight-50)});
	}
	narbar_pos=curPos;
}

function toggleMobileMenu(){
	if(browser_mode=="mobile"){
		console.log("toggleMobileMenu");
		if($("#mobile-menu").hasClass("active")){
			$("#mobile-menu").removeClass("active");
			$("#menu").css("left","0");
		}else{
			$("#mobile-menu").addClass("active");
			$("#menu").css("left","100%");
		}
	}
	return true;
}

 $(".container").ready(function(){
	//console.log(".container ready");
	init();
	$(".container").scrollingevent({
	   sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
	   easing: "cubic-bezier(0.45, 0, 0.58, 1)", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
	   animationTime: 900, // AnimationTime let you define how long each section takes to animate
	   pagination: false, // You can either show or hide the pagination. Toggle true for show, false for hide.
	   updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
	   enableScroll:true
	});
	
	//#menu animation ---- Start ---
	$("#menu").css({"top":(winHeight-50),"bottom":"0"});
	detectBrowserMode( winWidth );
	$(document).bind("in-intro", function(event){
		console.log("trigger in-intro");
		rePosNarbar("bottom");
	});	
	$(document).bind("out-intro", function(event){
		console.log("trigger out-intro");
		rePosNarbar("top");
	});
	
	//#menu animation ---- End --- */
}); 