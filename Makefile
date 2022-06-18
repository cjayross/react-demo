ORG_NAME ?= demo
APP_NAME ?= `grep '"name":' package.json | cut -d '"' -f4`
APP_VERSION ?= `grep '"version":' package.json | cut -d '"' -f4`
BUILD ?= `git rev-parse --short HEAD`

build:
	docker build \
		-t $(ORG_NAME)/$(APP_NAME):$(APP_VERSION)-$(BUILD) \
		-t $(ORG_NAME)/$(APP_NAME):latest .

run:
	docker run \
		-p 3000:3000 \
		--env-file .env \
		--env-file .env.local \
		--rm -it $(ORG_NAME)/$(APP_NAME):latest
