.PHONY: docker-build-run bundle-analyze upload-photos update-captions sync-bruno-env

test-everything:
	bun test && bun run build

dev:
	bun run dev

docker-build-run:
	docker build -t foo:latest .
	docker run --rm -it -p 3000:3000 -e DOPPLER_TOKEN_MY_PERSONAL=$(DOPPLER_TOKEN_MY_PERSONAL) foo:latest

bundle-analyze:
	npx vite-bundle-visualizer -o .temp/bundle-stats.html
	open .temp/bundle-stats.html

upload-photos:
	bun scripts/notion/upload-photos.ts

update-captions:
	claude $(if $(YOLO),--dangerously-skip-permissions) "Read scripts/notion/update-captions.ts file content and read the instruction and run the file."

sync-bruno-env:
	ln -sf ../../.env .bruno/tus-collection/.env