GIT_TAG = $(shell git describe --tags `git rev-list --tags --max-count=1`)
BUILD_JS_DIR = dist

.PHONY: resolve-git
resolve-git:
	git fetch --all --tags

.PHONY: clean
clean:
	rm -rf $(BUILD_JS_DIR)

.PHONY: build-js
build-js: clean
	mkdir -p $(BUILD_JS_DIR)
	yarn install
	echo "$(GIT_TAG)"
	sed -i -e 's/v0.0.1/$(GIT_TAG)/g' package.json
	yarn build
	