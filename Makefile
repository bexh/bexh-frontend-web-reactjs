export APP_ENV := development

docker-up:
	docker-compose up -d --build
	sleep 5
	docker run -it -p 3000:3000 -v $(shell pwd)/bexh-web-app/src:/bexh-web-app/src bexh_bexh-web-app

docker-down:
	docker-compose down
