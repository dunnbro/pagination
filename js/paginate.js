(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'), window, document);
    } else {
        factory(jQuery, window, document);
    }
})(function($, window, document, undefined) {
    'use strict';

    var paginate = {};

    paginate.init = function() {
        this.numPages = $('#story').children().length;
        this.sectionTerm = 'Part';
        this.addLocationHash();
        this.loadButtons();
        this.displaySetup();
        this.checkPage();
        this.buttons();
        this.eventListener();
    };

    paginate.loadButtons = function() {
        var buttons =
            '<div id="js-buttons" class="pag-nav">' +
            '<span class="pag-btnGroup pag-btnGroup--1">' +
            '<input type="button" value="First" id="js-first" class="pag-first">' +
            '<input type="button" value="Prev" id="js-previous" class="pag-prev">' +
            '</span>' +
            '<span class="pag-text">' +
            '<span class="u-block">' + this.sectionTerm + '</span> ' +
            '<span class="u-block"><span id="js-pagecount">1</span> of ' + paginate.numPages + '</span>' +
            '</span>' +
            '<span class="pag-btnGroup pag-btnGroup--2">' +
            '<input type="button" value="Next" id="js-next" class="pag-next">' +
            '<input type="button" value="Last" id="js-last" class="pag-last">' +
            '</span>' +
            '</div>';

        $('#story')
            .after(buttons);
        paginate.updatePageNumber();
    };

    paginate.checkPage = function() {
		//all buttons enabled unless it's the first or last page 
		$('#js-buttons input').prop('disabled', false);
		if ($('.js-currentchapter').index() === 0) {
			$('#js-first, #js-previous').prop('disabled', true);
		}
		if ($('.js-currentchapter').index() + 1 === paginate.numPages) {
			$('#js-last, #js-next').prop('disabled', true);
		}
	};

    paginate.updatePageNumber = function() {
        //updates page number in #js-pagecount
        $('#js-pagecount').text($('.js-currentchapter').index() + 1);
    };

    paginate.updateHash = function() {
        window.location.hash = 'section' + ($('.js-currentchapter').index() + 1);
    };

    paginate.buttons = function() {
        $('#js-buttons').on('click', 'input', function(event) {
            var $currentPage = $('.js-currentchapter');
			var $section = $('.js-storySection');
			var buttonType = {
				'js-first': $section.first(),
				'js-previous': $currentPage.prev(),
				'js-next': $currentPage.next(),
				'js-last': $section.last()
			};

            $currentPage.removeClass('js-currentchapter');
			buttonType[event.target.id].addClass('js-currentchapter');
            paginate.updatePageNumber();
            paginate.updateHash();
            paginate.checkPage();
        });
    };


    paginate.displaySetup = function() {
        //on page load, if no location.hash exists, simply show the first story section
        if (!window.location.hash) {
            $('.js-storySection').first().addClass('js-currentchapter');
            paginate.updatePageNumber();
        } else {
            //if location hash is already present on page load, show the appropriate story section
            var validHash = window.location.hash.replace('#section', '');
            $('#section' + validHash).addClass('js-currentchapter');
            paginate.updatePageNumber();
        }
    };

    paginate.addLocationHash = function() {
        //adds numbered section id to each storySection
        $('.js-storySection').each(function(i) {
            $(this).prop('id', 'section' + (i + 1));
        });
    };

    paginate.eventListener = function() {
        //on window.location.hash value change, checks that any typed hash value is valid, then displays the appropriate section
        $(window).on('hashchange', function() {
            var validHash = window.location.hash.replace('#section', '');
            if (validHash >= 1 && validHash <= paginate.numPages) {
                $('.js-currentchapter').removeClass('js-currentchapter');
                $('#section' + validHash).addClass('js-currentchapter');
                paginate.updatePageNumber();
                paginate.updateHash();
                paginate.checkPage();
            }
        });
    };

    paginate.init();
});