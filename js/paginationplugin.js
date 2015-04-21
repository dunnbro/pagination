/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "paginationplugin",
        defaults = {
            sectionTerm: 'Page'
			
        };
		

    // The actual plugin constructor
    function Plugin( element, options ) {
		self = this;
		this.element = element;
        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
		this._defaults = defaults;
        this._name = pluginName;
		this.init();
    }

    Plugin.prototype = {

        init: function() {
			this.numPages = $('#story').children().length;
			//this.sectionTerm = 'Part';
			this.addLocationHash();
			this.loadButtons();
			this.displaySetup();
			this.checkPage();
			$('#js-buttons').on('click', 'input', this.buttons);
			$(window).on('hashchange', this.hashListener);
			
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
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
			
			$('#story').after(buttons);
			this.updatePageNumber();
		},
		
		displaySetup: function() {
			//on page load, if no location.hash exists, simply show the first story section
			if (!window.location.hash) {
				$('.js-storySection').first().addClass('js-currentchapter');
				this.updatePageNumber();
			} else {
				//if location hash is already present on page load, show the appropriate story section
				var validHash = window.location.hash.replace('#section', '');
				$('#section' + validHash).addClass('js-currentchapter');
				this.updatePageNumber();
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
			//on window.location.hash value change, checks that any typed hash value is valid, then displays the appropriate section
			var validHash = window.location.hash.replace('#section', '');
			if (validHash >= 1 && validHash <= self.numPages) {
				$('.js-currentchapter').removeClass('js-currentchapter');
				$('#section' + validHash).addClass('js-currentchapter');
				self.updatePageNumber();
				self.updateHash();
				self.checkPage();
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
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );