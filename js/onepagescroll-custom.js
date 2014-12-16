!function($){
  
  var defaults = {
    sectionContainer: "section",
    easing: "ease",
    animationTime: 1000,
    pagination: true,
    updateURL: false,
	enableScroll:true
	};
	
	/*------------------------------------------------*/
	/*  Credit: Eike Send for the awesome swipe event */    
	/*------------------------------------------------*/
	
	$.fn.swipeEvents = function() {
      return this.each(function() {

        var startX,
            startY,
            $this = $(this);

        $this.bind('touchstart', touchstart);

        function touchstart(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            startX = touches[0].pageX;
            startY = touches[0].pageY;
            $this.bind('touchmove', touchmove);
          }
          event.preventDefault();
        }

        function touchmove(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            var deltaX = startX - touches[0].pageX;
            var deltaY = startY - touches[0].pageY;

            if (deltaX >= 50) {
              $this.trigger("swipeLeft");
            }
            if (deltaX <= -50) {
              $this.trigger("swipeRight");
            }
            if (deltaY >= 50) {
              $this.trigger("swipeUp");
            }
            if (deltaY <= -50) {
              $this.trigger("swipeDown");
            }
            if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
              $this.unbind('touchmove', touchmove);
            }
          }
          event.preventDefault();
        }

      });
    };
	

  $.fn.onepage_scroll = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        sections = $(settings.sectionContainer)
        total = sections.length,
        status = "off",
        topPos = 0,
        lastAnimation = 0,
        quietPeriod = 500,
        paginationList = "";
		curPos=0;
		pauseScroll=false;
    
    $.fn.transformPage = function(settings, pos) {
      $(this).css({
        "-webkit-transform": "translate3d(0, " + pos + "%, 0)", 
        "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
        "-moz-transform": "translate3d(0, " + pos + "%, 0)", 
        "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
        "-ms-transform": "translate3d(0, " + pos + "%, 0)", 
        "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
        "transform": "translate3d(0, " + pos + "%, 0)", 
        "transition": "all " + settings.animationTime + "ms " + settings.easing
      });
	  curPos=pos;
    }
    
    $.fn.moveDown = function() {
      var el = $(this)
	  console.log(el);
      index = $(settings.sectionContainer +".active").data("index");
      if(index < total) {
        current = $(settings.sectionContainer + "[data-index='" + index + "']");
        next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
        if(next) {
          current.removeClass("active");
          next.addClass("active"); 
		  $(document).trigger("in-"+next.attr("id"));
		  $(document).trigger("out-"+current.attr("id"));		  
          $(".primary-links li a" + "[data-index='" + index + "']").removeClass("active");
          $(".primary-links li a" + "[data-index='" + (index + 1) + "']").addClass("active");
          
          $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          $("body").addClass("viewing-page-"+next.data("index"));
        }
        pos = (index * 100) * -1;
        el.transformPage(settings, pos);
      }
    }
    
    $.fn.moveUp = function() {
      var el = $(this)
      index = $(settings.sectionContainer +".active").data("index");
      if(index <= total && index > 1) {
        current = $(settings.sectionContainer + "[data-index='" + index + "']");
        next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");

        if(next) {
          current.removeClass("active");
          next.addClass("active");
		  $(document).trigger("in-"+next.attr("id"));
		  $(document).trigger("out-"+current.attr("id"));
		  
          $(".primary-links li a" + "[data-index='" + index + "']").removeClass("active");
          $(".primary-links li a" + "[data-index='" + (index - 1) + "']").addClass("active");
          
          $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          $("body").addClass("viewing-page-"+next.data("index"));
        }
        pos = ((next.data("index") - 1) * 100) * -1;
        el.transformPage(settings, pos);
      }
    }
	
	$.fn.disableScroll=function(){
		var el = $(this)
		el.css({
        "-webkit-transform": "none",       
        "-moz-transform": "none",       
        "-ms-transform": "none",        
        "transform": "none",        
		});
		el.removeClass("onepage-wrapper").css("position","static");
		$(document).unbind('mousewheel DOMMouseScroll');
		/* el.swipeEvents().unbind("swipeDown"); */
	}
	$.fn.enableScroll=function(){
		var el = $(this)
		el.addClass("onepage-wrapper").css("position","relative");
		el.transformPage(settings, curPos);
		$(document).bind('mousewheel DOMMouseScroll', function(event) {
		event.preventDefault();
		if(settings.enableScroll===true){
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
				init_scroll(event, delta);
			}else{
		
			}
		});
		el.swipeEvents().bind("swipeDown",  function(){ 
		console.log("moveUp");
		el.moveUp();
		}).bind("swipeUp", function(){ 
		console.log("moveDown");
		el.moveDown(); 
		}); 
	}
	
	$.fn.pauseScroll=function(){
		$(document).unbind('mousewheel DOMMouseScroll');
	}
	$.fn.resumeScroll=function(){
		$(document).bind('mousewheel DOMMouseScroll', function(event) {
		event.preventDefault();
		if(settings.enableScroll===true){
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
				init_scroll(event, delta);
			}else{
		
			}
		});
	}
    
    function init_scroll(event, delta) {
        deltaOfInterest = delta;
        var timeNow = new Date().getTime();
        // Cancel scroll if currently animating or within quiet period
        if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
            event.preventDefault();
            return;
        }

        if (deltaOfInterest < 0) {
          console.log("moveDown");
		  el.moveDown()
        } else {
		 console.log("moveUp");
          el.moveUp()
        }
        lastAnimation = timeNow;
    }
    
    // Prepare everything before binding wheel scroll
    
    el.addClass("onepage-wrapper").css("position","relative");
    $.each( sections, function(i) {
      $(this).css({
        position: "absolute-test",
        top: topPos + "%"
      }).addClass("section").attr("data-index", i+1);
      topPos = topPos + 100;
	  $(".primary-links>li>a:eq("+i+")").attr("data-index",(i+1));
    });
    
    /* el.swipeEvents().bind("swipeDown",  function(){ 
      console.log("moveUp");
	  el.moveUp();
    }).bind("swipeUp", function(){ 
      console.log("moveDown");
	  el.moveDown(); 
    });  */
     
    $(settings.sectionContainer + "[data-index='1']").addClass("active");
    $("body").addClass("viewing-page-1");
	
	$(".primary-links li a").click(function (){
        var page_index = $(this).data("index");
		console.log("data-index:"+page_index);
        if (page_index!=null&&!$(this).hasClass("active")) {
			if(pauseScroll==true){
				$(document).trigger("toggleScroll");
			}
          current = $(settings.sectionContainer + ".active")
          next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");
          if(next) {
			var nextId=next.attr("id");
			var curId=current.attr("id");
			if(nextId!=curId){
				$(document).trigger("in-"+next.attr("id"));
				$(document).trigger("out-"+current.attr("id"));
			}
            current.removeClass("active")
            next.addClass("active")
            $(".primary-links li a" + ".active").removeClass("active");
            $(".primary-links li a" + "[data-index='" + (page_index) + "']").addClass("active");
            $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
            $("body").addClass("viewing-page-"+next.data("index"))
          }
          pos = ((page_index-1 ) * 100) * -1;
          el.transformPage(settings, pos);
        }
		
    });
    
    $(document).bind('toggleScroll',function(event){
		if(pauseScroll==false){
			el.pauseScroll();
			pauseScroll=true;
		}else{
			el.resumeScroll();
			pauseScroll=false;
		}
	});
	
	$(document).bind('disableScroll',function(event){
		settings.enableScroll=false;
		el.disableScroll();
	});
	$(document).bind('startScroll',function(event){
		settings.enableScroll=true;
		el.enableScroll();
	});
    return false;
    
  }
  
}(window.jQuery);