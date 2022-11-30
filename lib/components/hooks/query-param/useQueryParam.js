/**
 * Copyright 2022- IBM Inc. All rights reserved
 * SPDX-License-Identifier: Apache2.0
 */
import useAkoraState from '../akora-state/useAkoraState';
import setUrlParameters from '../../../util/setUrlParameters';

export default (React, AkoraContext) => function useQueryParameter(key, regionId) {
  const { state, app } = useAkoraState(React, AkoraContext)();
  let regionKey = null;
  if (regionId) {
    regionKey = `${regionId}_${key}`;
  } else if (state.regionId) {
    regionKey = `${state.regionId}_${key}`;
  }

  const setParameter = React.useCallback(
    newValue =>
      app.replaceRoute(setUrlParameters(state.resolvedFullPath || state.fullPath, {[regionKey || key]: newValue})),
    [app, key, state.fullPath]
  );

  if (key) {
    const queryParameters = state.query;
    const parameter = regionKey ? queryParameters[queryParameters] : queryParameters[key];

    return [parameter, setParameter];
  }

  console.error('[useQueryParameter]: No key provided');
};
