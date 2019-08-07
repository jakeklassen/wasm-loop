// @ts-check

function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes, {}))
    .then(results => results.instance);
}

const time = (fn, iterations = 10) => {
  const times = [];

  Array.from({ length: iterations }, (_, v) => v).forEach((_, idx) => {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  });

  return times.reduce((acc, time) => acc + time, 0) / times.length;
};

const jsLoop = () => {
  const nums = Array.from({ length: 1_000_000 });

  for (let i = 0; i < nums.length; ++i) {
    nums[i] = i * 2;
  }
};

loadWebAssembly('loop.wasm').then(instance => {
  const loop = instance.exports.loop;
  console.log('Finished compiling! Ready when you are...');

  const wasmLoopTime = time(loop);
  console.log(`wasm-loop: ${wasmLoopTime}ms`);

  const jsLoopTime = time(jsLoop);
  console.log(`js-loop: ${jsLoopTime}ms`);

  if (wasmLoopTime < jsLoopTime) {
    console.log(
      `wasm-loop was ${jsLoopTime / wasmLoopTime}% faster than js-loop`,
    );
    console.log(`wasm-loop runs per frame @ 60fps: ${1 / 60 / wasmLoopTime}`);
  } else {
    console.log(
      `js-loop was ${wasmLoopTime / jsLoopTime}% faster than wasm-loop`,
    );
  }
});
