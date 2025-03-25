/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

export default (React, AkoraContext) => () => {
  const akoraConfig = React.useContext(AkoraContext);

  if (window.akoraConfig?.baseState) {
    return {
      ...akoraConfig,
      state: {
        ...window.akoraConfig.baseState,
        ...akoraConfig.state
      }
    };
  }
  return akoraConfig;
};
