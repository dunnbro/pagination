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
		self = this;
		this.element = element;
        this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
        this._name = pluginName;
		this.init();
    }

    Plugin.prototype = {
        init: function() {
			this.numPages = $(this.element).children().length;
			this.addLocationHash();
			this.loadButtons();
			this.displaySetup();
			this.checkPage();
			$('#js-buttons').on('click', 'input', this.buttons);
			$(window).on('hashchange', this.hashListener);
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

		displaySetup: function() {
			var validHash = window.location.hash.replace('#section', '');
			//on page load, if no location.hash exists, simply show the first story section
			if (!window.location.hash) {
				$('.js-storySection').first().addClass('js-currentchapter');
				this.updatePageNumber();
			} 
			//if hash exists, ensure that it begins with '#section' -- 
			//hash.Listener then checks that the section number is valid
			if (window.location.hash) {
				if (window.location.hash.indexOf('#section') === 0) {
					this.hashListener();
				} 
			}
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
			self.updatePageNumber();
			self.updateHash();
			self.checkPage();

		},

		hashListener: function() {
			//on window.location.hash value change,
            //checks that any typed hash value is valid, then displays the appropriate section
			var validHash = window.location.hash.replace('#section', '');
			if (validHash >= 1 && validHash <= self.numPages) {
				$('.js-currentchapter').removeClass('js-currentchapter');
				$('#section' + validHash).addClass('js-currentchapter');
				self.updatePageNumber();
				self.updateHash();
				self.checkPage();
			} else {
				window.location = window.location.href.replace( /#.*/, "");
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
    $.fn[pluginName] = function (options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            }
        });
    };

});
