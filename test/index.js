"use strict";

describe('Elle', function() {

	const IDLE = 'idle';
	const CREATED = 'created';
	const ATTACHED = 'attached';
	const DETACHED = 'detached';
	const TOGGLED = 'toggled';

	let tagName = 'semantic-dropdown';
	let status = IDLE;
	
	let fixtures = document.querySelector('#fixtures');

	class Dropdown extends Elle {
		created() { status = CREATED; console.log(this); }
		attached() { status = ATTACHED; }
		detached() { status = DETACHED; }
		attributeChanged(attr, prev, value) { status = { attr, prev, value }; }
		toggle() { status = TOGGLED; }
	}
	Dropdown.registerTag(tagName, document);


	beforeEach(function() {
		removeAllChildren(fixtures);
		status = IDLE;
	})
	
	it ('should create a registerable element', function() {
		let el = document.createElement(tagName);
		expect(el).to.be.instanceof(HTMLElement);
	});
	
	it ('should allow custom element methods', function() {
		expect(status).to.equal(IDLE);
		let el = document.createElement(tagName);
		el.toggle();
		expect(status).to.equal(TOGGLED);
	});
	
	it ('should allow elements without any defined lifecycle methods', function() {
		class Sample extends Elle {
			run() {}
		}
		Sample.registerTag('sample-element', document);
		let el = document.createElement('sample-element');
		fixtures.appendChild(el);
		el.run();
		fixtures.removeChild(el);
		el.run();
	});
	
	it ('should expose an editable state object', function() {
		let el = document.createElement(tagName);
		fixtures.appendChild(el);
		expect(el.state).to.be.an('object');
		el.state.hi = 5;
		expect(el.state.hi).to.equal(5);
		el.state = {};
		expect(el.state.hi).to.be.undefined;
	})
	
	describe('lifecycle events', function() {
		it ('should trigger create events', function() {
			expect(status).to.equal(IDLE);
			document.createElement(tagName);
			expect(status).to.equal(CREATED);
		})
		it ('should trigger attach events', function () {
			expect(status).to.equal(IDLE);
			let el = document.createElement(tagName);
			fixtures.appendChild(el);
			expect(status).to.equal(ATTACHED);
		});
		it ('should trigger attribute change events', function() {
			expect(status).to.equal(IDLE);
			let el = document.createElement(tagName);
			el.setAttribute('class', 'hi');
			expect(status.attr).to.equal('class');
			expect(status.prev).to.be.null;
			expect(status.value).to.equal('hi');
			el.className = 'yo';
			expect(status.attr).to.equal('class');
			expect(status.prev).to.equal('hi');
			expect(status.value).to.equal('yo');
		});
		it ('should trigger detach events', function() {
			expect(status).to.equal(IDLE);
			let el = document.createElement(tagName);
			fixtures.appendChild(el);
			fixtures.removeChild(el);
			expect(status).to.equal(DETACHED);
		});
	});
	
	/**
	 * A helper to remove all children from a given element
	 * @param {Element} el
	 */
	function removeAllChildren(el) {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	}
	
});