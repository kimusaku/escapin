import {
  normalize,
  uncallbackify,
  openApiV2,
  refineObject,
  refineFunction,
  functionTypes,
  asynchronize,
  finalize,
} from '../../src/visitors';
import { transpile } from '../util';

test('[normalize.1] nominal case of normalize', () => {
  const { actual, expected } = transpile('normalize.1', {}, normalize);
  expect(actual).toEqual(expected);
});

test('[uncallbackify.1] nominal case of uncallbackify', () => {
  const { actual, expected } = transpile('uncallbackify.1', {}, uncallbackify);
  expect(actual).toEqual(expected);
});

test('[openApiV2.1] ignore conventional import declarations', () => {
  const { actual, expected } = transpile(
    'openApiV2.1',
    {},
    openApiV2,
    finalize,
  );
  expect(actual).toEqual(expected);
});

test('[openApiV2.2] nominal case of openApiV2 with axios', done => {
  const { actual, expected } = transpile(
    'openApiV2.2',
    {},
    openApiV2,
    finalize,
  );
  expect(actual).toEqual(expected);
  done();
});

test('[openApiV2.3] nominal case of openApiV2 with request', () => {
  const { actual, expected } = transpile(
    'openApiV2.3',
    // eslint-disable-next-line @typescript-eslint/camelcase
    { http_client: 'request' },
    openApiV2,
    finalize,
  );
  expect(actual).toEqual(expected);
});

test('[refineObject.1] nominal case of refineObject', () => {
  const { actual, expected } = transpile(
    'refineObject.1',
    {},
    refineObject,
    finalize,
  );
  expect(actual).toEqual(expected);
});

test('[refineFunction.1] nominal case of refineFunction', () => {
  const { actual, expected } = transpile(
    'refineFunction.1',
    {},
    refineFunction,
    finalize,
  );
  expect(actual).toEqual(expected);
});

test('[asynchronize.1] nominal case of asynchronize', () => {
  const { actual, expected } = transpile(
    'asynchronize.1',
    {},
    functionTypes,
    asynchronize,
    finalize,
  );
  expect(actual).toEqual(expected);
});

test('[finalize.1] nominal case of finalize', () => {
  const { actual, expected } = transpile('finalize.1', {}, finalize);
  expect(actual).toEqual(expected);
});
