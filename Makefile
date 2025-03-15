.PHONY: build up down clean rebuild test-services-up test-services-down test-services-rebuild test-services-db-migrate

build:
	docker compose up --build -d

up:
	docker compose up

down:
	docker compose down

clean:
	docker compose down --rmi all --volumes --remove-orphans

rebuild:
	docker compose down
	docker compose build --no-cache
	docker compose up -d

test-services-up:
	docker compose -f docker-compose-test.yml up -d

test-services-down:
	docker compose -f docker-compose-test.yml down

test-services-rebuild:
	docker compose -f docker-compose-test.yml down
	docker compose -f docker-compose-test.yml build --no-cache
	docker compose -f docker-compose-test.yml up -d

test-services-db-migrate:
	docker compose -f docker-compose-test.yml exec app-test sh -c "npx prisma migrate dev --name init --skip-seed"