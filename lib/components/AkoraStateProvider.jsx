/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable react/prop-types */
export default (React, AkoraContext) => function AkoraStateProvider({ children, value }) {
  return (
    <AkoraContext.Provider value={value}>
      {children}
    </AkoraContext.Provider>
  );
};
