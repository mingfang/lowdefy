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

import { type } from '@lowdefy/helpers';

function getOperators(block, pageContext) {
  // eslint-disable-next-line no-unused-vars
  const { requests, blocks, areas, ...webBlock } = block;

  function getOperatorsReviver(_, value) {
    if (type.isObject(value) && Object.keys(value).length === 1) {
      const key = Object.keys(value)[0];
      const [op] = key.split('.');
      const operator = op.replace(/^(_+)/gm, '_');
      if (operator.length > 1 && operator[0] === '_') {
        pageContext.operators.add(operator);
      }
    }
    return value;
  }

  JSON.parse(JSON.stringify(webBlock), getOperatorsReviver);

  (requests || []).forEach((request) => {
    JSON.parse(JSON.stringify(request.payload || {}), getOperatorsReviver);
  });
}

export default getOperators;
