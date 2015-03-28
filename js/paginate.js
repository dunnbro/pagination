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
		 
		loadButtons();
		displaySetup(); 
		 
		clickEvents(); 
		checkPage(); 
	};	
		
	function loadButtons(){
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
		updatePageNumber();
	}

	function clickEvents(){
		$('#js-next').on('click', nextPage);
		$('#js-previous').on('click', prevPage);
		$('#js-first').on('click', firstPage);
		$('#js-last').on('click', lastPage);
	}

	function checkPage(){

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

	function updatePageNumber(){
		//updates page number in #js-pagecount span
		var pageNumber = ($('.js-currentchapter').index()+1);
		$("#js-pagecount span").text(pageNumber);
	}

	function nextPage (){
		
		var currentPage = $(".js-currentchapter");
		var followingPage = currentPage.next();
		
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		followingPage
			.show()
			.addClass('js-currentchapter');
			
		updatePageNumber();
		checkPage();
		
	}

	function prevPage(){

		var currentPage = $(".js-currentchapter");
		var previousPage = currentPage.prev();
		
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		previousPage
			.show()
			.addClass('js-currentchapter');
			
		updatePageNumber();
		checkPage();
		
	}

	function firstPage(){
		var currentPage = $(".js-currentchapter");
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		$(".js-storySection").first()
			.show()
			.addClass('js-currentchapter');
			
		updatePageNumber();
		checkPage();
		
	}

	function lastPage(){
		var currentPage = $(".js-currentchapter");
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		
		$(".js-storySection").last()
			.show()
			.addClass('js-currentchapter');
			
		updatePageNumber();
		checkPage();
	}


	function displaySetup() {
	    $(".js-storySection")
			.css('display', 'none');
		$(".js-storySection").first().addClass('js-currentchapter');
		$(".js-currentchapter")
			.css('display', 'block');
		updatePageNumber();
	}	
		
paginate.init();	
});
