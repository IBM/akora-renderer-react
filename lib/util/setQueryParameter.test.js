/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import setQueryParameter from './setQueryParameter';
import setUrlParameters from './setUrlParameters';

const mockQueryParams = {
  testKey: 'test value'
};
let state;
let app;

beforeEach(() => {
  state = {
    fullPath: setUrlParameters('testroute.com', mockQueryParams)
  };
  app = {
    replaceRoute: jest.fn()
  };
});

describe('setQueryParameter', () => {
  it('Calls replaceRoute with the new parameter values', () => {
    setQueryParameter({state, app, key: 'filtername', value: 'myfilter'});
    expect(app.replaceRoute).toHaveBeenCalledWith('testroute.com?testKey=test+value&filtername=myfilter');
  });

  it('Calls replaceRoute with the new parameter values and given regionId', () => {
    setQueryParameter({state, app, key: 'filtername', value: 'myfilter', regionId: 'myRegion'});
    expect(app.replaceRoute).toHaveBeenCalledWith('testroute.com?testKey=test+value&myRegion_filtername=myfilter');
  });

  it('Calls replaceRoute with the new parameter values, with state regionId', () => {
    state.regionId = 'myRegion';
    setQueryParameter({state, app, key: 'filtername', value: 'myfilter'});
    expect(app.replaceRoute).toHaveBeenCalledWith('testroute.com?testKey=test+value&myRegion_filtername=myfilter');
  });


  it('Calls replaceRoute with the new parameter values, with state regionId and resolvedFullPath', () => {
    state.resolvedFullPath = setUrlParameters('testroute.com', mockQueryParams);
    state.regionId = 'myRegion';
    setQueryParameter({state, app, key: 'filtername', value: 'myfilter'});
    expect(app.replaceRoute).toHaveBeenCalledWith('testroute.com?testKey=test+value&myRegion_filtername=myfilter');
  });
});
