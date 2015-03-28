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
		paginate.loadButtons();
		paginate.displaySetup(); 
		paginate.clickEvents(); 
		paginate.checkPage(); 
	};	
		
	paginate.loadButtons = function(){
		var buttons = 
            '<div id="js-buttons" class="pag-nav">' +
                '<span class="pag-btnGroup--1">' +
                    '<input type="button" value="First" id="js-first" class="pag-first">' +
                    '<input type="button" value="Prev" id="js-previous" class="pag-prev">' +
                '</span>' +
                '<span id="js-pagecount" class="pag-text">section <span>1</span> of ' + numPages + '</span>' +
                '<span class="pag-btnGroup--2">' +
                    '<input type="button" value="Next" id="js-next" class="pag-next">' +
                    '<input type="button" value="Last" id="js-last" class="pag-last">' +
                '</span>' +
            '</div>';

		$("#story")
			.after(buttons);
		paginate.updatePageNumber();
	}

	paginate.clickEvents = function(){
		$('#js-next').on('click', paginate.nextPage);
		$('#js-previous').on('click', paginate.prevPage);
		$('#js-first').on('click', paginate.firstPage);
		$('#js-last').on('click', paginate.lastPage);
	}

	paginate.checkPage = function(){

		var finalPage = ($('.js-currentchapter').index()+1);
		var numPages = ($('#story').children().length);
		
		if($('.js-currentchapter').index()=== 0){
			$('#js-first').prop('disabled', true);
			$('#js-previous').prop('disabled', true);
			$('#js-last').prop('disabled', false);
			$('#js-next').prop('disabled', false);
			
		}
		
		else if(finalPage === numPages){
			$('#js-last').prop('disabled', true);
			$('#js-next').prop('disabled', true);
			$('#js-first').prop('disabled', false);
			$('#js-previous').prop('disabled', false);
		}
		
		else {
			$('#js-first').prop('disabled', false);
			$('#js-last').prop('disabled', false);
			$('#js-previous').prop('disabled', false);
			$('#js-next').prop('disabled', false);
		}
		
	}

	paginate.updatePageNumber = function(){
		//updates page number in #js-pagecount span
		var pageNumber = ($('.js-currentchapter').index()+1);
		$("#js-pagecount span").text(pageNumber);
	}

	paginate.nextPage = function(){
		
		var currentPage = $(".js-currentchapter");
		var followingPage = currentPage.next();
		
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		followingPage
			.show()
			.addClass('js-currentchapter');
			
		paginate.updatePageNumber();
		paginate.checkPage();
		
	}

	paginate.prevPage = function(){

		var currentPage = $(".js-currentchapter");
		var previousPage = currentPage.prev();
		
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		previousPage
			.show()
			.addClass('js-currentchapter');
			
		paginate.updatePageNumber();
		paginate.checkPage();
		
	}

	paginate.firstPage = function(){
		var currentPage = $(".js-currentchapter");
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		$(".js-storySection").first()
			.show()
			.addClass('js-currentchapter');
			
		paginate.updatePageNumber();
		paginate.checkPage();
		
	}

	paginate.lastPage = function(){
		var currentPage = $(".js-currentchapter");
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		
		$(".js-storySection").last()
			.show()
			.addClass('js-currentchapter');
			
		paginate.updatePageNumber();
		paginate.checkPage();
	}


	paginate.displaySetup = function() {
		$(".js-storySection").first().addClass('js-currentchapter');
		paginate.updatePageNumber();
	}	
		
paginate.init();	
});
