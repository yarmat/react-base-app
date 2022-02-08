init: docker-down-clear docker-pull docker-build docker-up node-install node-start

docker-up:
	docker-compose up -d

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

node-start:
	docker-compose run -p 3000:3000 --rm node npm start

node-build:
	docker-compose run --rm node npm build

nodec:
	docker-compose run --rm node ${c}
