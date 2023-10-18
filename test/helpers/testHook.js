/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import TestRenderer from 'react-test-renderer';

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export default callback => {
  TestRenderer.create(<TestHook callback={callback} />);
};
