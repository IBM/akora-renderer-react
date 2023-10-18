/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import useAkoraState from '../akora-state/useAkoraState';
import setUrlParameters from '../../../util/setUrlParameters';
import isFalsy from '../../../util/isFalsy';

const calculateRegionKey = ({state, key, regionId}) => {
  let regionKey = null;
  if (regionId) {
    regionKey = `${regionId}_${key}`;
  } else if (state?.regionId) {
    regionKey = `${state.regionId}_${key}`;
  }
  return regionKey;
};

const getParameterValue = ({key, regionId, app}) => {
  const latestState = app.getState();
  if (key) {
    const regionKey = calculateRegionKey({state: latestState, key, regionId});
    const queryParameters = app.getState()?.query;
    const newParameterValue = regionKey ? queryParameters[regionKey] : queryParameters[key];
    return newParameterValue;
  }
  return;
};

export default (React, AkoraContext) => function useQueryParameter(key, regionId) {
  const { state, app } = useAkoraState(React, AkoraContext)();
  const [parameter, setInternalParameter] = React.useState(getParameterValue({state, key, regionId, app}));

  React.useEffect(() => {
    const newParameterValue = getParameterValue({state, key, regionId, app});
    if (newParameterValue !== parameter) {
      setInternalParameter(newParameterValue);
    }
  }, [app, key, parameter, regionId, state]);

  const setParameter = React.useCallback((newValue) => {
    const latestState = app.getState();
    const regionKey = calculateRegionKey({state: latestState, key, regionId});
    const queryParameters = latestState?.query;
    const currentQueryValue =  queryParameters[regionKey || key];

    if (isFalsy(newValue) && typeof currentQueryValue === 'undefined') {
      // Skip setting because falsy value is treated as undefined in query
      return;
    }
    if (currentQueryValue !== newValue) {
      const newUrlRoute = setUrlParameters(latestState?.resolvedFullPath || latestState?.fullPath, {[regionKey || key]: newValue});
      app.replaceRoute(newUrlRoute);
    }
  },
  [app, key, regionId]
  );

  if (!key) {
    throw new Error('[useQueryParameter]: No key provided');
  }

  return [parameter, setParameter];
};
