/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import WebParser from '../../src/webParser';
import { context } from '../testContext';

const arrayIndices = [1];

console.error = () => {};

test('_regex with on, pass', async () => {
  const input = { _regex: { pattern: '^a$', on: 'a' } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(true);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with on, fail', async () => {
  const input = { _regex: { pattern: '^a$', on: 'b' } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(false);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with key, pass', async () => {
  const input = { _regex: { pattern: '^state$', key: 'string' } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(true);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with key, fail', async () => {
  const input = { _regex: { pattern: '^a$', key: 'string' } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(false);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with null on', async () => {
  const input = { _regex: { pattern: '^a$', on: null } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(false);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with nonexistent key', async () => {
  const input = { _regex: { pattern: '^a$', key: 'notThere' } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(false);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with nonexistent key', async () => {
  const input = { _regex: { pattern: '^a$', key: null } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(null);
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [Error: Operator Error: _regex.key must be a string. Received: {"pattern":"^a$","key":null} at locationId.],
    ]
  `);
});

test('_regex null', async () => {
  const input = { _regex: null };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(null);
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [Error: Operator Error: _regex.pattern must be a string. Received: null at locationId.],
    ]
  `);
});

test('_regex with non-string on', async () => {
  const input = { _regex: { pattern: '^a$', on: 5 } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(null);
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [Error: Operator Error: _regex.on must be a string. Received: {"pattern":"^a$","on":5} at locationId.],
    ]
  `);
});

test('_regex flags', async () => {
  const input = { _regex: { pattern: 'a', on: 'A', flags: 'i' } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(true);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex invalid flags', async () => {
  const input = { _regex: { pattern: 'a', on: 'a', flags: 1 } };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'locationId', arrayIndices });
  expect(res.output).toBe(null);
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [Error: Operator Error: _regex failed to execute RegExp.test. Received: {"pattern":"a","on":"a","flags":1} at locationId.],
    ]
  `);
});

test('_regex with location given to parse in state no match ', async () => {
  const input = { _regex: 'nope' };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'string', arrayIndices });
  expect(res.output).toBe(false);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with location given to parse in state match', async () => {
  const input = { _regex: 'str' };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'string', arrayIndices });
  expect(res.output).toBe(false);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with location given to parse not in state', async () => {
  const input = { _regex: 'nope' };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'string2', arrayIndices });
  expect(res.output).toBe(false);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});

test('_regex with location given, state value is null', async () => {
  const input = { _regex: 'nope' };
  const parser = new WebParser({ context });
  await parser.init();
  const res = parser.parse({ input, location: 'nullValue', arrayIndices });
  expect(res.output).toBe(false);
  expect(res.errors).toMatchInlineSnapshot(`Array []`);
});
