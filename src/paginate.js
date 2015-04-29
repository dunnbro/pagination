(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'), window, document);
    } else {
        factory(jQuery, window, document);
    }
})(function($, window, document, undefined) {
    // Create the defaults once
    var pluginName = 'paginate';
    var defaults = {
        sectionTerm: 'Page'
    };

    // The actual plugin constructor
    function Plugin(element, options) {
		this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var self = this;
            this.numPages = $(this.element).children().length;
            this.addLocationHash();
            this.loadButtons();
            this.displaySetup();
            this.checkPage();
            $('#js-buttons').on('click', 'input', function(event) {
                self.buttons(event);
            });
            $(window).on('hashchange', function(event) {
                self.hashListener(event);
            });
        },

        addLocationHash: function() {
            //adds numbered section id to each storySection
            $('.js-storySection').each(function(i) {
                $(this).prop('id', 'section' + (i + 1));
            });
        },

        loadButtons: function() {
            var buttons =
                '<div id="js-buttons" class="pag-nav">' +
                '<span class="pag-btnGroup pag-btnGroup--1">' +
                '<input type="button" value="First" id="js-first" class="pag-first">' +
                '<input type="button" value="Prev" id="js-previous" class="pag-prev">' +
                '</span>' +
                '<span class="pag-text">' +
                '<span class="u-block">' + this.options.sectionTerm + '</span> ' +
                '<span class="u-block"><span id="js-pagecount">1</span> of ' + this.numPages + '</span>' +
                '</span>' +
                '<span class="pag-btnGroup pag-btnGroup--2">' +
                '<input type="button" value="Next" id="js-next" class="pag-next">' +
                '<input type="button" value="Last" id="js-last" class="pag-last">' +
                '</span>' +
                '</div>';

            $(this.element).after(buttons);
            this.updatePageNumber();
        },

		/*
        displaySetup: function() {
			var validHash = window.location.hash.replace('#section', '');
			if (window.location.hash.indexOf('#section') === 0) {
				if (validHash >= 1 && validHash <= this.numPages) {
					$('#section' + validHash).addClass('js-currentchapter');
					
				} else {
					$('.js-storySection').first().addClass('js-currentchapter');
				}
			} else {
				$('.js-storySection').first().addClass('js-currentchapter');
			}
			
			this.updatePageNumber();
		},
		*/
		
		displaySetup: function() {
			var hashValue = window.location.hash.replace('#section', '');

			if (hashValue >= 1 && hashValue <= this.numPages) {
				if (window.location.hash.indexOf('#section') === 0) {
					$('#section' + hashValue).addClass('js-currentchapter');
				}
			} else {
				$('.js-storySection').first().addClass('js-currentchapter');
			}

			this.updatePageNumber();
		},

        checkPage: function() {
            //all buttons enabled unless it's the first or last page
            $('#js-buttons input').prop('disabled', false);
            if ($('.js-currentchapter').index() === 0) {
                $('#js-first, #js-previous').prop('disabled', true);
            }
            if ($('.js-currentchapter').index() + 1 === this.numPages) {
                $('#js-last, #js-next').prop('disabled', true);
            }
            //hide all sections except for the current chapter
            $('.js-storySection').css('display', 'none');
            $('.js-currentchapter').css('display', 'block');
        },

        buttons: function(event) {
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
            this.updatePageNumber();
            this.updateHash();
            this.checkPage();
        },

        hashListener: function() {
            //on window.location.hash value change,
            //checks that any typed hash value is valid, then displays the appropriate section
            var validHash = window.location.hash.replace('#section', '');
			if (window.location.hash.indexOf('#section') === 0) {
				if (validHash >= 1 && validHash <= this.numPages) {
					$('.js-currentchapter').removeClass('js-currentchapter');
					$('#section' + validHash).addClass('js-currentchapter');
					this.updatePageNumber();
					this.updateHash();
					this.checkPage();
				} 
			}
        },

        updatePageNumber: function() {
            //updates page number in #js-pagecount
            $('#js-pagecount').text($('.js-currentchapter').index() + 1);
        },

        updateHash: function() {
            window.location.hash = 'section' + ($('.js-currentchapter').index() + 1);
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

});