.PHONY: build up down clean rebuild

build:
	docker compose up --build -d

up:
	docker compose up

down:
	docker compose down

clean:
	docker compose down --rmi all --volumes --remove-orphans

rebuild:
	docker compose down && docker compose build --no-cache && docker compose up -d