.PHONY: docker-build-run

docker-build-run:
	docker build -t foo:latest .
	docker run --rm -it -p 3000:3000 -e DOPPLER_TOKEN_MY_PERSONAL=$(DOPPLER_TOKEN_MY_PERSONAL) foo:latest