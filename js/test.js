
$('.container').ready(function(){
	
	console.log('test.js : ready');
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
}); 