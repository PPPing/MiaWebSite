!function($){
  
  var defaults = {
    sectionContainer: "section",   
    animationTime: 1000,
	};
	
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
	
	$.fn.scrollingevent = function(options){
	 var settings = $.extend({}, defaults, options),
		el = $(this),
		sections = $(settings.sectionContainer),
		total = sections.length,
		curIndex=1;
		lastAnimation = 0,
		quietPeriod = 500;
	
	  $.fn.moveDown = function() {
		console.log("moveDown");
		var actions=$(settings.sectionContainer + ".active").data("action").split(",");
		var actionIndex=$(settings.sectionContainer + ".active").data("action-index");
		//var events=$(settings.sectionContainer + ".active").data("action-event").split(",");
		var nextIndex=actionIndex+1;
		if(nextIndex<actions.length){
			console.log(actions[actionIndex]);		
			$(settings.sectionContainer + ".active").removeClass(actions[actionIndex]).addClass(actions[nextIndex]).data("action-index",nextIndex);
			if(nextIndex===(actions.length-1)){				
				current = $(settings.sectionContainer + "[data-index='" + curIndex + "']");
				next = $(settings.sectionContainer + "[data-index='" + (curIndex + 1) + "']");
				if(next.length>0) {
					//console.log("next section");
					//console.log(curIndex);
					//console.log(next);
					current.removeClass("active");
					next.addClass("active");
					actions=$(settings.sectionContainer + ".active").data("action").split(",");
					actionIndex=$(settings.sectionContainer + ".active").data("action-index");
					//events=$(settings.sectionContainer + ".active").data("action-event").split(",");
					next.addClass(actions[actionIndex]);
					//console.log("nextAction:"+actions[actionIndex]+"-"+actionIndex);
					$(document).trigger(current.attr("id")+"Hide");
					$(document).trigger(next.attr("id")+"Show");
					curIndex=$(settings.sectionContainer + ".active").data("index");
				}
			}	
		}
	}
    
    $.fn.moveUp = function() {
		console.log("moveUp");
		var actions=$(settings.sectionContainer + ".active").data("action").split(",");
		var actionIndex=$(settings.sectionContainer + ".active").data("action-index");	
		var nextIndex=actionIndex-1;
		if(nextIndex>=0){
			//console.log(actions[actionIndex]);
			$(settings.sectionContainer + ".active").removeClass(actions[actionIndex]).addClass(actions[nextIndex]).data("action-index",nextIndex);	
		}else{
			//console.log("next section");
			//console.log(curIndex);
			current = $(settings.sectionContainer + "[data-index='" + curIndex + "']");
			next = $(settings.sectionContainer + "[data-index='" + (curIndex - 1) + "']");
			if(next.length>0) {
				current.removeClass("active").removeClass(actions[actionIndex]);
				next.addClass("active");
				actions=$(settings.sectionContainer + ".active").data("action").split(",");
				actionIndex=$(settings.sectionContainer + ".active").data("action-index");
				next.removeClass(actions[actionIndex]).addClass(actions[actionIndex-1]).data("action-index",actionIndex-1);
				$(document).trigger(current.attr("id")+"Hide");
				$(document).trigger(next.attr("id")+"Show");
				curIndex=$(settings.sectionContainer + ".active").data("index");
			}
		}
	}
	
	$.fn.goTo=function(t_index){
			console.log("Test GO TO"+":"+t_index);
			var offset=t_index-curIndex;
			while(offset!=0){
				if(offset>0){
					el.moveDown();
				}else{
					el.moveUp();
				}
				offset=t_index-curIndex;
				//console.log(offset);
			}
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
		  el.moveDown()
        } else {
          el.moveUp()
        }
        lastAnimation = timeNow;
		
		el.swipeEvents().bind("swipeDown",  function(){ 
		console.log("moveUp");
		el.moveUp();
		}).bind("swipeUp", function(){ 
		console.log("moveDown");
		el.moveDown(); 
		}); 
    }
	
	$(document).bind('mousewheel DOMMouseScroll', function(event) {
		event.preventDefault();
		var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
		init_scroll(event, delta);		
		});
		
	$.each( sections, function(i) {
      $(this).attr("data-index", i+1);	  
    });
	$(settings.sectionContainer + "[data-index='1']").addClass("active");
	var actions=$(settings.sectionContainer + ".active").data("action").split(",");
	var actionIndex=$(settings.sectionContainer + ".active").data("action-index");
	var events=$(settings.sectionContainer + ".active").data("action-event").split(",");
	$(settings.sectionContainer + ".active").addClass(actions[0]);
	$(document).trigger(events[0]);
	console.log('trigger:'+events[0]);
	}
	
}(window.jQuery);