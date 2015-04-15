# Elle

Gives an organized, ES6 API for creating custom elements.

Inspired by Michael Macaulay's article on [simple custom elements](http://michaelmac.org/semantic-ui,/custom-elements,/ampersand,/backbone/2015/04/08/custom-elements-to-solve-simple-problems.html).

## Installation

Because the utility of this module pretty narrow (it's essentially just a more concise syntax), I've kept it off of npm. You can install it directly from Github.

```bash
npm install rosszurowski/elle
```

## Usage

```js
var Elle = require('elle');

class Dropdown extends Elle {
	// Custom elements have standard lifecycle events that you can hook into
	created() {
		console.log('Element created');
	}
	attached() {
		console.log('Element added to DOM');
	}
	attributeChanged(attributeName, previousValue, newValue) {
		console.log('Element attribute %s was changed from %s to %s', attributeName, previousValue, newValue);
	}
	detached() {
		console.log('Element removed from DOM');
	}
	// you may also add any custom methods that you'd like
	toggle() {
		console.log('Toggling dropdown');
	}
}

Dropdown.registerTag('x-dropdown', document);
```

You can then use the `x-dropdown` tag in your html.

```html
<x-dropdown>
	<div class="option">One</div>
	<div class="option">Two</div>
	<div class="option">Three</div>
</x-dropdown>
```

And access any custom properties directly from the DOM:

```js
document.querySelector('x-dropdown').toggle();
```

### Benefits 

Beyond the obvious semantic benefits for your HTML, this approach also helps work with re-used elements. Because the browser takes care of element initialization, you don't need to worry about boilerplate application start-up code.

The browser creates your components instead of you writing:

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

It also makes it easier to write your code in a modular way:

```js
class Timestamp extends Elle {
	attached() {
		// read and update timestamps
	}
}

Timestamp.registerTag('x-timestamp', document);

module.exports = Timestamp;
```


## Browser Support

Currently, [support for custom elements](http://caniuse.com/#feat=custom-elements) is flaky, even amongst up-to-date browsers. Luckily, the features behind Custom Elements can be easily polyfilled.

Elle exposes a shortcut to the [document-register-element](https://www.npmjs.com/package/document-register-element) polyfill, which adds about 6kb to your bundle. To include it, somewhere in your code run:

```js
require('elle/polyfill');
```

With the polyfill included, [Elle supports IE8+ and all modern browsers](https://www.npmjs.com/package/document-register-element#tested-on).

## Testing

```bash
make server
make test
```

## License

MIT
