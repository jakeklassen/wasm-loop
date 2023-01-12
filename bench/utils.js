// @ts-check

import fs from 'node:fs';

/**
 *
 * @param {fs.PathOrFileDescriptor} fileName
 * @returns
 */
export const loadWebAssembly = (fileName) =>
  WebAssembly.instantiate(fs.readFileSync(fileName, {})).then(
    ({ instance }) => instance,
  );

export const time = (fn, iterations = 10) => {
  const times = [];

  Array.from({ length: iterations }, (_, v) => v).forEach((_, idx) => {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  });

  return times.reduce((acc, time) => acc + time, 0) / times.length;
};
