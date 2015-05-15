# Pagination

v2.0.0

Takes a collections of elements and allows them to be viewed one at a time, with sequential navigation for the first, last, next, and previous element.

## Usage
i. Put the entire piece of writing in a container `<div>`, and each section of it in a separate `<div>` within the container. See the [demo](/demo/index.html) for an example of how to set this up.

ii. Include jQuery and paginate.js.

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="../src/paginate.js"></script>
```

as CommonJS module:
```
var $ = require('jquery');
require('jquery-mock-pagination');
```

iii. Start paginate on the container `<div>`, and specify the class name of the section `<div>` ('js-storySection' by default).

```
$('#story').paginate({
	storySection: 'sectionClassName'
});
```

## Options
+ **sectionTerm** (*default: "Page"*) - The section name, displayed in the navigation
+ **storySection** (*default: "js-storySection"*) - 
+ **hashTerm** (*default: "section"*) - The location.hash name, displayed in the url
+ **currentSection** (*default: "js-currentChapter"*) - 

## Dependencies
+ jQuery

## Credits
[jQuery Boilerplate](http://jqueryboilerplate.com/)

## License
The MIT License (MIT).