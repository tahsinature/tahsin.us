.PHONY: docker-build-run bundle-analyze upload-photos update-captions

docker-build-run:
	docker build -t foo:latest .
	docker run --rm -it -p 3000:3000 -e DOPPLER_TOKEN_MY_PERSONAL=$(DOPPLER_TOKEN_MY_PERSONAL) foo:latest

bundle-analyze:
	npx vite-bundle-visualizer -o .temp/bundle-stats.html
	open .temp/bundle-stats.html

upload-photos:
	bun scripts/photography/upload-photos.ts

update-captions:
	claude $(if $(YOLO),--dangerously-skip-permissions) "Read scripts/photography/update-captions.ts file content and read the instruction and run the file."