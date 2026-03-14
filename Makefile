.PHONY: docker-build-run bundle-analyze

docker-build-run:
	docker build -t foo:latest .
	docker run --rm -it -p 3000:3000 -e DOPPLER_TOKEN_MY_PERSONAL=$(DOPPLER_TOKEN_MY_PERSONAL) foo:latest

bundle-analyze:
	npx vite-bundle-visualizer -o .temp/bundle-stats.html
	open .temp/bundle-stats.html