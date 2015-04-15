"use strict";

// As per https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
var events = [
	'created',
	'attached',
	'detached',
	'attributeChanged'
];

var Elle = function() {
	if (!(this instanceof Elle)) throw new TypeError('Cannot call a class as a function');
	HTMLElement.apply(this, arguments);
}
Elle.prototype = Object.create(HTMLElement.prototype);

/**
 * Registers the element as a tag in a given document context
 * @param {String} name
 * @param {HTMLDocument} context
 * @returns {HTMLElement}
 */
Elle.registerTag = function(name, context) {
	var self = this;
	events.forEach(function(event) {
		var fn = self.prototype[event];
		if (typeof fn !== 'function') return;
		defineProp(self.prototype, event + 'Callback', fn);
	});
	return context.registerElement(name, { prototype: this.prototype });
}

defineProp(Elle.prototype, 'state', {}, true);

module.exports = Elle;


function defineProp(obj, name, fn, writable) {
	Object.defineProperty(obj, name,  {
	 	configurable: false,
	 	enumerable: false,
	 	writable: writable || false,
	 	value: fn
	});
}