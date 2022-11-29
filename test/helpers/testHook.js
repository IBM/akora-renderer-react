/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
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
