/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
import useAkoraState from '../akora-state/useAkoraState';
import setUrlParameters from '../../../util/setUrlParameters';

export default (React, AkoraContext) => function useQueryParameter(key) {
  const { state, app } = useAkoraState(React, AkoraContext)();

  const setParameter = React.useCallback(
    newValue =>
      app.replaceRoute(setUrlParameters(state.fullPath, {[key]: newValue})),
    [app, key, state.fullPath]
  );

  if (key) {
    const queryParameters = state.query;
    const parameter =  queryParameters[key];

    return [parameter, setParameter];
  }

  console.error('[useQueryParameter]: No key provided');
};
