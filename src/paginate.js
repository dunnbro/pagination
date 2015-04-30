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
        sectionTerm: 'Page',
		storySection: 'js-storySection',
		hashTerm: 'section',
		currentSection: 'js-currentChapter'
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
			this.sectionName = '.' + this.options.storySection;
            this.numPages = $(this.element).children().length;
            this.addLocationHash(self);
            this.loadButtons();
            this.displaySetup();
            this.checkPage();
            $('#pag-buttons').on('click', 'input', function(event) {
                self.buttons(event);
            });
            $(window).on('hashchange', function(event) {
                self.hashListener(event);
            });
        },

        addLocationHash: function(self) {
            //adds numbered section id to each storySection
            $(this.sectionName).each(function(i) {
                $(this).prop('id', self.options.hashTerm + (i + 1));
            });
        },

        loadButtons: function() {
            var buttons =
                '<div id="pag-buttons" class="pag-nav">' +
                '<span class="pag-btnGroup pag-btnGroup--1">' +
                '<input type="button" value="First" id="pag-firstButton" class="pag-first">' +
                '<input type="button" value="Prev" id="pag-previousButton" class="pag-prev">' +
                '</span>' +
                '<span class="pag-text">' +
                '<span class="u-block">' + this.options.sectionTerm + '</span> ' +
                '<span class="u-block"><span id="pag-pagecount">1</span> of ' + this.numPages + '</span>' +
                '</span>' +
                '<span class="pag-btnGroup pag-btnGroup--2">' +
                '<input type="button" value="Next" id="pag-nextButton" class="pag-next">' +
                '<input type="button" value="Last" id="pag-lastButton" class="pag-last">' +
                '</span>' +
                '</div>';

            $(this.element).after(buttons);
            this.updatePageNumber();
        },
		
		displaySetup: function() {
			var hashValue = window.location.hash.replace('#' + this.options.hashTerm, '');

			if (hashValue >= 1 && hashValue <= this.numPages) {
				if (window.location.hash.indexOf('#' + this.options.hashTerm) === 0) {
					$('#' + this.options.hashTerm + hashValue).addClass(this.options.currentSection);
				}
			} else {
				$(this.sectionName).first().addClass(this.options.currentSection);
			}

			this.updatePageNumber();
		},

        checkPage: function() {
            //all buttons enabled unless it's the first or last page
            $('#pag-buttons input').prop('disabled', false);
            if ($('.' + this.options.currentSection).index() === 0) {
                $('#pag-firstButton, #pag-previousButton').prop('disabled', true);
            }
            if ($('.' + this.options.currentSection).index() + 1 === this.numPages) {
                $('#pag-lastButton, #pag-nextButton').prop('disabled', true);
            }
            //hide all sections except for the current chapter
            $(this.sectionName).css('display', 'none');
            $('.' + this.options.currentSection).css('display', 'block');
        },

        buttons: function(event) {
            var $currentPage = $('.' + this.options.currentSection);
            var $section = $(this.sectionName);
            var buttonType = {
                'pag-firstButton': $section.first(),
                'pag-previousButton': $currentPage.prev(),
                'pag-nextButton': $currentPage.next(),
                'pag-lastButton': $section.last()
            };

            $currentPage.removeClass(this.options.currentSection);
            buttonType[event.target.id].addClass(this.options.currentSection);
            this.updatePageNumber();
            this.updateHash();
            this.checkPage();
        },

        hashListener: function() {
            //on window.location.hash value change,
            //checks that any typed hash value is valid, then displays the appropriate section
            var validHash = window.location.hash.replace('#' + this.options.hashTerm, '');
			if (window.location.hash.indexOf('#' + this.options.hashTerm) === 0) {
				if (validHash >= 1 && validHash <= this.numPages) {
					$('.' + this.options.currentSection).removeClass(this.options.currentSection);
					$('#' + this.options.hashTerm + validHash).addClass(this.options.currentSection);
					this.updatePageNumber();
					this.updateHash();
					this.checkPage();
				} 
			}
        },

        updatePageNumber: function() {
            //updates page number in #pag-pagecount
            $('#pag-pagecount').text($('.' + this.options.currentSection).index() + 1);
        },

        updateHash: function() {
            window.location.hash = this.options.hashTerm + ($('.' + this.options.currentSection).index() + 1);
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