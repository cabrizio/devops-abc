APP_NAME=backend
PORT=5000

docker-build:
	docker build --tag $(APP_NAME) .

docker-run:
	 docker run -i -t -d --rm -p=$(PORT):$(PORT) --name="$(APP_NAME)" $(APP_NAME)

docker-tag:
	docker tag $(APP_NAME):latest $(APP_NAME):v1.0

docker-stop:
	docker stop $(APP_NAME)