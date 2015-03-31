(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'), window, document);
    } else {
        factory(jQuery, window, document);
    }
})(function($, window, document, undefined) {
    'use strict';

var paginate = {};
var numPages = ($('#story').children().length);
	
	paginate.init = function(){
        paginate.sectionTerm = 'Part';
		paginate.loadButtons();
		paginate.displaySetup(); 
		paginate.checkPage();
		paginate.buttons();
		paginate.addLocationHash();
		paginate.eventListener();
		window.location.hash = "";
	};	
	
	
	paginate.loadButtons = function(){
		var buttons = 
            '<div id="js-buttons" class="pag-nav">' +
                '<span class="pag-btnGroup pag-btnGroup--1">' +
                    '<input type="button" value="First" id="js-first" class="pag-first">' +
                    '<input type="button" value="Prev" id="js-previous" class="pag-prev">' +
                '</span>' +
                '<span class="pag-text">' +
                    '<span class="u-block">' + this.sectionTerm + '</span> ' +
                    '<span class="u-block"><span id="js-pagecount">1</span> of ' + numPages + '</span>'+
                '</span>' +
                '<span class="pag-btnGroup pag-btnGroup--2">' +
                    '<input type="button" value="Next" id="js-next" class="pag-next">' +
                    '<input type="button" value="Last" id="js-last" class="pag-last">' +
                '</span>' +
            '</div>';

		$("#story")
			.after(buttons);
		paginate.updatePageNumber();
	}

	paginate.checkPage = function(){
		var finalPage = ($('.js-currentchapter').index()+1);
		
		if($('.js-currentchapter').index()=== 0) {
			$('#js-first').prop('disabled', true);
			$('#js-previous').prop('disabled', true);
			$('#js-last').prop('disabled', false);
			$('#js-next').prop('disabled', false);
			
		} else if (finalPage === numPages) {
			$('#js-last').prop('disabled', true);
			$('#js-next').prop('disabled', true);
			$('#js-first').prop('disabled', false);
			$('#js-previous').prop('disabled', false);
		} else {
			$('#js-first').prop('disabled', false);
			$('#js-last').prop('disabled', false);
			$('#js-previous').prop('disabled', false);
			$('#js-next').prop('disabled', false);
		}
	}

	paginate.updatePageNumber = function(){
		//updates page number in #js-pagecount
		var pageNumber = ($('.js-currentchapter').index()+1);
		$("#js-pagecount").text(pageNumber);
	}
	
	paginate.updateHash = function(){
		var pageNumber = ($('.js-currentchapter').index()+1);
		window.location.hash = "section" + pageNumber;
	}
	
	paginate.buttons = function(){
		$('#js-buttons').on('click', function(event) {
			var target = ($(event.target));
			var currentPage = $(".js-currentchapter");
			var firstPage = $(".js-storySection").first();
			var previousPage = currentPage.prev();
			var followingPage = currentPage.next();
			var lastPage = $(".js-storySection").last();
			var storyTop = $('#story').offset();
			
			if (target.is('input')){
				currentPage.removeClass('js-currentchapter');
				
				switch(event.target.id) {
					case 'js-first':
					firstPage.addClass('js-currentchapter');
					break;
					
					case 'js-previous':
					previousPage.addClass('js-currentchapter');
					break;
					
					case 'js-next':
					followingPage.addClass('js-currentchapter');
					break;
					
					case 'js-last':
					lastPage.addClass('js-currentchapter');
					break;
				}
				
				paginate.updatePageNumber();
				paginate.updateHash();
				paginate.checkPage();
				//window.scrollTo(storyTop.left, storyTop.top);
			}
		});
	}
	

	paginate.displaySetup = function() {
		$(".js-storySection").first().addClass('js-currentchapter');
		paginate.updatePageNumber();
	}	
	
	paginate.addLocationHash = function(){
		//adds numbered section id to each storySection
		$(".js-storySection").each(function(i) {
			var hashValue = "section" + (i++ + 1);
			$(this).prop("id", hashValue);
		});
	}
	
	paginate.eventListener = function(){
		//on window.location.hash value change, checks that any typed value is valid, then displays the appropriate section
		$(window).on("hashchange", function(e) {
			var validHash = window.location.hash.replace("#section", "");
			if (validHash >= 1 && validHash <= numPages) {
				var currentPage = $(".js-currentchapter");
				currentPage.removeClass("js-currentchapter");
				$("#section"+validHash).addClass("js-currentchapter");
				paginate.updatePageNumber();
				paginate.updateHash();
				paginate.checkPage();
			}
		});
	}
		
paginate.init();	
});
