/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
/* eslint-disable react/prop-types */
export default (React, AkoraContext) => function WithAkoraState({children}) {
  return (
    <AkoraContext.Consumer>
      {children}
    </AkoraContext.Consumer>
  );
};
