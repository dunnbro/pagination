var paginate = {};

	paginate.init = function(){
		displaySetup(); //hides everything except first chapter on page load
		loadButtons(); //loads the buttons!
		clickEvents(); 
		checkPage(); //checks if the current page is the first or last and disables buttons accordingly
	}	
		
	function loadButtons(){

		$("#story")
			.after('<div id="js-buttons">');
		$('#js-buttons')
			.append('<input type="button" value="First" id="js-first">')
			.append('<input type="button" value="Prev" id="js-previous">')
			.append('<span id="js-pagecount"></span>')
			.append('<input type="button" value="Next" id="js-next">')
			.append('<input type="button" value="Last" id="js-last">');
				
		updatePageNumber();
	}

	function clickEvents(){
		$('#js-next').on('click', nextPage);
		$('#js-previous').on('click', prevPage);
		$('#js-first').on('click', firstPage);
		$('#js-last').on('click', lastPage);
	}

	function checkPage(){

		var finalPage = (parseInt($('.js-currentchapter').index())+1);
		var numPages = parseInt($('#story').children().size());
		
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

		var numPages = parseInt($('#story').children().size());
		var pageNumber = parseInt($('.js-currentchapter').index()+1);
		$("#js-pagecount").text("Chapter" + " " + pageNumber + " " + "of" + " " + numPages);

	}

	function nextPage (){
		
		var currentPage = $(".js-currentchapter");
		var nextPage = currentPage.next();
		
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		nextPage
			.show()
			.addClass('js-currentchapter');
			
		updatePageNumber();
		checkPage();
		
	}

	function prevPage(){

		var currentPage = $(".js-currentchapter");
		var prevPage = currentPage.prev();
		
		currentPage
			.hide()
			.removeClass('js-currentchapter');
		prevPage
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
			.hide();
		$(".js-storySection").first().addClass('js-currentchapter');
		$(".js-currentchapter").show();
	}	
		
paginate.init();	
	


