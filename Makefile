.PHONY: docker-build-run

docker-build-run:
	docker build -t foo:latest .
	docker run --rm -it -p 3000:3000 foo:latest