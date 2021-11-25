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

import url_query from '../../src/web/url_query.js';
import getFromObject from '../../src/getFromObject.js';

jest.mock('../../src/getFromObject');

const input = {
  arrayIndices: [0],
  location: 'location',
  params: 'params',
  secrets: { secrets: true },
  urlQuery: { urlQuery: true },
};

test('url_query calls getFromObject', () => {
  url_query(input);
  expect(getFromObject.mock.calls).toEqual([
    [
      {
        arrayIndices: [0],
        location: 'location',
        object: {
          urlQuery: true,
        },
        operator: '_url_query',
        params: 'params',
      },
    ],
  ]);
});