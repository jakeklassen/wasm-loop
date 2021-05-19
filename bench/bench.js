// @ts-check

const Benchmark = require('benchmark');
const path = require('path');
const { loadWebAssembly } = require('./utils');

const jsLoop = () => {
  const nums = new Array(1_000_000);

  for (let i = 0; i < nums.length; ++i) {
    nums[i] = i * 2;
  }
};

loadWebAssembly(path.resolve(__dirname, '../loop.wasm')).then((instance) => {
  const wasmLoop = instance.exports.loop;
  const suite = new Benchmark.Suite();

  suite
    .add('JS Loop', () => {
      jsLoop();
    })
    .add('WASM Loop', () => {
      // @ts-ignore
      wasmLoop();
    })
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: true });
});
