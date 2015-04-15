# Elle

Gives an organized, ES6 API for creating custom elements.

Inspired by Michael Macaulay's article on [simple custom elements](http://michaelmac.org/semantic-ui,/custom-elements,/ampersand,/backbone/2015/04/08/custom-elements-to-solve-simple-problems.html).

## Installation

```bash
npm install rosszurowski/elle
```

Because the value of this utility module pretty narrow, I've kept it off of npm.

## Usage

```js
var Elle = require('elle');

class Dropdown extends Elle {
	// fires on `document.createElement`
	created() {
	}
	// fires when the element is added to the DOM
	attached() {
		$(this).dropdown();
	}
	// fires when an attribute has changed
	attributeChanged() {
	}
	// fires when the element has been detached from the DOM
	detached() {
	}
}

Dropdown.registerTag('x-dropdown', document);
```

This approach is particularly useful for elements re-used across pages. Rather than grouping all your code in a `DOMContentLoaded` event handler, you can use semantic markup and have the elements take care of their own behaviour.

Rather than:
```js
$(document).ready(function() {
	$('.timestamp').each(function(el) {
		// read and update timestamps
	});
	$('.dropdown').each(function(el) {
		// initialize dropdown
	});
	// etc...
});
```

You can write your components as modules:

```js
class Timestamp extends Elle {
	attached() {
		// read and update timestamps
	}
}

Timestamp.registerTag('x-timestamp', document);
```

And then simply use them in HTML.

```html
<x-timestamp>1429071739835</x-timestamp>
<x-dropdown>
	<div>Option 1</div>
	<div>Option 2</div>
	<div>Option 3</div>
</x-dropdown>
```


## Browser Support

Currently, [support for custom elements](http://caniuse.com/#feat=custom-elements) is flaky, even amongst modern browsers. Luckily, the features behind Custom Elements can be easily polyfilled.

Elle exposes a shortcut to the [custom-elements](https://github.com/oliver-moran/custom-elements) polyfill. To include it, somewhere in your code, run:

```js
require('elle/polyfill');
```

## Testing

```bash
make server
make test
```

## License

MIT