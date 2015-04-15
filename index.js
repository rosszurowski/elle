"use strict";

// As per https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
const events = [
	'created',
	'attached',
	'detached',
	'attributeChanged'
];

class Elle extends HTMLElement {
	/**
	 * Registers the element as a tag in a given document context
	 * @param {String} name
	 * @param {HTMLDocument} context
	 * @returns {HTMLElement}
	 */
	static registerTag(name, context) {
		events.forEach(function(event) {
			let fn = this.prototype[event];
			if (typeof fn !== 'function') {
				return;
			}
			defineProp(this.prototype, `${event}Callback`, fn);
		}, this);
		return context.registerElement(name, { prototype: this.prototype });
	}
}

defineProp(Elle.prototype, 'state', {}, true);

function defineProp(obj, name, fn, writable) {
	Object.defineProperty(obj, name,  {
	 	configurable: false,
	 	enumerable: false,
	 	writable: writable || false,
	 	value: fn
	});
}

module.exports = Elle;