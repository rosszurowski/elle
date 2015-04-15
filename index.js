"use strict";

// As per https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
var aliases = [
	{ name: 'created', callback: 'createdCallback' },
	{ name: 'attached', callback: 'attachedCallback' },
	{ name: 'attributeChanged', callback: 'attributeChangedCallback' },
	{ name: 'detached', callback: 'detachedCallback' }
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
	var proto = Object.create(self.prototype);

	aliases
		.filter(function(evt) { return typeof proto[evt.callback] !== 'function' })
		.filter(function(evt) { return typeof proto[evt.name] === 'function' })
		.forEach(function(evt) {
			defineProp(proto, evt.callback, proto[evt.name]);
			// Firefox and Safari freak out unless we remove the aliased functions
			proto[evt.name] = undefined;
		});

	return context.registerElement(name, { prototype: proto });
}

defineProp(Elle.prototype, 'state', {}, true);

module.exports = Elle;


function defineProp(obj, name, fn, writable) {
	Object.defineProperty(obj, name,  {
	 	enumerable: false,
	 	writable: writable || false,
	 	value: fn
	});
}