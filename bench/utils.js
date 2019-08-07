// @ts-check

const fs = require('fs');

exports.loadWebAssembly = fileName =>
  WebAssembly.instantiate(fs.readFileSync(fileName, {})).then(
    ({ instance }) => instance,
  );

exports.time = (fn, iterations = 10) => {
  const times = [];

  Array.from({ length: iterations }, (_, v) => v).forEach((_, idx) => {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  });

  return times.reduce((acc, time) => acc + time, 0) / times.length;
};
