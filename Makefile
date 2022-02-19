start: docker-down-clear docker-pull docker-build node-install json-server-start node-server-start
stop: docker-down-clear

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-build:
	docker-compose build

docker-pull:
	docker-compose pull

node-install:
	docker-compose run --rm node npm install

node-update:
	docker-compose run --rm node npm update --save

node-build:
	docker-compose run --rm node npm run build

node-server-start:
	docker-compose up node-server

json-server-start:
	docker-compose up -d json-server

nodec:
	docker-compose run --rm node ${c}
