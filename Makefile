
# Binaries
BIN := ./node_modules/.bin

# Tasks
build: dist/elle.js dist/elle.min.js

test: build
	@open http://localhost:7000/test

server:
	@$(BIN)/serve --port 7000

clean: 
	@rm -rf node_modules
	@rm -rf dist

# Files	
dist/elle.js: index.js
	@mkdir -p $(@D)
	@$(BIN)/browserify $< -s Elle -o $@
dist/elle.min.js: index.js
	@mkdir -p $(@D)
	@$(BIN)/browserify $< -s Elle -o $@
	@cat $@ | $(BIN)/uglifyjs -m -o $@

node_modules: package.json
	@npm install
	
.PHONY: clean test