all:
	clang \
		--target=wasm32 \
		-O3 \
		-flto \
		-nostdlib \
		-Wl,--no-entry \
		-Wl,--export-all \
		-Wl,--lto-O3 \
		-o loop.wasm \
		loop.c;
