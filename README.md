# Pagination

v2.0.0

Takes a collections of elements and allows them to be viewed one at a time, with sequential navigation for the first, last, next, and previous element.

## Usage
i. Start with a container element with a class or id on it. Each child element of that container element will be used for generating the pagination, and should have a class of `js-storySection`. If you want to use a different class name you can, but need to pass it as an option when you call the `paginate` method. See the [demo](/demo/index.html) for an example of how to set this up.

ii. Include jQuery and paginate.js.

with script tags:
```
<script src="/path/to/jquery.js"></script>
<script src="/path/to/paginate.js"></script>
```

as CommonJS module:
```
var $ = require('jquery');
require('jquery-mock-pagination');
```

iii. Select the container element with jquery and call the paginate method, passing any options.

```
$('#story').paginate({
	storySection: 'sectionClassName'
});
```

## Options
+ **sectionTerm** (*default: "Page"*) - The term used to refer to an individual section, this is displayed in the navigation area.
+ **storySection** (*default: "js-storySection"*) - The classname used to distinguish each child element of the container element.
+ **hashTerm** (*default: "section"*) - The location.hash name, displayed in the url so a section can be linked to directly.
+ **currentSection** (*default: "js-currentChapter"*) - The classname used to indicate the element currently visible.

## Dependencies
+ jQuery

## Credits
[jQuery Boilerplate](http://jqueryboilerplate.com/)

## License
The MIT License (MIT).