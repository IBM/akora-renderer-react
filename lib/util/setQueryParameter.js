/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import setUrlParameters from './setUrlParameters';

export default function setQueryParameter({state, app, key, value, regionId}) {
  if (app && key && state) {
    let regionKey = null;
    if (regionId) {
      regionKey = `${regionId}_${key}`;
    } else if (state?.regionId) {
      regionKey = `${state.regionId}_${key}`;
    }
    app.replaceRoute(setUrlParameters(state?.resolvedFullPath || state?.fullPath, {[regionKey || key]: value}));
  }
}
